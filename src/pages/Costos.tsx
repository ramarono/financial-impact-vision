
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HistoricalCostsChart from "@/components/HistoricalCostsChart";
import CostProjectionsChart from "@/components/CostProjectionsChart";
import MainCostsTable from "@/components/MainCostsTable";
import CostVariationsTable from "@/components/CostVariationsTable";
import QuickDataLoader from "@/components/QuickDataLoader";
import { TrendingDown } from "lucide-react";
import { useDataContext } from "@/contexts/DataContext";

const Costos = () => {
  const { addCostData } = useDataContext();

  const handleImportCSV = (data: any[]) => {
    data.forEach(row => {
      if ((row.nomina || row.materiales || row.servicios || row.marketing) && row.mes && row.año) {
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                           'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const monthName = monthNames[row.mes - 1] || 'Ene';
        
        addCostData({
          id: row.id || Date.now().toString(),
          month: `${monthName} ${row.año}`,
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
    const newCostData = {
      id: Date.now().toString(),
      ...data
    };
    addCostData(newCostData);
  };

  const csvTemplate = `mes,año,nomina,materiales,servicios,marketing,categoria,descripcion
12,2024,240000,95000,65000,60000,Operacional,Costos operacionales del mes
11,2024,235000,92000,62000,58000,Operacional,Costos operacionales del mes anterior`;

  const manualFields = [
    { name: 'mes', label: 'Mes (1-12)', type: 'number' as const, required: true },
    { name: 'año', label: 'Año', type: 'number' as const, required: true },
    { name: 'nomina', label: 'Nómina', type: 'number' as const, required: true },
    { name: 'materiales', label: 'Materiales', type: 'number' as const, required: true },
    { name: 'servicios', label: 'Servicios', type: 'number' as const, required: true },
    { name: 'marketing', label: 'Marketing', type: 'number' as const, required: true },
    { name: 'categoria', label: 'Categoría', type: 'select' as const, options: ['Operacional', 'Administrativo', 'Ventas', 'Desarrollo'] },
    { name: 'descripcion', label: 'Descripción', type: 'textarea' as const }
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
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Gestión de Costos
                </h2>
                <p className="text-gray-600">
                  Análisis completo de costos históricos, proyecciones y variaciones
                </p>
              </div>
            </div>
          </div>

          {/* Quick Data Loader */}
          <div className="mb-8 animate-slide-up">
            <QuickDataLoader
              title="Datos de Costos"
              description="Gestiona los costos por categorías: nómina, materiales, servicios y marketing"
              onImportCSV={handleImportCSV}
              onManualEntry={handleManualEntry}
              csvTemplate={csvTemplate}
              manualEntryFields={manualFields}
            />
          </div>

          {/* Historical Costs Chart */}
          <div className="mb-8 animate-slide-up">
            <HistoricalCostsChart />
          </div>

          {/* Cost Projections Chart */}
          <div className="mb-8 animate-slide-up">
            <CostProjectionsChart />
          </div>

          {/* Main Costs Table */}
          <div className="mb-8 animate-slide-up">
            <MainCostsTable />
          </div>

          {/* Cost Variations Table */}
          <div className="animate-slide-up">
            <CostVariationsTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Costos;
