
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HistoricalCostsChart from "@/components/HistoricalCostsChart";
import CostProjectionsChart from "@/components/CostProjectionsChart";
import MainCostsTable from "@/components/MainCostsTable";
import CostVariationsTable from "@/components/CostVariationsTable";
import { TrendingDown } from "lucide-react";

const Costos = () => {
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
