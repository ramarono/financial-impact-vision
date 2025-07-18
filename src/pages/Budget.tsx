import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, MoreHorizontal, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import QuickDataLoader from "@/components/QuickDataLoader";
import { useDataContext } from "@/contexts/DataContext";

const budgetDataByYear: { [key: number]: { [key: string]: any } } = {
  2023: {
    quarters: {
      "Jan-Mar": {
        months: ["Jan", "Feb", "Mar"],
        data: {
          months: [
            { name: "Enero", availableFunds: 26000, overspent: 0, budgeted: -26000, forNextMonth: 0, toBudget: 0 },
            { name: "Febrero", availableFunds: 26500, overspent: 0, budgeted: -26500, forNextMonth: 0, toBudget: 0 },
            { name: "Marzo", availableFunds: 27000, overspent: 0, budgeted: -27000, forNextMonth: 0, toBudget: 0 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  jan: { budgeted: 16000, spent: -15500, balance: 8500 },
                  feb: { budgeted: 16500, spent: -16000, balance: 9000 },
                  mar: { budgeted: 17000, spent: -16500, balance: 9500 }
                },
                {
                  name: "Software y Licencias",
                  jan: { budgeted: 10000, spent: -9800, balance: 200 },
                  feb: { budgeted: 10500, spent: -10200, balance: 500 },
                  mar: { budgeted: 11000, spent: -10700, balance: 800 }
                }
              ]
            }
          ]
        }
      },
      "Apr-Jun": {
        months: ["Apr", "May", "Jun"],
        data: {
          months: [
            { name: "Abril", availableFunds: 27500, overspent: 0, budgeted: -27500, forNextMonth: 0, toBudget: 0 },
            { name: "Mayo", availableFunds: 27800, overspent: 0, budgeted: -27800, forNextMonth: 0, toBudget: 0 },
            { name: "Junio", availableFunds: 28000, overspent: 0, budgeted: -28000, forNextMonth: 0, toBudget: 200 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  apr: { budgeted: 17200, spent: -16800, balance: 9400 },
                  may: { budgeted: 17500, spent: -17100, balance: 9700 },
                  jun: { budgeted: 17800, spent: -17400, balance: 10000 }
                },
                {
                  name: "Software y Licencias",
                  apr: { budgeted: 11200, spent: -10900, balance: 600 },
                  may: { budgeted: 11500, spent: -11200, balance: 700 },
                  jun: { budgeted: 11800, spent: -11500, balance: 900 }
                }
              ]
            }
          ]
        }
      },
      "Jul-Sep": {
        months: ["Jul", "Aug", "Sep"],
        data: {
          months: [
            { name: "Julio", availableFunds: 28200, overspent: 0, budgeted: -28000, forNextMonth: 0, toBudget: 200 },
            { name: "Agosto", availableFunds: 28500, overspent: 0, budgeted: -28200, forNextMonth: 0, toBudget: 300 },
            { name: "Septiembre", availableFunds: 28800, overspent: 0, budgeted: -28500, forNextMonth: 0, toBudget: 300 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  jul: { budgeted: 17900, spent: -17600, balance: 9800 },
                  aug: { budgeted: 18200, spent: -17900, balance: 10100 },
                  sep: { budgeted: 18500, spent: -18200, balance: 10400 }
                },
                {
                  name: "Software y Licencias",
                  jul: { budgeted: 11900, spent: -11600, balance: 1000 },
                  aug: { budgeted: 12000, spent: -11700, balance: 1100 },
                  sep: { budgeted: 12200, spent: -11900, balance: 1200 }
                }
              ]
            }
          ]
        }
      },
      "Oct-Dec": {
        months: ["Oct", "Nov", "Dec"],
        data: {
          months: [
            { name: "Octubre", availableFunds: 28000, overspent: 0, budgeted: -28000, forNextMonth: 0, toBudget: 0 },
            { name: "Noviembre", availableFunds: 29000, overspent: 0, budgeted: -29000, forNextMonth: 0, toBudget: 0 },
            { name: "Diciembre", availableFunds: 30000, overspent: 0, budgeted: -30000, forNextMonth: 0, toBudget: 500 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  oct: { budgeted: 18000, spent: -17500, balance: 9500 },
                  nov: { budgeted: 19000, spent: -18200, balance: 10300 },
                  dec: { budgeted: 19500, spent: -19000, balance: 10800 }
                },
                {
                  name: "Software y Licencias",
                  oct: { budgeted: 12000, spent: -11800, balance: 700 },
                  nov: { budgeted: 12500, spent: -12300, balance: 900 },
                  dec: { budgeted: 13000, spent: -12800, balance: 1100 }
                }
              ]
            }
          ]
        }
      }
    }
  },
  2024: {
    quarters: {
      "Jan-Mar": {
        months: ["Jan", "Feb", "Mar"],
        data: {
          months: [
            { name: "Enero", availableFunds: 30000, overspent: 0, budgeted: -30000, forNextMonth: 0, toBudget: 0 },
            { name: "Febrero", availableFunds: 31000, overspent: 0, budgeted: -31000, forNextMonth: 0, toBudget: 0 },
            { name: "Marzo", availableFunds: 31500, overspent: 0, budgeted: -31000, forNextMonth: 0, toBudget: 500 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  jan: { budgeted: 18500, spent: -17800, balance: 9700 },
                  feb: { budgeted: 19200, spent: -18500, balance: 10400 },
                  mar: { budgeted: 19800, spent: -19100, balance: 11200 }
                },
                {
                  name: "Software y Licencias",
                  jan: { budgeted: 12800, spent: -12500, balance: 800 },
                  feb: { budgeted: 13200, spent: -12900, balance: 1100 },
                  mar: { budgeted: 13500, spent: -13200, balance: 1400 }
                }
              ]
            }
          ]
        }
      },
      "Apr-Jun": {
        months: ["Apr", "May", "Jun"],
        data: {
          months: [
            { name: "Abril", availableFunds: 31000, overspent: 0, budgeted: -31000, forNextMonth: 0, toBudget: 0 },
            { name: "Mayo", availableFunds: 32000, overspent: 0, budgeted: -32000, forNextMonth: 0, toBudget: 0 },
            { name: "Junio", availableFunds: 32000, overspent: 0, budgeted: -32000, forNextMonth: 0, toBudget: 0 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  apr: { budgeted: 19500, spent: -18800, balance: 10200 },
                  may: { budgeted: 19950, spent: -17766, balance: 10511 },
                  jun: { budgeted: 21850, spent: -16230, balance: 16131 }
                },
                {
                  name: "Software y Licencias",
                  apr: { budgeted: 13200, spent: -13000, balance: 700 },
                  may: { budgeted: 13700, spent: -13504, balance: 840 },
                  jun: { budgeted: 13700, spent: -13504, balance: 1036 }
                }
              ]
            }
          ]
        }
      },
      "Jul-Sep": {
        months: ["Jul", "Aug", "Sep"],
        data: {
          months: [
            { name: "Julio", availableFunds: 33253, overspent: 0, budgeted: -32000, forNextMonth: 0, toBudget: 1253 },
            { name: "Agosto", availableFunds: 33500, overspent: 0, budgeted: -33000, forNextMonth: 0, toBudget: 500 },
            { name: "Septiembre", availableFunds: 34000, overspent: 0, budgeted: -33500, forNextMonth: 0, toBudget: 500 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  jul: { budgeted: 20950, spent: -17367, balance: 19714 },
                  aug: { budgeted: 21500, spent: -20800, balance: 11200 },
                  sep: { budgeted: 22000, spent: -21200, balance: 12300 }
                },
                {
                  name: "Software y Licencias",
                  jul: { budgeted: 13700, spent: -13504, balance: 1232 },
                  aug: { budgeted: 14000, spent: -13800, balance: 1400 },
                  sep: { budgeted: 14200, spent: -14000, balance: 1600 }
                }
              ]
            }
          ]
        }
      },
      "Oct-Dec": {
        months: ["Oct", "Nov", "Dec"],
        data: {
          months: [
            { name: "Octubre", availableFunds: 34500, overspent: 0, budgeted: -34000, forNextMonth: 0, toBudget: 500 },
            { name: "Noviembre", availableFunds: 35000, overspent: 0, budgeted: -34500, forNextMonth: 0, toBudget: 500 },
            { name: "Diciembre", availableFunds: 35500, overspent: 0, budgeted: -35000, forNextMonth: 0, toBudget: 500 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  oct: { budgeted: 22500, spent: -21800, balance: 12700 },
                  nov: { budgeted: 23000, spent: -22300, balance: 13200 },
                  dec: { budgeted: 23500, spent: -22800, balance: 13700 }
                },
                {
                  name: "Software y Licencias",
                  oct: { budgeted: 14500, spent: -14200, balance: 1700 },
                  nov: { budgeted: 14800, spent: -14500, balance: 1800 },
                  dec: { budgeted: 15000, spent: -14700, balance: 2100 }
                }
              ]
            }
          ]
        }
      }
    }
  },
  2025: {
    quarters: {
      "Jan-Mar": {
        months: ["Jan", "Feb", "Mar"],
        data: {
          months: [
            { name: "Enero", availableFunds: 36000, overspent: 0, budgeted: -35500, forNextMonth: 0, toBudget: 500 },
            { name: "Febrero", availableFunds: 36500, overspent: 0, budgeted: -36000, forNextMonth: 0, toBudget: 500 },
            { name: "Marzo", availableFunds: 37000, overspent: 0, budgeted: -36500, forNextMonth: 0, toBudget: 500 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  jan: { budgeted: 24000, spent: -23200, balance: 14200 },
                  feb: { budgeted: 24500, spent: -23700, balance: 14700 },
                  mar: { budgeted: 25000, spent: -24200, balance: 15200 }
                },
                {
                  name: "Software y Licencias",
                  jan: { budgeted: 15200, spent: -14900, balance: 2100 },
                  feb: { budgeted: 15500, spent: -15200, balance: 2200 },
                  mar: { budgeted: 15800, spent: -15500, balance: 2300 }
                }
              ]
            }
          ]
        }
      },
      "Apr-Jun": {
        months: ["Apr", "May", "Jun"],
        data: {
          months: [
            { name: "Abril", availableFunds: 37500, overspent: 0, budgeted: -37000, forNextMonth: 0, toBudget: 500 },
            { name: "Mayo", availableFunds: 38000, overspent: 0, budgeted: -37500, forNextMonth: 0, toBudget: 500 },
            { name: "Junio", availableFunds: 38500, overspent: 0, budgeted: -38000, forNextMonth: 0, toBudget: 500 }
          ],
          categories: [
            {
              name: "Gastos Realmente Importantes",
              expanded: true,
              items: [
                {
                  name: "Nómina y Salarios",
                  apr: { budgeted: 25500, spent: -24800, balance: 15700 },
                  may: { budgeted: 26000, spent: -25300, balance: 16200 },
                  jun: { budgeted: 26500, spent: -25800, balance: 16700 }
                },
                {
                  name: "Software y Licencias",
                  apr: { budgeted: 16000, spent: -15700, balance: 2400 },
                  may: { budgeted: 16300, spent: -16000, balance: 2500 },
                  jun: { budgeted: 16600, spent: -16300, balance: 2600 }
                }
              ]
            }
          ]
        }
      }
    }
  }
};

const quarters = [
  { name: "Jan-Mar", months: ["Jan", "Feb", "Mar"] },
  { name: "Apr-Jun", months: ["Apr", "May", "Jun"] },
  { name: "Jul-Sep", months: ["Jul", "Aug", "Sep"] },
  { name: "Oct-Dec", months: ["Oct", "Nov", "Dec"] }
];

const formatNumber = (num: number) => {
  if (num === 0) return "0";
  return num.toLocaleString();
};

const Budget = () => {
  const { addBudgetData } = useDataContext();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Gastos Realmente Importantes", "Gastos Diarios"]);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedQuarter, setSelectedQuarter] = useState("Apr-Jun");

  const handleImportCSV = (data: any[]) => {
    data.forEach(row => {
      if (row.categoria && row.presupuestado && row.actual) {
        addBudgetData({
          id: row.id || Date.now().toString(),
          month: row.month || new Date().toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }),
          categoria: row.categoria,
          presupuestado: row.presupuestado,
          actual: row.actual,
          variacion: ((row.actual - row.presupuestado) / row.presupuestado) * 100,
          departamento: row.departamento || 'General',
          responsable: row.responsable
        });
      }
    });
  };

  const handleManualEntry = (data: any) => {
    const newBudgetData = {
      id: Date.now().toString(),
      variacion: ((data.actual - data.presupuestado) / data.presupuestado) * 100,
      ...data
    };
    addBudgetData(newBudgetData);
  };

  const csvTemplate = `categoria,presupuestado,actual,departamento,responsable,month
Nómina y Salarios,180000,175000,RRHH,Juan Pérez,Dic 2024
Software y Licencias,15000,14500,IT,María González,Dic 2024`;

  const manualFields = [
    { name: 'categoria', label: 'Categoría', type: 'text' as const, required: true },
    { name: 'presupuestado', label: 'Presupuestado', type: 'number' as const, required: true },
    { name: 'actual', label: 'Actual', type: 'number' as const, required: true },
    { name: 'departamento', label: 'Departamento', type: 'text' as const, required: true },
    { name: 'responsable', label: 'Responsable', type: 'text' as const },
    { name: 'month', label: 'Mes', type: 'text' as const, required: true }
  ];

  const years = [2023, 2024, 2025];
  
  const availableQuarters = budgetDataByYear[selectedYear]?.quarters ? Object.keys(budgetDataByYear[selectedYear].quarters) : [];
  
  const currentData = budgetDataByYear[selectedYear]?.quarters[selectedQuarter]?.data || {
    months: [],
    categories: []
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // Seleccionar el primer trimestre disponible para el año
    const firstQuarter = Object.keys(budgetDataByYear[year]?.quarters || {})[0];
    if (firstQuarter) {
      setSelectedQuarter(firstQuarter);
    }
  };

  const getCurrentMonthKeys = () => {
    const quarter = quarters.find(q => q.name === selectedQuarter);
    return quarter ? quarter.months.map(m => m.toLowerCase()) : [];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-16 p-4">
        <div className="max-w-full">
          {/* Header Section */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Gestión de Presupuesto
                </h2>
                <p className="text-gray-600">
                  Control y seguimiento de presupuestos por categorías y departamentos
                </p>
              </div>
            </div>
          </div>

          {/* Quick Data Loader */}
          <div className="mb-8 animate-slide-up">
            <QuickDataLoader
              title="Datos de Presupuesto"
              description="Gestiona presupuestos, gastos actuales y variaciones por departamento"
              onImportCSV={handleImportCSV}
              onManualEntry={handleManualEntry}
              csvTemplate={csvTemplate}
              manualEntryFields={manualFields}
              expectedFields={['categoria', 'presupuestado', 'actual', 'departamento']}
              autoUpdateOnLoad={true}
            />
          </div>

          {/* Year and Month Navigation */}
          <div className="mb-6 bg-card rounded-lg border">
            {/* Years Row */}
            <div className="flex items-center justify-center border-b bg-muted/20 rounded-t-lg">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`px-8 py-3 text-sm font-medium transition-colors ${
                    selectedYear === year
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
            
            {/* Quarters Row */}
            <div className="flex items-center justify-center overflow-x-auto">
              {availableQuarters.map((quarter) => (
                <button
                  key={quarter}
                  onClick={() => setSelectedQuarter(quarter)}
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-r last:border-r-0 ${
                    selectedQuarter === quarter
                      ? "bg-purple-100 text-purple-700 border-purple-200"
                      : "hover:bg-muted/50 text-muted-foreground"
                  }`}
                >
                  {quarter}
                </button>
              ))}
            </div>
          </div>
          {/* Month Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {currentData.months.map((month, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{month.name}</h3>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{formatNumber(month.availableFunds)}</span>
                    <span className="text-muted-foreground">Available Funds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>-{formatNumber(Math.abs(month.overspent))}</span>
                    <span className="text-muted-foreground">Overspent in Apr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{formatNumber(month.budgeted)}</span>
                    <span className="text-muted-foreground">Budgeted</span>
                  </div>
                  <div className="flex justify-between">
                    <span>-{formatNumber(Math.abs(month.forNextMonth))}</span>
                    <span className="text-muted-foreground">For Next Month</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">To Budget:</p>
                    <p className="text-3xl font-bold text-purple-600">{formatNumber(month.toBudget)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Budget Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="w-80">Category</TableHead>
                      <TableHead className="text-center w-32">Budgeted<br/>32 000</TableHead>
                      <TableHead className="text-center w-32">Spent<br/>-27 480</TableHead>
                      <TableHead className="text-center w-32">Balance<br/>19 923</TableHead>
                      <TableHead className="text-center w-32">Budgeted<br/>32 000</TableHead>
                      <TableHead className="text-center w-32">Spent<br/>-27 279</TableHead>
                      <TableHead className="text-center w-32">Balance<br/>24 636</TableHead>
                      <TableHead className="text-center w-32">Budgeted<br/>32 000</TableHead>
                      <TableHead className="text-center w-32">Spent<br/>-27 403</TableHead>
                      <TableHead className="text-center w-32">Balance<br/>29 002</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentData.categories.map((category, categoryIndex) => (
                      <React.Fragment key={categoryIndex}>
                        <TableRow className="hover:bg-muted/20">
                          <TableCell className="flex items-center gap-2 py-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-0 h-6 w-6"
                              onClick={() => toggleCategory(category.name)}
                            >
                              {expandedCategories.includes(category.name) ? 
                                <ChevronDown className="h-4 w-4" /> : 
                                <ChevronRight className="h-4 w-4" />
                              }
                            </Button>
                            <span className="font-medium">{category.name}</span>
                          </TableCell>
                          
                          {/* Empty cells for category header */}
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                        </TableRow>

                        {expandedCategories.includes(category.name) && category.items && category.items.map((item, itemIndex) => {
                          const monthKeys = getCurrentMonthKeys();
                          return (
                            <TableRow key={itemIndex} className="hover:bg-muted/10">
                              <TableCell className="pl-12">{item.name}</TableCell>
                              {monthKeys.map((monthKey, idx) => {
                                const monthData = item[monthKey] || { budgeted: 0, spent: 0, balance: 0 };
                                return (
                                  <React.Fragment key={`${monthKey}-${idx}`}>
                                    <TableCell className="text-center">{formatNumber(monthData.budgeted)}</TableCell>
                                    <TableCell className="text-center">{formatNumber(monthData.spent)}</TableCell>
                                    <TableCell className="text-center">{formatNumber(monthData.balance)}</TableCell>
                                  </React.Fragment>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                      </React.Fragment>
                    ))}

                    {/* Add Group Button */}
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-4">
                        <Button variant="outline" size="sm">
                          Add Group
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* Income Section */}
                    <TableRow className="border-t-2">
                      <TableCell className="flex items-center gap-2 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-6 w-6"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <span className="font-medium">Income</span>
                      </TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center font-medium">Received</TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center font-medium">Received</TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center font-medium">Received</TableCell>
                    </TableRow>
                    
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center font-bold">32000</TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center font-bold">32000</TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center font-bold">33253</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Budget;