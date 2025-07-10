import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Trash2, Upload, Plus } from "lucide-react";
import { useDataContext } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import CSVInstructions from "./CSVInstructions";

const PurchaseDataLoader = () => {
  const { purchaseData, addPurchaseData, updatePurchaseData, deletePurchaseData, setPurchaseData } = useDataContext();
  const { toast } = useToast();
  
  const [newPurchase, setNewPurchase] = useState({
    month: "",
    proveedor: "",
    categoria: "",
    monto: "",
    fechaVencimiento: "",
    estado: "",
    diasPago: ""
  });

  const handleAddPurchase = () => {
    if (!newPurchase.month || !newPurchase.proveedor || !newPurchase.monto) {
      toast({
        title: "Error",
        description: "Los campos mes, proveedor y monto son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const purchase = {
      id: Date.now().toString(),
      month: newPurchase.month,
      proveedor: newPurchase.proveedor,
      categoria: newPurchase.categoria || "Otros",
      monto: parseFloat(newPurchase.monto),
      fechaVencimiento: newPurchase.fechaVencimiento,
      estado: newPurchase.estado || "Pendiente",
      diasPago: parseInt(newPurchase.diasPago) || 30
    };

    addPurchaseData(purchase);
    setNewPurchase({
      month: "",
      proveedor: "",
      categoria: "",
      monto: "",
      fechaVencimiento: "",
      estado: "",
      diasPago: ""
    });

    toast({
      title: "Éxito",
      description: "Compra agregada correctamente.",
    });
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        const expectedHeaders = ['month', 'proveedor', 'categoria', 'monto', 'fechavencimiento', 'estado', 'diaspago'];
        const hasValidHeaders = expectedHeaders.some(header => 
          headers.includes(header) || headers.includes(header.replace(/([A-Z])/g, '_$1').toLowerCase())
        );

        if (!hasValidHeaders) {
          throw new Error('Formato de CSV inválido');
        }

        const newData = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim());
          return {
            id: `csv-${Date.now()}-${index}`,
            month: values[0] || '',
            proveedor: values[1] || '',
            categoria: values[2] || 'Otros',
            monto: parseFloat(values[3]) || 0,
            fechaVencimiento: values[4] || '',
            estado: values[5] || 'Pendiente',
            diasPago: parseInt(values[6]) || 30
          };
        }).filter(item => item.proveedor && item.monto > 0);

        setPurchaseData([...purchaseData, ...newData]);
        toast({
          title: "Éxito",
          description: `${newData.length} registros de compras importados correctamente.`,
        });

      } catch (error) {
        toast({
          title: "Error",
          description: "Error al procesar el archivo CSV. Verifique el formato.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const categoryOptions = ["Materiales", "Servicios", "Tecnología", "Mantenimiento", "Otros"];
  const statusOptions = ["Al día", "Pendiente", "Vencido"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Formato CSV para Compras</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">
            El archivo CSV debe incluir las siguientes columnas: month, proveedor, categoria, monto, fechaVencimiento, estado, diasPago
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de nueva compra */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Agregar Nueva Compra</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="month">Mes</Label>
                <Input
                  id="month"
                  placeholder="ej: Dic 2024"
                  value={newPurchase.month}
                  onChange={(e) => setNewPurchase({...newPurchase, month: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="proveedor">Proveedor</Label>
                <Input
                  id="proveedor"
                  placeholder="Nombre del proveedor"
                  value={newPurchase.proveedor}
                  onChange={(e) => setNewPurchase({...newPurchase, proveedor: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Select value={newPurchase.categoria} onValueChange={(value) => setNewPurchase({...newPurchase, categoria: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="monto">Monto</Label>
                <Input
                  id="monto"
                  type="number"
                  placeholder="0"
                  value={newPurchase.monto}
                  onChange={(e) => setNewPurchase({...newPurchase, monto: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="fechaVencimiento">Fecha Vencimiento</Label>
                <Input
                  id="fechaVencimiento"
                  type="date"
                  value={newPurchase.fechaVencimiento}
                  onChange={(e) => setNewPurchase({...newPurchase, fechaVencimiento: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select value={newPurchase.estado} onValueChange={(value) => setNewPurchase({...newPurchase, estado: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="diasPago">Días de Pago</Label>
                <Input
                  id="diasPago"
                  type="number"
                  placeholder="30"
                  value={newPurchase.diasPago}
                  onChange={(e) => setNewPurchase({...newPurchase, diasPago: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={handleAddPurchase} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Compra
            </Button>
          </CardContent>
        </Card>

        {/* Carga desde CSV */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Cargar desde CSV</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Suba un archivo CSV con datos de compras para importar múltiples registros a la vez.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <Button asChild variant="outline">
                  <label htmlFor="purchase-csv" className="cursor-pointer">
                    Seleccionar archivo CSV
                    <input
                      id="purchase-csv"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleCSVUpload}
                    />
                  </label>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de compras actuales */}
      <Card>
        <CardHeader>
          <CardTitle>Compras Registradas ({purchaseData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {purchaseData.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No hay datos de compras registrados. Agregue algunas compras usando el formulario anterior.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Mes</th>
                    <th className="text-left py-2">Proveedor</th>
                    <th className="text-left py-2">Categoría</th>
                    <th className="text-left py-2">Monto</th>
                    <th className="text-left py-2">Estado</th>
                    <th className="text-left py-2">Días Pago</th>
                    <th className="text-left py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseData.map((purchase) => (
                    <tr key={purchase.id} className="border-b hover:bg-gray-50">
                      <td className="py-2">{purchase.month}</td>
                      <td className="py-2 font-medium">{purchase.proveedor}</td>
                      <td className="py-2">
                        <Badge variant="secondary">{purchase.categoria}</Badge>
                      </td>
                      <td className="py-2">${purchase.monto.toLocaleString()}</td>
                      <td className="py-2">
                        <Badge variant={
                          purchase.estado === "Al día" ? "default" :
                          purchase.estado === "Pendiente" ? "secondary" : "destructive"
                        }>
                          {purchase.estado}
                        </Badge>
                      </td>
                      <td className="py-2">{purchase.diasPago} días</td>
                      <td className="py-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deletePurchaseData(purchase.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseDataLoader;