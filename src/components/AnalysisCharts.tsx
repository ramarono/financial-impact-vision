
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react";

const AnalysisCharts = () => {
  const revenueDistribution = [
    { name: "Producto A", value: 35, color: "#3B82F6" },
    { name: "Producto B", value: 28, color: "#10B981" },
    { name: "Producto C", value: 20, color: "#F59E0B" },
    { name: "Servicios", value: 17, color: "#EF4444" },
  ];

  const costAnalysis = [
    { month: "Ene", operativos: 45000, marketing: 25000, personal: 85000 },
    { month: "Feb", operativos: 42000, marketing: 28000, personal: 87000 },
    { month: "Mar", operativos: 48000, marketing: 32000, personal: 89000 },
    { month: "Abr", operativos: 44000, marketing: 30000, personal: 91000 },
    { month: "May", operativos: 46000, marketing: 35000, personal: 93000 },
    { month: "Jun", operativos: 43000, marketing: 33000, personal: 95000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Gráficos de Análisis
          </h3>
          <p className="text-gray-600">
            Visualización detallada de la composición financiera
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Distribution Pie Chart */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5 text-blue-600" />
              <span>Distribución de Ingresos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {revenueDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Analysis Bar Chart */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Análisis de Costos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                <Legend />
                <Bar dataKey="operativos" stackId="a" fill="#3B82F6" name="Operativos" />
                <Bar dataKey="marketing" stackId="a" fill="#10B981" name="Marketing" />
                <Bar dataKey="personal" stackId="a" fill="#F59E0B" name="Personal" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisCharts;
