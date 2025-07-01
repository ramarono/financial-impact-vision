
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Target, Calendar, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectionsSection = () => {
  const projectionData = [
    {
      month: "Abril",
      estimatedRevenue: "$520,000",
      estimatedCosts: "$195,000",
      projectedProfit: "$325,000",
      probability: "85%"
    },
    {
      month: "Mayo",
      estimatedRevenue: "$575,000",
      estimatedCosts: "$210,000",
      projectedProfit: "$365,000",
      probability: "78%"
    },
    {
      month: "Junio",
      estimatedRevenue: "$640,000",
      estimatedCosts: "$225,000",
      projectedProfit: "$415,000",
      probability: "72%"
    }
  ];

  const annualGoals = [
    {
      metric: "Ingresos Anuales",
      target: "$7,200,000",
      current: "$1,455,600",
      progress: 20.2,
      status: "En progreso"
    },
    {
      metric: "Reducción de Costos",
      target: "15%",
      current: "8.5%",
      progress: 56.7,
      status: "Adelantado"
    },
    {
      metric: "Nuevos Clientes",
      target: "500",
      current: "127",
      progress: 25.4,
      status: "En progreso"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Proyecciones Financieras
          </h3>
          <p className="text-gray-600">
            Estimaciones y planificación para los próximos meses
          </p>
        </div>
      </div>

      <Tabs defaultValue="projections" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projections">Estimaciones Mensuales</TabsTrigger>
          <TabsTrigger value="goals">Objetivos Anuales</TabsTrigger>
        </TabsList>

        <TabsContent value="projections" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectionData.map((projection, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span>{projection.month} 2024</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{projection.probability}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Ingresos Est.</span>
                      <span className="font-semibold text-green-600">{projection.estimatedRevenue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Costos Est.</span>
                      <span className="font-semibold text-orange-600">{projection.estimatedCosts}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Utilidad Proyectada</span>
                        <span className="font-bold text-blue-600">{projection.projectedProfit}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <span>Consideraciones de Proyección</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Factores Positivos</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Temporada alta de ventas en Q2</li>
                    <li>• Lanzamiento de nuevos productos</li>
                    <li>• Expansión a nuevos mercados</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Riesgos Identificados</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Fluctuaciones del mercado</li>
                    <li>• Competencia creciente</li>
                    <li>• Variabilidad en costos de materiales</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="space-y-4">
            {annualGoals.map((goal, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{goal.metric}</h4>
                      <p className="text-sm text-gray-600">Objetivo: {goal.target}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{goal.current}</p>
                      <p className={cn(
                        "text-sm font-medium",
                        goal.status === "Adelantado" ? "text-green-600" : "text-blue-600"
                      )}>
                        {goal.status}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progreso</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          goal.progress > 50 ? "bg-green-500" : "bg-blue-500"
                        )}
                        style={{ width: `${Math.min(goal.progress, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Estrategia de Cumplimiento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Acciones Inmediatas</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Intensificar campañas de marketing digital</li>
                    <li>• Optimizar procesos de conversión</li>
                    <li>• Implementar programa de referidos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Iniciativas a Mediano Plazo</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Desarrollar alianzas estratégicas</li>
                    <li>• Automatizar procesos operativos</li>
                    <li>• Expandir equipo de ventas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectionsSection;
