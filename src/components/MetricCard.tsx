
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  gradient?: boolean;
}

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  description,
  gradient 
}: MetricCardProps) => {
  return (
     <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0",
      gradient && "text-white",
      !gradient && "bg-white/50 backdrop-blur-sm"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          gradient ? "text-black/90" : "text-muted-foreground"
        )}>
          {title}
        </CardTitle>
        <Icon className={cn(
          "h-4 w-4",
          gradient ? "text-black/80" : "text-muted-foreground"
        )} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold mb-1", gradient && "text-black")}>{value}</div>
        <div className="flex items-center space-x-2">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            changeType === 'positive' && "bg-green-100 text-green-800",
            changeType === 'negative' && "bg-red-100 text-red-800",
            changeType === 'neutral' && "bg-gray-100 text-gray-800",
            gradient && changeType === 'positive' && "bg-white/20 text-black",
            gradient && changeType === 'negative' && "bg-white/20 text-black",
            gradient && changeType === 'neutral' && "bg-white/20 text-black"
          )}>
            {change}
          </span>
          {description && (
            <span className={cn(
              "text-xs",
              gradient ? "text-black/70" : "text-muted-foreground"
            )}>
              {description}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
