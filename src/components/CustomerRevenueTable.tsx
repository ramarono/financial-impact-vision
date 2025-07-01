
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Users } from "lucide-react";

const CustomerRevenueTable = () => {
  const customerData = [
    { id: 1, cliente: "Empresa ABC S.A.", ingresos2024: 1250000, ingresos2023: 980000, crecimiento: 27.6, sector: "Tecnología" },
    { id: 2, cliente: "Corporación XYZ", ingresos2024: 890000, ingresos2023: 750000, crecimiento: 18.7, sector: "Manufactura" },
    { id: 3, cliente: "Servicios DEF Ltda.", ingresos2024: 650000, ingresos2023: 520000, crecimiento: 25.0, sector: "Servicios" },
    { id: 4, cliente: "Grupo GHI", ingresos2024: 780000, ingresos2023: 680000, crecimiento: 14.7, sector: "Retail" },
    { id: 5, cliente: "Industrias JKL", ingresos2024: 540000, ingresos2023: 460000, crecimiento: 17.4, sector: "Industrial" },
    { id: 6, cliente: "Tech MNO Solutions", ingresos2024: 920000, ingresos2023: 720000, crecimiento: 27.8, sector: "Tecnología" },
    { id: 7, cliente: "Comercial PQR", ingresos2024: 420000, ingresos2023: 380000, crecimiento: 10.5, sector: "Comercio" },
    { id: 8, cliente: "Logística STU", ingresos2024: 680000, ingresos2023: 590000, crecimiento: 15.3, sector: "Logística" },
    { id: 9, cliente: "Consultora VWX", ingresos2024: 350000, ingresos2023: 290000, crecimiento: 20.7, sector: "Consultoría" },
    { id: 10, cliente: "Financiera YZ", ingresos2024: 1100000, ingresos2023: 850000, crecimiento: 29.4, sector: "Financiero" }
  ];

  const [sortField, setSortField] = useState<string>('ingresos2024');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortedData = [...customerData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const downloadCSV = () => {
    const headers = ['Cliente', 'Sector', 'Ingresos 2024', 'Ingresos 2023', 'Crecimiento %'];
    const csvContent = [
      headers.join(','),
      ...sortedData.map(row => [
        `"${row.cliente}"`,
        row.sector,
        row.ingresos2024,
        row.ingresos2023,
        row.crecimiento.toFixed(1)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'ingresos_por_cliente.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-purple-600" />
            <span>Ingresos por Cliente</span>
          </div>
          <Button onClick={downloadCSV} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Descargar CSV</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('cliente')}
                >
                  Cliente {sortField === 'cliente' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('sector')}
                >
                  Sector {sortField === 'sector' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 text-right"
                  onClick={() => handleSort('ingresos2024')}
                >
                  Ingresos 2024 {sortField === 'ingresos2024' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 text-right"
                  onClick={() => handleSort('ingresos2023')}
                >
                  Ingresos 2023 {sortField === 'ingresos2023' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50 text-right"
                  onClick={() => handleSort('crecimiento')}
                >
                  Crecimiento % {sortField === 'crecimiento' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium">{customer.cliente}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {customer.sector}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-green-600">
                    ${customer.ingresos2024.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-gray-600">
                    ${customer.ingresos2023.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${
                      customer.crecimiento > 20 ? 'text-green-600' :
                      customer.crecimiento > 10 ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      +{customer.crecimiento.toFixed(1)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800">Total Clientes</h4>
            <p className="text-2xl font-bold text-green-600">{customerData.length}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800">Ingresos Totales 2024</h4>
            <p className="text-2xl font-bold text-blue-600">
              ${customerData.reduce((sum, c) => sum + c.ingresos2024, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800">Crecimiento Promedio</h4>
            <p className="text-2xl font-bold text-purple-600">
              +{(customerData.reduce((sum, c) => sum + c.crecimiento, 0) / customerData.length).toFixed(1)}%
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800">Mejor Cliente</h4>
            <p className="text-lg font-bold text-orange-600">Empresa ABC S.A.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerRevenueTable;
