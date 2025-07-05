
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

const RevenueComparisonChart = () => {
  const [comparisonType, setComparisonType] = useState<'year' | 'month'>('year');

  const yearOverYearData = [
    { period: "2022", ingresos: 4800000, crecimiento: 0 },
    { period: "2023", ingresos: 5940000, crecimiento: 23.8 },
    { period: "2024", ingresos: 7320000, crecimiento: 23.2 }
  ];

  const monthOverMonthData = [
    { period: "Ene", actual: 590000, anterior: 620000, crecimiento: -4.8 },
    { period: "Feb", actual: 640000, anterior: 590000, crecimiento: 8.5 },
    { period: "Mar", actual: 680000, anterior: 640000, crecimiento: 6.3 },
    { period: "Abr", actual: 720000, anterior: 680000, crecimiento: 5.9 },
    { period: "May", actual: 750000, anterior: 720000, crecimiento: 4.2 },
    { period: "Jun", actual: 780000, anterior: 750000, crecimiento: 4.0 }
  ];

  const data = comparisonType === 'year' ? yearOverYearData : monthOverMonthData;

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span>Comparación de Ingresos</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={comparisonType === 'year' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComparisonType('year')}
            >
              Año vs Año
            </Button>
            <Button
              variant={comparisonType === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setComparisonType('month')}
            >
              Mes vs Mes
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              formatter={(value, name) => [
                `$${value.toLocaleString()}`, 
                name === 'ingresos' ? 'Ingresos' : 
                name === 'actual' ? 'Actual' : 'Anterior'
              ]}
            />
            <Legend />
            {comparisonType === 'year' ? (
              <Bar 
                dataKey="ingresos" 
                fill="#3B82F6" 
                name="Ingresos Anuales"
              />
            ) : (
              <>
                <Bar 
                  dataKey="actual" 
                  fill="#10B981" 
                  name="Mes Actual"
                />
                <Bar 
                  dataKey="anterior" 
                  fill="#6B7280" 
                  name="Mes Anterior"
                />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">
              {comparisonType === 'year' ? 'Mejor Año' : 'Mejor Mes'}
            </h4>
            <p className="text-xl font-bold text-green-600">
              {comparisonType === 'year' ? '2024: $7,320,000' : 'Jun: $780,000'}
            </p>
            <p className="text-sm text-green-700">
              {comparisonType === 'year' ? '+23.2% vs 2023' : '+4.0% vs Mayo'}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Tendencia</h4>
            <p className="text-xl font-bold text-blue-600">
              {comparisonType === 'year' ? 'Crecimiento Sostenido' : 'Tendencia Positiva'}
            </p>
            <p className="text-sm text-blue-700">
              {comparisonType === 'year' 
                ? 'Crecimiento promedio 23.5% anual' 
                : 'Promedio +5.5% mensual'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueComparisonChart;
