
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

const TrendAnalysis = () => {
  const trendData = [
    { month: "Ene", rentabilidad: 14.2, liquidez: 2.1, eficiencia: 82.5 },
    { month: "Feb", rentabilidad: 15.1, liquidez: 2.2, eficiencia: 84.1 },
    { month: "Mar", rentabilidad: 14.8, liquidez: 2.3, eficiencia: 85.7 },
    { month: "Abr", rentabilidad: 15.5, liquidez: 2.4, eficiencia: 86.3 },
    { month: "May", rentabilidad: 15.8, liquidez: 2.3, eficiencia: 87.2 },
    { month: "Jun", rentabilidad: 16.2, liquidez: 2.4, eficiencia: 88.1 },
  ];

  const projectionData = [
    { month: "Jul", valor: 16.8, min: 15.2, max: 18.4 },
    { month: "Ago", valor: 17.2, min: 15.8, max: 18.6 },
    { month: "Sep", valor: 17.6, min: 16.1, max: 19.1 },
    { month: "Oct", valor: 18.1, min: 16.5, max: 19.7 },
    { month: "Nov", valor: 18.5, min: 16.8, max: 20.2 },
    { month: "Dic", valor: 19.0, min: 17.2, max: 20.8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <Calendar className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Análisis de Tendencias
          </h3>
          <p className="text-gray-600">
            Evolución temporal y proyecciones de indicadores clave
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Lines Chart */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span>Evolución de KPIs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rentabilidad" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Rentabilidad (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="liquidez" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Liquidez (ratio)"
                />
                <Line 
                  type="monotone" 
                  dataKey="eficiencia" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="Eficiencia (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projection Area Chart */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <span>Proyección de Rentabilidad</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, ""]} />
                <Area 
                  type="monotone" 
                  dataKey="max" 
                  stackId="1"
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.2}
                  name="Máximo"
                />
                <Area 
                  type="monotone" 
                  dataKey="valor" 
                  stackId="2"
                  stroke="#6366F1" 
                  fill="#6366F1" 
                  fillOpacity={0.6}
                  name="Proyección"
                />
                <Area 
                  type="monotone" 
                  dataKey="min" 
                  stackId="3"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                  name="Mínimo"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span>Insights de Tendencias</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Tendencias Positivas</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Crecimiento sostenido de rentabilidad (+14% en 6 meses)</li>
                <li>• Mejora constante en eficiencia operativa</li>
                <li>• Fortalecimiento de la posición de liquidez</li>
                <li>• Proyección alcista para el segundo semestre</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Puntos de Atención</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Variabilidad en el ratio de liquidez</li>
                <li>• Necesidad de mantener momentum de crecimiento</li>
                <li>• Monitorear factores externos del mercado</li>
                <li>• Preparar estrategias para escenarios adversos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendAnalysis;
