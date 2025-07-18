
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

  const handleLoadSampleData = () => {
    const sampleRevenueData = [
      { id: Date.now().toString(), month: 'Dic 2024', ingresos: 890000, meta: 850000, cliente: 'Tech Corp', categoria: 'Tecnología' },
      { id: (Date.now() + 1).toString(), month: 'Dic 2024', ingresos: 720000, meta: 700000, cliente: 'Service Plus', categoria: 'Servicios' }
    ];
    
    sampleRevenueData.forEach(data => addRevenueData(data));
  };

  const handleImportCSV = (file: File) => {
    console.log('Importing revenue CSV:', file.name);
  };

  const handleManualEntry = (data: any) => {
    const newRevenueData = {
      id: Date.now().toString(),
      ...data
    };
    addRevenueData(newRevenueData);
  };

  const csvTemplate = `mes,ingresos,meta,cliente,categoria
Dic 2024,850000,800000,Cliente Ejemplo,Servicios
Dic 2024,720000,700000,Otro Cliente,Tecnología`;

  const manualFields = [
    { name: 'month', label: 'Mes', type: 'text' as const, required: true },
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
              onLoadSampleData={handleLoadSampleData}
              onImportCSV={handleImportCSV}
              onManualEntry={handleManualEntry}
              sampleDataCount={5}
              csvTemplate={csvTemplate}
              manualEntryFields={manualFields}
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
