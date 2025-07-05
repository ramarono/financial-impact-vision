
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const variationData = {
  "year-over-year": {
    title: "Variación Año vs Año",
    subtitle: "Comparación 2024 vs 2023",
    data: [
      {
        categoria: "Nómina",
        actual: 2330000,
        anterior: 1695000,
        variacion: 37.5,
        diferencia: 635000
      },
      {
        categoria: "Materiales",
        actual: 945000,
        anterior: 651000,
        variacion: 45.2,
        diferencia: 294000
      },
      {
        categoria: "Servicios",
        actual: 630000,
        anterior: 378000,
        variacion: 66.7,
        diferencia: 252000
      },
      {
        categoria: "Marketing",
        actual: 535000,
        anterior: 291000,
        variacion: 83.8,
        diferencia: 244000
      }
    ]
  },
  "month-over-month": {
    title: "Variación Mes vs Mes",
    subtitle: "Noviembre 2024 vs Octubre 2024",
    data: [
      {
        categoria: "Nómina",
        actual: 220000,
        anterior: 215000,
        variacion: 2.3,
        diferencia: 5000
      },
      {
        categoria: "Materiales",
        actual: 92000,
        anterior: 90000,
        variacion: 2.2,
        diferencia: 2000
      },
      {
        categoria: "Servicios",
        actual: 62000,
        anterior: 60000,
        variacion: 3.3,
        diferencia: 2000
      },
      {
        categoria: "Marketing",
        actual: 58000,
        anterior: 55000,
        variacion: 5.5,
        diferencia: 3000
      }
    ]
  },
  "quarter-over-quarter": {
    title: "Variación Trimestre vs Trimestre",
    subtitle: "Q4 2024 vs Q3 2024",
    data: [
      {
        categoria: "Nómina",
        actual: 655000,
        anterior: 615000,
        variacion: 6.5,
        diferencia: 40000
      },
      {
        categoria: "Materiales",
        actual: 277000,
        anterior: 255000,
        variacion: 8.6,
        diferencia: 22000
      },
      {
        categoria: "Servicios",
        actual: 187000,
        anterior: 168000,
        variacion: 11.3,
        diferencia: 19000
      },
      {
        categoria: "Marketing",
        actual: 173000,
        anterior: 149000,
        variacion: 16.1,
        diferencia: 24000
      }
    ]
  }
};

const CostVariationsTable = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month-over-month");
  const currentData = variationData[selectedPeriod as keyof typeof variationData];

  const getVariationBadge = (variation: number) => {
    const isPositive = variation > 0;
    return (
      <Badge 
        variant={isPositive ? "destructive" : "default"}
        className={isPositive ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
      >
        {isPositive ? "+" : ""}{variation.toFixed(1)}%
      </Badge>
    );
  };

  return (
    <Card className="w-full bg-white/50 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900">
            {currentData.title}
          </CardTitle>
          <p className="text-gray-600">
            {currentData.subtitle}
          </p>
        </div>
        <div className="w-64">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month-over-month">Mes vs Mes</SelectItem>
              <SelectItem value="quarter-over-quarter">Trimestre vs Trimestre</SelectItem>
              <SelectItem value="year-over-year">Año vs Año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Categoría</TableHead>
                <TableHead className="text-right font-semibold">Período Actual</TableHead>
                <TableHead className="text-right font-semibold">Período Anterior</TableHead>
                <TableHead className="text-right font-semibold">Diferencia</TableHead>
                <TableHead className="text-center font-semibold">Variación %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.data.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium">{row.categoria}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${row.actual.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.anterior.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={row.diferencia > 0 ? "text-red-600" : "text-green-600"}>
                      {row.diferencia > 0 ? "+" : ""}${row.diferencia.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {getVariationBadge(row.variacion)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100/50 font-bold border-t-2">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right">
                  ${currentData.data.reduce((sum, row) => sum + row.actual, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${currentData.data.reduce((sum, row) => sum + row.anterior, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-red-600">
                    +${currentData.data.reduce((sum, row) => sum + row.diferencia, 0).toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {getVariationBadge(
                    ((currentData.data.reduce((sum, row) => sum + row.actual, 0) - 
                      currentData.data.reduce((sum, row) => sum + row.anterior, 0)) / 
                     currentData.data.reduce((sum, row) => sum + row.anterior, 0)) * 100
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostVariationsTable;
