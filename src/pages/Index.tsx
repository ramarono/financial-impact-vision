
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
  const { 
    addRevenueData, 
    addCostData, 
    addDashboardMetrics,
    getTotalRevenue,
    getTotalCosts,
    getMarginBruto,
    getCrecimientoMensual
  } = useDataContext();

  const handleImportCSV = (data: any[]) => {
    // Process each row and add to appropriate data stores
    data.forEach(row => {
      if (row.ingresos && row.mes && row.año) {
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                           'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const monthName = monthNames[row.mes - 1] || 'Ene';
        
        addRevenueData({
          id: row.id || Date.now().toString(),
          month: `${monthName} ${row.año}`,
          ingresos: row.ingresos,
          meta: row.meta || row.ingresos * 0.9,
          cliente: row.cliente || 'Cliente Importado',
          categoria: row.categoria || 'General'
        });
      }

      if (row.nomina || row.materiales || row.servicios || row.marketing) {
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                           'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const monthName = monthNames[(row.mes || 1) - 1] || 'Ene';
        
        addCostData({
          id: row.id || Date.now().toString(),
          month: `${monthName} ${row.año || new Date().getFullYear()}`,
          nomina: row.nomina || 0,
          materiales: row.materiales || 0,
          servicios: row.servicios || 0,
          marketing: row.marketing || 0,
          categoria: row.categoria,
          descripcion: row.descripcion
        });
      }
    });
  };

  const handleManualEntry = (data: any) => {
    if (data.tipo === 'ingresos') {
      addRevenueData({
        id: data.id,
        month: data.month,
        ingresos: data.ingresos,
        meta: data.meta,
        cliente: data.cliente,
        categoria: data.categoria
      });
    } else if (data.tipo === 'costos') {
      addCostData({
        id: data.id,
        month: data.month,
        nomina: data.nomina || 0,
        materiales: data.materiales || 0,
        servicios: data.servicios || 0,
        marketing: data.marketing || 0,
        categoria: data.categoria,
        descripcion: data.descripcion
      });
    }
  };

  const handleLoadToDashboard = () => {
    // Refresh dashboard metrics
    const newMetrics = {
      id: Date.now().toString(),
      totalIngresos: getTotalRevenue(),
      totalCostos: getTotalCosts(),
      margenBruto: getMarginBruto(),
      crecimientoMensual: getCrecimientoMensual(),
      month: new Date().toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
    };
    
    addDashboardMetrics(newMetrics);
  };

  const csvTemplate = `mes,año,ingresos,meta,cliente,categoria,nomina,materiales,servicios,marketing,descripcion
12,2024,850000,800000,Cliente Ejemplo,Servicios,220000,95000,65000,60000,Datos de ejemplo`;

  const manualFields = [
    { name: 'tipo', label: 'Tipo de Dato', type: 'select' as const, options: ['ingresos', 'costos'], required: true },
    { name: 'month', label: 'Mes', type: 'text' as const, required: true },
    { name: 'ingresos', label: 'Ingresos', type: 'number' as const },
    { name: 'meta', label: 'Meta', type: 'number' as const },
    { name: 'cliente', label: 'Cliente', type: 'text' as const },
    { name: 'nomina', label: 'Nómina', type: 'number' as const },
    { name: 'materiales', label: 'Materiales', type: 'number' as const },
    { name: 'servicios', label: 'Servicios', type: 'number' as const },
    { name: 'marketing', label: 'Marketing', type: 'number' as const },
    { name: 'categoria', label: 'Categoría', type: 'select' as const, options: ['Servicios', 'Tecnología', 'Manufactura', 'Operacional', 'Administrativo'] }
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
              onImportCSV={handleImportCSV}
              onManualEntry={handleManualEntry}
              onLoadToDashboard={handleLoadToDashboard}
              csvTemplate={csvTemplate}
              manualEntryFields={manualFields}
              expectedFields={['mes', 'año', 'ingresos', 'nomina', 'materiales', 'servicios', 'marketing']}
              autoUpdateOnLoad={true}
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="gradient-success rounded-xl">
              <MetricCard
                title="Ingresos Totales"
                value={`$${getTotalRevenue().toLocaleString()}`}
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
                value={`$${getTotalCosts().toLocaleString()}`}
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
                value={`$${getMarginBruto().toLocaleString()}`}
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
