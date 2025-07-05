
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const projectionData = [
  { 
    month: "Oct 2024", 
    real: 320000, 
    proyectado: 320000,
    tipo: "real"
  },
  { 
    month: "Nov 2024", 
    real: 332000, 
    proyectado: 335000,
    tipo: "proyeccion"
  },
  { 
    month: "Dic 2024", 
    real: null, 
    proyectado: 345000,
    tipo: "proyeccion"
  }
];

const yearData = [
  {
    año: "2023",
    nomina: 1695000,
    materiales: 651000,
    servicios: 378000,
    marketing: 291000,
    total: 3015000
  },
  {
    año: "2024 (Proyectado)",
    nomina: 2330000,
    materiales: 945000,
    servicios: 630000,
    marketing: 535000,
    total: 4440000
  }
];

const CostProjectionsChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Proyección Trimestre Final */}
      <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Proyección Cierre de Año
          </CardTitle>
          <p className="text-gray-600">
            Costos reales vs proyectados para el último trimestre
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value?.toLocaleString()}`, '']}
                  labelStyle={{ color: '#1f2937' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="real" 
                  fill="#10b981" 
                  name="Costos Reales"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="proyectado" 
                  fill="#6366f1" 
                  name="Costos Proyectados"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Comparación Anual */}
      <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Comparación Anual
          </CardTitle>
          <p className="text-gray-600">
            Costos totales por categoría: 2023 vs 2024 proyectado
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="año" stroke="#64748b" fontSize={12} />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
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
                <Bar dataKey="nomina" stackId="a" fill="#ef4444" name="Nómina" />
                <Bar dataKey="materiales" stackId="a" fill="#f59e0b" name="Materiales" />
                <Bar dataKey="servicios" stackId="a" fill="#3b82f6" name="Servicios" />
                <Bar dataKey="marketing" stackId="a" fill="#8b5cf6" name="Marketing" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostProjectionsChart;
