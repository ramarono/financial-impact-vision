import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, DollarSign, BarChart3, Target } from "lucide-react";
import { useDataContext } from "@/contexts/DataContext";

const AccountsReceivableKPIs = () => {
  const { revenueData } = useDataContext();

  // Calcular KPIs basados en datos existentes
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.ingresos, 0);
  const avgMonthlyRevenue = totalRevenue / Math.max(revenueData.length, 1);
  
  // Simular datos de cuentas por cobrar (en una implementación real, estos vendrían del backend)
  const accountsReceivableData = {
    totalOutstanding: totalRevenue * 0.35, // 35% de ingresos pendientes de cobro
    currentMonth: totalRevenue * 0.20,
    past30Days: totalRevenue * 0.10,
    past60Days: totalRevenue * 0.03,
    past90Days: totalRevenue * 0.02,
    dso: 42, // Days Sales Outstanding
    collectionEfficiency: 94.5,
    turnoverRatio: 8.7,
    badDebtProvision: totalRevenue * 0.015
  };

  const kpis = [
    {
      title: "DSO (Días Promedio de Cobranza)",
      value: accountsReceivableData.dso,
      unit: "días",
      target: 35,
      trend: "up",
      description: "Tiempo promedio para cobrar las ventas",
      icon: Clock,
      color: accountsReceivableData.dso <= 35 ? "text-green-600" : accountsReceivableData.dso <= 45 ? "text-yellow-600" : "text-red-600"
    },
    {
      title: "Total Cuentas por Cobrar",
      value: accountsReceivableData.totalOutstanding,
      unit: "$",
      target: avgMonthlyRevenue * 1.2,
      trend: "down",
      description: "Monto total pendiente de cobro",
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      title: "Rotación de Cuentas por Cobrar",
      value: accountsReceivableData.turnoverRatio,
      unit: "x",
      target: 10,
      trend: "up",
      description: "Veces que se renuevan las cuentas por cobrar al año",
      icon: BarChart3,
      color: accountsReceivableData.turnoverRatio >= 10 ? "text-green-600" : "text-yellow-600"
    },
    {
      title: "Eficiencia de Cobranza",
      value: accountsReceivableData.collectionEfficiency,
      unit: "%",
      target: 95,
      trend: "up",
      description: "Porcentaje de facturas cobradas exitosamente",
      icon: Target,
      color: accountsReceivableData.collectionEfficiency >= 95 ? "text-green-600" : "text-yellow-600"
    }
  ];

  const agingAnalysis = [
    {
      period: "Corriente (0-30 días)",
      amount: accountsReceivableData.currentMonth,
      percentage: (accountsReceivableData.currentMonth / accountsReceivableData.totalOutstanding) * 100,
      status: "good"
    },
    {
      period: "31-60 días",
      amount: accountsReceivableData.past30Days,
      percentage: (accountsReceivableData.past30Days / accountsReceivableData.totalOutstanding) * 100,
      status: "warning"
    },
    {
      period: "61-90 días",
      amount: accountsReceivableData.past60Days,
      percentage: (accountsReceivableData.past60Days / accountsReceivableData.totalOutstanding) * 100,
      status: "danger"
    },
    {
      period: "Más de 90 días",
      amount: accountsReceivableData.past90Days,
      percentage: (accountsReceivableData.past90Days / accountsReceivableData.totalOutstanding) * 100,
      status: "critical"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-50 text-green-800 border-green-200";
      case "warning": return "bg-yellow-50 text-yellow-800 border-yellow-200";
      case "danger": return "bg-orange-50 text-orange-800 border-orange-200";
      case "critical": return "bg-red-50 text-red-800 border-red-200";
      default: return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">KPIs de Cuentas por Cobrar</h3>
          <p className="text-gray-600">Indicadores clave de gestión de cobranza</p>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const isAboveTarget = kpi.unit === "%" || kpi.unit === "x" 
            ? kpi.value >= kpi.target 
            : kpi.unit === "días" 
            ? kpi.value <= kpi.target 
            : kpi.value <= kpi.target;

          return (
            <Card key={index} className="bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {kpi.unit === "$" 
                      ? `$${kpi.value.toLocaleString()}` 
                      : `${kpi.value.toFixed(1)}${kpi.unit}`
                    }
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Meta: {kpi.unit === "$" 
                        ? `$${kpi.target.toLocaleString()}` 
                        : `${kpi.target}${kpi.unit}`
                      }
                    </span>
                    <Badge variant={isAboveTarget ? "default" : "destructive"} className="text-xs">
                      {isAboveTarget ? "✓" : "!"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{kpi.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Aging Analysis */}
      <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <span>Análisis de Antigüedad de Saldos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agingAnalysis.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getStatusColor(item.status)}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{item.period}</h4>
                    <p className="text-sm opacity-75">
                      {item.percentage.toFixed(1)}% del total por cobrar
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${item.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2 bg-white/30 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-current opacity-60" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Resumen de Riesgo</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Bajo Riesgo:</span>
                <p className="font-semibold text-green-600">
                  ${(accountsReceivableData.currentMonth + accountsReceivableData.past30Days).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Riesgo Medio:</span>
                <p className="font-semibold text-yellow-600">
                  ${accountsReceivableData.past60Days.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Alto Riesgo:</span>
                <p className="font-semibold text-red-600">
                  ${accountsReceivableData.past90Days.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Provisión:</span>
                <p className="font-semibold text-purple-600">
                  ${accountsReceivableData.badDebtProvision.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsReceivableKPIs;