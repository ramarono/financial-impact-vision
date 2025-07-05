
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";

const costsData = [
  {
    categoria: "Nómina",
    oct2024: 215000,
    nov2024: 220000,
    dic2024Proj: 225000,
    total2024: 2330000,
    participacion: "52.5%"
  },
  {
    categoria: "Materiales",
    oct2024: 90000,
    nov2024: 92000,
    dic2024Proj: 95000,
    total2024: 945000,
    participacion: "21.3%"
  },
  {
    categoria: "Servicios",
    oct2024: 60000,
    nov2024: 62000,
    dic2024Proj: 65000,
    total2024: 630000,
    participacion: "14.2%"
  },
  {
    categoria: "Marketing",
    oct2024: 55000,
    nov2024: 58000,
    dic2024Proj: 60000,
    total2024: 535000,
    participacion: "12.1%"
  },
  {
    categoria: "Otros",
    oct2024: 25000,
    nov2024: 28000,
    dic2024Proj: 30000,
    total2024: 280000,
    participacion: "6.3%"
  }
];

const MainCostsTable = () => {
  const downloadCSV = () => {
    const headers = ["Categoría", "Oct 2024", "Nov 2024", "Dic 2024 (Proj)", "Total 2024", "Participación"];
    const csvContent = [
      headers.join(","),
      ...costsData.map(row => [
        row.categoria,
        row.oct2024,
        row.nov2024,
        row.dic2024Proj,
        row.total2024,
        row.participacion
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "principales_costos_2024.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full bg-white/50 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Principales Costos 2024
          </CardTitle>
          <p className="text-gray-600">
            Detalle mensual de las categorías de costos más importantes
          </p>
        </div>
        <Button 
          onClick={downloadCSV}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Descargar CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Categoría</TableHead>
                <TableHead className="text-right font-semibold">Oct 2024</TableHead>
                <TableHead className="text-right font-semibold">Nov 2024</TableHead>
                <TableHead className="text-right font-semibold">Dic 2024 (Proj)</TableHead>
                <TableHead className="text-right font-semibold">Total 2024</TableHead>
                <TableHead className="text-right font-semibold">Participación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costsData.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium">{row.categoria}</TableCell>
                  <TableCell className="text-right">${row.oct2024.toLocaleString()}</TableCell>
                  <TableCell className="text-right">${row.nov2024.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-blue-600 font-medium">
                    ${row.dic2024Proj.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${row.total2024.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {row.participacion}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100/50 font-bold">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right">
                  ${costsData.reduce((sum, row) => sum + row.oct2024, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${costsData.reduce((sum, row) => sum + row.nov2024, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-blue-600">
                  ${costsData.reduce((sum, row) => sum + row.dic2024Proj, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${costsData.reduce((sum, row) => sum + row.total2024, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">100.0%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MainCostsTable;
