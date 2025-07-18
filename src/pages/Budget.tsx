import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

const budgetData = {
  months: [
    {
      name: "Mayo",
      availableFunds: 32000,
      overspent: 0,
      budgeted: -32000,
      forNextMonth: 0,
      toBudget: 0
    },
    {
      name: "Junio", 
      availableFunds: 32000,
      overspent: 0,
      budgeted: -32000,
      forNextMonth: 0,
      toBudget: 0
    },
    {
      name: "Julio",
      availableFunds: 33253,
      overspent: 0,
      budgeted: -32000,
      forNextMonth: 0,
      toBudget: 1253
    }
  ],
  categories: [
    {
      name: "Gastos Realmente Importantes",
      expanded: true,
      items: [
        {
          name: "Nómina y Salarios",
          may: { budgeted: 19950, spent: -17766, balance: 10511 },
          june: { budgeted: 21850, spent: -16230, balance: 16131 },
          july: { budgeted: 20950, spent: -17367, balance: 19714 }
        },
        {
          name: "Software y Licencias",
          may: { budgeted: 13700, spent: -13504, balance: 840 },
          june: { budgeted: 13700, spent: -13504, balance: 1036 },
          july: { budgeted: 13700, spent: -13504, balance: 1232 }
        },
        {
          name: "Seguros",
          may: { budgeted: 650, spent: -1237, balance: 126 },
          june: { budgeted: 650, spent: 0, balance: 776 },
          july: { budgeted: 650, spent: -1237, balance: 189 }
        },
        {
          name: "Internet",
          may: { budgeted: 880, spent: -873, balance: 28 },
          june: { budgeted: 880, spent: -873, balance: 35 },
          july: { budgeted: 880, spent: -873, balance: 42 }
        },
        {
          name: "Electricidad",
          may: { budgeted: 2000, spent: -2152, balance: 1162 },
          june: { budgeted: 2000, spent: -1853, balance: 1309 },
          july: { budgeted: 2000, spent: -1753, balance: 1556 }
        },
        {
          name: "Ahorros para imprevistos",
          may: { budgeted: 2720, spent: 0, balance: 8355 },
          june: { budgeted: 4620, spent: 0, balance: 12975 },
          july: { budgeted: 3720, spent: 0, balance: 16695 }
        }
      ]
    },
    {
      name: "Gastos Diarios",
      expanded: true,
      total: {
        may: { budgeted: 12050, spent: -9714, balance: 9412 },
        june: { budgeted: 10150, spent: -11065, balance: 8497 },
        july: { budgeted: 11050, spent: -10036, balance: 9511 }
      }
    }
  ],
  income: {
    may: { received: 32000 },
    june: { received: 32000 },
    july: { received: 33253 }
  }
};

const formatNumber = (num: number) => {
  if (num === 0) return "0";
  return num.toLocaleString();
};

const Budget = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Gastos Realmente Importantes", "Gastos Diarios"]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="ml-64 pt-16 p-4">
        <div className="max-w-full">
          {/* Month Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {budgetData.months.map((month, index) => (
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
                    {budgetData.categories.map((category, categoryIndex) => (
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
                          
                          {category.total && (
                            <>
                              <TableCell className="text-center">{formatNumber(category.total.may.budgeted)}</TableCell>
                              <TableCell className="text-center">{formatNumber(category.total.may.spent)}</TableCell>
                              <TableCell className="text-center">{formatNumber(category.total.may.balance)}</TableCell>
                              <TableCell className="text-center">{formatNumber(category.total.june.budgeted)}</TableCell>
                              <TableCell className="text-center">{formatNumber(category.total.june.spent)}</TableCell>
                              <TableCell className="text-center">{formatNumber(category.total.june.balance)}</TableCell>
                              <TableCell className="text-center">{formatNumber(category.total.july.budgeted)}</TableCell>
                              <TableCell className="text-center">{formatNumber(category.total.july.spent)}</TableCell>
                              <TableCell className="text-center">{formatNumber(category.total.july.balance)}</TableCell>
                            </>
                          )}
                          
                          {!category.total && (
                            <>
                              <TableCell className="text-center"></TableCell>
                              <TableCell className="text-center"></TableCell>
                              <TableCell className="text-center"></TableCell>
                              <TableCell className="text-center"></TableCell>
                              <TableCell className="text-center"></TableCell>
                              <TableCell className="text-center"></TableCell>
                              <TableCell className="text-center"></TableCell>
                              <TableCell className="text-center"></TableCell>
                              <TableCell className="text-center"></TableCell>
                            </>
                          )}
                        </TableRow>

                        {expandedCategories.includes(category.name) && category.items && category.items.map((item, itemIndex) => (
                          <TableRow key={itemIndex} className="hover:bg-muted/10">
                            <TableCell className="pl-12">{item.name}</TableCell>
                            <TableCell className="text-center">{formatNumber(item.may.budgeted)}</TableCell>
                            <TableCell className="text-center">{formatNumber(item.may.spent)}</TableCell>
                            <TableCell className="text-center">{formatNumber(item.may.balance)}</TableCell>
                            <TableCell className="text-center">{formatNumber(item.june.budgeted)}</TableCell>
                            <TableCell className="text-center">{formatNumber(item.june.spent)}</TableCell>
                            <TableCell className="text-center">{formatNumber(item.june.balance)}</TableCell>
                            <TableCell className="text-center">{formatNumber(item.july.budgeted)}</TableCell>
                            <TableCell className="text-center">{formatNumber(item.july.spent)}</TableCell>
                            <TableCell className="text-center">{formatNumber(item.july.balance)}</TableCell>
                          </TableRow>
                        ))}
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
                      <TableCell className="text-center font-bold">{formatNumber(budgetData.income.may.received)}</TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center font-bold">{formatNumber(budgetData.income.june.received)}</TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center"></TableCell>
                      <TableCell className="text-center font-bold">{formatNumber(budgetData.income.july.received)}</TableCell>
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