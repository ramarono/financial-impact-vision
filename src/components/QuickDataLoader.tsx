
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Plus, FileText, Download, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickDataLoaderProps {
  title: string;
  description: string;
  onLoadSampleData: () => void;
  onImportCSV: (file: File) => void;
  onManualEntry: (data: any) => void;
  sampleDataCount?: number;
  csvTemplate?: string;
  manualEntryFields?: Array<{
    name: string;
    label: string;
    type: 'text' | 'number' | 'textarea' | 'select';
    options?: string[];
    required?: boolean;
  }>;
}

const QuickDataLoader = ({
  title,
  description,
  onLoadSampleData,
  onImportCSV,
  onManualEntry,
  sampleDataCount = 5,
  csvTemplate,
  manualEntryFields = []
}: QuickDataLoaderProps) => {
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false);
  const [manualData, setManualData] = useState<Record<string, any>>({});
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

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
      onImportCSV(csvFile);
      toast({
        title: "Archivo cargado",
        description: `${csvFile.name} ha sido procesado correctamente.`,
      });
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
      onImportCSV(file);
      toast({
        title: "Archivo cargado",
        description: `${file.name} ha sido procesado correctamente.`,
      });
    }
  };

  const handleManualSubmit = () => {
    onManualEntry(manualData);
    setManualData({});
    setIsManualDialogOpen(false);
    toast({
      title: "Datos agregados",
      description: "Los datos han sido agregados correctamente.",
    });
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sample Data */}
          <div className="space-y-3">
            <Button
              onClick={onLoadSampleData}
              className="w-full"
              variant="outline"
            >
              <FileText className="h-4 w-4 mr-2" />
              Datos de Ejemplo
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Cargar {sampleDataCount} registros de ejemplo para comenzar
            </p>
          </div>

          {/* CSV Import */}
          <div className="space-y-3">
            <div
              className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
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
              />
              <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Arrastra un CSV o haz clic
              </p>
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
                <Button className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Entrada Manual
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
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
                  <Button onClick={handleManualSubmit} className="w-full">
                    Agregar Datos
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <p className="text-xs text-muted-foreground text-center">
              Agregar datos individualmente
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Gestión rápida de datos</span>
            <div className="flex space-x-2">
              <Badge variant="secondary">CSV</Badge>
              <Badge variant="secondary">Manual</Badge>
              <Badge variant="secondary">Ejemplos</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickDataLoader;
