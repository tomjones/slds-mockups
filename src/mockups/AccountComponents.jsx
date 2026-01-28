import React, { useState, useMemo } from 'react';
import Icon from '@salesforce/design-system-react/components/icon';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import Button from '@salesforce/design-system-react/components/button';

/**
 * AccountComponents Mockup
 *
 * This mockup demonstrates individual Lightning components that can be dragged and dropped
 * onto an Account record page. Each component shows metrics and insights specific to that
 * account, drawing from the FillDashboard analytics.
 *
 * Key Components from FillDashboard adapted for Account context:
 * 1. Account Performance Metrics (Revenue, Fill Count, Avg Revenue per Fill, Order Frequency)
 * 2. Revenue Trend Chart (12-month view)
 * 3. Product Mix (Compound Categories specific to this account)
 * 4. Account Health Score
 * 5. Recent Orders List
 * 6. Activity Timeline
 * 7. Growth Indicators (vs prior period)
 * 8. Quick Stats Cards
 */

const AccountComponents = () => {
  const [timeframe, setTimeframe] = useState('MTD'); // MTD, QTD, YTD

  // Key performance metrics by timeframe (from FillDashboard context)
  const metrics = useMemo(() => ({
    MTD: {
      revenue: 42380.00,
      fillCount: 108,
      avgRevenuePerFill: 392.41,
      orderFrequency: 7.7,
      priorRevenue: 38950.00,
      priorFillCount: 102,
      priorAvgRevenue: 381.86,
      priorOrderFrequency: 8.2
    },
    QTD: {
      revenue: 124560.00,
      fillCount: 316,
      avgRevenuePerFill: 394.18,
      orderFrequency: 7.5,
      priorRevenue: 116340.00,
      priorFillCount: 298,
      priorAvgRevenue: 390.34,
      priorOrderFrequency: 8.0
    },
    YTD: {
      revenue: 512840.00,
      fillCount: 1304,
      avgRevenuePerFill: 393.28,
      orderFrequency: 7.6,
      priorRevenue: 478920.00,
      priorFillCount: 1247,
      priorAvgRevenue: 384.12,
      priorOrderFrequency: 8.3
    }
  }), []);

  // Revenue trend data (12 months)
  const revenueTrend = useMemo(() => [
    { date: 'Jan', revenue: 42100 },
    { date: 'Feb', revenue: 44500 },
    { date: 'Mar', revenue: 43800 },
    { date: 'Apr', revenue: 41200 },
    { date: 'May', revenue: 45900 },
    { date: 'Jun', revenue: 46700 },
    { date: 'Jul', revenue: 44100 },
    { date: 'Aug', revenue: 47200 },
    { date: 'Sep', revenue: 48500 },
    { date: 'Oct', revenue: 43900 },
    { date: 'Nov', revenue: 46200 },
    { date: 'Dec', revenue: 42380 }
  ], []);

  // Recent fills data
  const recentFills = useMemo(() => [
    {
      id: 'RX-28743',
      fillDate: '2026-01-18',
      dateWritten: '2026-01-15',
      status: 'Filled',
      statusColor: '#2e844a',
      revenue: 892.51,
      paymentType: 'Insurance',
      leadingIngredient: 'Semaglutide',
      category: 'GLP'
    },
    {
      id: 'RX-28621',
      fillDate: '2026-01-17',
      dateWritten: '2026-01-10',
      status: 'Filled',
      statusColor: '#2e844a',
      revenue: 456.00,
      paymentType: 'Cash Pay',
      leadingIngredient: 'Testosterone Cypionate',
      category: 'Non-GLP'
    },
    {
      id: 'RX-28590',
      fillDate: '2026-01-16',
      dateWritten: '2026-01-14',
      status: 'Filled',
      statusColor: '#2e844a',
      revenue: 1240.00,
      paymentType: 'Insurance',
      leadingIngredient: 'Tirzepatide',
      category: 'GLP'
    },
    {
      id: 'RX-28498',
      fillDate: null,
      dateWritten: '2026-01-12',
      status: 'Open',
      statusColor: '#0176d3',
      revenue: 678.50,
      paymentType: 'Insurance',
      leadingIngredient: 'NAD+',
      category: 'Non-GLP'
    },
    {
      id: 'RX-28376',
      fillDate: null,
      dateWritten: '2026-01-14',
      status: 'Open',
      statusColor: '#0176d3',
      revenue: 385.00,
      paymentType: 'Cash Pay',
      leadingIngredient: 'Progesterone',
      category: 'Non-GLP'
    },
    {
      id: 'RX-28254',
      fillDate: '2026-01-12',
      dateWritten: '2026-01-08',
      status: 'Filled',
      statusColor: '#2e844a',
      revenue: 324.00,
      paymentType: 'Cash Pay',
      leadingIngredient: 'Ketamine',
      category: 'ENT'
    },
    {
      id: 'RX-28103',
      fillDate: '2026-01-10',
      dateWritten: '2026-01-05',
      status: 'Deleted',
      statusColor: '#c23934',
      revenue: 725.00,
      paymentType: 'Insurance',
      leadingIngredient: 'BPC-157',
      category: 'Rare Disease'
    }
  ], []);

  // Product mix data (compound categories from FillDashboard)
  const productMix = useMemo(() => [
    { category: 'GLP', fillCount: 387, revenue: 152340.00, percentage: 29.7, color: '#1589ee' },
    { category: 'Non-GLP', fillCount: 298, revenue: 136920.00, percentage: 26.7, color: '#4bca81' },
    { category: 'Rare Disease', fillCount: 256, revenue: 102400.00, percentage: 20.0, color: '#fe9339' },
    { category: 'Folinic Acid', fillCount: 215, revenue: 73100.00, percentage: 14.2, color: '#9050e9' },
    { category: 'ENT', fillCount: 148, revenue: 48080.00, percentage: 9.4, color: '#e8b730' }
  ], []);

  // Account health indicators
  const healthScore = useMemo(() => ({
    overall: 85,
    status: 'Healthy',
    statusColor: '#2e844a',
    factors: [
      { name: 'Order Frequency', score: 92, status: 'Excellent', icon: 'date_time', color: '#2e844a' },
      { name: 'Revenue Growth', score: 88, status: 'Healthy', icon: 'trending_up', color: '#2e844a' },
      { name: 'Engagement', score: 75, status: 'Good', icon: 'record', color: '#4bca81' },
      { name: 'Product Mix', score: 82, status: 'Healthy', icon: 'chart', color: '#2e844a' }
    ]
  }), []);

  // Activity timeline
  const activityTimeline = useMemo(() => [
    {
      date: '2024-12-19',
      time: '10:45 AM',
      type: 'Order',
      icon: 'shopping_cart',
      color: '#0176d3',
      description: 'New order placed - ORD-18743',
      user: 'Dr. Michael Chen'
    },
    {
      date: '2024-12-18',
      time: '2:30 PM',
      type: 'Call',
      icon: 'call',
      color: '#2e844a',
      description: 'Follow-up call regarding product availability',
      user: 'Sarah Johnson'
    },
    {
      date: '2024-12-17',
      time: '11:20 AM',
      type: 'Email',
      icon: 'email',
      color: '#0176d3',
      description: 'Sent pricing update for Q1 2025',
      user: 'Sarah Johnson'
    }
  ], []);

  // Sales by Leading Ingredient data (12 months: Jan 2025 - Jan 2026)
  // Organized by Category for pivot table display
  const ingredientSales = useMemo(() => ({
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
        name: 'GLP',
        color: '#1589ee',
        ingredients: [
          {
            name: 'Semaglutide',
            sales: {
              jan25: { revenue: 7200.00, fills: 21 },
              feb: { revenue: 7800.00, fills: 22 },
              mar: { revenue: 8100.00, fills: 23 },
              apr: null,
              may: { revenue: 8900.00, fills: 25 },
              jun: { revenue: 9400.00, fills: 27 },
              jul: { revenue: 8200.00, fills: 23 },
              aug: { revenue: 8450.00, fills: 24 },
              sep: { revenue: 9200.00, fills: 26 },
              oct: { revenue: 10100.00, fills: 29 },
              nov: { revenue: 8900.00, fills: 25 },
              dec: { revenue: 11200.00, fills: 32 },
              jan26: { revenue: 9800.00, fills: 28 }
            }
          },
          {
            name: 'Tirzepatide',
            sales: {
              jan25: null,
              feb: null,
              mar: null,
              apr: null,
              may: { revenue: 10800.00, fills: 13 },
              jun: { revenue: 11500.00, fills: 14 },
              jul: { revenue: 12100.00, fills: 15 },
              aug: null,
              sep: { revenue: 12400.00, fills: 15 },
              oct: { revenue: 13200.00, fills: 16 },
              nov: { revenue: 14100.00, fills: 17 },
              dec: { revenue: 15800.00, fills: 19 },
              jan26: { revenue: 14500.00, fills: 18 }
            }
          }
        ]
      },
      {
        name: 'Non-GLP',
        color: '#4bca81',
        ingredients: [
          {
            name: 'Testosterone Cypionate',
            sales: {
              jan25: { revenue: 5800.00, fills: 17 },
              feb: { revenue: 6100.00, fills: 18 },
              mar: { revenue: 5900.00, fills: 17 },
              apr: { revenue: 6400.00, fills: 19 },
              may: { revenue: 6700.00, fills: 20 },
              jun: null,
              jul: { revenue: 6300.00, fills: 18 },
              aug: { revenue: 6200.00, fills: 18 },
              sep: null,
              oct: { revenue: 7100.00, fills: 21 },
              nov: { revenue: 6800.00, fills: 19 },
              dec: { revenue: 7500.00, fills: 22 },
              jan26: { revenue: 6900.00, fills: 20 }
            }
          },
          {
            name: 'Progesterone',
            sales: {
              jan25: { revenue: 3800.00, fills: 13 },
              feb: { revenue: 3900.00, fills: 13 },
              mar: { revenue: 4100.00, fills: 14 },
              apr: { revenue: 4000.00, fills: 13 },
              may: null,
              jun: { revenue: 4300.00, fills: 14 },
              jul: { revenue: 4400.00, fills: 15 },
              aug: { revenue: 4200.00, fills: 14 },
              sep: { revenue: 4500.00, fills: 15 },
              oct: { revenue: 4800.00, fills: 16 },
              nov: null,
              dec: { revenue: 5100.00, fills: 17 },
              jan26: { revenue: 4700.00, fills: 15 }
            }
          },
          {
            name: 'Estradiol',
            sales: {
              jan25: null,
              feb: null,
              mar: null,
              apr: null,
              may: null,
              jun: { revenue: 2500.00, fills: 11 },
              jul: { revenue: 2700.00, fills: 11 },
              aug: null,
              sep: null,
              oct: { revenue: 2800.00, fills: 12 },
              nov: { revenue: 3100.00, fills: 13 },
              dec: { revenue: 3300.00, fills: 14 },
              jan26: { revenue: 3000.00, fills: 12 }
            }
          },
          {
            name: 'NAD+',
            sales: {
              jan25: { revenue: 5100.00, fills: 15 },
              feb: { revenue: 5300.00, fills: 15 },
              mar: { revenue: 5500.00, fills: 16 },
              apr: { revenue: 5200.00, fills: 15 },
              may: { revenue: 5800.00, fills: 17 },
              jun: { revenue: 6000.00, fills: 17 },
              jul: { revenue: 5700.00, fills: 16 },
              aug: { revenue: 5600.00, fills: 16 },
              sep: { revenue: 6100.00, fills: 18 },
              oct: { revenue: 5800.00, fills: 17 },
              nov: { revenue: 6400.00, fills: 19 },
              dec: null,
              jan26: { revenue: 6200.00, fills: 18 }
            }
          }
        ]
      },
      {
        name: 'ENT',
        color: '#fe9339',
        ingredients: [
          {
            name: 'Ketamine',
            sales: {
              jan25: { revenue: 2800.00, fills: 7 },
              feb: null,
              mar: { revenue: 2900.00, fills: 7 },
              apr: { revenue: 3000.00, fills: 8 },
              may: { revenue: 3200.00, fills: 8 },
              jun: { revenue: 3100.00, fills: 8 },
              jul: null,
              aug: { revenue: 3100.00, fills: 8 },
              sep: { revenue: 3400.00, fills: 9 },
              oct: null,
              nov: { revenue: 3800.00, fills: 10 },
              dec: { revenue: 4100.00, fills: 11 },
              jan26: null
            }
          }
        ]
      }
    ]
  }), []);

  // UP/DOWN Leading Ingredients data (Last 3 months vs Prior 3 months)
  // Current Period: Nov-Dec 2025, Jan 2026 vs Prior Period: Aug-Sep-Oct 2025
  const ingredientTrends = useMemo(() => {
    const ingredients = [
      {
        name: 'Semaglutide',
        category: 'GLP',
        priorRevenue: 25750.00,
        priorFills: 73,
        currentRevenue: 39300.00,
        currentFills: 112,
        lastFillDate: '2026-01-15'
      },
      {
        name: 'Tirzepatide',
        category: 'GLP',
        priorRevenue: 25600.00,
        priorFills: 31,
        currentRevenue: 44400.00,
        currentFills: 54,
        lastFillDate: '2026-01-14'
      },
      {
        name: 'NAD+',
        category: 'Non-GLP',
        priorRevenue: 17300.00,
        priorFills: 50,
        currentRevenue: 18400.00,
        currentFills: 55,
        lastFillDate: '2026-01-18'
      },
      {
        name: 'Progesterone',
        category: 'Non-GLP',
        priorRevenue: 13700.00,
        priorFills: 45,
        currentRevenue: 14600.00,
        currentFills: 47,
        lastFillDate: '2026-01-12'
      },
      {
        name: 'Testosterone Cypionate',
        category: 'Non-GLP',
        priorRevenue: 20100.00,
        priorFills: 58,
        currentRevenue: 21200.00,
        currentFills: 61,
        lastFillDate: '2026-01-16'
      },
      {
        name: 'Ketamine',
        category: 'ENT',
        priorRevenue: 10300.00,
        priorFills: 27,
        currentRevenue: 7900.00,
        currentFills: 21,
        lastFillDate: '2025-12-28'
      },
      {
        name: 'Estradiol',
        category: 'Non-GLP',
        priorRevenue: 8700.00,
        priorFills: 37,
        currentRevenue: 9400.00,
        currentFills: 39,
        lastFillDate: '2026-01-10'
      },
      {
        name: 'Sermorelin',
        category: 'GLP',
        priorRevenue: 12400.00,
        priorFills: 34,
        currentRevenue: 8900.00,
        currentFills: 24,
        lastFillDate: '2025-12-22'
      },
      {
        name: 'BPC-157',
        category: 'Rare Disease',
        priorRevenue: 6800.00,
        priorFills: 18,
        currentRevenue: 4200.00,
        currentFills: 11,
        lastFillDate: '2025-12-18'
      },
      {
        name: 'Folinic Acid',
        category: 'Folinic Acid',
        priorRevenue: 5600.00,
        priorFills: 22,
        currentRevenue: 7800.00,
        currentFills: 31,
        lastFillDate: '2026-01-17'
      },
      {
        name: 'Glutathione',
        category: 'Non-GLP',
        priorRevenue: 9200.00,
        priorFills: 28,
        currentRevenue: 10100.00,
        currentFills: 31,
        lastFillDate: '2026-01-11'
      },
      {
        name: 'TB-500',
        category: 'Rare Disease',
        priorRevenue: 7400.00,
        priorFills: 19,
        currentRevenue: 5100.00,
        currentFills: 13,
        lastFillDate: '2025-12-15'
      }
    ];

    // Calculate changes and categorize
    const withChanges = ingredients.map(ing => {
      const change = ing.currentRevenue - ing.priorRevenue;
      const percentChange = ing.priorRevenue > 0 ? ((change / ing.priorRevenue) * 100) : 0;
      return {
        ...ing,
        change,
        percentChange
      };
    });

    // Split into UP and DOWN
    const up = withChanges.filter(ing => ing.change > 0).sort((a, b) => b.change - a.change);
    const down = withChanges.filter(ing => ing.change < 0).sort((a, b) => a.change - b.change);

    // Calculate totals for percentage bars
    const upTotalRevenue = up.reduce((sum, ing) => sum + ing.currentRevenue, 0);
    const downTotalRevenue = down.reduce((sum, ing) => sum + ing.currentRevenue, 0);

    return {
      up: up.map(ing => ({ ...ing, totalRevenue: upTotalRevenue })),
      down: down.map(ing => ({ ...ing, totalRevenue: downTotalRevenue }))
    };
  }, []);

  const currentMetrics = metrics[timeframe];

  // Calculate percentage changes
  const calculateChange = (current, prior) => {
    const change = ((current - prior) / prior) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0
    };
  };

  const revenueChange = calculateChange(currentMetrics.revenue, currentMetrics.priorRevenue);
  const fillCountChange = calculateChange(currentMetrics.fillCount, currentMetrics.priorFillCount);
  const avgRevenueChange = calculateChange(currentMetrics.avgRevenuePerFill, currentMetrics.priorAvgRevenue);
  const orderFrequencyChange = {
    value: Math.abs(((currentMetrics.priorOrderFrequency - currentMetrics.orderFrequency) / currentMetrics.priorOrderFrequency) * 100).toFixed(1),
    isPositive: currentMetrics.orderFrequency < currentMetrics.priorOrderFrequency
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Status badge component
  const StatusBadge = ({ status, color }) => (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.125rem 0.5rem',
      backgroundColor: `${color}20`,
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      color: color
    }}>
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: color,
        marginRight: '0.375rem'
      }} />
      {status}
    </div>
  );

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
        Component
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

  // Metric card component - matches Fill Dashboard Executive Summary style
  const MetricCard = ({ title, value, format, change, icon }) => (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #dddbda',
      borderRadius: '4px',
      padding: '20px',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Icon category="utility" name={icon} size="x-small" style={{ fill: '#706e6b' }} />
            <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
              {title}
            </h3>
          </div>
          <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', marginBottom: '8px' }}>
            {format === 'currency' && '$'}
            {typeof value === 'number' ? value.toLocaleString('en-US', {
              minimumFractionDigits: format === 'currency' ? 2 : 0,
              maximumFractionDigits: format === 'currency' ? 2 : 0
            }) : value}
          </div>
          {change && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon
                category="utility"
                name={change.isPositive ? 'up' : 'down'}
                size="xx-small"
                style={{ fill: change.isPositive ? '#2e844a' : '#ea001e' }}
              />
              <span style={{
                fontSize: '13px',
                color: change.isPositive ? '#2e844a' : '#ea001e',
                fontWeight: 'bold'
              }}>
                {change.value}%
              </span>
              <span style={{ fontSize: '12px', color: '#706e6b' }}>
                vs prior period
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* COMPONENT 1: Account Performance Metrics */}
        <ComponentCard
          title="Account Performance Metrics"
          actions={
            <ButtonGroup variant="list">
              <Button
                label="MTD"
                variant={timeframe === 'MTD' ? 'brand' : 'neutral'}
                onClick={() => setTimeframe('MTD')}
              />
              <Button
                label="QTD"
                variant={timeframe === 'QTD' ? 'brand' : 'neutral'}
                onClick={() => setTimeframe('QTD')}
              />
              <Button
                label="YTD"
                variant={timeframe === 'YTD' ? 'brand' : 'neutral'}
                onClick={() => setTimeframe('YTD')}
              />
            </ButtonGroup>
          }
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            <MetricCard
              title="Total Revenue"
              value={currentMetrics.revenue}
              format="currency"
              change={revenueChange}
              icon="price_book_entries"
            />
            <MetricCard
              title="Fill Count"
              value={currentMetrics.fillCount}
              format="number"
              change={fillCountChange}
              icon="number_input"
            />
            <MetricCard
              title="Avg Revenue/Fill"
              value={currentMetrics.avgRevenuePerFill}
              format="currency"
              change={avgRevenueChange}
              icon="metrics"
            />
            <MetricCard
              title="Order Frequency"
              value={`${currentMetrics.orderFrequency} days`}
              format="text"
              change={orderFrequencyChange}
              icon="date_time"
            />
          </div>
        </ComponentCard>

        {/* COMPONENT 2: Quick Stats & Growth Indicators */}
        <ComponentCard
          title="Quick Stats & Growth Indicators"
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px'
          }}>
            {/* Lifetime Value */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
                      Lifetime Value
                    </h3>
                  </div>
                  <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', marginBottom: '8px' }}>
                    $1.2M
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#706e6b' }}>
                      1,304 fills
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Days Since Last Fill */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
                      Days Since Last Fill
                    </h3>
                  </div>
                  <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', marginBottom: '8px', color: '#2e844a' }}>
                    2
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#706e6b' }}>
                      Last Fill: Jan 18, 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Category */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
                      Account Category
                    </h3>
                  </div>
                  <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', marginBottom: '8px', color: '#2e844a' }}>
                    Active
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#706e6b' }}>
                      Last Change: Mar 15, 2024
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue Growth */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
                      Revenue Growth (YTD)
                    </h3>
                  </div>
                  <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', marginBottom: '8px', color: '#2e844a' }}>
                    +8.8%
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#706e6b' }}>
                      vs prior year
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fill Growth */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
                      Fill Growth (YTD)
                    </h3>
                  </div>
                  <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', marginBottom: '8px', color: '#0176d3' }}>
                    +4.6%
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#706e6b' }}>
                      vs prior year
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* COMPONENT 3: Revenue Trend */}
        <ComponentCard
          title="Revenue Trend - Last 12 Months"
          actions={<Button label="View Details" variant="neutral" />}
        >
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '180px',
            gap: '6px',
            padding: '16px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px'
          }}>
            {revenueTrend.map((item, index) => {
              const maxRevenue = Math.max(...revenueTrend.map(d => d.revenue));
              const height = (item.revenue / maxRevenue) * 150;
              return (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '100%',
                    height: `${height}px`,
                    backgroundColor: '#0176d3',
                    borderRadius: '3px 3px 0 0',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#014486'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0176d3'}
                  title={`${item.date}: ${formatCurrency(item.revenue)}`}
                  />
                  <div style={{ fontSize: '10px', color: '#706e6b', fontWeight: '600' }}>
                    {item.date}
                  </div>
                </div>
              );
            })}
          </div>
        </ComponentCard>

        {/* COMPONENT 3: Account Health Score */}
        <ComponentCard
          title="Account Health Score"
        >
          <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: `8px solid ${healthScore.statusColor}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white'
              }}>
                <div style={{ fontSize: '36px', fontWeight: '700', color: healthScore.statusColor }}>
                  {healthScore.overall}
                </div>
                <div style={{ fontSize: '11px', color: '#706e6b', fontWeight: '600' }}>
                  {healthScore.status}
                </div>
              </div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {healthScore.factors.map((factor, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #dddbda'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: `${factor.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon category="utility" name={factor.icon} size="xx-small" style={{ fill: factor.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#080707' }}>
                        {factor.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#706e6b' }}>
                        Score: {factor.score} - {factor.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* COMPONENT 4: Product Mix (Compound Categories) */}
        <ComponentCard
          title="Product Mix by Category (YTD)"
          actions={<Button label="View All Products" variant="neutral" />}
        >
          <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {productMix.map((product, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#080707' }}>
                      {product.category}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#080707' }}>
                      {product.percentage}%
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e5e5', borderRadius: '4px', overflow: 'hidden', marginBottom: '6px' }}>
                    <div style={{
                      width: `${product.percentage}%`,
                      height: '100%',
                      backgroundColor: product.color,
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#706e6b' }}>
                    <div>{formatNumber(product.fillCount)} fills</div>
                    <div>{formatCurrency(product.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentCard>

        {/* COMPONENT 5: Recent Fills */}
        <ComponentCard
          title="Recent Fills"
          actions={<Button label="View All Fills" variant="neutral" />}
        >
          <div style={{ backgroundColor: '#f9f9f9', borderRadius: '4px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#e5e5e5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#706e6b', textTransform: 'uppercase' }}>Rx #</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '11px', fontWeight: '700', color: '#706e6b', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#706e6b', textTransform: 'uppercase' }}>Date Written</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#706e6b', textTransform: 'uppercase' }}>Fill Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#706e6b', textTransform: 'uppercase' }}>Leading Ingredient</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '11px', fontWeight: '700', color: '#706e6b', textTransform: 'uppercase' }}>Category</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontSize: '11px', fontWeight: '700', color: '#706e6b', textTransform: 'uppercase' }}>Payment</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', fontWeight: '700', color: '#706e6b', textTransform: 'uppercase' }}>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {recentFills.map((fill, index) => (
                  <tr key={fill.id} style={{
                    backgroundColor: 'white',
                    borderTop: index > 0 ? '1px solid #e5e5e5' : 'none'
                  }}>
                    <td style={{ padding: '12px' }}>
                      <a href="#" style={{ color: '#0176d3', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
                        {fill.id}
                      </a>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <StatusBadge status={fill.status} color={fill.statusColor} />
                    </td>
                    <td style={{ padding: '12px', fontSize: '13px', color: '#706e6b' }}>
                      {new Date(fill.dateWritten).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '12px', fontSize: '13px', color: '#080707', fontWeight: '600' }}>
                      {fill.fillDate ? new Date(fill.fillDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                    </td>
                    <td style={{ padding: '12px', fontSize: '13px', color: '#080707' }}>
                      {fill.leadingIngredient}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        backgroundColor: '#f3f2f2',
                        borderRadius: '10px',
                        fontWeight: '600',
                        color: '#706e6b',
                        whiteSpace: 'nowrap'
                      }}>
                        {fill.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        backgroundColor: fill.paymentType === 'Insurance' ? '#e6f7e6' : '#e6f0ff',
                        borderRadius: '10px',
                        fontWeight: '600',
                        color: fill.paymentType === 'Insurance' ? '#2e844a' : '#0176d3',
                        whiteSpace: 'nowrap'
                      }}>
                        {fill.paymentType}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontSize: '13px', color: '#080707', fontWeight: '600' }}>
                      {fill.revenue > 0 ? formatCurrency(fill.revenue) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ComponentCard>

        {/* COMPONENT 6: Sales by Leading Ingredient */}
        <ComponentCard
          title="Sales by Leading Ingredient (Jan 2025 - Jan 2026)"
          actions={<Button label="View All Ingredients" variant="neutral" />}
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
                    zIndex: 2
                  }}>
                    Leading Ingredient
                  </th>
                  {ingredientSales.months.map((month) => (
                    <th key={month.id} style={{
                      padding: '12px',
                      textAlign: 'center',
                      backgroundColor: '#fafaf9',
                      fontWeight: '700',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      color: '#706e6b',
                      minWidth: '120px'
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
                    minWidth: '120px',
                    borderLeft: '2px solid #dddbda'
                  }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {ingredientSales.categories.map((category, catIdx) => {
                  // Calculate category totals
                  const categoryTotals = ingredientSales.months.map(month => {
                    let revenue = 0;
                    let fills = 0;
                    category.ingredients.forEach(ing => {
                      const sales = ing.sales[month.id];
                      if (sales) {
                        revenue += sales.revenue;
                        fills += sales.fills;
                      }
                    });
                    return { revenue, fills };
                  });

                  const categoryGrandTotal = categoryTotals.reduce((sum, t) => sum + t.revenue, 0);
                  const categoryGrandFills = categoryTotals.reduce((sum, t) => sum + t.fills, 0);

                  return (
                    <React.Fragment key={category.name}>
                      {/* Category Header Row */}
                      <tr style={{
                        backgroundColor: `${category.color}15`,
                        borderTop: catIdx > 0 ? '2px solid #dddbda' : 'none'
                      }}>
                        <td colSpan={ingredientSales.months.length + 2} style={{
                          padding: '10px 12px',
                          fontWeight: '700',
                          fontSize: '13px',
                          color: category.color,
                          position: 'sticky',
                          left: 0,
                          zIndex: 1
                        }}>
                          {category.name}
                        </td>
                      </tr>

                      {/* Ingredient Rows */}
                      {category.ingredients.map((ingredient, ingIdx) => {
                        // Calculate ingredient row totals
                        const rowTotal = ingredientSales.months.reduce((sum, month) => {
                          const sales = ingredient.sales[month.id];
                          return sum + (sales ? sales.revenue : 0);
                        }, 0);
                        const rowFills = ingredientSales.months.reduce((sum, month) => {
                          const sales = ingredient.sales[month.id];
                          return sum + (sales ? sales.fills : 0);
                        }, 0);

                        return (
                          <tr key={ingredient.name} style={{
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
                              {ingredient.name}
                            </td>
                            {ingredientSales.months.map((month) => {
                              const sales = ingredient.sales[month.id];
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
                                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                                        ${sales.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      </div>
                                      <div style={{ fontSize: '11px', opacity: 0.9 }}>
                                        {sales.fills} fills
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
                                <div style={{ marginBottom: '2px' }}>
                                  ${rowTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.9 }}>
                                  {rowFills} fills
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
                        <td style={{
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
                            {totals.revenue > 0 ? (
                              <div>
                                <div style={{ marginBottom: '2px' }}>
                                  ${totals.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.8 }}>
                                  {totals.fills} fills
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
                              ${categoryGrandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: '600', opacity: 0.8 }}>
                              {categoryGrandFills} fills
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
                  <td style={{
                    padding: '12px',
                    fontWeight: '700',
                    color: '#080707',
                    position: 'sticky',
                    left: 0,
                    backgroundColor: '#f9f9f9',
                    zIndex: 1
                  }}>
                    Total
                  </td>
                  {ingredientSales.months.map((month) => {
                    const monthTotal = ingredientSales.categories.reduce((sum, cat) => {
                      return sum + cat.ingredients.reduce((catSum, ing) => {
                        const sales = ing.sales[month.id];
                        return catSum + (sales ? sales.revenue : 0);
                      }, 0);
                    }, 0);
                    const monthFills = ingredientSales.categories.reduce((sum, cat) => {
                      return sum + cat.ingredients.reduce((catSum, ing) => {
                        const sales = ing.sales[month.id];
                        return catSum + (sales ? sales.fills : 0);
                      }, 0);
                    }, 0);
                    return (
                      <td key={month.id} style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontWeight: '700',
                        color: '#080707'
                      }}>
                        {monthTotal > 0 ? (
                          <div>
                            <div style={{ marginBottom: '2px' }}>
                              ${monthTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#706e6b' }}>
                              {monthFills} fills
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
                      const grandTotal = ingredientSales.categories.reduce((sum, cat) => {
                        return sum + cat.ingredients.reduce((catSum, ing) => {
                          const ingTotal = ingredientSales.months.reduce((monthSum, month) => {
                            const sales = ing.sales[month.id];
                            return monthSum + (sales ? sales.revenue : 0);
                          }, 0);
                          return catSum + ingTotal;
                        }, 0);
                      }, 0);
                      const grandFills = ingredientSales.categories.reduce((sum, cat) => {
                        return sum + cat.ingredients.reduce((catSum, ing) => {
                          const ingFills = ingredientSales.months.reduce((monthSum, month) => {
                            const sales = ing.sales[month.id];
                            return monthSum + (sales ? sales.fills : 0);
                          }, 0);
                          return catSum + ingFills;
                        }, 0);
                      }, 0);
                      return (
                        <div>
                          <div style={{ marginBottom: '2px' }}>
                            ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: '#706e6b' }}>
                            {grandFills} fills
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

        {/* COMPONENT 7: UP - Growing Ingredients */}
        <ComponentCard
          title="Growing Ingredients (Last 3 Months vs Prior 3 Months)"
        >
          <div>
            {/* UP Section */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #dddbda', backgroundColor: '#fafaf9' }}>
                      <th style={{ padding: '10px', textAlign: 'left', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Ingredient
                      </th>
                      <th style={{ padding: '10px', textAlign: 'center', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Category
                      </th>
                      <th style={{ padding: '10px', textAlign: 'right', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Change
                      </th>
                      <th style={{ padding: '10px', textAlign: 'right', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        % Change
                      </th>
                      <th style={{ padding: '10px', textAlign: 'center', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Fills
                      </th>
                      <th style={{ padding: '10px', textAlign: 'left', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Last Fill
                      </th>
                      <th style={{ padding: '10px', textAlign: 'left', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b', minWidth: '120px' }}>
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientTrends.up.map((ing, idx) => {
                      const revenuePercent = (ing.currentRevenue / ing.totalRevenue) * 100;
                      return (
                        <tr key={ing.name} style={{
                          borderBottom: idx < ingredientTrends.up.length - 1 ? '1px solid #e5e5e5' : 'none'
                        }}>
                          <td style={{ padding: '10px', fontWeight: '600', color: '#080707' }}>
                            {ing.name}
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            <span style={{
                              fontSize: '10px',
                              padding: '3px 8px',
                              backgroundColor: '#f3f2f2',
                              borderRadius: '10px',
                              fontWeight: '600',
                              color: '#706e6b'
                            }}>
                              {ing.category}
                            </span>
                          </td>
                          <td style={{ padding: '10px', textAlign: 'right', color: '#2e844a', fontWeight: '700' }}>
                            +${ing.change.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td style={{ padding: '10px', textAlign: 'right', color: '#2e844a', fontWeight: '600' }}>
                            +{ing.percentChange.toFixed(1)}%
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center', fontWeight: '600', color: '#080707' }}>
                            {ing.currentFills}
                          </td>
                          <td style={{ padding: '10px', fontSize: '11px', color: '#706e6b' }}>
                            {new Date(ing.lastFillDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td style={{ padding: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ flex: 1, backgroundColor: '#e5e5e5', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
                                <div style={{
                                  width: `${revenuePercent}%`,
                                  height: '100%',
                                  backgroundColor: '#2e844a',
                                  borderRadius: '10px',
                                  transition: 'width 0.3s'
                                }} />
                              </div>
                              <span style={{ fontSize: '11px', fontWeight: '600', color: '#706e6b', minWidth: '45px', textAlign: 'right' }}>
                                {revenuePercent.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Stats */}
            <div style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#e6f7e6',
              borderRadius: '4px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#706e6b', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
                  Total Revenue
                </div>
                <div style={{ fontSize: '20px', fontWeight: '300', color: '#2e844a' }}>
                  ${ingredientTrends.up.reduce((sum, ing) => sum + ing.currentRevenue, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#706e6b', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
                  Total Change
                </div>
                <div style={{ fontSize: '20px', fontWeight: '300', color: '#2e844a' }}>
                  +${ingredientTrends.up.reduce((sum, ing) => sum + ing.change, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* COMPONENT 8: DOWN - Declining Ingredients */}
        <ComponentCard
          title="Declining Ingredients (Last 3 Months vs Prior 3 Months)"
        >
          <div>
            {/* DOWN Section */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #dddbda', backgroundColor: '#fafaf9' }}>
                      <th style={{ padding: '10px', textAlign: 'left', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Ingredient
                      </th>
                      <th style={{ padding: '10px', textAlign: 'center', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Category
                      </th>
                      <th style={{ padding: '10px', textAlign: 'right', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Change
                      </th>
                      <th style={{ padding: '10px', textAlign: 'right', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        % Change
                      </th>
                      <th style={{ padding: '10px', textAlign: 'center', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Fills
                      </th>
                      <th style={{ padding: '10px', textAlign: 'left', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b' }}>
                        Last Fill
                      </th>
                      <th style={{ padding: '10px', textAlign: 'left', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#706e6b', minWidth: '120px' }}>
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientTrends.down.map((ing, idx) => {
                      const revenuePercent = (ing.currentRevenue / ing.totalRevenue) * 100;
                      return (
                        <tr key={ing.name} style={{
                          borderBottom: idx < ingredientTrends.down.length - 1 ? '1px solid #e5e5e5' : 'none'
                        }}>
                          <td style={{ padding: '10px', fontWeight: '600', color: '#080707' }}>
                            {ing.name}
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            <span style={{
                              fontSize: '10px',
                              padding: '3px 8px',
                              backgroundColor: '#f3f2f2',
                              borderRadius: '10px',
                              fontWeight: '600',
                              color: '#706e6b'
                            }}>
                              {ing.category}
                            </span>
                          </td>
                          <td style={{ padding: '10px', textAlign: 'right', color: '#c23934', fontWeight: '700' }}>
                            -${Math.abs(ing.change).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td style={{ padding: '10px', textAlign: 'right', color: '#c23934', fontWeight: '600' }}>
                            {ing.percentChange.toFixed(1)}%
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center', fontWeight: '600', color: '#080707' }}>
                            {ing.currentFills}
                          </td>
                          <td style={{ padding: '10px', fontSize: '11px', color: '#706e6b' }}>
                            {new Date(ing.lastFillDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td style={{ padding: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ flex: 1, backgroundColor: '#e5e5e5', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
                                <div style={{
                                  width: `${revenuePercent}%`,
                                  height: '100%',
                                  backgroundColor: '#c23934',
                                  borderRadius: '10px',
                                  transition: 'width 0.3s'
                                }} />
                              </div>
                              <span style={{ fontSize: '11px', fontWeight: '600', color: '#706e6b', minWidth: '45px', textAlign: 'right' }}>
                                {revenuePercent.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Stats */}
            <div style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#ffe6e6',
              borderRadius: '4px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#706e6b', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
                  Total Revenue
                </div>
                <div style={{ fontSize: '20px', fontWeight: '300', color: '#c23934' }}>
                  ${ingredientTrends.down.reduce((sum, ing) => sum + ing.currentRevenue, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: '#706e6b', marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
                  Total Change
                </div>
                <div style={{ fontSize: '20px', fontWeight: '300', color: '#c23934' }}>
                  -${Math.abs(ingredientTrends.down.reduce((sum, ing) => sum + ing.change, 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
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
            <strong>Component Usage:</strong> Each component above can be independently added to an Account record page
            using Lightning App Builder. Components are responsive and can be configured with different timeframes and display options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountComponents;
