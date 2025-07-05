
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Ene 2023", materiales: 45000, nomina: 120000, servicios: 25000, marketing: 15000 },
  { month: "Feb 2023", materiales: 48000, nomina: 125000, servicios: 26000, marketing: 18000 },
  { month: "Mar 2023", materiales: 52000, nomina: 130000, servicios: 28000, marketing: 20000 },
  { month: "Abr 2023", materiales: 47000, nomina: 128000, servicios: 27000, marketing: 17000 },
  { month: "May 2023", materiales: 50000, nomina: 135000, servicios: 29000, marketing: 22000 },
  { month: "Jun 2023", materiales: 53000, nomina: 140000, servicios: 31000, marketing: 25000 },
  { month: "Jul 2023", materiales: 55000, nomina: 145000, servicios: 32000, marketing: 23000 },
  { month: "Ago 2023", materiales: 58000, nomina: 150000, servicios: 34000, marketing: 28000 },
  { month: "Sep 2023", materiales: 56000, nomina: 148000, servicios: 33000, marketing: 26000 },
  { month: "Oct 2023", materiales: 60000, nomina: 155000, servicios: 36000, marketing: 30000 },
  { month: "Nov 2023", materiales: 62000, nomina: 160000, servicios: 38000, marketing: 32000 },
  { month: "Dic 2023", materiales: 65000, nomina: 165000, servicios: 40000, marketing: 35000 },
  { month: "Ene 2024", materiales: 68000, nomina: 170000, servicios: 42000, marketing: 33000 },
  { month: "Feb 2024", materiales: 70000, nomina: 175000, servicios: 44000, marketing: 36000 },
  { month: "Mar 2024", materiales: 72000, nomina: 180000, servicios: 46000, marketing: 38000 },
  { month: "Abr 2024", materiales: 75000, nomina: 185000, servicios: 48000, marketing: 40000 },
  { month: "May 2024", materiales: 78000, nomina: 190000, servicios: 50000, marketing: 42000 },
  { month: "Jun 2024", materiales: 80000, nomina: 195000, servicios: 52000, marketing: 45000 },
  { month: "Jul 2024", materiales: 82000, nomina: 200000, servicios: 54000, marketing: 47000 },
  { month: "Ago 2024", materiales: 85000, nomina: 205000, servicios: 56000, marketing: 50000 },
  { month: "Sep 2024", materiales: 88000, nomina: 210000, servicios: 58000, marketing: 52000 },
  { month: "Oct 2024", materiales: 90000, nomina: 215000, servicios: 60000, marketing: 55000 },
  { month: "Nov 2024", materiales: 92000, nomina: 220000, servicios: 62000, marketing: 58000 },
  { month: "Dic 2024", materiales: 95000, nomina: 225000, servicios: 65000, marketing: 60000 }
];

const HistoricalCostsChart = () => {
  return (
    <Card className="w-full bg-white/50 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Evolución de Costos Históricos (2023-2024)
        </CardTitle>
        <p className="text-gray-600">
          Comparación de los principales costos durante los últimos dos años
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, '']}
                labelStyle={{ color: '#1f2937' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="nomina" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Nómina"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="materiales" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="Materiales"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="servicios" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Servicios"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="marketing" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Marketing"
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalCostsChart;
