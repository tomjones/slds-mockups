import React, { useState, useMemo } from 'react';
import Icon from '@salesforce/design-system-react/components/icon';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import Button from '@salesforce/design-system-react/components/button';

/**
 * SAP B1 Account Components Mockup
 *
 * Lightning components for SAP Business One integration on Account record pages.
 *
 * Key Component: Sales by Product (Jan 2025 - Jan 2026)
 * - Shows product sales in kg units
 * - Organized by Product Category (instead of compound categories)
 * - Full 13-month pivot table view with monthly breakdowns
 */

const SAPB1AccountComponents = () => {
  const [timeframe, setTimeframe] = useState('YTD');

  // Sales by Product data (12 months: Jan 2025 - Jan 2026)
  // Organized by Product Category for pivot table display
  const productSales = useMemo(() => ({
    months: [
      { id: 'jan25', label: 'January 2025' },
      { id: 'feb', label: 'February 2025' },
      { id: 'mar', label: 'March 2025' },
      { id: 'apr', label: 'April 2025' },
      { id: 'may', label: 'May 2025' },
      { id: 'jun', label: 'June 2025' },
      { id: 'jul', label: 'July 2025' },
      { id: 'aug', label: 'August 2025' },
      { id: 'sep', label: 'September 2025' },
      { id: 'oct', label: 'October 2025' },
      { id: 'nov', label: 'November 2025' },
      { id: 'dec', label: 'December 2025' },
      { id: 'jan26', label: 'January 2026' }
    ],
    categories: [
      {
        name: 'GLP Products',
        color: '#1589ee',
        products: [
          {
            name: 'GLB Custom Witch Hazel 2335 5X GL',
            itemCode: 'GLB-2335.5D',
            sales: {
              jan25: { kg: 450.5, revenue: 22525.00 },
              feb: { kg: 478.2, revenue: 23910.00 },
              mar: { kg: 492.8, revenue: 24640.00 },
              apr: null,
              may: { kg: 520.3, revenue: 26015.00 },
              jun: { kg: 545.7, revenue: 27285.00 },
              jul: { kg: 498.1, revenue: 24905.00 },
              aug: { kg: 510.4, revenue: 25520.00 },
              sep: { kg: 532.9, revenue: 26645.00 },
              oct: { kg: 568.2, revenue: 28410.00 },
              nov: { kg: 521.6, revenue: 26080.00 },
              dec: { kg: 612.3, revenue: 30615.00 },
              jan26: { kg: 585.9, revenue: 29295.00 }
            }
          },
          {
            name: 'GreenGard PA3',
            itemCode: 'GLE-10069',
            sales: {
              jan25: null,
              feb: null,
              mar: null,
              apr: null,
              may: { kg: 320.5, revenue: 16025.00 },
              jun: { kg: 345.2, revenue: 17260.00 },
              jul: { kg: 368.7, revenue: 18435.00 },
              aug: null,
              sep: { kg: 385.4, revenue: 19270.00 },
              oct: { kg: 402.1, revenue: 20105.00 },
              nov: { kg: 425.8, revenue: 21290.00 },
              dec: { kg: 458.3, revenue: 22915.00 },
              jan26: { kg: 442.7, revenue: 22135.00 }
            }
          },
          {
            name: 'GreenSens P30 MB',
            itemCode: 'GLE-10095',
            sales: {
              jan25: { kg: 180.3, revenue: 9015.00 },
              feb: { kg: 195.7, revenue: 9785.00 },
              mar: { kg: 202.4, revenue: 10120.00 },
              apr: { kg: 188.9, revenue: 9445.00 },
              may: { kg: 215.6, revenue: 10780.00 },
              jun: null,
              jul: { kg: 198.2, revenue: 9910.00 },
              aug: { kg: 205.8, revenue: 10290.00 },
              sep: null,
              oct: { kg: 228.5, revenue: 11425.00 },
              nov: { kg: 212.3, revenue: 10615.00 },
              dec: { kg: 245.7, revenue: 12285.00 },
              jan26: { kg: 232.1, revenue: 11605.00 }
            }
          }
        ]
      },
      {
        name: 'Non-GLP Products',
        color: '#4bca81',
        products: [
          {
            name: 'ElderMax BF',
            itemCode: 'GLA-11005',
            sales: {
              jan25: { kg: 280.5, revenue: 14025.00 },
              feb: { kg: 295.8, revenue: 14790.00 },
              mar: { kg: 302.1, revenue: 15105.00 },
              apr: { kg: 288.4, revenue: 14420.00 },
              may: null,
              jun: { kg: 318.7, revenue: 15935.00 },
              jul: { kg: 325.2, revenue: 16260.00 },
              aug: { kg: 312.6, revenue: 15630.00 },
              sep: { kg: 335.9, revenue: 16795.00 },
              oct: { kg: 348.3, revenue: 17415.00 },
              nov: null,
              dec: { kg: 372.5, revenue: 18625.00 },
              jan26: { kg: 358.1, revenue: 17905.00 }
            }
          },
          {
            name: 'GLB Royal Jelly 10GLY',
            itemCode: 'BH6300',
            sales: {
              jan25: null,
              feb: null,
              mar: null,
              apr: null,
              may: null,
              jun: { kg: 150.2, revenue: 7510.00 },
              jul: { kg: 162.7, revenue: 8135.00 },
              aug: null,
              sep: null,
              oct: { kg: 175.4, revenue: 8770.00 },
              nov: { kg: 188.9, revenue: 9445.00 },
              dec: { kg: 202.3, revenue: 10115.00 },
              jan26: { kg: 195.6, revenue: 9780.00 }
            }
          },
          {
            name: 'GreenSolv Clear',
            itemCode: 'GLE-10081',
            sales: {
              jan25: { kg: 420.8, revenue: 21040.00 },
              feb: { kg: 438.5, revenue: 21925.00 },
              mar: { kg: 445.2, revenue: 22260.00 },
              apr: { kg: 428.1, revenue: 21405.00 },
              may: { kg: 462.9, revenue: 23145.00 },
              jun: { kg: 478.3, revenue: 23915.00 },
              jul: { kg: 455.7, revenue: 22785.00 },
              aug: { kg: 448.2, revenue: 22410.00 },
              sep: { kg: 485.6, revenue: 24280.00 },
              oct: { kg: 472.4, revenue: 23620.00 },
              nov: { kg: 508.9, revenue: 25445.00 },
              dec: null,
              jan26: { kg: 495.2, revenue: 24760.00 }
            }
          }
        ]
      },
      {
        name: 'Wax & Specialty Products',
        color: '#fe9339',
        products: [
          {
            name: 'GreenWax GL',
            itemCode: 'GLE-10054-020',
            sales: {
              jan25: { kg: 125.3, revenue: 6265.00 },
              feb: null,
              mar: { kg: 132.7, revenue: 6635.00 },
              apr: { kg: 138.2, revenue: 6910.00 },
              may: { kg: 145.6, revenue: 7280.00 },
              jun: { kg: 152.1, revenue: 7605.00 },
              jul: null,
              aug: { kg: 148.9, revenue: 7445.00 },
              sep: { kg: 158.4, revenue: 7920.00 },
              oct: null,
              nov: { kg: 172.8, revenue: 8640.00 },
              dec: { kg: 185.2, revenue: 9260.00 },
              jan26: null
            }
          },
          {
            name: 'GreenSoft PG5O',
            itemCode: 'GLE-10050',
            sales: {
              jan25: { kg: 220.5, revenue: 11025.00 },
              feb: { kg: 235.8, revenue: 11790.00 },
              mar: { kg: 242.3, revenue: 12115.00 },
              apr: { kg: 228.7, revenue: 11435.00 },
              may: { kg: 255.9, revenue: 12795.00 },
              jun: { kg: 268.4, revenue: 13420.00 },
              jul: { kg: 251.2, revenue: 12560.00 },
              aug: { kg: 245.6, revenue: 12280.00 },
              sep: { kg: 272.8, revenue: 13640.00 },
              oct: { kg: 265.3, revenue: 13265.00 },
              nov: { kg: 285.7, revenue: 14285.00 },
              dec: { kg: 298.1, revenue: 14905.00 },
              jan26: { kg: 288.4, revenue: 14420.00 }
            }
          }
        ]
      }
    ]
  }), []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);
  };

  // Component wrapper for visual separation
  const ComponentCard = ({ title, children, actions }) => (
    <div style={{
      backgroundColor: 'white',
      border: '2px solid #0176d3',
      borderRadius: '4px',
      padding: '20px',
      marginBottom: '24px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '16px',
        backgroundColor: '#0176d3',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        SAP B1 Component
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 className="slds-text-heading_small" style={{ margin: 0 }}>{title}</h3>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Sales by Product Component */}
        <ComponentCard
          title="Sales by Product (Jan 2025 - Jan 2026)"
          actions={<Button label="Export to Excel" variant="neutral" iconCategory="utility" iconName="download" />}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #dddbda' }}>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    backgroundColor: '#fafaf9',
                    fontWeight: '700',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    color: '#706e6b',
                    position: 'sticky',
                    left: 0,
                    zIndex: 2,
                    minWidth: '250px'
                  }}>
                    Product Name
                  </th>
                  <th style={{
                    padding: '12px',
                    textAlign: 'left',
                    backgroundColor: '#fafaf9',
                    fontWeight: '700',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    color: '#706e6b',
                    minWidth: '120px'
                  }}>
                    Item Code
                  </th>
                  {productSales.months.map((month) => (
                    <th key={month.id} style={{
                      padding: '12px',
                      textAlign: 'center',
                      backgroundColor: '#fafaf9',
                      fontWeight: '700',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      color: '#706e6b',
                      minWidth: '140px'
                    }}>
                      {month.label}
                    </th>
                  ))}
                  <th style={{
                    padding: '12px',
                    textAlign: 'center',
                    backgroundColor: '#f3f3f3',
                    fontWeight: '700',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    color: '#080707',
                    minWidth: '140px',
                    borderLeft: '2px solid #dddbda'
                  }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {productSales.categories.map((category, catIdx) => {
                  // Calculate category totals
                  const categoryTotals = productSales.months.map(month => {
                    let kg = 0;
                    let revenue = 0;
                    category.products.forEach(prod => {
                      const sales = prod.sales[month.id];
                      if (sales) {
                        kg += sales.kg;
                        revenue += sales.revenue;
                      }
                    });
                    return { kg, revenue };
                  });

                  const categoryGrandTotal = categoryTotals.reduce((sum, t) => ({
                    kg: sum.kg + t.kg,
                    revenue: sum.revenue + t.revenue
                  }), { kg: 0, revenue: 0 });

                  return (
                    <React.Fragment key={category.name}>
                      {/* Category Header Row */}
                      <tr style={{
                        backgroundColor: `${category.color}15`,
                        borderTop: catIdx > 0 ? '2px solid #dddbda' : 'none'
                      }}>
                        <td colSpan={productSales.months.length + 3} style={{
                          padding: '10px 12px',
                          fontWeight: '700',
                          fontSize: '13px',
                          color: category.color,
                          position: 'sticky',
                          left: 0,
                          zIndex: 1
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Icon category="utility" name="product" size="x-small" style={{ fill: category.color }} />
                            {category.name}
                          </div>
                        </td>
                      </tr>

                      {/* Product Rows */}
                      {category.products.map((product, prodIdx) => {
                        // Calculate product row totals
                        const rowTotal = productSales.months.reduce((sum, month) => {
                          const sales = product.sales[month.id];
                          return {
                            kg: sum.kg + (sales ? sales.kg : 0),
                            revenue: sum.revenue + (sales ? sales.revenue : 0)
                          };
                        }, { kg: 0, revenue: 0 });

                        return (
                          <tr key={product.itemCode} style={{
                            borderBottom: '1px solid #e5e5e5'
                          }}>
                            <td style={{
                              padding: '12px',
                              paddingLeft: '24px',
                              fontWeight: '500',
                              color: '#080707',
                              backgroundColor: '#fafaf9',
                              position: 'sticky',
                              left: 0,
                              zIndex: 1,
                              borderRight: '1px solid #dddbda'
                            }}>
                              {product.name}
                            </td>
                            <td style={{
                              padding: '12px',
                              fontFamily: 'monospace',
                              fontSize: '12px',
                              color: '#706e6b'
                            }}>
                              {product.itemCode}
                            </td>
                            {productSales.months.map((month) => {
                              const sales = product.sales[month.id];
                              return (
                                <td key={month.id} style={{
                                  padding: '12px',
                                  textAlign: 'center',
                                  backgroundColor: sales ? category.color : 'white',
                                  color: sales ? 'white' : '#706e6b',
                                  transition: 'all 0.2s'
                                }}>
                                  {sales ? (
                                    <div>
                                      <div style={{ fontWeight: '700', marginBottom: '2px', fontSize: '14px' }}>
                                        {formatNumber(sales.kg)} kg
                                      </div>
                                      <div style={{ fontSize: '11px', opacity: 0.9 }}>
                                        {formatCurrency(sales.revenue)}
                                      </div>
                                    </div>
                                  ) : (
                                    <div style={{ color: '#c9c9c9' }}>-</div>
                                  )}
                                </td>
                              );
                            })}
                            <td style={{
                              padding: '12px',
                              textAlign: 'center',
                              backgroundColor: category.color,
                              borderLeft: '2px solid #dddbda',
                              fontWeight: '700',
                              color: 'white'
                            }}>
                              <div>
                                <div style={{ marginBottom: '2px', fontSize: '14px' }}>
                                  {formatNumber(rowTotal.kg)} kg
                                </div>
                                <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.9 }}>
                                  {formatCurrency(rowTotal.revenue)}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {/* Category Subtotal Row */}
                      <tr style={{
                        backgroundColor: `${category.color}25`,
                        borderBottom: '2px solid #dddbda'
                      }}>
                        <td colSpan={2} style={{
                          padding: '10px 12px',
                          fontWeight: '700',
                          fontSize: '12px',
                          color: category.color,
                          backgroundColor: `${category.color}25`,
                          position: 'sticky',
                          left: 0,
                          zIndex: 1,
                          borderRight: '1px solid #dddbda'
                        }}>
                          {category.name} Total
                        </td>
                        {categoryTotals.map((totals, idx) => (
                          <td key={idx} style={{
                            padding: '10px 12px',
                            textAlign: 'center',
                            fontWeight: '700',
                            color: category.color,
                            fontSize: '12px'
                          }}>
                            {totals.kg > 0 ? (
                              <div>
                                <div style={{ marginBottom: '2px' }}>
                                  {formatNumber(totals.kg)} kg
                                </div>
                                <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.8 }}>
                                  {formatCurrency(totals.revenue)}
                                </div>
                              </div>
                            ) : (
                              '-'
                            )}
                          </td>
                        ))}
                        <td style={{
                          padding: '10px 12px',
                          textAlign: 'center',
                          fontWeight: '700',
                          color: category.color,
                          fontSize: '12px',
                          backgroundColor: `${category.color}35`,
                          borderLeft: '2px solid #dddbda'
                        }}>
                          <div>
                            <div style={{ marginBottom: '2px' }}>
                              {formatNumber(categoryGrandTotal.kg)} kg
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.8 }}>
                              {formatCurrency(categoryGrandTotal.revenue)}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid #dddbda', backgroundColor: '#f9f9f9' }}>
                  <td colSpan={2} style={{
                    padding: '12px',
                    fontWeight: '700',
                    color: '#080707',
                    position: 'sticky',
                    left: 0,
                    backgroundColor: '#f9f9f9',
                    zIndex: 1
                  }}>
                    Grand Total (All Products)
                  </td>
                  {productSales.months.map((month) => {
                    const monthTotal = productSales.categories.reduce((sum, cat) => {
                      return {
                        kg: sum.kg + cat.products.reduce((catSum, prod) => {
                          const sales = prod.sales[month.id];
                          return catSum + (sales ? sales.kg : 0);
                        }, 0),
                        revenue: sum.revenue + cat.products.reduce((catSum, prod) => {
                          const sales = prod.sales[month.id];
                          return catSum + (sales ? sales.revenue : 0);
                        }, 0)
                      };
                    }, { kg: 0, revenue: 0 });

                    return (
                      <td key={month.id} style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontWeight: '700',
                        color: '#080707'
                      }}>
                        {monthTotal.kg > 0 ? (
                          <div>
                            <div style={{ marginBottom: '2px' }}>
                              {formatNumber(monthTotal.kg)} kg
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#706e6b' }}>
                              {formatCurrency(monthTotal.revenue)}
                            </div>
                          </div>
                        ) : (
                          '-'
                        )}
                      </td>
                    );
                  })}
                  <td style={{
                    padding: '12px',
                    textAlign: 'center',
                    fontWeight: '700',
                    color: '#080707',
                    backgroundColor: '#e5e5e5',
                    borderLeft: '2px solid #dddbda'
                  }}>
                    {(() => {
                      const grandTotal = productSales.categories.reduce((sum, cat) => {
                        return {
                          kg: sum.kg + cat.products.reduce((catSum, prod) => {
                            const prodTotal = productSales.months.reduce((monthSum, month) => {
                              const sales = prod.sales[month.id];
                              return monthSum + (sales ? sales.kg : 0);
                            }, 0);
                            return catSum + prodTotal;
                          }, 0),
                          revenue: sum.revenue + cat.products.reduce((catSum, prod) => {
                            const prodTotal = productSales.months.reduce((monthSum, month) => {
                              const sales = prod.sales[month.id];
                              return monthSum + (sales ? sales.revenue : 0);
                            }, 0);
                            return catSum + prodTotal;
                          }, 0)
                        };
                      }, { kg: 0, revenue: 0 });

                      return (
                        <div>
                          <div style={{ marginBottom: '2px', fontSize: '16px' }}>
                            {formatNumber(grandTotal.kg)} kg
                          </div>
                          <div style={{ fontSize: '12px', fontWeight: '600', color: '#706e6b' }}>
                            {formatCurrency(grandTotal.revenue)}
                          </div>
                        </div>
                      );
                    })()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </ComponentCard>

        {/* Info Footer */}
        <div style={{
          backgroundColor: '#f3f2f2',
          padding: '16px',
          borderRadius: '4px',
          marginTop: '24px'
        }}>
          <p style={{ fontSize: '12px', color: '#706e6b', margin: 0, textAlign: 'center' }}>
            <strong>SAP Business One Integration:</strong> This component displays product sales data synced from SAP B1,
            showing quantities in kilograms (kg) organized by Product Category. Data includes monthly breakdowns with revenue tracking
            for comprehensive sales analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SAPB1AccountComponents;
