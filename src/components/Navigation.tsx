
import { BarChart3, DollarSign, TrendingUp, PieChart, Settings, Home, Database, ShoppingCart, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  { icon: Home, label: "Dashboard", path: "/", active: false },
  { icon: DollarSign, label: "Ingresos", path: "/ingresos", active: false },
  { icon: TrendingUp, label: "Costos", path: "/costos", active: false },
  { icon: ShoppingCart, label: "Compras", path: "/compras", active: false },
  { icon: Calculator, label: "Budget", path: "/budget", active: false },
  { icon: BarChart3, label: "KPIs", path: "/kpis", active: false },
  { icon: PieChart, label: "Análisis", path: "/analysis", active: false },
  { icon: Database, label: "Carga de Datos", path: "/carga-datos", active: false },
  { icon: Settings, label: "Configuración", path: "/configuracion", active: false },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-sidebar border-r border-sidebar-border w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] z-40">
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
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
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
