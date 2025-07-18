
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "@/contexts/DataContext";
import Index from "./pages/Index";
import Analysis from "./pages/Analysis";
import Ingresos from "./pages/Ingresos";
import Costos from "./pages/Costos";
import Compras from "./pages/Compras";
import KPIs from "./pages/KPIs";
import CargaDatos from "./pages/CargaDatos";
import Budget from "./pages/Budget";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/ingresos" element={<Ingresos />} />
            <Route path="/costos" element={<Costos />} />
            <Route path="/compras" element={<Compras />} />
            <Route path="/kpis" element={<KPIs />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/carga-datos" element={<CargaDatos />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
