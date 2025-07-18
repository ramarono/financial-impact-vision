
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

  const handleLoadSampleData = () => {
    const sampleCostData = [
      { id: Date.now().toString(), month: 'Dic 2024', nomina: 245000, materiales: 102000, servicios: 68000, marketing: 65000 },
      { id: (Date.now() + 1).toString(), month: 'Dic 2024', nomina: 238000, materiales: 95000, servicios: 72000, marketing: 58000 }
    ];
    
    sampleCostData.forEach(data => addCostData(data));
  };

  const handleImportCSV = (file: File) => {
    console.log('Importing costs CSV:', file.name);
  };

  const handleManualEntry = (data: any) => {
    const newCostData = {
      id: Date.now().toString(),
      ...data
    };
    addCostData(newCostData);
  };

  const csvTemplate = `mes,nomina,materiales,servicios,marketing,categoria,descripcion
Dic 2024,240000,95000,65000,60000,Operacional,Costos operacionales del mes`;

  const manualFields = [
    { name: 'month', label: 'Mes', type: 'text' as const, required: true },
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
              onLoadSampleData={handleLoadSampleData}
              onImportCSV={handleImportCSV}
              onManualEntry={handleManualEntry}
              sampleDataCount={4}
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
