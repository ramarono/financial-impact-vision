
import { BarChart3, DollarSign, TrendingUp, PieChart, Settings, Home, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { icon: Home, label: "Dashboard", path: "/", active: false },
  { icon: DollarSign, label: "Ingresos", path: "/ingresos", active: false },
  { icon: TrendingUp, label: "Costos", path: "/costos", active: false },
  { icon: BarChart3, label: "KPIs", path: "/kpis", active: false },
  { icon: PieChart, label: "Análisis", path: "/analysis", active: false },
  { icon: Database, label: "Carga de Datos", path: "/carga-datos", active: false },
  { icon: Settings, label: "Configuración", path: "/configuracion", active: false },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white/50 backdrop-blur-sm border-r border-gray-200/50 w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] z-40">
      <div className="p-6">
        <div className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  isActive 
                    ? "bg-blue-50 text-blue-700 border border-blue-200" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-blue-600" : "text-gray-500"
                )} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
