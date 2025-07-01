
import { BarChart3, DollarSign, TrendingUp, PieChart, Settings, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: DollarSign, label: "Ingresos", active: false },
  { icon: TrendingUp, label: "Costos", active: false },
  { icon: BarChart3, label: "KPIs", active: false },
  { icon: PieChart, label: "Análisis", active: false },
  { icon: Settings, label: "Configuración", active: false },
];

const Navigation = () => {
  return (
    <nav className="bg-white/50 backdrop-blur-sm border-r border-gray-200/50 w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] z-40">
      <div className="p-6">
        <div className="space-y-2">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                item.active 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                item.active ? "text-blue-600" : "text-gray-500"
              )} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
