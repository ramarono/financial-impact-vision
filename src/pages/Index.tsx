
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import MetricCard from "@/components/MetricCard";
import RevenueChart from "@/components/RevenueChart";
import KPIChart from "@/components/KPIChart";
import ProjectionsSection from "@/components/ProjectionsSection";
import QuickDataLoader from "@/components/QuickDataLoader";
import { DollarSign, TrendingUp, TrendingDown, BarChart3, Users, Target } from "lucide-react";
import { useDataContext } from "@/contexts/DataContext";

const Index = () => {
  const { addRevenueData, addCostData, addDashboardMetrics } = useDataContext();

  const handleLoadSampleData = () => {
    // Load sample dashboard data
    const sampleData = [
      { id: Date.now().toString(), month: 'Dic 2024', ingresos: 890000, meta: 850000, cliente: 'Cliente Sample', categoria: 'Servicios' },
      { id: (Date.now() + 1).toString(), month: 'Dic 2024', nomina: 235000, materiales: 98000, servicios: 67000, marketing: 62000 }
    ];
    
    addRevenueData(sampleData[0]);
    addCostData(sampleData[1]);
  };

  const handleImportCSV = (file: File) => {
    // Basic CSV processing (in real app, parse and validate)
    console.log('Importing CSV file:', file.name);
  };

  const handleManualEntry = (data: any) => {
    // Process manual entry data
    console.log('Adding manual data:', data);
  };

  const csvTemplate = `mes,ingresos,meta,cliente,categoria
Dic 2024,850000,800000,Cliente Ejemplo,Servicios`;

  const manualFields = [
    { name: 'month', label: 'Mes', type: 'text' as const, required: true },
    { name: 'ingresos', label: 'Ingresos', type: 'number' as const, required: true },
    { name: 'meta', label: 'Meta', type: 'number' as const, required: true },
    { name: 'cliente', label: 'Cliente', type: 'text' as const },
    { name: 'categoria', label: 'Categoría', type: 'select' as const, options: ['Servicios', 'Tecnología', 'Manufactura'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-8 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Financiero
            </h2>
            <p className="text-gray-600">
              Resumen ejecutivo de tu rendimiento financiero en tiempo real
            </p>
          </div>

          {/* Quick Data Loader */}
          <div className="mb-8 animate-slide-up">
            <QuickDataLoader
              title="Datos del Dashboard"
              description="Gestiona los datos principales del dashboard de forma rápida y eficiente"
              onLoadSampleData={handleLoadSampleData}
              onImportCSV={handleImportCSV}
              onManualEntry={handleManualEntry}
              sampleDataCount={3}
              csvTemplate={csvTemplate}
              manualEntryFields={manualFields}
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="gradient-success rounded-xl">
              <MetricCard
                title="Ingresos Totales"
                value="$485,200"
                change="+12.5%"
                changeType="positive"
                icon={DollarSign}
                description="vs mes anterior"
                gradient
              />
            </div>
            
            <div className="gradient-warning rounded-xl">
              <MetricCard
                title="Costos Operativos"
                value="$187,500"
                change="-3.2%"
                changeType="positive"
                icon={TrendingDown}
                description="reducción mensual"
                gradient
              />
            </div>
            
            <div className="gradient-info rounded-xl">
              <MetricCard
                title="Utilidad Neta"
                value="$297,700"
                change="+18.7%"
                changeType="positive"
                icon={TrendingUp}
                description="crecimiento mensual"
                gradient
              />
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Margen de Ganancia"
              value="61.3%"
              change="+2.1%"
              changeType="positive"
              icon={BarChart3}
              description="vs trimestre anterior"
            />
            
            <MetricCard
              title="Clientes Activos"
              value="1,247"
              change="+8.9%"
              changeType="positive"
              icon={Users}
              description="crecimiento mensual"
            />
            
            <MetricCard
              title="ROI Promedio"
              value="24.8%"
              change="+1.3%"
              changeType="positive"
              icon={Target}
              description="retorno de inversión"
            />
          </div>

          {/* Projections Section */}
          <div className="mb-8 animate-slide-up">
            <ProjectionsSection />
          </div>

          {/* Charts Section */}
          <div className="space-y-8">
            <div className="animate-slide-up">
              <RevenueChart />
            </div>
            
            <div className="animate-slide-up">
              <KPIChart />
            </div>
          </div>

          {/* Financial Summary */}
          <div className="mt-8 bg-white/50 backdrop-blur-sm border-0 shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Resumen Ejecutivo
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Fortalezas</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Crecimiento constante en ingresos (+12.5%)</li>
                  <li>• Reducción efectiva de costos operativos</li>
                  <li>• Margen de ganancia superior al promedio del sector</li>
                  <li>• ROI por encima de las expectativas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Oportunidades</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Optimizar distribución de costos de marketing</li>
                  <li>• Incrementar retención de clientes activos</li>
                  <li>• Explorar nuevos canales de ingresos</li>
                  <li>• Automatizar procesos operativos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
