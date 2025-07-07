
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Upload } from "lucide-react";
import { useDataContext, RevenueData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";

const RevenueDataLoader = () => {
  const { revenueData, addRevenueData, updateRevenueData, deleteRevenueData, setRevenueData } = useDataContext();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    month: "",
    ingresos: "",
    meta: "",
    cliente: "",
    categoria: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.month || !formData.ingresos || !formData.meta) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const newData: RevenueData = {
      id: editingId || Date.now().toString(),
      month: formData.month,
      ingresos: Number(formData.ingresos),
      meta: Number(formData.meta),
      cliente: formData.cliente,
      categoria: formData.categoria
    };

    if (editingId) {
      updateRevenueData(editingId, newData);
      toast({
        title: "Actualizado",
        description: "Registro de ingresos actualizado correctamente.",
      });
    } else {
      addRevenueData(newData);
      toast({
        title: "Agregado",
        description: "Nuevo registro de ingresos agregado correctamente.",
      });
    }

    setFormData({ month: "", ingresos: "", meta: "", cliente: "", categoria: "" });
    setEditingId(null);
  };

  const handleEdit = (data: RevenueData) => {
    setFormData({
      month: data.month,
      ingresos: data.ingresos.toString(),
      meta: data.meta.toString(),
      cliente: data.cliente || "",
      categoria: data.categoria || ""
    });
    setEditingId(data.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este registro?")) {
      deleteRevenueData(id);
      toast({
        title: "Eliminado",
        description: "Registro eliminado correctamente.",
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
        const headers = lines[0].split(',').map(h => h.trim());
        
        const newData: RevenueData[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim());
            newData.push({
              id: Date.now().toString() + i,
              month: values[0] || "",
              ingresos: Number(values[1]) || 0,
              meta: Number(values[2]) || 0,
              cliente: values[3] || "",
              categoria: values[4] || ""
            });
          }
        }
        
        setRevenueData([...revenueData, ...newData]);
        toast({
          title: "Importado",
          description: `${newData.length} registros importados correctamente.`,
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

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{editingId ? "Editar" : "Agregar"} Registro de Ingresos</span>
            <Button asChild variant="outline" size="sm">
              <label htmlFor="csv-revenue">
                <Upload className="h-4 w-4 mr-2" />
                Importar CSV
                <input
                  id="csv-revenue"
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
              <Label htmlFor="meta">Meta *</Label>
              <Input
                id="meta"
                type="number"
                value={formData.meta}
                onChange={(e) => setFormData({ ...formData, meta: e.target.value })}
                placeholder="0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                value={formData.cliente}
                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                placeholder="Nombre del cliente"
              />
            </div>
            
            <div>
              <Label htmlFor="categoria">Categoría</Label>
              <Input
                id="categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                placeholder="Categoría"
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
                    setFormData({ month: "", ingresos: "", meta: "", cliente: "", categoria: "" });
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
          <CardTitle>Datos de Ingresos ({revenueData.length} registros)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mes</TableHead>
                  <TableHead>Ingresos</TableHead>
                  <TableHead>Meta</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Cumplimiento</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.month}</TableCell>
                    <TableCell>${item.ingresos.toLocaleString()}</TableCell>
                    <TableCell>${item.meta.toLocaleString()}</TableCell>
                    <TableCell>{item.cliente || "-"}</TableCell>
                    <TableCell>{item.categoria || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={item.ingresos >= item.meta ? "default" : "destructive"}>
                        {((item.ingresos / item.meta) * 100).toFixed(1)}%
                      </Badge>
                    </TableCell>
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
                {revenueData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                      No hay datos de ingresos. Agregue algunos registros para comenzar.
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

export default RevenueDataLoader;
