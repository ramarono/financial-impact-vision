
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const PerformanceMetrics = () => {
  const kpiData = [
    {
      metric: "Rentabilidad sobre Ventas",
      current: 15.8,
      target: 18.0,
      benchmark: 12.5,
      status: "warning"
    },
    {
      metric: "Eficiencia de Cobros",
      current: 89.2,
      target: 85.0,
      benchmark: 78.0,
      status: "success"
    },
    {
      metric: "Control de Gastos",
      current: 92.1,
      target: 90.0,
      benchmark: 85.0,
      status: "success"
    },
    {
      metric: "Productividad por Empleado",
      current: 76.4,
      target: 80.0,
      benchmark: 70.0,
      status: "warning"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "danger": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "danger": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <Target className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Métricas de Rendimiento
          </h3>
          <p className="text-gray-600">
            Comparación con objetivos y benchmarks del sector
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>{kpi.metric}</span>
                <div className={cn("flex items-center space-x-1", getStatusColor(kpi.status))}>
                  {kpi.status === "success" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{kpi.current}%</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso vs Objetivo</span>
                  <span>{((kpi.current / kpi.target) * 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  value={(kpi.current / kpi.target) * 100} 
                  className="h-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div>
                  <p className="text-xs text-gray-500">Objetivo</p>
                  <p className="text-sm font-semibold text-blue-600">{kpi.target}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Benchmark Sector</p>
                  <p className="text-sm font-semibold text-gray-600">{kpi.benchmark}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Resumen de Rendimiento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">67%</div>
              <p className="text-gray-600">Métricas en Objetivo</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">+12.3%</div>
              <p className="text-gray-600">Mejora Promedio</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">8.7</div>
              <p className="text-gray-600">Score de Rendimiento</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
