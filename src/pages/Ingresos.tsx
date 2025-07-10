
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HistoricalRevenueChart from "@/components/HistoricalRevenueChart";
import RevenueComparisonChart from "@/components/RevenueComparisonChart";
import RevenueProjectionsChart from "@/components/RevenueProjectionsChart";
import CustomerRevenueTable from "@/components/CustomerRevenueTable";
import AccountsReceivableKPIs from "@/components/AccountsReceivableKPIs";
import { DollarSign } from "lucide-react";

const Ingresos = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-8 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Gestión de Ingresos
                </h2>
                <p className="text-gray-600">
                  Análisis completo de ingresos históricos, comparaciones y proyecciones
                </p>
              </div>
            </div>
          </div>

          {/* Historical Revenue Chart */}
          <div className="mb-8 animate-slide-up">
            <HistoricalRevenueChart />
          </div>

          {/* Revenue Comparison Charts */}
          <div className="mb-8 animate-slide-up">
            <RevenueComparisonChart />
          </div>

          {/* Customer Revenue Table */}
          <div className="mb-8 animate-slide-up">
            <CustomerRevenueTable />
          </div>

          {/* Revenue Projections */}
          <div className="mb-8 animate-slide-up">
            <RevenueProjectionsChart />
          </div>

          {/* Accounts Receivable KPIs */}
          <div className="animate-slide-up">
            <AccountsReceivableKPIs />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ingresos;
