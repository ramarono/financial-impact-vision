
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HistoricalRevenueChart from "@/components/HistoricalRevenueChart";
import RevenueComparisonChart from "@/components/RevenueComparisonChart";
import RevenueProjectionsChart from "@/components/RevenueProjectionsChart";
import CustomerRevenueTable from "@/components/CustomerRevenueTable";
import AccountsReceivableKPIs from "@/components/AccountsReceivableKPIs";
import QuickDataLoader from "@/components/QuickDataLoader";
import { DollarSign } from "lucide-react";
import { useDataContext } from "@/contexts/DataContext";

const Ingresos = () => {
  const { addRevenueData, addCustomerData } = useDataContext();

  const handleImportCSV = (data: any[]) => {
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

        // Also add customer data if new
        if (row.cliente) {
          addCustomerData({
            id: `customer-${Date.now()}`,
            nombre: row.cliente,
            ingresos: row.ingresos,
            crecimiento: Math.random() * 30, // Placeholder
            segmento: row.categoria || 'General'
          });
        }
      }
    });
  };

  const handleManualEntry = (data: any) => {
    const newRevenueData = {
      id: Date.now().toString(),
      ...data
    };
    addRevenueData(newRevenueData);
  };

  const csvTemplate = `mes,año,ingresos,meta,cliente,categoria
12,2024,850000,800000,Cliente Ejemplo,Servicios
11,2024,720000,700000,Otro Cliente,Tecnología`;

  const manualFields = [
    { name: 'mes', label: 'Mes (1-12)', type: 'number' as const, required: true },
    { name: 'año', label: 'Año', type: 'number' as const, required: true },
    { name: 'ingresos', label: 'Ingresos', type: 'number' as const, required: true },
    { name: 'meta', label: 'Meta', type: 'number' as const, required: true },
    { name: 'cliente', label: 'Cliente', type: 'text' as const, required: true },
    { name: 'categoria', label: 'Categoría', type: 'select' as const, options: ['Servicios', 'Tecnología', 'Manufactura', 'Consultoría'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-8 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Gestión de Ingresos
                </h2>
                <p className="text-gray-600">
                  Análisis completo de ingresos históricos, comparaciones y proyecciones
                </p>
              </div>
            </div>
          </div>

          {/* Quick Data Loader */}
          <div className="mb-8 animate-slide-up">
            <QuickDataLoader
              title="Datos de Ingresos"
              description="Gestiona tus datos de ingresos por clientes, categorías y períodos"
              onImportCSV={handleImportCSV}
              onManualEntry={handleManualEntry}
              csvTemplate={csvTemplate}
              manualEntryFields={manualFields}
              expectedFields={['mes', 'año', 'ingresos', 'meta', 'cliente']}
              autoUpdateOnLoad={true}
            />
          </div>

          {/* Historical Revenue Chart */}
          <div className="mb-8 animate-slide-up">
            <HistoricalRevenueChart />
          </div>

          {/* Revenue Comparison Charts */}
          <div className="mb-8 animate-slide-up">
            <RevenueComparisonChart />
          </div>

          {/* Customer Revenue Table */}
          <div className="mb-8 animate-slide-up">
            <CustomerRevenueTable />
          </div>

          {/* Revenue Projections */}
          <div className="mb-8 animate-slide-up">
            <RevenueProjectionsChart />
          </div>

          {/* Accounts Receivable KPIs */}
          <div className="animate-slide-up">
            <AccountsReceivableKPIs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ingresos;
