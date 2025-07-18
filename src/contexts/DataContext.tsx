
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type definitions for all data structures
export interface RevenueData {
  id: string;
  month: string;
  ingresos: number;
  meta: number;
  cliente?: string;
  categoria?: string;
}

export interface CostData {
  id: string;
  month: string;
  nomina: number;
  materiales: number;
  servicios: number;
  marketing: number;
  categoria?: string;
  descripcion?: string;
}

export interface KPIData {
  id: string;
  month: string;
  nombre: string;
  valor: number;
  meta: number;
  unidad: string;
}

export interface CustomerData {
  id: string;
  nombre: string;
  ingresos: number;
  crecimiento: number;
  segmento: string;
}

export interface BudgetData {
  id: string;
  month: string;
  categoria: string;
  presupuestado: number;
  actual: number;
  variacion: number;
  departamento: string;
  responsable?: string;
}

// Nuevos tipos para datos específicos del dashboard
export interface DashboardMetrics {
  id: string;
  totalIngresos: number;
  totalCostos: number;
  margenBruto: number;
  crecimientoMensual: number;
  month: string;
}

export interface HistoricalData {
  id: string;
  month: string;
  ingresos: number;
  costos: number;
  margen: number;
}

export interface PurchaseData {
  id: string;
  month: string;
  proveedor: string;
  categoria: string;
  monto: number;
  fechaVencimiento: string;
  estado: string;
  diasPago: number;
}

interface DataContextType {
  // Revenue data
  revenueData: RevenueData[];
  setRevenueData: (data: RevenueData[]) => void;
  addRevenueData: (data: RevenueData) => void;
  updateRevenueData: (id: string, data: Partial<RevenueData>) => void;
  deleteRevenueData: (id: string) => void;

  // Cost data
  costData: CostData[];
  setCostData: (data: CostData[]) => void;
  addCostData: (data: CostData) => void;
  updateCostData: (id: string, data: Partial<CostData>) => void;
  deleteCostData: (id: string) => void;

  // KPI data
  kpiData: KPIData[];
  setKpiData: (data: KPIData[]) => void;
  addKpiData: (data: KPIData) => void;
  updateKpiData: (id: string, data: Partial<KPIData>) => void;
  deleteKpiData: (id: string) => void;

  // Customer data
  customerData: CustomerData[];
  setCustomerData: (data: CustomerData[]) => void;
  addCustomerData: (data: CustomerData) => void;
  updateCustomerData: (id: string, data: Partial<CustomerData>) => void;
  deleteCustomerData: (id: string) => void;

  // Budget data
  budgetData: BudgetData[];
  setBudgetData: (data: BudgetData[]) => void;
  addBudgetData: (data: BudgetData) => void;
  updateBudgetData: (id: string, data: Partial<BudgetData>) => void;
  deleteBudgetData: (id: string) => void;

  // Dashboard metrics
  dashboardMetrics: DashboardMetrics[];
  setDashboardMetrics: (data: DashboardMetrics[]) => void;
  addDashboardMetrics: (data: DashboardMetrics) => void;
  updateDashboardMetrics: (id: string, data: Partial<DashboardMetrics>) => void;
  deleteDashboardMetrics: (id: string) => void;

  // Historical data
  historicalData: HistoricalData[];
  setHistoricalData: (data: HistoricalData[]) => void;
  addHistoricalData: (data: HistoricalData) => void;
  updateHistoricalData: (id: string, data: Partial<HistoricalData>) => void;
  deleteHistoricalData: (id: string) => void;

  // Purchase data
  purchaseData: PurchaseData[];
  setPurchaseData: (data: PurchaseData[]) => void;
  addPurchaseData: (data: PurchaseData) => void;
  updatePurchaseData: (id: string, data: Partial<PurchaseData>) => void;
  deletePurchaseData: (id: string) => void;

  // Calculated values
  getTotalRevenue: () => number;
  getTotalCosts: () => number;
  getMarginBruto: () => number;
  getCrecimientoMensual: () => number;
  getIngresosVsMesAnterior: () => { actual: number; anterior: number; cambio: number };

  // Utility functions
  exportAllData: () => void;
  importAllData: (data: any) => void;
  clearAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

// Datos de muestra iniciales
const initialRevenueData: RevenueData[] = [
  { id: '1', month: 'Oct 2024', ingresos: 780000, meta: 750000, cliente: 'Cliente A', categoria: 'Tecnología' },
  { id: '2', month: 'Nov 2024', ingresos: 820000, meta: 800000, cliente: 'Cliente B', categoria: 'Servicios' },
  { id: '3', month: 'Dic 2024', ingresos: 850000, meta: 850000, cliente: 'Cliente C', categoria: 'Manufactura' }
];

const initialCostData: CostData[] = [
  { id: '1', month: 'Oct 2024', nomina: 220000, materiales: 90000, servicios: 60000, marketing: 55000 },
  { id: '2', month: 'Nov 2024', nomina: 225000, materiales: 92000, servicios: 62000, marketing: 58000 },
  { id: '3', month: 'Dic 2024', nomina: 230000, materiales: 95000, servicios: 65000, marketing: 60000 }
];

const initialKPIData: KPIData[] = [
  { id: '1', month: 'Oct 2024', nombre: 'Conversión de Ventas', valor: 12.5, meta: 15, unidad: '%' },
  { id: '2', month: 'Nov 2024', nombre: 'Satisfacción Cliente', valor: 87, meta: 85, unidad: '%' },
  { id: '3', month: 'Dic 2024', nombre: 'ROI Marketing', valor: 3.2, meta: 3.5, unidad: 'x' }
];

const initialCustomerData: CustomerData[] = [
  { id: '1', nombre: 'Empresa ABC S.A.', ingresos: 1250000, crecimiento: 27.6, segmento: 'Enterprise' },
  { id: '2', nombre: 'Corporación XYZ', ingresos: 890000, crecimiento: 18.7, segmento: 'Premium' },
  { id: '3', nombre: 'Servicios DEF Ltda.', ingresos: 650000, crecimiento: 25.0, segmento: 'SMB' }
];

const initialBudgetData: BudgetData[] = [
  { id: '1', month: 'Oct 2024', categoria: 'Ingresos', presupuestado: 750000, actual: 780000, variacion: 4.0, departamento: 'Ventas', responsable: 'Juan Pérez' },
  { id: '2', month: 'Oct 2024', categoria: 'Nómina', presupuestado: 230000, actual: 220000, variacion: -4.3, departamento: 'RRHH', responsable: 'María González' },
  { id: '3', month: 'Nov 2024', categoria: 'Marketing', presupuestado: 60000, actual: 58000, variacion: -3.3, departamento: 'Marketing', responsable: 'Carlos Silva' }
];

const initialDashboardMetrics: DashboardMetrics[] = [
  { id: '1', totalIngresos: 780000, totalCostos: 425000, margenBruto: 355000, crecimientoMensual: 5.2, month: 'Oct 2024' },
  { id: '2', totalIngresos: 820000, totalCostos: 437000, margenBruto: 383000, crecimientoMensual: 5.1, month: 'Nov 2024' }
];

const initialHistoricalData: HistoricalData[] = [
  { id: '1', month: 'Ago 2024', ingresos: 720000, costos: 390000, margen: 330000 },
  { id: '2', month: 'Sep 2024', ingresos: 740000, costos: 405000, margen: 335000 },
  { id: '3', month: 'Oct 2024', ingresos: 780000, costos: 425000, margen: 355000 },
  { id: '4', month: 'Nov 2024', ingresos: 820000, costos: 437000, margen: 383000 }
];

const initialPurchaseData: PurchaseData[] = [
  { id: '1', month: 'Oct 2024', proveedor: 'Materiales Tech S.A.', categoria: 'Materiales', monto: 85000, fechaVencimiento: '2024-11-15', estado: 'Al día', diasPago: 28 },
  { id: '2', month: 'Oct 2024', proveedor: 'Servicios Corporativos', categoria: 'Servicios', monto: 65000, fechaVencimiento: '2024-11-20', estado: 'Pendiente', diasPago: 35 },
  { id: '3', month: 'Nov 2024', proveedor: 'Equipos & Tecnología', categoria: 'Tecnología', monto: 45000, fechaVencimiento: '2024-12-10', estado: 'Al día', diasPago: 25 },
  { id: '4', month: 'Nov 2024', proveedor: 'Mantenimiento Integral', categoria: 'Mantenimiento', monto: 32000, fechaVencimiento: '2024-11-30', estado: 'Vencido', diasPago: 42 }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>(initialRevenueData);
  const [costData, setCostData] = useState<CostData[]>(initialCostData);
  const [kpiData, setKpiData] = useState<KPIData[]>(initialKPIData);
  const [customerData, setCustomerData] = useState<CustomerData[]>(initialCustomerData);
  const [budgetData, setBudgetData] = useState<BudgetData[]>(initialBudgetData);
  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics[]>(initialDashboardMetrics);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>(initialHistoricalData);
  const [purchaseData, setPurchaseData] = useState<PurchaseData[]>(initialPurchaseData);

  // Revenue data functions
  const addRevenueData = (data: RevenueData) => {
    setRevenueData(prev => [...prev, data]);
  };

  const updateRevenueData = (id: string, updatedData: Partial<RevenueData>) => {
    setRevenueData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const deleteRevenueData = (id: string) => {
    setRevenueData(prev => prev.filter(item => item.id !== id));
  };

  // Cost data functions
  const addCostData = (data: CostData) => {
    setCostData(prev => [...prev, data]);
  };

  const updateCostData = (id: string, updatedData: Partial<CostData>) => {
    setCostData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const deleteCostData = (id: string) => {
    setCostData(prev => prev.filter(item => item.id !== id));
  };

  // KPI data functions
  const addKpiData = (data: KPIData) => {
    setKpiData(prev => [...prev, data]);
  };

  const updateKpiData = (id: string, updatedData: Partial<KPIData>) => {
    setKpiData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const deleteKpiData = (id: string) => {
    setKpiData(prev => prev.filter(item => item.id !== id));
  };

  // Customer data functions
  const addCustomerData = (data: CustomerData) => {
    setCustomerData(prev => [...prev, data]);
  };

  const updateCustomerData = (id: string, updatedData: Partial<CustomerData>) => {
    setCustomerData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const deleteCustomerData = (id: string) => {
    setCustomerData(prev => prev.filter(item => item.id !== id));
  };

  // Budget data functions
  const addBudgetData = (data: BudgetData) => {
    setBudgetData(prev => [...prev, data]);
  };

  const updateBudgetData = (id: string, updatedData: Partial<BudgetData>) => {
    setBudgetData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const deleteBudgetData = (id: string) => {
    setBudgetData(prev => prev.filter(item => item.id !== id));
  };

  // Dashboard metrics functions
  const addDashboardMetrics = (data: DashboardMetrics) => {
    setDashboardMetrics(prev => [...prev, data]);
  };

  const updateDashboardMetrics = (id: string, updatedData: Partial<DashboardMetrics>) => {
    setDashboardMetrics(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const deleteDashboardMetrics = (id: string) => {
    setDashboardMetrics(prev => prev.filter(item => item.id !== id));
  };

  // Historical data functions
  const addHistoricalData = (data: HistoricalData) => {
    setHistoricalData(prev => [...prev, data]);
  };

  const updateHistoricalData = (id: string, updatedData: Partial<HistoricalData>) => {
    setHistoricalData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const deleteHistoricalData = (id: string) => {
    setHistoricalData(prev => prev.filter(item => item.id !== id));
  };

  // Purchase data functions
  const addPurchaseData = (data: PurchaseData) => {
    setPurchaseData(prev => [...prev, data]);
  };

  const updatePurchaseData = (id: string, updatedData: Partial<PurchaseData>) => {
    setPurchaseData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const deletePurchaseData = (id: string) => {
    setPurchaseData(prev => prev.filter(item => item.id !== id));
  };

  // Calculated values
  const getTotalRevenue = () => {
    return revenueData.reduce((sum, item) => sum + item.ingresos, 0);
  };

  const getTotalCosts = () => {
    return costData.reduce((sum, item) => sum + item.nomina + item.materiales + item.servicios + item.marketing, 0);
  };

  const getMarginBruto = () => {
    return getTotalRevenue() - getTotalCosts();
  };

  const getCrecimientoMensual = () => {
    if (historicalData.length < 2) return 0;
    const latest = historicalData[historicalData.length - 1];
    const previous = historicalData[historicalData.length - 2];
    return ((latest.ingresos - previous.ingresos) / previous.ingresos) * 100;
  };

  const getIngresosVsMesAnterior = () => {
    if (historicalData.length < 2) return { actual: 0, anterior: 0, cambio: 0 };
    const latest = historicalData[historicalData.length - 1];
    const previous = historicalData[historicalData.length - 2];
    const cambio = ((latest.ingresos - previous.ingresos) / previous.ingresos) * 100;
    return { actual: latest.ingresos, anterior: previous.ingresos, cambio };
  };

  // Utility functions
  const exportAllData = () => {
    const allData = {
      revenue: revenueData,
      costs: costData,
      kpis: kpiData,
      customers: customerData,
      budget: budgetData,
      dashboardMetrics: dashboardMetrics,
      historicalData: historicalData,
      purchases: purchaseData,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `business-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importAllData = (data: any) => {
    if (data.revenue) setRevenueData(data.revenue);
    if (data.costs) setCostData(data.costs);
    if (data.kpis) setKpiData(data.kpis);
    if (data.customers) setCustomerData(data.customers);
    if (data.budget) setBudgetData(data.budget);
    if (data.dashboardMetrics) setDashboardMetrics(data.dashboardMetrics);
    if (data.historicalData) setHistoricalData(data.historicalData);
    if (data.purchases) setPurchaseData(data.purchases);
  };

  const clearAllData = () => {
    setRevenueData([]);
    setCostData([]);
    setKpiData([]);
    setCustomerData([]);
    setBudgetData([]);
    setDashboardMetrics([]);
    setHistoricalData([]);
    setPurchaseData([]);
  };

  const value = {
    revenueData,
    setRevenueData,
    addRevenueData,
    updateRevenueData,
    deleteRevenueData,
    costData,
    setCostData,
    addCostData,
    updateCostData,
    deleteCostData,
    kpiData,
    setKpiData,
    addKpiData,
    updateKpiData,
    deleteKpiData,
    customerData,
    setCustomerData,
    addCustomerData,
    updateCustomerData,
    deleteCustomerData,
    budgetData,
    setBudgetData,
    addBudgetData,
    updateBudgetData,
    deleteBudgetData,
    dashboardMetrics,
    setDashboardMetrics,
    addDashboardMetrics,
    updateDashboardMetrics,
    deleteDashboardMetrics,
    historicalData,
    setHistoricalData,
    addHistoricalData,
    updateHistoricalData,
    deleteHistoricalData,
    purchaseData,
    setPurchaseData,
    addPurchaseData,
    updatePurchaseData,
    deletePurchaseData,
    getTotalRevenue,
    getTotalCosts,
    getMarginBruto,
    getCrecimientoMensual,
    getIngresosVsMesAnterior,
    exportAllData,
    importAllData,
    clearAllData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
