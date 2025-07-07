
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CSVInstructionsProps {
  section: 'ingresos' | 'costos' | 'kpis' | 'clientes' | 'dashboard' | 'historicos';
}

const CSVInstructions = ({ section }: CSVInstructionsProps) => {
  const getInstructions = () => {
    switch (section) {
      case 'ingresos':
        return {
          title: "Formato CSV para Ingresos",
          headers: ["month", "ingresos", "meta", "cliente", "categoria"],
          example: "Nov 2024,820000,800000,Cliente ABC,Tecnología",
          description: "Datos de ingresos mensuales para calcular totales y comparaciones vs metas"
        };
      case 'costos':
        return {
          title: "Formato CSV para Costos",
          headers: ["month", "nomina", "materiales", "servicios", "marketing", "categoria", "descripcion"],
          example: "Nov 2024,220000,90000,60000,55000,Operacional,Costos mensuales",
          description: "Desglose de costos por categoría para análisis de variaciones"
        };
      case 'kpis':
        return {
          title: "Formato CSV para KPIs",
          headers: ["month", "nombre", "valor", "meta", "unidad"],
          example: "Nov 2024,Conversión Ventas,12.5,15,%",
          description: "Indicadores clave de rendimiento con valores actuales vs metas"
        };
      case 'clientes':
        return {
          title: "Formato CSV para Clientes",
          headers: ["nombre", "ingresos", "crecimiento", "segmento"],
          example: "Empresa ABC,1250000,27.6,Enterprise",
          description: "Información de clientes con ingresos y crecimiento para análisis de portafolio"
        };
      case 'dashboard':
        return {
          title: "Formato CSV para Métricas Dashboard",
          headers: ["month", "totalIngresos", "totalCostos", "margenBruto", "crecimientoMensual"],
          example: "Nov 2024,820000,437000,383000,5.1",
          description: "Métricas consolidadas del dashboard para cálculos de rentabilidad"
        };
      case 'historicos':
        return {
          title: "Formato CSV para Datos Históricos",
          headers: ["month", "ingresos", "costos", "margen"],
          example: "Oct 2024,780000,425000,355000",
          description: "Datos históricos para calcular tendencias y comparaciones mes anterior"
        };
      default:
        return {
          title: "Formato CSV",
          headers: [],
          example: "",
          description: ""
        };
    }
  };

  const instructions = getInstructions();

  const downloadTemplate = () => {
    const csvContent = [
      instructions.headers.join(','),
      instructions.example
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `template-${section}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="mb-4 bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <FileText className="h-5 w-5" />
          <span>{instructions.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-blue-700 text-sm">{instructions.description}</p>
        
        <div>
          <h4 className="font-semibold text-blue-800 mb-2">Columnas requeridas:</h4>
          <div className="flex flex-wrap gap-2">
            {instructions.headers.map((header, index) => (
              <Badge key={index} variant="outline" className="bg-white">
                {header}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-blue-800 mb-2">Ejemplo:</h4>
          <div className="bg-white p-3 rounded border font-mono text-sm">
            <div className="text-gray-600">{instructions.headers.join(',')}</div>
            <div className="text-blue-600">{instructions.example}</div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={downloadTemplate} variant="outline" size="sm" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Descargar Plantilla</span>
          </Button>
        </div>

        <div className="text-xs text-blue-600 bg-white p-2 rounded">
          <strong>Notas importantes:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>La primera fila debe contener los nombres de las columnas</li>
            <li>Los números no deben contener comas (usar punto para decimales)</li>
            <li>Las fechas deben estar en formato "Mes YYYY" (ej: Nov 2024)</li>
            <li>No incluir caracteres especiales en los nombres</li>
            <li>Guardar el archivo con codificación UTF-8</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CSVInstructions;
