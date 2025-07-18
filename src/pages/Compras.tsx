import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, ShoppingCart, Clock, DollarSign, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { useDataContext } from "@/contexts/DataContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import QuickDataLoader from "@/components/QuickDataLoader";

const Compras = () => {
  const { purchaseData, addPurchaseData } = useDataContext();

  const handleLoadSampleData = () => {
    const samplePurchaseData = [
      { id: Date.now().toString(), month: 'Dic 2024', proveedor: 'Nuevo Proveedor A', categoria: 'Materiales', monto: 75000, fechaVencimiento: '2024-12-30', estado: 'Al día', diasPago: 25 },
      { id: (Date.now() + 1).toString(), month: 'Dic 2024', proveedor: 'Nuevo Proveedor B', categoria: 'Servicios', monto: 48000, fechaVencimiento: '2025-01-15', estado: 'Pendiente', diasPago: 30 }
    ];
    
    samplePurchaseData.forEach(data => addPurchaseData(data));
  };

  const handleImportCSV = (data: any[]) => {
    data.forEach(record => addPurchaseData(record));
    console.log('Imported', data.length, 'purchase records');
  };

  const handleManualEntry = (data: any) => {
    const newPurchaseData = {
      id: Date.now().toString(),
      ...data
    };
    addPurchaseData(newPurchaseData);
  };

  const csvTemplate = `mes,proveedor,categoria,monto,fechaVencimiento,estado,diasPago
Dic 2024,Proveedor Ejemplo,Materiales,85000,2024-12-30,Al día,28`;

  const manualFields = [
    { name: 'month', label: 'Mes', type: 'text' as const, required: true },
    { name: 'proveedor', label: 'Proveedor', type: 'text' as const, required: true },
    { name: 'categoria', label: 'Categoría', type: 'select' as const, options: ['Materiales', 'Servicios', 'Tecnología', 'Mantenimiento', 'Otros'], required: true },
    { name: 'monto', label: 'Monto', type: 'number' as const, required: true },
    { name: 'fechaVencimiento', label: 'Fecha Vencimiento', type: 'text' as const, required: true },
    { name: 'estado', label: 'Estado', type: 'select' as const, options: ['Al día', 'Pendiente', 'Vencido'], required: true },
    { name: 'diasPago', label: 'Días de Pago', type: 'number' as const, required: true }
  ];

  // KPIs principales para compras y cuentas por pagar
  const purchaseKPIs = [
    {
      name: "Días Promedio de Pago (DPO)",
      value: 35,
      target: 30,
      unit: "días",
      description: "Tiempo promedio entre recepción de factura y pago",
      category: "Liquidez",
      trend: "down",
      icon: Clock
    },
    {
      name: "Rotación de Cuentas por Pagar",
      value: 10.4,
      target: 12,
      unit: "veces/año",
      description: "Frecuencia de pago a proveedores por año",
      category: "Eficiencia",
      trend: "up",
      icon: TrendingUp
    },
    {
      name: "Ahorro en Compras",
      value: 156000,
      target: 200000,
      unit: "$",
      description: "Ahorros obtenidos vs precios de referencia",
      category: "Ahorro",
      trend: "up",
      icon: DollarSign
    },
    {
      name: "Proveedores Activos",
      value: 45,
      target: 40,
      unit: "proveedores",
      description: "Número de proveedores con transacciones activas",
      category: "Gestión",
      trend: "stable",
      icon: Users
    },
    {
      name: "Facturas Vencidas",
      value: 8,
      target: 5,
      unit: "facturas",
      description: "Facturas con pagos pendientes más de 30 días",
      category: "Riesgo",
      trend: "down",
      icon: AlertTriangle
    },
    {
      name: "% Descuentos Aprovechados",
      value: 85,
      target: 90,
      unit: "%",
      description: "Porcentaje de descuentos por pronto pago utilizados",
      category: "Optimización",
      trend: "up",
      icon: CheckCircle
    }
  ];

  const monthlyPurchases = [
    { month: "Ago", compras: 280000, pagos: 265000, pendientes: 15000 },
    { month: "Sep", compras: 320000, pagos: 285000, pendientes: 50000 },
    { month: "Oct", compras: 295000, pagos: 310000, pendientes: 35000 },
    { month: "Nov", compras: 340000, pagos: 325000, pendientes: 50000 },
    { month: "Dic", compras: 310000, pagos: 295000, pendientes: 65000 }
  ];

  const purchaseCategories = [
    { name: "Materiales", value: 45, amount: 450000, color: "#3b82f6" },
    { name: "Servicios", value: 25, amount: 250000, color: "#10b981" },
    { name: "Tecnología", value: 15, amount: 150000, color: "#f59e0b" },
    { name: "Mantenimiento", value: 10, amount: 100000, color: "#ef4444" },
    { name: "Otros", value: 5, amount: 50000, color: "#8b5cf6" }
  ];

  const payableStatus = [
    { category: "Al día", amount: 450000, percentage: 65, color: "#10b981" },
    { category: "1-30 días", amount: 150000, percentage: 21, color: "#f59e0b" },
    { category: "31-60 días", amount: 70000, percentage: 10, color: "#ef4444" },
    { category: "+60 días", amount: 30000, percentage: 4, color: "#dc2626" }
  ];

  const getPerformanceColor = (value: number, target: number, category: string) => {
    const isReversed = category === "Liquidez" || category === "Riesgo";
    const percentage = isReversed ? (target / value) * 100 : (value / target) * 100;
    
    if (percentage >= 100) return "text-green-600 bg-green-50";
    if (percentage >= 80) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-8 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Compras y Cuentas por Pagar
                </h2>
                <p className="text-gray-600">
                  Gestión y análisis de compras, proveedores y obligaciones pendientes
                </p>
              </div>
            </div>
          </div>

          {/* Quick Data Loader */}
          <div className="mb-8 animate-slide-up">
            <QuickDataLoader
              title="Datos de Compras"
              description="Gestiona proveedores, montos, fechas de vencimiento y estados de pago"
              onImportCSV={handleImportCSV}
              onManualEntry={handleManualEntry}
              onLoadToDashboard={handleLoadSampleData}
              csvTemplate={csvTemplate}
              manualEntryFields={manualFields}
            />
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {purchaseKPIs.map((kpi, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <kpi.icon className="h-5 w-5 text-gray-600" />
                      <span>{kpi.name}</span>
                    </CardTitle>
                    {getTrendIcon(kpi.trend)}
                  </div>
                  <Badge variant="outline" className={`${
                    kpi.category === "Liquidez" ? "border-blue-300 text-blue-700 bg-blue-50" :
                    kpi.category === "Eficiencia" ? "border-green-300 text-green-700 bg-green-50" :
                    kpi.category === "Ahorro" ? "border-purple-300 text-purple-700 bg-purple-50" :
                    kpi.category === "Gestión" ? "border-yellow-300 text-yellow-700 bg-yellow-50" :
                    kpi.category === "Riesgo" ? "border-red-300 text-red-700 bg-red-50" :
                    "border-cyan-300 text-cyan-700 bg-cyan-50"
                  }`}>
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
                        <span className={`font-medium px-2 py-1 rounded ${getPerformanceColor(kpi.value, kpi.target, kpi.category)}`}>
                          {kpi.category === "Liquidez" || kpi.category === "Riesgo"
                            ? ((kpi.target / kpi.value) * 100).toFixed(0)
                            : ((kpi.value / kpi.target) * 100).toFixed(0)
                          }%
                        </span>
                      </div>
                      <Progress 
                        value={
                          kpi.category === "Liquidez" || kpi.category === "Riesgo"
                            ? (kpi.target / kpi.value) * 100
                            : (kpi.value / kpi.target) * 100
                        } 
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
            {/* Trend de Compras y Pagos */}
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Tendencia de Compras vs Pagos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyPurchases}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `$${value.toLocaleString()}`,
                        name === 'compras' ? 'Compras' : name === 'pagos' ? 'Pagos' : 'Pendientes'
                      ]}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Line type="monotone" dataKey="compras" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="pagos" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="pendientes" stroke="#ef4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribución por Categoría */}
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Distribución de Compras por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={purchaseCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {purchaseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => [
                        `${value}%`, 
                        `$${props.payload.amount.toLocaleString()}`
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Estado de Cuentas por Pagar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Estado de Cuentas por Pagar por Vencimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payableStatus.map((status, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: status.color }}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900">{status.category}</p>
                          <p className="text-sm text-gray-600">${status.amount.toLocaleString()}</p>
                        </div>
                      </div>
                      <Badge variant="outline" style={{ 
                        backgroundColor: status.color + "20", 
                        color: status.color,
                        borderColor: status.color + "40"
                      }}>
                        {status.percentage}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Resumen Financiero</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Total Cuentas por Pagar</h4>
                    <p className="text-2xl font-bold text-blue-700">
                      ${payableStatus.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <h4 className="font-semibold text-green-900">Compras del Mes</h4>
                    <p className="text-2xl font-bold text-green-700">
                      ${monthlyPurchases[monthlyPurchases.length - 1].compras.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Ahorro Acumulado</h4>
                    <p className="text-2xl font-bold text-purple-700">
                      ${purchaseKPIs.find(kpi => kpi.name.includes("Ahorro"))?.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Proveedores Principales */}
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Proveedores Principales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Proveedor</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Monto Mensual</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Días Promedio Pago</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Estado</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Categoría</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Materiales Tech S.A.", amount: 85000, days: 28, status: "Al día", category: "Materiales" },
                      { name: "Servicios Corporativos", amount: 65000, days: 35, status: "Pendiente", category: "Servicios" },
                      { name: "Equipos & Tecnología", amount: 45000, days: 25, status: "Al día", category: "Tecnología" },
                      { name: "Mantenimiento Integral", amount: 32000, days: 42, status: "Vencido", category: "Mantenimiento" },
                      { name: "Suministros Oficina", amount: 18000, days: 30, status: "Al día", category: "Otros" }
                    ].map((supplier, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{supplier.name}</td>
                        <td className="py-3 px-4 text-gray-700">${supplier.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-gray-700">{supplier.days} días</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            supplier.status === "Al día" ? "default" :
                            supplier.status === "Pendiente" ? "secondary" : "destructive"
                          }>
                            {supplier.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{supplier.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Compras;
