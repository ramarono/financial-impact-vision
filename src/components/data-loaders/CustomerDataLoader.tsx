import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Upload } from "lucide-react";
import { useDataContext, CustomerData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import CSVInstructions from "./CSVInstructions";

const CustomerDataLoader = () => {
  const { customerData, addCustomerData, updateCustomerData, deleteCustomerData, setCustomerData } = useDataContext();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    ingresos: "",
    crecimiento: "",
    segmento: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.ingresos || !formData.crecimiento || !formData.segmento) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const newData: CustomerData = {
      id: editingId || Date.now().toString(),
      nombre: formData.nombre,
      ingresos: Number(formData.ingresos),
      crecimiento: Number(formData.crecimiento),
      segmento: formData.segmento
    };

    if (editingId) {
      updateCustomerData(editingId, newData);
      toast({
        title: "Actualizado",
        description: "Cliente actualizado correctamente.",
      });
    } else {
      addCustomerData(newData);
      toast({
        title: "Agregado",
        description: "Nuevo cliente agregado correctamente.",
      });
    }

    setFormData({ nombre: "", ingresos: "", crecimiento: "", segmento: "" });
    setEditingId(null);
  };

  const handleEdit = (data: CustomerData) => {
    setFormData({
      nombre: data.nombre,
      ingresos: data.ingresos.toString(),
      crecimiento: data.crecimiento.toString(),
      segmento: data.segmento
    });
    setEditingId(data.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este cliente?")) {
      deleteCustomerData(id);
      toast({
        title: "Eliminado",
        description: "Cliente eliminado correctamente.",
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
        
        const newData: CustomerData[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim());
            newData.push({
              id: Date.now().toString() + i,
              nombre: values[0] || "",
              ingresos: Number(values[1]) || 0,
              crecimiento: Number(values[2]) || 0,
              segmento: values[3] || ""
            });
          }
        }
        
        setCustomerData([...customerData, ...newData]);
        toast({
          title: "Importado",
          description: `${newData.length} clientes importados correctamente.`,
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

  const getGrowthBadge = (crecimiento: number) => {
    if (crecimiento > 10) return <Badge className="bg-green-100 text-green-800">Alto</Badge>;
    if (crecimiento > 0) return <Badge className="bg-yellow-100 text-yellow-800">Moderado</Badge>;
    return <Badge variant="destructive">Negativo</Badge>;
  };

  const getSegmentBadge = (segmento: string) => {
    const colors = {
      'Premium': 'bg-purple-100 text-purple-800',
      'Enterprise': 'bg-blue-100 text-blue-800',
      'SMB': 'bg-green-100 text-green-800',
      'Starter': 'bg-gray-100 text-gray-800'
    };
    return <Badge className={colors[segmento as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{segmento}</Badge>;
  };

  return (
    <div className="space-y-6">
      <CSVInstructions section="clientes" />
      
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{editingId ? "Editar" : "Agregar"} Cliente</span>
            <Button asChild variant="outline" size="sm">
              <label htmlFor="csv-customers">
                <Upload className="h-4 w-4 mr-2" />
                Importar CSV
                <input
                  id="csv-customers"
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
              <li>• Análisis: Tablas de ingresos por cliente</li>
              <li>• Dashboard: Conteo total de clientes activos</li>
              <li>• Segmentación: Análisis por tipo de cliente</li>
              <li>• Cálculos de crecimiento y rentabilidad por cliente</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre del Cliente *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: Empresa ABC"
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
              <Label htmlFor="crecimiento">Crecimiento (%) *</Label>
              <Input
                id="crecimiento"
                type="number"
                step="0.1"
                value={formData.crecimiento}
                onChange={(e) => setFormData({ ...formData, crecimiento: e.target.value })}
                placeholder="0.0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="segmento">Segmento *</Label>
              <Input
                id="segmento"
                value={formData.segmento}
                onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                placeholder="Ej: Premium, Enterprise"
                required
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
                    setFormData({ nombre: "", ingresos: "", crecimiento: "", segmento: "" });
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
          <CardTitle>Clientes Registrados ({customerData.length} registros)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Ingresos</TableHead>
                  <TableHead>Crecimiento</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.nombre}</TableCell>
                    <TableCell>${item.ingresos.toLocaleString()}</TableCell>
                    <TableCell>{item.crecimiento > 0 ? '+' : ''}{item.crecimiento}%</TableCell>
                    <TableCell>{getSegmentBadge(item.segmento)}</TableCell>
                    <TableCell>{getGrowthBadge(item.crecimiento)}</TableCell>
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
                {customerData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                      No hay clientes registrados. Agregue algunos para comenzar.
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

export default CustomerDataLoader;
