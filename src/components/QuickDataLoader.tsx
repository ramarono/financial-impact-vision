
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Plus, Download, Database, RefreshCw, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickDataLoaderProps {
  title: string;
  description: string;
  onImportCSV: (data: any[]) => void;
  onManualEntry: (data: any) => void;
  onLoadToDashboard?: () => void;
  csvTemplate?: string;
  manualEntryFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'number' | 'textarea' | 'select';
    options?: string[];
    required?: boolean;
  }>;
  expectedFields?: string[]; // Para validación de CSV
  autoUpdateOnLoad?: boolean; // Para actualización automática
}

const QuickDataLoader = ({
  title,
  description,
  onImportCSV,
  onManualEntry,
  onLoadToDashboard,
  csvTemplate,
  manualEntryFields = [],
  expectedFields = [],
  autoUpdateOnLoad = true
}: QuickDataLoaderProps) => {
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false);
  const [manualData, setManualData] = useState<Record<string, any>>({});
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastImportedCount, setLastImportedCount] = useState(0);
  const { toast } = useToast();

  const validateCSVData = (data: any[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (data.length === 0) {
      errors.push('El archivo CSV está vacío');
      return { isValid: false, errors };
    }

    // Validar campos esperados si se proporcionan
    if (expectedFields.length > 0) {
      const headers = Object.keys(data[0] || {});
      const missingFields = expectedFields.filter(field => 
        !headers.some(header => header.toLowerCase().includes(field.toLowerCase()))
      );
      
      if (missingFields.length > 0) {
        errors.push(`Campos faltantes: ${missingFields.join(', ')}`);
      }
    }

    // Validar que los datos tengan al menos algunos campos con valores
    const hasValidData = data.some(row => 
      Object.values(row).some(value => value !== '' && value !== null && value !== undefined)
    );
    
    if (!hasValidData) {
      errors.push('No se encontraron datos válidos en el archivo');
    }

    return { isValid: errors.length === 0, errors };
  };

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV debe tener al menos una línea de encabezado y una de datos');
    }

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) continue;

      const row: any = { id: Date.now().toString() + i };
      headers.forEach((header, index) => {
        const value = values[index];
        // Convert numeric values
        if (!isNaN(Number(value)) && value !== '') {
          row[header] = Number(value);
        } else {
          row[header] = value;
        }
      });
      data.push(row);
    }

    return data;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      processCSVFile(csvFile);
    } else {
      toast({
        title: "Formato no válido",
        description: "Por favor, sube un archivo CSV.",
        variant: "destructive",
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processCSVFile(file);
    }
  };

  const processCSVFile = async (file: File) => {
    setIsLoading(true);
    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      // Validar los datos antes de importar
      const validation = validateCSVData(parsedData);
      if (!validation.isValid) {
        toast({
          title: "Error de validación",
          description: validation.errors.join('. '),
          variant: "destructive",
        });
        return;
      }

      // Importar los datos
      onImportCSV(parsedData);
      setLastImportedCount(parsedData.length);
      
      // Mostrar mensaje de éxito
      toast({
        title: "¡Datos cargados exitosamente!",
        description: `${file.name}: ${parsedData.length} registros importados correctamente.`,
      });

      // Auto-actualizar dashboard si está habilitado
      if (autoUpdateOnLoad && onLoadToDashboard) {
        setIsUpdating(true);
        setTimeout(() => {
          onLoadToDashboard();
          setIsUpdating(false);
          toast({
            title: "Dashboard actualizado",
            description: "Los gráficos y métricas han sido actualizados con los nuevos datos.",
          });
        }, 1000); // Pequeño delay para mejor UX
      }
      
    } catch (error) {
      toast({
        title: "Error al procesar CSV",
        description: error instanceof Error ? error.message : "Error desconocido al procesar el archivo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = async () => {
    // Validate required fields
    const missingFields = manualEntryFields
      .filter(field => field.required && !manualData[field.name])
      .map(field => field.label);

    if (missingFields.length > 0) {
      toast({
        title: "Campos requeridos",
        description: `Por favor complete: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const dataWithId = { ...manualData, id: Date.now().toString() };
      onManualEntry(dataWithId);
      setManualData({});
      setIsManualDialogOpen(false);
      
      toast({
        title: "¡Datos agregados exitosamente!",
        description: "El registro ha sido agregado y el dashboard se actualizará automáticamente.",
      });

      // Auto-actualizar dashboard si está habilitado
      if (autoUpdateOnLoad && onLoadToDashboard) {
        setIsUpdating(true);
        setTimeout(() => {
          onLoadToDashboard();
          setIsUpdating(false);
          toast({
            title: "Dashboard actualizado",
            description: "Las métricas se han actualizado con el nuevo registro.",
          });
        }, 500);
      }
      
    } catch (error) {
      toast({
        title: "Error al agregar datos",
        description: "Ocurrió un error al procesar los datos. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTemplate = () => {
    if (csvTemplate) {
      const blob = new Blob([csvTemplate], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `plantilla-${title.toLowerCase().replace(/\s+/g, '-')}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CSV Import */}
          <div className="space-y-3">
            <div
              className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/10' : 
                isLoading ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isLoading || isUpdating}
              />
              {isLoading ? (
                <>
                  <Loader2 className="h-6 w-6 mx-auto mb-2 text-yellow-600 animate-spin" />
                  <p className="text-sm text-yellow-700 font-medium">
                    Procesando archivo CSV...
                  </p>
                </>
              ) : isUpdating ? (
                <>
                  <RefreshCw className="h-6 w-6 mx-auto mb-2 text-blue-600 animate-spin" />
                  <p className="text-sm text-blue-700 font-medium">
                    Actualizando dashboard...
                  </p>
                </>
              ) : (
                <>
                  <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Arrastra un CSV o haz clic para seleccionar
                  </p>
                  {lastImportedCount > 0 && (
                    <div className="mt-2 flex items-center justify-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">
                        Último: {lastImportedCount} registros
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
            {csvTemplate && (
              <Button
                onClick={downloadTemplate}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                <Download className="h-3 w-3 mr-1" />
                Descargar plantilla
              </Button>
            )}
          </div>

          {/* Manual Entry */}
          <div className="space-y-3">
            <Dialog open={isManualDialogOpen} onOpenChange={setIsManualDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="w-full" 
                  variant="outline"
                  disabled={isLoading || isUpdating}
                >
                  {isLoading || isUpdating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Entrada Manual
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Agregar {title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {manualEntryFields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      {field.type === 'textarea' ? (
                        <Textarea
                          id={field.name}
                          value={manualData[field.name] || ''}
                          onChange={(e) => setManualData(prev => ({ ...prev, [field.name]: e.target.value }))}
                          placeholder={field.label}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          id={field.name}
                          value={manualData[field.name] || ''}
                          onChange={(e) => setManualData(prev => ({ ...prev, [field.name]: e.target.value }))}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Seleccionar...</option>
                          {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <Input
                          id={field.name}
                          type={field.type}
                          value={manualData[field.name] || ''}
                          onChange={(e) => setManualData(prev => ({ 
                            ...prev, 
                            [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value 
                          }))}
                          placeholder={field.label}
                        />
                      )}
                    </div>
                  ))}
                  <Button 
                    onClick={handleManualSubmit} 
                    className="w-full"
                    disabled={isLoading || isUpdating}
                  >
                    {isLoading || isUpdating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {isLoading ? 'Agregando...' : 'Actualizando...'}
                      </>
                    ) : (
                      'Agregar Datos'
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <p className="text-xs text-muted-foreground text-center">
              Agregar datos individualmente
            </p>
          </div>
        </div>

        {/* Load to Dashboard Button */}
        {onLoadToDashboard && (
          <div className="mt-6 pt-4 border-t">
            <Button 
              onClick={() => {
                setIsUpdating(true);
                onLoadToDashboard();
                setTimeout(() => {
                  setIsUpdating(false);
                  toast({
                    title: "Dashboard actualizado",
                    description: "Todas las métricas han sido recalculadas con los datos actuales.",
                  });
                }, 1000);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              size="lg"
              disabled={isLoading || isUpdating}
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Actualizando Dashboard...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar Dashboard
                </>
              )}
            </Button>
          </div>
        )}

        {/* Quick Stats & Status */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Gestión de datos</span>
            <div className="flex space-x-2">
              <Badge variant="secondary">CSV</Badge>
              <Badge variant="secondary">Manual</Badge>
              {autoUpdateOnLoad && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Auto-sync
                </Badge>
              )}
            </div>
          </div>
          
          {/* Status Indicator */}
          {(isLoading || isUpdating) && (
            <div className="mt-3 flex items-center justify-center">
              <div className="flex items-center space-x-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-muted-foreground">
                  {isLoading ? 'Procesando datos...' : 'Actualizando dashboard...'}
                </span>
              </div>
            </div>
          )}
          
          {lastImportedCount > 0 && !isLoading && !isUpdating && (
            <div className="mt-3 flex items-center justify-center text-sm text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Sistema actualizado con {lastImportedCount} registros</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickDataLoader;
