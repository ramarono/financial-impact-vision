import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Upload } from "lucide-react";
import { useDataContext, KPIData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import CSVInstructions from "./CSVInstructions";

const KPIDataLoader = () => {
  const { kpiData, addKpiData, updateKpiData, deleteKpiData, setKpiData } = useDataContext();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    month: "",
    nombre: "",
    valor: "",
    meta: "",
    unidad: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.month || !formData.nombre || !formData.valor || !formData.meta || !formData.unidad) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const newData: KPIData = {
      id: editingId || Date.now().toString(),
      month: formData.month,
      nombre: formData.nombre,
      valor: Number(formData.valor),
      meta: Number(formData.meta),
      unidad: formData.unidad
    };

    if (editingId) {
      updateKpiData(editingId, newData);
      toast({
        title: "Actualizado",
        description: "KPI actualizado correctamente.",
      });
    } else {
      addKpiData(newData);
      toast({
        title: "Agregado",
        description: "Nuevo KPI agregado correctamente.",
      });
    }

    setFormData({ month: "", nombre: "", valor: "", meta: "", unidad: "" });
    setEditingId(null);
  };

  const handleEdit = (data: KPIData) => {
    setFormData({
      month: data.month,
      nombre: data.nombre,
      valor: data.valor.toString(),
      meta: data.meta.toString(),
      unidad: data.unidad
    });
    setEditingId(data.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este KPI?")) {
      deleteKpiData(id);
      toast({
        title: "Eliminado",
        description: "KPI eliminado correctamente.",
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
        
        const newData: KPIData[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim());
            newData.push({
              id: Date.now().toString() + i,
              month: values[0] || "",
              nombre: values[1] || "",
              valor: Number(values[2]) || 0,
              meta: Number(values[3]) || 0,
              unidad: values[4] || ""
            });
          }
        }
        
        setKpiData([...kpiData, ...newData]);
        toast({
          title: "Importado",
          description: `${newData.length} KPIs importados correctamente.`,
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

  const getPerformanceBadge = (valor: number, meta: number) => {
    const percentage = (valor / meta) * 100;
    if (percentage >= 100) return <Badge className="bg-green-100 text-green-800">Cumplido</Badge>;
    if (percentage >= 80) return <Badge className="bg-yellow-100 text-yellow-800">En Progreso</Badge>;
    return <Badge variant="destructive">Por Debajo</Badge>;
  };

  return (
    <div className="space-y-6">
      <CSVInstructions section="kpis" />
      
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{editingId ? "Editar" : "Agregar"} KPI</span>
            <Button asChild variant="outline" size="sm">
              <label htmlFor="csv-kpi">
                <Upload className="h-4 w-4 mr-2" />
                Importar CSV
                <input
                  id="csv-kpi"
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
              <li>• Dashboard: Cálculo de rendimiento promedio de KPIs</li>
              <li>• Análisis: Gráficos de performance vs metas</li>
              <li>• Reportes: Indicadores clave de rendimiento</li>
              <li>• Seguimiento mensual de objetivos</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="month">Mes *</Label>
              <Input
                id="month"
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                placeholder="Ej: Ene 2024"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="nombre">Nombre del KPI *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: Conversión de Ventas"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="valor">Valor Actual *</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="meta">Meta *</Label>
              <Input
                id="meta"
                type="number"
                step="0.01"
                value={formData.meta}
                onChange={(e) => setFormData({ ...formData, meta: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="unidad">Unidad *</Label>
              <Input
                id="unidad"
                value={formData.unidad}
                onChange={(e) => setFormData({ ...formData, unidad: e.target.value })}
                placeholder="Ej: %, $, unidades"
                required
              />
            </div>
            
            <div className="lg:col-span-5 flex space-x-2">
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
                    setFormData({ month: "", nombre: "", valor: "", meta: "", unidad: "" });
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
          <CardTitle>KPIs Registrados ({kpiData.length} registros)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mes</TableHead>
                  <TableHead>KPI</TableHead>
                  <TableHead>Valor Actual</TableHead>
                  <TableHead>Meta</TableHead>
                  <TableHead>Unidad</TableHead>
                  <TableHead>Cumplimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpiData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.month}</TableCell>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.valor.toLocaleString()} {item.unidad}</TableCell>
                    <TableCell>{item.meta.toLocaleString()} {item.unidad}</TableCell>
                    <TableCell>{item.unidad}</TableCell>
                    <TableCell>{((item.valor / item.meta) * 100).toFixed(1)}%</TableCell>
                    <TableCell>{getPerformanceBadge(item.valor, item.meta)}</TableCell>
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
                ))}
                {kpiData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                      No hay KPIs registrados. Agregue algunos para comenzar.
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

export default KPIDataLoader;
