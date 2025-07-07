
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDataContext } from "@/contexts/DataContext";
import { BarChart3, TrendingUp, Users, DollarSign, Download } from "lucide-react";

const DashboardDataLoader = () => {
  const { revenueData, costData, kpiData, customerData, exportAllData } = useDataContext();

  const getTotalRevenue = () => {
    return revenueData.reduce((sum, item) => sum + item.ingresos, 0);
  };

  const getTotalCosts = () => {
    return costData.reduce((sum, item) => sum + item.nomina + item.materiales + item.servicios + item.marketing, 0);
  };

  const getAverageKPIPerformance = () => {
    if (kpiData.length === 0) return 0;
    const totalPerformance = kpiData.reduce((sum, item) => sum + (item.valor / item.meta) * 100, 0);
    return totalPerformance / kpiData.length;
  };

  const exportDataBySection = (section: string) => {
    let data: any = {};
    let filename = '';
    
    switch (section) {
      case 'revenue':
        data = { revenue: revenueData };
        filename = 'ingresos-data.json';
        break;
      case 'costs':
        data = { costs: costData };
        filename = 'costos-data.json';
        break;
      case 'kpis':
        data = { kpis: kpiData };
        filename = 'kpis-data.json';
        break;
      case 'customers':
        data = { customers: customerData };
        filename = 'clientes-data.json';
        break;
    }
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

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
                <p className="text-blue-600 text-sm font-medium">KPIs Promedio</p>
                <p className="text-2xl font-bold text-blue-800">
                  {getAverageKPIPerformance().toFixed(1)}%
                </p>
                <p className="text-blue-600 text-xs">
                  {kpiData.length} KPIs
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
                <p className="text-purple-600 text-sm font-medium">Total Clientes</p>
                <p className="text-2xl font-bold text-purple-800">
                  {customerData.length}
                </p>
                <p className="text-purple-600 text-xs">
                  Clientes activos
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Datos por Sección</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-green-800">Datos de Ingresos</h3>
                <p className="text-green-600 text-sm">
                  {revenueData.length} registros • Total: ${getTotalRevenue().toLocaleString()}
                </p>
              </div>
              <Button 
                onClick={() => exportDataBySection('revenue')} 
                variant="outline" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-red-800">Datos de Costos</h3>
                <p className="text-red-600 text-sm">
                  {costData.length} registros • Total: ${getTotalCosts().toLocaleString()}
                </p>
              </div>
              <Button 
                onClick={() => exportDataBySection('costs')} 
                variant="outline" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-blue-800">Datos de KPIs</h3>
                <p className="text-blue-600 text-sm">
                  {kpiData.length} registros • Rendimiento promedio: {getAverageKPIPerformance().toFixed(1)}%
                </p>
              </div>
              <Button 
                onClick={() => exportDataBySection('kpis')} 
                variant="outline" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-purple-800">Datos de Clientes</h3>
                <p className="text-purple-600 text-sm">
                  {customerData.length} registros • Clientes registrados
                </p>
              </div>
              <Button 
                onClick={() => exportDataBySection('customers')} 
                variant="outline" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </Button>
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
