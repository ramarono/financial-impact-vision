
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Users, DollarSign, Zap } from "lucide-react";
import { useDataContext } from "@/contexts/DataContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar, Legend } from 'recharts';

const KPIs = () => {
  const { kpiData, getTotalRevenue, getTotalCosts, getMarginBruto } = useDataContext();

  // KPIs específicos para consultoría tecnológica
  const consultingKPIs = [
    {
      name: "Tasa de Utilización",
      value: 78,
      target: 85,
      unit: "%",
      description: "Porcentaje de horas facturables vs horas totales",
      category: "Productividad",
      trend: "up"
    },
    {
      name: "Satisfacción del Cliente",
      value: 4.2,
      target: 4.5,
      unit: "/5",
      description: "Puntuación promedio de satisfacción post-proyecto",
      category: "Calidad",
      trend: "up"
    },
    {
      name: "Tiempo Promedio de Proyecto",
      value: 12,
      target: 10,
      unit: "semanas",
      description: "Duración promedio de proyectos completados",
      category: "Eficiencia",
      trend: "down"
    },
    {
      name: "Margen por Consultor",
      value: 156000,
      target: 180000,
      unit: "$",
      description: "Ingresos netos generados por consultor senior",
      category: "Rentabilidad",
      trend: "up"
    },
    {
      name: "Tasa de Retención de Clientes",
      value: 89,
      target: 90,
      unit: "%",
      description: "Porcentaje de clientes que renuevan contratos",
      category: "Fidelización",
      trend: "stable"
    },
    {
      name: "Nuevos Clientes Adquiridos",
      value: 8,
      target: 12,
      unit: "clientes",
      description: "Número de nuevos clientes en el trimestre",
      category: "Crecimiento",
      trend: "down"
    }
  ];

  const getPerformanceColor = (value: number, target: number, unit: string) => {
    const isReversed = unit === "semanas"; // Para tiempo, menor es mejor
    const percentage = isReversed ? (target / value) * 100 : (value / target) * 100;
    
    if (percentage >= 100) return "text-green-600 bg-green-50";
    if (percentage >= 80) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Target className="h-4 w-4 text-blue-600" />;
    }
  };

  const categoryColors = {
    "Productividad": "#3b82f6",
    "Calidad": "#10b981",
    "Eficiencia": "#f59e0b",
    "Rentabilidad": "#8b5cf6",
    "Fidelización": "#06b6d4",
    "Crecimiento": "#ef4444"
  };

  const chartData = consultingKPIs.map(kpi => ({
    name: kpi.name,
    value: kpi.value,
    target: kpi.target,
    percentage: kpi.unit === "semanas" ? (kpi.target / kpi.value) * 100 : (kpi.value / kpi.target) * 100
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-8 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  KPIs de Consultoría Tecnológica
                </h2>
                <p className="text-gray-600">
                  Indicadores clave de rendimiento para empresas de consultoría
                </p>
              </div>
            </div>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {consultingKPIs.map((kpi, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {kpi.name}
                    </CardTitle>
                    {getTrendIcon(kpi.trend)}
                  </div>
                  <Badge variant="outline" style={{ backgroundColor: categoryColors[kpi.category] + "20", color: categoryColors[kpi.category] }}>
                    {kpi.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-end space-x-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {kpi.value.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600 mb-1">{kpi.unit}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Meta: {kpi.target.toLocaleString()} {kpi.unit}</span>
                        <span className={`font-medium px-2 py-1 rounded ${getPerformanceColor(kpi.value, kpi.target, kpi.unit)}`}>
                          {kpi.unit === "semanas" 
                            ? ((kpi.target / kpi.value) * 100).toFixed(0)
                            : ((kpi.value / kpi.target) * 100).toFixed(0)
                          }%
                        </span>
                      </div>
                      <Progress 
                        value={kpi.unit === "semanas" ? (kpi.target / kpi.value) * 100 : (kpi.value / kpi.target) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <p className="text-sm text-gray-600">{kpi.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Cumplimiento de KPIs</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b"
                      fontSize={11}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        name === 'percentage' ? `${value.toFixed(1)}%` : value.toLocaleString(),
                        name === 'percentage' ? 'Cumplimiento' : name === 'value' ? 'Actual' : 'Meta'
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Bar dataKey="percentage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>KPIs por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={chartData}>
                    <RadialBar
                      dataKey="percentage"
                      fill="#3b82f6"
                    />
                    <Legend iconSize={10} />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(1)}%`, 'Cumplimiento']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Historical KPI Data */}
          {kpiData.length > 0 && (
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>KPIs Históricos Registrados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {kpiData.map((kpi, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border">
                      <h4 className="font-semibold text-gray-900">{kpi.nombre}</h4>
                      <p className="text-sm text-gray-600">{kpi.month}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-bold">{kpi.valor} {kpi.unidad}</span>
                        <Badge variant={kpi.valor >= kpi.meta ? "default" : "destructive"}>
                          {((kpi.valor / kpi.meta) * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default KPIs;
