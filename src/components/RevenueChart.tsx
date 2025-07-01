
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { month: 'Ene', ingresos: 65000, costos: 28000, utilidad: 37000 },
  { month: 'Feb', ingresos: 72000, costos: 31000, utilidad: 41000 },
  { month: 'Mar', ingresos: 68000, costos: 29000, utilidad: 39000 },
  { month: 'Abr', ingresos: 85000, costos: 35000, utilidad: 50000 },
  { month: 'May', ingresos: 92000, costos: 38000, utilidad: 54000 },
  { month: 'Jun', ingresos: 88000, costos: 36000, utilidad: 52000 },
];

const RevenueChart = () => {
  return (
    <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Ingresos vs Costos</CardTitle>
        <CardDescription>
          Comparación mensual de ingresos, costos y utilidad neta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCostos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                `$${value.toLocaleString()}`, 
                name === 'ingresos' ? 'Ingresos' : name === 'costos' ? 'Costos' : 'Utilidad'
              ]}
              labelStyle={{ color: '#1e293b' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: 'none', 
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey="ingresos"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorIngresos)"
            />
            <Area
              type="monotone"
              dataKey="costos"
              stroke="#ef4444"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCostos)"
            />
            <Line
              type="monotone"
              dataKey="utilidad"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
