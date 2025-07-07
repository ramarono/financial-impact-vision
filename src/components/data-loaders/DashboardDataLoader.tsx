
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataContext, DashboardMetrics, HistoricalData } from "@/contexts/DataContext";
import { BarChart3, TrendingUp, Users, DollarSign, Download, Plus, Upload, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CSVInstructions from "./CSVInstructions";

const DashboardDataLoader = () => {
  const { 
    revenueData, costData, kpiData, customerData, 
    dashboardMetrics, setDashboardMetrics, addDashboardMetrics, updateDashboardMetrics, deleteDashboardMetrics,
    historicalData, setHistoricalData, addHistoricalData, updateHistoricalData, deleteHistoricalData,
    getTotalRevenue, getTotalCosts, getMarginBruto, getCrecimientoMensual, getIngresosVsMesAnterior,
    exportAllData 
  } = useDataContext();
  
  const { toast } = useToast();
  const [editingMetricsId, setEditingMetricsId] = useState<string | null>(null);
  const [editingHistoricalId, setEditingHistoricalId] = useState<string | null>(null);
  
  const [metricsForm, setMetricsForm] = useState({
    month: "",
    totalIngresos: "",
    totalCostos: "",
    margenBruto: "",
    crecimientoMensual: ""
  });

  const [historicalForm, setHistoricalForm] = useState({
    month: "",
    ingresos: "",
    costos: "",
    margen: ""
  });

  const handleMetricsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!metricsForm.month || !metricsForm.totalIngresos || !metricsForm.totalCostos) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const newData: DashboardMetrics = {
      id: editingMetricsId || Date.now().toString(),
      month: metricsForm.month,
      totalIngresos: Number(metricsForm.totalIngresos),
      totalCostos: Number(metricsForm.totalCostos),
      margenBruto: Number(metricsForm.margenBruto) || (Number(metricsForm.totalIngresos) - Number(metricsForm.totalCostos)),
      crecimientoMensual: Number(metricsForm.crecimientoMensual) || 0
    };

    if (editingMetricsId) {
      updateDashboardMetrics(editingMetricsId, newData);
      toast({ title: "Actualizado", description: "Métricas actualizadas correctamente." });
    } else {
      addDashboardMetrics(newData);
      toast({ title: "Agregado", description: "Nuevas métricas agregadas correctamente." });
    }

    setMetricsForm({ month: "", totalIngresos: "", totalCostos: "", margenBruto: "", crecimientoMensual: "" });
    setEditingMetricsId(null);
  };

  const handleHistoricalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!historicalForm.month || !historicalForm.ingresos || !historicalForm.costos) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const newData: HistoricalData = {
      id: editingHistoricalId || Date.now().toString(),
      month: historicalForm.month,
      ingresos: Number(historicalForm.ingresos),
      costos: Number(historicalForm.costos),
      margen: Number(historicalForm.margen) || (Number(historicalForm.ingresos) - Number(historicalForm.costos))
    };

    if (editingHistoricalId) {
      updateHistoricalData(editingHistoricalId, newData);
      toast({ title: "Actualizado", description: "Datos históricos actualizados correctamente." });
    } else {
      addHistoricalData(newData);
      toast({ title: "Agregado", description: "Nuevos datos históricos agregados correctamente." });
    }

    setHistoricalForm({ month: "", ingresos: "", costos: "", margen: "" });
    setEditingHistoricalId(null);
  };

  const handleMetricsCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        
        const newData: DashboardMetrics[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim()) {
            const values = lines[i].split(',').map(v => v.trim());
            newData.push({
              id: Date.now().toString() + i,
              month: values[0] || "",
              totalIngresos: Number(values[1]) || 0,
              totalCostos: Number(values[2]) || 0,
              margenBruto: Number(values[3]) || 0,
              crecimientoMensual: Number(values[4]) || 0
            });
          }
        }
        
        setDashboardMetrics([...dashboardMetrics, ...newData]);
        toast({
          title: "Importado",
          description: `${newData.length} métricas importadas correctamente.`,
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

  const handleHistoricalCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            newData.push({
              id: Date.now().toString() + i,
              month: values[0] || "",
              ingresos: Number(values[1]) || 0,
              costos: Number(values[2]) || 0,
              margen: Number(values[3]) || 0
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

  const ingresosVsMesAnterior = getIngresosVsMesAnterior();

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Ingresos</p>
                <p className="text-2xl font-bold text-green-800">
                  ${getTotalRevenue().toLocaleString()}
                </p>
                <p className="text-green-600 text-xs">
                  {revenueData.length} registros
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Total Costos</p>
                <p className="text-2xl font-bold text-red-800">
                  ${getTotalCosts().toLocaleString()}
                </p>
                <p className="text-red-600 text-xs">
                  {costData.length} registros
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Margen Bruto</p>
                <p className="text-2xl font-bold text-blue-800">
                  ${getMarginBruto().toLocaleString()}
                </p>
                <p className="text-blue-600 text-xs">
                  Ingresos - Costos
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Crecimiento Mensual</p>
                <p className="text-2xl font-bold text-purple-800">
                  {getCrecimientoMensual().toFixed(1)}%
                </p>
                <p className="text-purple-600 text-xs">
                  vs mes anterior
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Loading Forms */}
      <Tabs defaultValue="metricas" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="metricas">Métricas Dashboard</TabsTrigger>
          <TabsTrigger value="historicos">Datos Históricos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metricas" className="space-y-6">
          <CSVInstructions section="dashboard" />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{editingMetricsId ? "Editar" : "Agregar"} Métricas Dashboard</span>
                <Button asChild variant="outline" size="sm">
                  <label htmlFor="csv-metrics">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar CSV
                    <input
                      id="csv-metrics"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleMetricsCSVImport}
                    />
                  </label>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMetricsSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="month">Mes *</Label>
                  <Input
                    id="month"
                    value={metricsForm.month}
                    onChange={(e) => setMetricsForm({ ...metricsForm, month: e.target.value })}
                    placeholder="Ej: Nov 2024"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="totalIngresos">Total Ingresos *</Label>
                  <Input
                    id="totalIngresos"
                    type="number"
                    value={metricsForm.totalIngresos}
                    onChange={(e) => setMetricsForm({ ...metricsForm, totalIngresos: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="totalCostos">Total Costos *</Label>
                  <Input
                    id="totalCostos"
                    type="number"
                    value={metricsForm.totalCostos}
                    onChange={(e) => setMetricsForm({ ...metricsForm, totalCostos: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="margenBruto">Margen Bruto</Label>
                  <Input
                    id="margenBruto"
                    type="number"
                    value={metricsForm.margenBruto}
                    onChange={(e) => setMetricsForm({ ...metricsForm, margenBruto: e.target.value })}
                    placeholder="Se calcula automáticamente"
                  />
                </div>
                
                <div>
                  <Label htmlFor="crecimientoMensual">Crecimiento Mensual (%)</Label>
                  <Input
                    id="crecimientoMensual"
                    type="number"
                    step="0.1"
                    value={metricsForm.crecimientoMensual}
                    onChange={(e) => setMetricsForm({ ...metricsForm, crecimientoMensual: e.target.value })}
                    placeholder="0.0"
                  />
                </div>
                
                <div className="lg:col-span-5 flex space-x-2">
                  <Button type="submit" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>{editingMetricsId ? "Actualizar" : "Agregar"}</span>
                  </Button>
                  {editingMetricsId && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setEditingMetricsId(null);
                        setMetricsForm({ month: "", totalIngresos: "", totalCostos: "", margenBruto: "", crecimientoMensual: "" });
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas Dashboard ({dashboardMetrics.length} registros)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mes</TableHead>
                      <TableHead>Total Ingresos</TableHead>
                      <TableHead>Total Costos</TableHead>
                      <TableHead>Margen Bruto</TableHead>
                      <TableHead>Crecimiento %</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dashboardMetrics.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.month}</TableCell>
                        <TableCell>${item.totalIngresos.toLocaleString()}</TableCell>
                        <TableCell>${item.totalCostos.toLocaleString()}</TableCell>
                        <TableCell>${item.margenBruto.toLocaleString()}</TableCell>
                        <TableCell>{item.crecimientoMensual.toFixed(1)}%</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => {
                              setMetricsForm({
                                month: item.month,
                                totalIngresos: item.totalIngresos.toString(),
                                totalCostos: item.totalCostos.toString(),
                                margenBruto: item.margenBruto.toString(),
                                crecimientoMensual: item.crecimientoMensual.toString()
                              });
                              setEditingMetricsId(item.id);
                            }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => {
                              if (window.confirm("¿Está seguro de que desea eliminar este registro?")) {
                                deleteDashboardMetrics(item.id);
                                toast({ title: "Eliminado", description: "Registro eliminado correctamente." });
                              }
                            }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historicos" className="space-y-6">
          <CSVInstructions section="historicos" />
          
          {/* Historical Data Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{editingHistoricalId ? "Editar" : "Agregar"} Datos Históricos</span>
                <Button asChild variant="outline" size="sm">
                  <label htmlFor="csv-historical">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar CSV
                    <input
                      id="csv-historical"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleHistoricalCSVImport}
                    />
                  </label>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleHistoricalSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="historical-month">Mes *</Label>
                  <Input
                    id="historical-month"
                    value={historicalForm.month}
                    onChange={(e) => setHistoricalForm({ ...historicalForm, month: e.target.value })}
                    placeholder="Ej: Oct 2024"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="historical-ingresos">Ingresos *</Label>
                  <Input
                    id="historical-ingresos"
                    type="number"
                    value={historicalForm.ingresos}
                    onChange={(e) => setHistoricalForm({ ...historicalForm, ingresos: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="historical-costos">Costos *</Label>
                  <Input
                    id="historical-costos"
                    type="number"
                    value={historicalForm.costos}
                    onChange={(e) => setHistoricalForm({ ...historicalForm, costos: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="historical-margen">Margen</Label>
                  <Input
                    id="historical-margen"
                    type="number"
                    value={historicalForm.margen}
                    onChange={(e) => setHistoricalForm({ ...historicalForm, margen: e.target.value })}
                    placeholder="Se calcula automáticamente"
                  />
                </div>
                
                <div className="lg:col-span-4 flex space-x-2">
                  <Button type="submit" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>{editingHistoricalId ? "Actualizar" : "Agregar"}</span>
                  </Button>
                  {editingHistoricalId && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setEditingHistoricalId(null);
                        setHistoricalForm({ month: "", ingresos: "", costos: "", margen: "" });
                      }}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Historical Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Datos Históricos ({historicalData.length} registros)</CardTitle>
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
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historicalData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.month}</TableCell>
                        <TableCell>${item.ingresos.toLocaleString()}</TableCell>
                        <TableCell>${item.costos.toLocaleString()}</TableCell>
                        <TableCell>${item.margen.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => {
                              setHistoricalForm({
                                month: item.month,
                                ingresos: item.ingresos.toString(),
                                costos: item.costos.toString(),
                                margen: item.margen.toString()
                              });
                              setEditingHistoricalId(item.id);
                            }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => {
                              if (window.confirm("¿Está seguro de que desea eliminar este registro?")) {
                                deleteHistoricalData(item.id);
                                toast({ title: "Eliminado", description: "Registro eliminado correctamente." });
                              }
                            }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Current Calculations Display */}
      <Card>
        <CardHeader>
          <CardTitle>Cálculos Actuales (basados en datos cargados)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">Ingresos vs Mes Anterior</h4>
              <p className="text-lg font-bold text-blue-600">
                Actual: ${ingresosVsMesAnterior.actual.toLocaleString()}
              </p>
              <p className="text-sm text-blue-600">
                Anterior: ${ingresosVsMesAnterior.anterior.toLocaleString()}
              </p>
              <p className="text-sm text-blue-600">
                Cambio: {ingresosVsMesAnterior.cambio > 0 ? '+' : ''}{ingresosVsMesAnterior.cambio.toFixed(1)}%
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">Total Ingresos</h4>
              <p className="text-2xl font-bold text-green-600">${getTotalRevenue().toLocaleString()}</p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800">Total Costos</h4>
              <p className="text-2xl font-bold text-red-600">${getTotalCosts().toLocaleString()}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">Margen Bruto</h4>
              <p className="text-2xl font-bold text-purple-600">${getMarginBruto().toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={exportAllData} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exportar Todos los Datos</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardDataLoader;
