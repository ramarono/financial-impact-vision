
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const kpiData = [
  { name: 'Margen Bruto', valor: 68, meta: 70 },
  { name: 'ROI', valor: 24, meta: 25 },
  { name: 'Liquidez', valor: 85, meta: 80 },
  { name: 'Rentabilidad', valor: 32, meta: 30 },
];

const expensesData = [
  { name: 'Personal', value: 45, color: '#3b82f6' },
  { name: 'Marketing', value: 25, color: '#10b981' },
  { name: 'Operaciones', value: 20, color: '#f59e0b' },
  { name: 'Otros', value: 10, color: '#ef4444' },
];

const KPIChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">KPIs Principales</CardTitle>
          <CardDescription>
            Indicadores de rendimiento vs metas establecidas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b"
                fontSize={11}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value}%`, 
                  name === 'valor' ? 'Actual' : 'Meta'
                ]}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar 
                dataKey="valor" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
                name="Actual"
              />
              <Bar 
                dataKey="meta" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
                name="Meta"
                opacity={0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Distribución de Costos</CardTitle>
          <CardDescription>
            Breakdown de gastos por categoría
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {expensesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Porcentaje']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPIChart;
