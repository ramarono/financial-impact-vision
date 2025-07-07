
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

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [costData, setCostData] = useState<CostData[]>([]);
  const [kpiData, setKpiData] = useState<KPIData[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);

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

  // Utility functions
  const exportAllData = () => {
    const allData = {
      revenue: revenueData,
      costs: costData,
      kpis: kpiData,
      customers: customerData,
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
  };

  const clearAllData = () => {
    setRevenueData([]);
    setCostData([]);
    setKpiData([]);
    setCustomerData([]);
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
    exportAllData,
    importAllData,
    clearAllData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
