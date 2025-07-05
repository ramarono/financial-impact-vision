
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Target, TrendingUp } from "lucide-react";

const RevenueProjectionsChart = () => {
  const projectionData = [
    { month: "Jul 2024", historico: 780000, proyeccion: null, conservadora: 800000, optimista: 850000, agresiva: 900000 },
    { month: "Ago 2024", historico: null, proyeccion: 820000, conservadora: 820000, optimista: 880000, agresiva: 940000 },
    { month: "Sep 2024", historico: null, proyeccion: 850000, conservadora: 845000, optimista: 910000, agresiva: 980000 },
    { month: "Oct 2024", historico: null, proyeccion: 880000, conservadora: 870000, optimista: 940000, agresiva: 1020000 },
    { month: "Nov 2024", historico: null, proyeccion: 910000, conservadora: 895000, optimista: 970000, agresiva: 1060000 },
    { month: "Dic 2024", historico: null, proyeccion: 950000, conservadora: 920000, optimista: 1000000, agresiva: 1100000 },
    { month: "Ene 2025", historico: null, proyeccion: 980000, conservadora: 945000, optimista: 1030000, agresiva: 1140000 },
    { month: "Feb 2025", historico: null, proyeccion: 1010000, conservadora: 970000, optimista: 1060000, agresiva: 1180000 },
    { month: "Mar 2025", historico: null, proyeccion: 1040000, conservadora: 995000, optimista: 1090000, agresiva: 1220000 }
  ];

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-6 w-6 text-indigo-600" />
          <span>Proyecciones de Ingresos</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              formatter={(value, name) => [
                `$${value?.toLocaleString() || 'N/A'}`, 
                name === 'historico' ? 'Histórico' :
                name === 'proyeccion' ? 'Proyección Base' :
                name === 'conservadora' ? 'Escenario Conservador' :
                name === 'optimista' ? 'Escenario Optimista' : 'Escenario Agresivo'
              ]}
            />
            <Legend />
            <Bar 
              dataKey="historico" 
              fill="#10B981" 
              name="Histórico"
            />
            <Line 
              type="monotone" 
              dataKey="proyeccion" 
              stroke="#3B82F6" 
              strokeWidth={3}
              name="Proyección Base"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="conservadora" 
              stroke="#6B7280" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Escenario Conservador"
              dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="optimista" 
              stroke="#10B981" 
              strokeWidth={2}
              strokeDasharray="8 3"
              name="Escenario Optimista"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="agresiva" 
              stroke="#F59E0B" 
              strokeWidth={2}
              strokeDasharray="3 3"
              name="Escenario Agresivo"
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Proyección Base</h4>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-2">$1,040,000</p>
            <p className="text-sm text-blue-700">Meta para Marzo 2025</p>
            <p className="text-xs text-blue-600 mt-1">+33% vs último histórico</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-800">Escenario Optimista</h4>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">$1,090,000</p>
            <p className="text-sm text-green-700">Potencial máximo realista</p>
            <p className="text-xs text-green-600 mt-1">+40% vs último histórico</p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <h4 className="font-semibold text-orange-800">Escenario Agresivo</h4>
            </div>
            <p className="text-2xl font-bold text-orange-600 mb-2">$1,220,000</p>
            <p className="text-sm text-orange-700">Crecimiento acelerado</p>
            <p className="text-xs text-orange-600 mt-1">+56% vs último histórico</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Supuestos de las Proyecciones:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Conservador:</strong> Crecimiento del 2-3% mensual</li>
            <li>• <strong>Base:</strong> Crecimiento del 4-5% mensual sostenido</li>
            <li>• <strong>Optimista:</strong> Crecimiento del 6-7% con nuevos clientes</li>
            <li>• <strong>Agresivo:</strong> Crecimiento del 8-10% con expansión de mercado</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueProjectionsChart;
