
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Upload, TrendingUp } from "lucide-react";
import { useDataContext, HistoricalData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import CSVInstructions from "./CSVInstructions";

const AnalysisDataLoader = () => {
  const { historicalData, addHistoricalData, updateHistoricalData, deleteHistoricalData, setHistoricalData } = useDataContext();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    month: "",
    ingresos: "",
    costos: "",
    margen: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.month || !formData.ingresos || !formData.costos) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const ingresos = Number(formData.ingresos);
    const costos = Number(formData.costos);
    const margen = formData.margen ? Number(formData.margen) : ingresos - costos;

    const newData: HistoricalData = {
      id: editingId || Date.now().toString(),
      month: formData.month,
      ingresos,
      costos,
      margen
    };

    if (editingId) {
      updateHistoricalData(editingId, newData);
      toast({
        title: "Actualizado",
        description: "Dato histórico actualizado correctamente.",
      });
    } else {
      addHistoricalData(newData);
      toast({
        title: "Agregado",
        description: "Nuevo dato histórico agregado correctamente.",
      });
    }

    setFormData({ month: "", ingresos: "", costos: "", margen: "" });
    setEditingId(null);
  };

  const handleEdit = (data: HistoricalData) => {
    setFormData({
      month: data.month,
      ingresos: data.ingresos.toString(),
      costos: data.costos.toString(),
      margen: data.margen.toString()
    });
    setEditingId(data.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este registro histórico?")) {
      deleteHistoricalData(id);
      toast({
        title: "Eliminado",
        description: "Dato histórico eliminado correctamente.",
      });
    }
  };

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        
        const newData: HistoricalData[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim());
            const ingresos = Number(values[1]) || 0;
            const costos = Number(values[2]) || 0;
            newData.push({
              id: Date.now().toString() + i,
              month: values[0] || "",
              ingresos,
              costos,
              margen: Number(values[3]) || (ingresos - costos)
            });
          }
        }
        
        setHistoricalData([...historicalData, ...newData]);
        toast({
          title: "Importado",
          description: `${newData.length} registros históricos importados correctamente.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al procesar el archivo CSV.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const getMarginStatus = (margen: number, ingresos: number) => {
    const marginPercentage = (margen / ingresos) * 100;
    if (marginPercentage >= 40) return <Badge className="bg-green-100 text-green-800">Excelente</Badge>;
    if (marginPercentage >= 30) return <Badge className="bg-blue-100 text-blue-800">Bueno</Badge>;
    if (marginPercentage >= 20) return <Badge className="bg-yellow-100 text-yellow-800">Regular</Badge>;
    return <Badge variant="destructive">Bajo</Badge>;
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="space-y-6">
      <CSVInstructions section="historicos" />
      
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{editingId ? "Editar" : "Agregar"} Dato Histórico</span>
            <Button asChild variant="outline" size="sm">
              <label htmlFor="csv-historicos">
                <Upload className="h-4 w-4 mr-2" />
                Importar CSV
                <input
                  id="csv-historicos"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleCSVImport}
                />
              </label>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Datos utilizados en:</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Análisis: Gráficos de tendencias históricas</li>
              <li>• Dashboard: Cálculo de crecimiento mensual</li>
              <li>• Proyecciones: Base para predicciones futuras</li>
              <li>• Comparaciones: Análisis mes anterior vs actual</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="month">Mes *</Label>
              <Input
                id="month"
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                placeholder="Ej: Oct 2024"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="ingresos">Ingresos *</Label>
              <Input
                id="ingresos"
                type="number"
                value={formData.ingresos}
                onChange={(e) => setFormData({ ...formData, ingresos: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="costos">Costos *</Label>
              <Input
                id="costos"
                type="number"
                value={formData.costos}
                onChange={(e) => setFormData({ ...formData, costos: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="margen">Margen (calculado automáticamente)</Label>
              <Input
                id="margen"
                type="number"
                value={formData.margen || (Number(formData.ingresos) - Number(formData.costos) || "")}
                onChange={(e) => setFormData({ ...formData, margen: e.target.value })}
                placeholder="Auto"
              />
            </div>
            
            <div className="lg:col-span-4 flex space-x-2">
              <Button type="submit" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>{editingId ? "Actualizar" : "Agregar"}</span>
              </Button>
              {editingId && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ month: "", ingresos: "", costos: "", margen: "" });
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Datos Históricos Registrados ({historicalData.length} registros)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mes</TableHead>
                  <TableHead>Ingresos</TableHead>
                  <TableHead>Costos</TableHead>
                  <TableHead>Margen</TableHead>
                  <TableHead>% Margen</TableHead>
                  <TableHead>Crecimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historicalData
                  .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
                  .map((item, index) => {
                    const previousItem = index > 0 ? historicalData[index - 1] : null;
                    const growth = previousItem ? calculateGrowth(item.ingresos, previousItem.ingresos) : 0;
                    const marginPercentage = (item.margen / item.ingresos) * 100;
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.month}</TableCell>
                        <TableCell>${item.ingresos.toLocaleString()}</TableCell>
                        <TableCell>${item.costos.toLocaleString()}</TableCell>
                        <TableCell>${item.margen.toLocaleString()}</TableCell>
                        <TableCell>{marginPercentage.toFixed(1)}%</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <span className={growth >= 0 ? "text-green-600" : "text-red-600"}>
                              {growth >= 0 ? "+" : ""}{growth.toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getMarginStatus(item.margen, item.ingresos)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {historicalData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                      No hay datos históricos registrados. Agregue algunos para comenzar el análisis.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisDataLoader;
