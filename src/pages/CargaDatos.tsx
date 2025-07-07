
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, Database, Trash2 } from "lucide-react";
import { useDataContext } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";
import RevenueDataLoader from "@/components/data-loaders/RevenueDataLoader";
import CostDataLoader from "@/components/data-loaders/CostDataLoader";
import KPIDataLoader from "@/components/data-loaders/KPIDataLoader";
import CustomerDataLoader from "@/components/data-loaders/CustomerDataLoader";
import DashboardDataLoader from "@/components/data-loaders/DashboardDataLoader";
import AnalysisDataLoader from "@/components/data-loaders/AnalysisDataLoader";

const CargaDatos = () => {
  const { exportAllData, importAllData, clearAllData } = useDataContext();
  const { toast } = useToast();

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        importAllData(data);
        toast({
          title: "Datos importados",
          description: "Los datos se han importado correctamente.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Error al importar los datos. Verifique el formato del archivo.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (window.confirm("¿Está seguro de que desea eliminar todos los datos? Esta acción no se puede deshacer.")) {
      clearAllData();
      toast({
        title: "Datos eliminados",
        description: "Todos los datos han sido eliminados.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-8 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Carga de Datos
                  </h2>
                  <p className="text-gray-600">
                    Gestione todos los datos del sistema desde un solo lugar
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={exportAllData} variant="outline" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Exportar</span>
                </Button>
                
                <Button asChild variant="outline" className="flex items-center space-x-2">
                  <label htmlFor="import-file">
                    <Upload className="h-4 w-4" />
                    <span>Importar</span>
                    <input
                      id="import-file"
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleImportData}
                    />
                  </label>
                </Button>
                
                <Button onClick={handleClearData} variant="destructive" className="flex items-center space-x-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Limpiar Todo</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Data Loading Tabs */}
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Gestión de Datos por Sección</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
                  <TabsTrigger value="costos">Costos</TabsTrigger>
                  <TabsTrigger value="kpis">KPIs</TabsTrigger>
                  <TabsTrigger value="clientes">Clientes</TabsTrigger>
                  <TabsTrigger value="analysis">Análisis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dashboard" className="mt-6">
                  <DashboardDataLoader />
                </TabsContent>
                
                <TabsContent value="ingresos" className="mt-6">
                  <RevenueDataLoader />
                </TabsContent>
                
                <TabsContent value="costos" className="mt-6">
                  <CostDataLoader />
                </TabsContent>
                
                <TabsContent value="kpis" className="mt-6">
                  <KPIDataLoader />
                </TabsContent>
                
                <TabsContent value="clientes" className="mt-6">
                  <CustomerDataLoader />
                </TabsContent>
                
                <TabsContent value="analysis" className="mt-6">
                  <AnalysisDataLoader />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CargaDatos;
