
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit, Plus, Upload } from "lucide-react";
import { useDataContext, CostData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";

const CostDataLoader = () => {
  const { costData, addCostData, updateCostData, deleteCostData, setCostData } = useDataContext();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    month: "",
    nomina: "",
    materiales: "",
    servicios: "",
    marketing: "",
    categoria: "",
    descripcion: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.month || !formData.nomina || !formData.materiales || !formData.servicios || !formData.marketing) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const newData: CostData = {
      id: editingId || Date.now().toString(),
      month: formData.month,
      nomina: Number(formData.nomina),
      materiales: Number(formData.materiales),
      servicios: Number(formData.servicios),
      marketing: Number(formData.marketing),
      categoria: formData.categoria,
      descripcion: formData.descripcion
    };

    if (editingId) {
      updateCostData(editingId, newData);
      toast({
        title: "Actualizado",
        description: "Registro de costos actualizado correctamente.",
      });
    } else {
      addCostData(newData);
      toast({
        title: "Agregado",
        description: "Nuevo registro de costos agregado correctamente.",
      });
    }

    setFormData({ month: "", nomina: "", materiales: "", servicios: "", marketing: "", categoria: "", descripcion: "" });
    setEditingId(null);
  };

  const handleEdit = (data: CostData) => {
    setFormData({
      month: data.month,
      nomina: data.nomina.toString(),
      materiales: data.materiales.toString(),
      servicios: data.servicios.toString(),
      marketing: data.marketing.toString(),
      categoria: data.categoria || "",
      descripcion: data.descripcion || ""
    });
    setEditingId(data.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este registro?")) {
      deleteCostData(id);
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
        
        const newData: CostData[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim());
            newData.push({
              id: Date.now().toString() + i,
              month: values[0] || "",
              nomina: Number(values[1]) || 0,
              materiales: Number(values[2]) || 0,
              servicios: Number(values[3]) || 0,
              marketing: Number(values[4]) || 0,
              categoria: values[5] || "",
              descripcion: values[6] || ""
            });
          }
        }
        
        setCostData([...costData, ...newData]);
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

  const getTotalCost = (item: CostData) => {
    return item.nomina + item.materiales + item.servicios + item.marketing;
  };

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{editingId ? "Editar" : "Agregar"} Registro de Costos</span>
            <Button asChild variant="outline" size="sm">
              <label htmlFor="csv-costs">
                <Upload className="h-4 w-4 mr-2" />
                Importar CSV
                <input
                  id="csv-costs"
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <Label htmlFor="nomina">Nómina *</Label>
                <Input
                  id="nomina"
                  type="number"
                  value={formData.nomina}
                  onChange={(e) => setFormData({ ...formData, nomina: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="materiales">Materiales *</Label>
                <Input
                  id="materiales"
                  type="number"
                  value={formData.materiales}
                  onChange={(e) => setFormData({ ...formData, materiales: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="servicios">Servicios *</Label>
                <Input
                  id="servicios"
                  type="number"
                  value={formData.servicios}
                  onChange={(e) => setFormData({ ...formData, servicios: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="marketing">Marketing *</Label>
                <Input
                  id="marketing"
                  type="number"
                  value={formData.marketing}
                  onChange={(e) => setFormData({ ...formData, marketing: e.target.value })}
                  placeholder="0"
                  required
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
            </div>
            
            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Input
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Descripción adicional"
              />
            </div>
            
            <div className="flex space-x-2">
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
                    setFormData({ month: "", nomina: "", materiales: "", servicios: "", marketing: "", categoria: "", descripcion: "" });
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
          <CardTitle>Datos de Costos ({costData.length} registros)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mes</TableHead>
                  <TableHead>Nómina</TableHead>
                  <TableHead>Materiales</TableHead>
                  <TableHead>Servicios</TableHead>
                  <TableHead>Marketing</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.month}</TableCell>
                    <TableCell>${item.nomina.toLocaleString()}</TableCell>
                    <TableCell>${item.materiales.toLocaleString()}</TableCell>
                    <TableCell>${item.servicios.toLocaleString()}</TableCell>
                    <TableCell>${item.marketing.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">${getTotalCost(item).toLocaleString()}</TableCell>
                    <TableCell>{item.categoria || "-"}</TableCell>
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
                {costData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                      No hay datos de costos. Agregue algunos registros para comenzar.
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

export default CostDataLoader;
