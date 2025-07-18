import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const budgetData = [
  {
    category: "Salarios y Nómina",
    q1: { budgeted: 45000, spent: 44500, balance: 500 },
    q2: { budgeted: 47000, spent: 46800, balance: 200 },
    q3: { budgeted: 48000, spent: 47200, balance: 800 },
    q4: { budgeted: 50000, spent: 49500, balance: 500 }
  },
  {
    category: "Software y Licencias",
    q1: { budgeted: 8500, spent: 8200, balance: 300 },
    q2: { budgeted: 9000, spent: 8900, balance: 100 },
    q3: { budgeted: 9200, spent: 9100, balance: 100 },
    q4: { budgeted: 9500, spent: 9300, balance: 200 }
  },
  {
    category: "Hardware y Equipos",
    q1: { budgeted: 5000, spent: 4800, balance: 200 },
    q2: { budgeted: 3000, spent: 3200, balance: -200 },
    q3: { budgeted: 4000, spent: 3800, balance: 200 },
    q4: { budgeted: 6000, spent: 5900, balance: 100 }
  },
  {
    category: "Internet y Telecomunicaciones",
    q1: { budgeted: 2500, spent: 2400, balance: 100 },
    q2: { budgeted: 2500, spent: 2500, balance: 0 },
    q3: { budgeted: 2600, spent: 2550, balance: 50 },
    q4: { budgeted: 2700, spent: 2650, balance: 50 }
  },
  {
    category: "Oficina y Alquiler",
    q1: { budgeted: 12000, spent: 12000, balance: 0 },
    q2: { budgeted: 12000, spent: 12000, balance: 0 },
    q3: { budgeted: 12500, spent: 12500, balance: 0 },
    q4: { budgeted: 12500, spent: 12500, balance: 0 }
  },
  {
    category: "Marketing y Publicidad",
    q1: { budgeted: 4000, spent: 3800, balance: 200 },
    q2: { budgeted: 5000, spent: 5200, balance: -200 },
    q3: { budgeted: 4500, spent: 4300, balance: 200 },
    q4: { budgeted: 6000, spent: 5800, balance: 200 }
  },
  {
    category: "Capacitación y Desarrollo",
    q1: { budgeted: 3000, spent: 2800, balance: 200 },
    q2: { budgeted: 3500, spent: 3600, balance: -100 },
    q3: { budgeted: 4000, spent: 3900, balance: 100 },
    q4: { budgeted: 3000, spent: 2900, balance: 100 }
  },
  {
    category: "Servicios Profesionales",
    q1: { budgeted: 2000, spent: 1800, balance: 200 },
    q2: { budgeted: 2500, spent: 2400, balance: 100 },
    q3: { budgeted: 2200, spent: 2100, balance: 100 },
    q4: { budgeted: 2800, spent: 2700, balance: 100 }
  },
  {
    category: "Gastos Operativos",
    q1: { budgeted: 1500, spent: 1400, balance: 100 },
    q2: { budgeted: 1600, spent: 1550, balance: 50 },
    q3: { budgeted: 1700, spent: 1650, balance: 50 },
    q4: { budgeted: 1800, spent: 1750, balance: 50 }
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(amount);
};

const getBalanceColor = (balance: number) => {
  if (balance > 0) return "text-success";
  if (balance < 0) return "text-destructive";
  return "text-muted-foreground";
};

const getTotals = (quarter: 'q1' | 'q2' | 'q3' | 'q4') => {
  const totals = budgetData.reduce(
    (acc, item) => ({
      budgeted: acc.budgeted + item[quarter].budgeted,
      spent: acc.spent + item[quarter].spent,
      balance: acc.balance + item[quarter].balance
    }),
    { budgeted: 0, spent: 0, balance: 0 }
  );
  return totals;
};

const Budget = () => {
  const quarters = [
    { key: 'q1' as const, label: 'Q1 2024' },
    { key: 'q2' as const, label: 'Q2 2024' },
    { key: 'q3' as const, label: 'Q3 2024' },
    { key: 'q4' as const, label: 'Q4 2024' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Presupuesto Anual
            </h1>
            <p className="text-muted-foreground">
              Control de presupuesto por trimestres - Consultoría de Tecnología
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Presupuesto por Trimestres 2024</CardTitle>
              <CardDescription>
                Seguimiento de gastos principales organizados por trimestres
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48 font-semibold">Categoría</TableHead>
                      {quarters.map((quarter) => (
                        <TableHead key={quarter.key} className="text-center">
                          <div className="space-y-1">
                            <div className="font-semibold">{quarter.label}</div>
                            <div className="flex space-x-4 text-xs text-muted-foreground">
                              <span>Presup.</span>
                              <span>Gastado</span>
                              <span>Balance</span>
                            </div>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetData.map((item, index) => (
                      <TableRow key={index} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {item.category}
                        </TableCell>
                        {quarters.map((quarter) => (
                          <TableCell key={quarter.key} className="text-center">
                            <div className="space-y-1">
                              <div className="text-sm">
                                {formatCurrency(item[quarter.key].budgeted)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {formatCurrency(item[quarter.key].spent)}
                              </div>
                              <div className={`text-sm font-medium ${getBalanceColor(item[quarter.key].balance)}`}>
                                {formatCurrency(item[quarter.key].balance)}
                              </div>
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2 font-semibold bg-muted/30">
                      <TableCell className="font-bold">TOTAL</TableCell>
                      {quarters.map((quarter) => {
                        const totals = getTotals(quarter.key);
                        return (
                          <TableCell key={quarter.key} className="text-center">
                            <div className="space-y-1">
                              <div className="text-sm font-bold">
                                {formatCurrency(totals.budgeted)}
                              </div>
                              <div className="text-sm font-bold text-muted-foreground">
                                {formatCurrency(totals.spent)}
                              </div>
                              <div className={`text-sm font-bold ${getBalanceColor(totals.balance)}`}>
                                {formatCurrency(totals.balance)}
                              </div>
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {quarters.map((quarter) => {
              const totals = getTotals(quarter.key);
              const efficiency = ((totals.budgeted - totals.spent) / totals.budgeted * 100);
              
              return (
                <Card key={quarter.key}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-2">{quarter.label}</h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Presupuestado</p>
                          <p className="font-bold">{formatCurrency(totals.budgeted)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Gastado</p>
                          <p className="font-bold">{formatCurrency(totals.spent)}</p>
                        </div>
                        <div>
                          <Badge 
                            variant={efficiency >= 0 ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {efficiency >= 0 ? "Bajo presupuesto" : "Sobre presupuesto"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Budget;