
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import MetricCard from "@/components/MetricCard";
import AnalysisCharts from "@/components/AnalysisCharts";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import TrendAnalysis from "@/components/TrendAnalysis";
import { PieChart, TrendingUp, BarChart3, Target, Activity, Zap } from "lucide-react";

const Analysis = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-8 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Análisis Financiero
            </h2>
            <p className="text-gray-600">
              Análisis profundo de tendencias, ratios y métricas de rendimiento
            </p>
          </div>

          {/* Key Analysis Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="gradient-info rounded-xl">
              <MetricCard
                title="Ratio de Liquidez"
                value="2.34"
                change="+0.15"
                changeType="positive"
                icon={Activity}
                description="capacidad de pago"
                gradient
              />
            </div>
            
            <div className="gradient-success rounded-xl">
              <MetricCard
                title="ROE"
                value="18.5%"
                change="+2.3%"
                changeType="positive"
                icon={Target}
                description="retorno sobre patrimonio"
                gradient
              />
            </div>
            
            <div className="gradient-warning rounded-xl">
              <MetricCard
                title="Eficiencia Operativa"
                value="87.2%"
                change="+4.1%"
                changeType="positive"
                icon={Zap}
                description="optimización de procesos"
                gradient
              />
            </div>
          </div>

          {/* Secondary Analysis Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Margen EBITDA"
              value="32.7%"
              change="+1.8%"
              changeType="positive"
              icon={BarChart3}
              description="vs trimestre anterior"
            />
            
            <MetricCard
              title="Rotación de Activos"
              value="1.42x"
              change="+0.08x"
              changeType="positive"
              icon={TrendingUp}
              description="eficiencia de activos"
            />
            
            <MetricCard
              title="Índice de Solvencia"
              value="0.35"
              change="-0.03"
              changeType="positive"
              icon={PieChart}
              description="deuda/patrimonio"
            />
          </div>

          {/* Performance Metrics Section */}
          <div className="mb-8 animate-slide-up">
            <PerformanceMetrics />
          </div>

          {/* Charts Section */}
          <div className="space-y-8">
            <div className="animate-slide-up">
              <AnalysisCharts />
            </div>
            
            <div className="animate-slide-up">
              <TrendAnalysis />
            </div>
          </div>

          {/* Analysis Summary */}
          <div className="mt-8 bg-white/50 backdrop-blur-sm border-0 shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Resumen de Análisis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Indicadores Positivos</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• ROE superior al promedio del sector (18.5%)</li>
                  <li>• Excelente ratio de liquidez (2.34)</li>
                  <li>• Mejora continua en eficiencia operativa</li>
                  <li>• Margen EBITDA saludable y creciente</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Áreas de Mejora</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Optimizar rotación de inventarios</li>
                  <li>• Reducir días de cobranza promedio</li>
                  <li>• Diversificar fuentes de ingresos</li>
                  <li>• Implementar más controles de costos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
