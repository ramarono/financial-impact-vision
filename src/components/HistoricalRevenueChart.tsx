
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const HistoricalRevenueChart = () => {
  const historicalData = [
    { month: "Ene 2023", ingresos: 320000, meta: 300000 },
    { month: "Feb 2023", ingresos: 340000, meta: 320000 },
    { month: "Mar 2023", ingresos: 380000, meta: 340000 },
    { month: "Abr 2023", ingresos: 360000, meta: 350000 },
    { month: "May 2023", ingresos: 420000, meta: 380000 },
    { month: "Jun 2023", ingresos: 450000, meta: 400000 },
    { month: "Jul 2023", ingresos: 480000, meta: 440000 },
    { month: "Ago 2023", ingresos: 470000, meta: 460000 },
    { month: "Sep 2023", ingresos: 520000, meta: 480000 },
    { month: "Oct 2023", ingresos: 550000, meta: 500000 },
    { month: "Nov 2023", ingresos: 580000, meta: 520000 },
    { month: "Dic 2023", ingresos: 620000, meta: 550000 },
    { month: "Ene 2024", ingresos: 590000, meta: 580000 },
    { month: "Feb 2024", ingresos: 640000, meta: 600000 },
    { month: "Mar 2024", ingresos: 680000, meta: 640000 },
    { month: "Abr 2024", ingresos: 720000, meta: 680000 },
    { month: "May 2024", ingresos: 750000, meta: 720000 },
    { month: "Jun 2024", ingresos: 780000, meta: 750000 }
  ];

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <span>Ingresos Históricos (Últimos 18 meses)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              formatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              formatter={(value, name) => [
                `$${value.toLocaleString()}`, 
                name === 'ingresos' ? 'Ingresos Reales' : 'Meta'
              ]}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="ingresos" 
              stroke="#10B981" 
              strokeWidth={3}
              name="Ingresos Reales"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="meta" 
              stroke="#6B7280" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Meta"
              dot={{ fill: '#6B7280', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800">Ingreso Promedio Mensual</h4>
            <p className="text-2xl font-bold text-green-600">$567,000</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800">Crecimiento YoY</h4>
            <p className="text-2xl font-bold text-blue-600">+23.5%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800">Cumplimiento de Meta</h4>
            <p className="text-2xl font-bold text-purple-600">104.2%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalRevenueChart;
