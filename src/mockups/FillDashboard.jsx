import React, { useState, useMemo } from 'react';
import Icon from '@salesforce/design-system-react/components/icon';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import Button from '@salesforce/design-system-react/components/button';

const FillDashboard = () => {
  const [timeframe, setTimeframe] = useState('MTD'); // MTD, QTD, YTD
  const [trendPeriod, setTrendPeriod] = useState('daily'); // daily, weekly, monthly
  const [showComparison, setShowComparison] = useState(true);

  // Sample data for key metrics
  const metrics = useMemo(() => ({
    MTD: {
      totalRevenue: 487650.00,
      fillCount: 1243,
      avgRevenuePerFill: 392.43,
      activeAccounts: 87,
      priorRevenue: 452300.00,
      priorFillCount: 1189,
      priorAvgRevenue: 380.40,
      priorActiveAccounts: 82
    },
    QTD: {
      totalRevenue: 1425780.00,
      fillCount: 3621,
      avgRevenuePerFill: 393.75,
      activeAccounts: 142,
      priorRevenue: 1338950.00,
      priorFillCount: 3456,
      priorAvgRevenue: 387.45,
      priorActiveAccounts: 138
    },
    YTD: {
      totalRevenue: 5842340.00,
      fillCount: 14876,
      avgRevenuePerFill: 392.68,
      activeAccounts: 218,
      priorRevenue: 5421680.00,
      priorFillCount: 14103,
      priorAvgRevenue: 384.42,
      priorActiveAccounts: 205
    }
  }), []);

  // Sample trend data for charts (simplified for mockup)
  const trendData = useMemo(() => ({
    daily: {
      current: [
        { date: '12/01', revenue: 15200 },
        { date: '12/02', revenue: 16800 },
        { date: '12/03', revenue: 18500 },
        { date: '12/04', revenue: 17200 },
        { date: '12/05', revenue: 19800 },
        { date: '12/06', revenue: 21300 },
        { date: '12/07', revenue: 18900 },
        { date: '12/08', revenue: 20400 },
        { date: '12/09', revenue: 22100 },
        { date: '12/10', revenue: 19700 },
        { date: '12/11', revenue: 21800 },
        { date: '12/12', revenue: 23500 },
        { date: '12/13', revenue: 20900 },
        { date: '12/14', revenue: 22600 }
      ],
      prior: [
        { date: '11/01', revenue: 14500 },
        { date: '11/02', revenue: 15900 },
        { date: '11/03', revenue: 17200 },
        { date: '11/04', revenue: 16100 },
        { date: '11/05', revenue: 18400 },
        { date: '11/06', revenue: 19800 },
        { date: '11/07', revenue: 17600 },
        { date: '11/08', revenue: 19100 },
        { date: '11/09', revenue: 20500 },
        { date: '11/10', revenue: 18300 },
        { date: '11/11', revenue: 20200 },
        { date: '11/12', revenue: 21800 },
        { date: '11/13', revenue: 19400 },
        { date: '11/14', revenue: 21000 }
      ]
    },
    weekly: {
      current: [
        { date: 'Week 1', revenue: 68500 },
        { date: 'Week 2', revenue: 75200 },
        { date: 'Week 3', revenue: 82100 },
        { date: 'Week 4', revenue: 78900 },
        { date: 'Week 5', revenue: 85400 },
        { date: 'Week 6', revenue: 89200 }
      ],
      prior: [
        { date: 'Week 1', revenue: 63800 },
        { date: 'Week 2', revenue: 69500 },
        { date: 'Week 3', revenue: 76300 },
        { date: 'Week 4', revenue: 73200 },
        { date: 'Week 5', revenue: 79100 },
        { date: 'Week 6', revenue: 82600 }
      ]
    },
    monthly: {
      current: [
        { date: 'Jan', revenue: 485200 },
        { date: 'Feb', revenue: 512300 },
        { date: 'Mar', revenue: 528900 },
        { date: 'Apr', revenue: 495600 },
        { date: 'May', revenue: 543800 },
        { date: 'Jun', revenue: 567100 },
        { date: 'Jul', revenue: 521400 },
        { date: 'Aug', revenue: 556700 },
        { date: 'Sep', revenue: 589200 },
        { date: 'Oct', revenue: 512800 },
        { date: 'Nov', revenue: 548900 },
        { date: 'Dec', revenue: 487650 }
      ],
      prior: [
        { date: 'Jan', revenue: 451300 },
        { date: 'Feb', revenue: 476800 },
        { date: 'Mar', revenue: 492100 },
        { date: 'Apr', revenue: 461200 },
        { date: 'May', revenue: 505600 },
        { date: 'Jun', revenue: 527300 },
        { date: 'Jul', revenue: 485900 },
        { date: 'Aug', revenue: 518200 },
        { date: 'Sep', revenue: 548600 },
        { date: 'Oct', revenue: 477400 },
        { date: 'Nov', revenue: 510500 },
        { date: 'Dec', revenue: 452300 }
      ]
    }
  }), []);

  // Account Lifecycle data
  const accountLifecycleData = useMemo(() => [
    {
      category: 'Active',
      description: 'Currently ordering',
      count: 218,
      percentage: 45.8,
      color: '#2e844a',
      revenue12mo: 3845200
    },
    {
      category: 'Current Stale',
      description: 'Recently inactive',
      count: 127,
      percentage: 26.7,
      color: '#fe9339',
      revenue12mo: 985400
    },
    {
      category: 'Prior Stale',
      description: 'Longer-term inactive',
      count: 89,
      percentage: 18.7,
      color: '#ffb75d',
      revenue12mo: 542800
    },
    {
      category: 'Lost',
      description: 'Churned/closed',
      count: 42,
      percentage: 8.8,
      color: '#c23934',
      revenue12mo: 0
    }
  ], []);

  const totalAccounts = accountLifecycleData.reduce((sum, item) => sum + item.count, 0);
  const revenueAtRisk = accountLifecycleData
    .filter(item => item.category === 'Current Stale' || item.category === 'Prior Stale')
    .reduce((sum, item) => sum + item.revenue12mo, 0);

  // Account Reactivations data
  const reactivationData = useMemo(() => ({
    MTD: {
      total: 12,
      fromCurrentStale: 7,
      fromPriorStale: 4,
      fromLost: 1,
      revenueRecovered: 87650,
      openRevenue: 34200
    },
    QTD: {
      total: 34,
      fromCurrentStale: 19,
      fromPriorStale: 12,
      fromLost: 3,
      revenueRecovered: 245800,
      openRevenue: 92500
    },
    YTD: {
      total: 145,
      fromCurrentStale: 82,
      fromPriorStale: 51,
      fromLost: 12,
      revenueRecovered: 1124500,
      openRevenue: 287300
    }
  }), []);

  const reactivationFunnel = [
    { source: 'Current Stale → Active', count: 82, revenue: 687400 },
    { source: 'Prior Stale → Active', count: 51, revenue: 358900 },
    { source: 'Lost → Active', count: 12, revenue: 78200 }
  ];

  const reactivationTrends = [
    { month: 'Jan', reactivations: 11 },
    { month: 'Feb', reactivations: 14 },
    { month: 'Mar', reactivations: 9 },
    { month: 'Apr', reactivations: 13 },
    { month: 'May', reactivations: 16 },
    { month: 'Jun', reactivations: 12 },
    { month: 'Jul', reactivations: 10 },
    { month: 'Aug', reactivations: 15 },
    { month: 'Sep', reactivations: 13 },
    { month: 'Oct', reactivations: 11 },
    { month: 'Nov', reactivations: 9 },
    { month: 'Dec', reactivations: 12 }
  ];

  const topReactivators = [
    { user: 'Sarah Johnson', count: 23, avgDays: 45 },
    { user: 'Mike Chen', count: 19, avgDays: 38 },
    { user: 'Emily Rodriguez', count: 17, avgDays: 52 },
    { user: 'David Kim', count: 15, avgDays: 41 },
    { user: 'Jessica Martinez', count: 14, avgDays: 47 }
  ];

  // Account Performance data
  const topAccountsByRevenue = [
    { name: 'Global Beauty Corp', revenue: 342500, trend: 8.5, fillCount: 156 },
    { name: 'Natural Solutions Inc', revenue: 298700, trend: 12.3, fillCount: 142 },
    { name: 'Premium Cosmetics LLC', revenue: 276400, trend: -3.2, fillCount: 134 },
    { name: 'EcoBeauty Enterprises', revenue: 245800, trend: 15.7, fillCount: 118 },
    { name: 'Wellness Products Co', revenue: 223600, trend: 6.4, fillCount: 109 },
    { name: 'Pure Ingredients Ltd', revenue: 198500, trend: -5.1, fillCount: 95 },
    { name: 'Beauty Essentials Inc', revenue: 187300, trend: 9.8, fillCount: 89 },
    { name: 'Organic Formulations', revenue: 176200, trend: 4.2, fillCount: 84 },
    { name: 'Advanced Skincare Co', revenue: 164900, trend: -2.7, fillCount: 78 },
    { name: 'Herbal Beauty Supply', revenue: 152400, trend: 11.5, fillCount: 73 }
  ];

  const topAccountsByFillCount = [
    { name: 'Global Beauty Corp', fillCount: 156, revenue: 342500, avgPerFill: 2195 },
    { name: 'Natural Solutions Inc', fillCount: 142, revenue: 298700, avgPerFill: 2104 },
    { name: 'Premium Cosmetics LLC', fillCount: 134, revenue: 276400, avgPerFill: 2063 },
    { name: 'EcoBeauty Enterprises', fillCount: 118, revenue: 245800, avgPerFill: 2083 },
    { name: 'Wellness Products Co', fillCount: 109, revenue: 223600, avgPerFill: 2052 },
    { name: 'Pure Ingredients Ltd', fillCount: 95, revenue: 198500, avgPerFill: 2089 },
    { name: 'Beauty Essentials Inc', fillCount: 89, revenue: 187300, avgPerFill: 2105 },
    { name: 'Organic Formulations', fillCount: 84, revenue: 176200, avgPerFill: 2098 },
    { name: 'Advanced Skincare Co', fillCount: 78, revenue: 164900, avgPerFill: 2114 },
    { name: 'Herbal Beauty Supply', fillCount: 73, revenue: 152400, avgPerFill: 2088 }
  ];

  const fastestGrowingAccounts = [
    { name: 'EcoBeauty Enterprises', growth: 15.7, revenue: 245800, prevRevenue: 212400 },
    { name: 'Natural Solutions Inc', growth: 12.3, revenue: 298700, prevRevenue: 265900 },
    { name: 'Herbal Beauty Supply', growth: 11.5, revenue: 152400, prevRevenue: 136700 },
    { name: 'Beauty Essentials Inc', growth: 9.8, revenue: 187300, prevRevenue: 170600 },
    { name: 'Global Beauty Corp', growth: 8.5, revenue: 342500, prevRevenue: 315600 },
    { name: 'Wellness Products Co', growth: 6.4, revenue: 223600, prevRevenue: 210200 },
    { name: 'Organic Formulations', growth: 4.2, revenue: 176200, prevRevenue: 169100 },
    { name: 'Vitality Ingredients', growth: 3.8, revenue: 145300, prevRevenue: 140000 },
    { name: 'Fresh Beauty Labs', growth: 2.9, revenue: 132800, prevRevenue: 129100 },
    { name: 'Nature First Products', growth: 2.1, revenue: 118600, prevRevenue: 116200 }
  ];

  const decliningAccounts = [
    { name: 'Pure Ingredients Ltd', decline: -5.1, revenue: 198500, prevRevenue: 209200, daysSinceLastFill: 12 },
    { name: 'Premium Cosmetics LLC', decline: -3.2, revenue: 276400, prevRevenue: 285500, daysSinceLastFill: 8 },
    { name: 'Advanced Skincare Co', decline: -2.7, revenue: 164900, prevRevenue: 169500, daysSinceLastFill: 15 },
    { name: 'Classic Beauty Supply', decline: -4.8, revenue: 142700, prevRevenue: 149900, daysSinceLastFill: 21 },
    { name: 'Traditional Ingredients', decline: -6.3, revenue: 128400, prevRevenue: 137000, daysSinceLastFill: 18 },
    { name: 'Heritage Cosmetics', decline: -3.9, revenue: 115200, prevRevenue: 119900, daysSinceLastFill: 25 },
    { name: 'Vintage Beauty Co', decline: -7.2, revenue: 98600, prevRevenue: 106200, daysSinceLastFill: 32 },
    { name: 'Legacy Products Inc', decline: -2.4, revenue: 87300, prevRevenue: 89500, daysSinceLastFill: 14 }
  ];

  const accountAging = [
    { range: '0-7 days', count: 128, percentage: 58.7 },
    { range: '8-14 days', count: 45, percentage: 20.6 },
    { range: '15-30 days', count: 28, percentage: 12.8 },
    { range: '31-60 days', count: 12, percentage: 5.5 },
    { range: '60+ days', count: 5, percentage: 2.3 }
  ];

  const concentrationRisk = {
    top10Revenue: 2266300,
    top20Revenue: 3845200,
    totalRevenue: 5842340,
    top10Percentage: 38.8,
    top20Percentage: 65.8
  };

  const newVsReturning = {
    newAccountRevenue: 760100,
    returningAccountRevenue: 4381800,
    transferredAccountRevenue: 700440,
    newAccountCount: 28,
    returningAccountCount: 163,
    transferredAccountCount: 27,
    newAccountPercentage: 13.0,
    returningAccountPercentage: 75.0,
    transferredAccountPercentage: 12.0
  };

  // Revenue by Compound Category data
  const compoundCategories = [
    {
      name: 'GLP',
      revenue: 2245800,
      percentage: 38.4,
      fills: 4856,
      avgFillValue: 462.45,
      priorRevenue: 1876500,
      trend: 19.7,
      color: '#0176d3',
      description: 'Semaglutide, Tirzepatide, etc.'
    },
    {
      name: 'Non-GLP',
      revenue: 1876300,
      percentage: 32.1,
      fills: 5234,
      avgFillValue: 358.42,
      priorRevenue: 1923400,
      trend: -2.4,
      color: '#706e6b',
      description: 'Standard compounding'
    },
    {
      name: 'Rare Disease',
      revenue: 982400,
      percentage: 16.8,
      fills: 876,
      avgFillValue: 1121.46,
      priorRevenue: 845200,
      trend: 16.2,
      color: '#9050e9',
      description: 'Sirolimus, other high-revenue specialty'
    },
    {
      name: 'Folinic Acid',
      revenue: 487600,
      percentage: 8.3,
      fills: 1984,
      avgFillValue: 245.77,
      priorRevenue: 512800,
      trend: -4.9,
      color: '#fe9339',
      description: 'Leucovorin compounds'
    },
    {
      name: 'ENT',
      revenue: 250240,
      percentage: 4.3,
      fills: 1926,
      avgFillValue: 129.93,
      priorRevenue: 263840,
      trend: -5.2,
      color: '#4bca81',
      description: 'Ear/Nose/Throat compounds'
    }
  ];

  const totalCategoryRevenue = compoundCategories.reduce((sum, cat) => sum + cat.revenue, 0);

  // Category trends over time (monthly for YTD)
  const categoryTrends = [
    { month: 'Jan', GLP: 165400, NonGLP: 182300, RareDisease: 78500, FolinicAcid: 45200, ENT: 23800 },
    { month: 'Feb', GLP: 178900, NonGLP: 175600, RareDisease: 82100, FolinicAcid: 43500, ENT: 22100 },
    { month: 'Mar', GLP: 185200, NonGLP: 168900, RareDisease: 85300, FolinicAcid: 41800, ENT: 21300 },
    { month: 'Apr', GLP: 192600, NonGLP: 162400, RareDisease: 79600, FolinicAcid: 39900, ENT: 20800 },
    { month: 'May', GLP: 198400, NonGLP: 158700, RareDisease: 88700, FolinicAcid: 38600, ENT: 19500 },
    { month: 'Jun', GLP: 205300, NonGLP: 155300, RareDisease: 91200, FolinicAcid: 37400, ENT: 18900 },
    { month: 'Jul', GLP: 189700, NonGLP: 151800, RareDisease: 76800, FolinicAcid: 36100, ENT: 18200 },
    { month: 'Aug', GLP: 196800, NonGLP: 148200, RareDisease: 82900, FolinicAcid: 34800, ENT: 17600 },
    { month: 'Sep', GLP: 212500, NonGLP: 145600, RareDisease: 87400, FolinicAcid: 33500, ENT: 17100 },
    { month: 'Oct', GLP: 183900, NonGLP: 142900, RareDisease: 73200, FolinicAcid: 32300, ENT: 16400 },
    { month: 'Nov', GLP: 191600, NonGLP: 139800, RareDisease: 78900, FolinicAcid: 31100, ENT: 15800 },
    { month: 'Dec', GLP: 145500, NonGLP: 144800, RareDisease: 77800, FolinicAcid: 33400, ENT: 18740 }
  ];

  // Category by User
  const categoryByUser = [
    { user: 'Sarah Johnson', GLP: 387500, NonGLP: 245300, RareDisease: 156200, FolinicAcid: 65400, ENT: 32100 },
    { user: 'Mike Chen', GLP: 342800, NonGLP: 298700, RareDisease: 89400, FolinicAcid: 78500, ENT: 45600 },
    { user: 'Emily Rodriguez', GLP: 298600, NonGLP: 187900, RareDisease: 198700, FolinicAcid: 56700, ENT: 28900 },
    { user: 'David Kim', GLP: 267400, NonGLP: 234500, RareDisease: 134800, FolinicAcid: 72300, ENT: 38200 },
    { user: 'Jessica Martinez', GLP: 245900, NonGLP: 198400, RareDisease: 98500, FolinicAcid: 61800, ENT: 34500 }
  ];

  // Category by Business Segment
  const categoryBySegment = [
    { segment: 'Weight Loss Clinics', GLP: 1245600, NonGLP: 156800, RareDisease: 12400, FolinicAcid: 8900, ENT: 5600 },
    { segment: 'Pain Management', GLP: 87500, NonGLP: 876300, RareDisease: 234500, FolinicAcid: 123400, ENT: 67800 },
    { segment: 'Specialty Pharmacies', GLP: 456700, NonGLP: 342100, RareDisease: 567800, FolinicAcid: 198700, ENT: 45300 },
    { segment: 'General Practice', GLP: 298400, NonGLP: 387600, RareDisease: 89400, FolinicAcid: 98700, ENT: 87600 },
    { segment: 'ENT Specialists', GLP: 45600, NonGLP: 78900, RareDisease: 23400, FolinicAcid: 34500, ENT: 43940 },
    { segment: 'Oncology', GLP: 34500, NonGLP: 34600, RareDisease: 54900, FolinicAcid: 23000, ENT: 0 }
  ];

  // Category by Account Lifecycle
  const categoryByLifecycle = [
    {
      stage: 'Active',
      GLP: 1876500,
      NonGLP: 1245800,
      RareDisease: 687400,
      FolinicAcid: 298700,
      ENT: 156200
    },
    {
      stage: 'Current Stale',
      GLP: 245800,
      NonGLP: 398600,
      RareDisease: 187500,
      FolinicAcid: 123400,
      ENT: 65800
    },
    {
      stage: 'Prior Stale',
      GLP: 98500,
      NonGLP: 156700,
      RareDisease: 78900,
      FolinicAcid: 45600,
      ENT: 23400
    },
    {
      stage: 'Lost',
      GLP: 25000,
      NonGLP: 75200,
      RareDisease: 28600,
      FolinicAcid: 19900,
      ENT: 4840
    }
  ];

  // Key metrics for categories
  const glpMetrics = {
    percentageOfTotal: 38.4,
    growthRate: 19.7,
    concentrationRisk: 'Medium',
    newAccountRevenue: 345600
  };

  const rareDiseaseMetrics = {
    revenue: 982400,
    fillCount: 876,
    avgFillValue: 1121.46,
    consistency: 'High'
  };

  const newAccountByCategory = [
    { category: 'GLP', revenue: 345600, percentage: 39.4 },
    { category: 'Rare Disease', revenue: 187300, percentage: 21.4 },
    { category: 'Non-GLP', revenue: 234500, percentage: 26.7 },
    { category: 'Folinic Acid', revenue: 78900, percentage: 9.0 },
    { category: 'ENT', revenue: 30200, percentage: 3.4 }
  ];

  // Growth Metrics data
  const growthKPIs = {
    MoM: 7.8,
    QoQ: 6.5,
    YoY: 7.6,
    rolling3Month: 8.2
  };

  const revenueGrowthTrend = [
    { month: 'Jan', revenue: 485200, growthRate: 7.5 },
    { month: 'Feb', revenue: 512300, growthRate: 5.6 },
    { month: 'Mar', revenue: 528900, growthRate: 3.2 },
    { month: 'Apr', revenue: 495600, growthRate: -6.3 },
    { month: 'May', revenue: 543800, growthRate: 9.7 },
    { month: 'Jun', revenue: 567100, growthRate: 4.3 },
    { month: 'Jul', revenue: 521400, growthRate: -8.1 },
    { month: 'Aug', revenue: 556700, growthRate: 6.8 },
    { month: 'Sep', revenue: 589200, growthRate: 5.8 },
    { month: 'Oct', revenue: 512800, growthRate: -13.0 },
    { month: 'Nov', revenue: 548900, growthRate: 7.0 },
    { month: 'Dec', revenue: 487650, growthRate: -11.2 }
  ];

  const growthByCategory = [
    { category: 'GLP', current: 2245800, prior: 1876500, growth: 369300, growthPct: 19.7 },
    { category: 'Non-GLP', current: 1876300, prior: 1923400, growth: -47100, growthPct: -2.4 },
    { category: 'Rare Disease', current: 982400, prior: 845200, growth: 137200, growthPct: 16.2 },
    { category: 'Folinic Acid', current: 487600, prior: 512800, growth: -25200, growthPct: -4.9 },
    { category: 'ENT', current: 250240, prior: 263840, growth: -13600, growthPct: -5.2 }
  ];

  const growthByUser = [
    { user: 'Sarah Johnson', currentRevenue: 886500, priorRevenue: 789200, growth: 97300, growthPct: 12.3 },
    { user: 'Mike Chen', currentRevenue: 855000, priorRevenue: 823400, growth: 31600, growthPct: 3.8 },
    { user: 'Emily Rodriguez', currentRevenue: 770800, priorRevenue: 698500, growth: 72300, growthPct: 10.3 },
    { user: 'David Kim', currentRevenue: 747200, priorRevenue: 756800, growth: -9600, growthPct: -1.3 },
    { user: 'Jessica Martinez', currentRevenue: 639100, priorRevenue: 612300, growth: 26800, growthPct: 4.4 }
  ];

  const growthBySegment = [
    { segment: 'Weight Loss Clinics', current: 1429300, prior: 1134500, growthPct: 26.0 },
    { segment: 'Specialty Pharmacies', current: 1610600, prior: 1498700, growthPct: 7.5 },
    { segment: 'Pain Management', current: 1389500, prior: 1423800, growthPct: -2.4 },
    { segment: 'General Practice', current: 961700, prior: 945600, growthPct: 1.7 },
    { segment: 'ENT Specialists', current: 226400, prior: 243500, growthPct: -7.0 },
    { segment: 'Oncology', current: 147000, prior: 175680, growthPct: -16.3 }
  ];

  // New Account metrics
  const newAccountMetrics = {
    newAccountsYTD: 32,
    newAccountRevenueYTD: 876500,
    newAccountPercentOfTotal: 15.0,
    avgRevenuePerNewAccount: 27391
  };

  const newAccountsByMonth = [
    { month: 'Jan', revenue: 45200, accounts: 2 },
    { month: 'Feb', revenue: 67800, accounts: 3 },
    { month: 'Mar', revenue: 89400, accounts: 4 },
    { month: 'Apr', revenue: 56700, accounts: 2 },
    { month: 'May', revenue: 102300, accounts: 5 },
    { month: 'Jun', revenue: 78900, accounts: 3 },
    { month: 'Jul', revenue: 45600, accounts: 2 },
    { month: 'Aug', revenue: 91200, accounts: 3 },
    { month: 'Sep', revenue: 76500, accounts: 2 },
    { month: 'Oct', revenue: 58900, accounts: 2 },
    { month: 'Nov', revenue: 87400, accounts: 3 },
    { month: 'Dec', revenue: 76600, accounts: 1 }
  ];

  const newAccountsByUser = [
    { user: 'Sarah Johnson', accounts: 8, revenue: 245300, percentOfTotal: 27.7, avgPerAccount: 30663 },
    { user: 'Emily Rodriguez', accounts: 7, revenue: 198700, percentOfTotal: 25.8, avgPerAccount: 28386 },
    { user: 'Mike Chen', accounts: 6, revenue: 187500, percentOfTotal: 21.9, avgPerAccount: 31250 },
    { user: 'Jessica Martinez', accounts: 6, revenue: 134500, percentOfTotal: 21.0, avgPerAccount: 22417 },
    { user: 'David Kim', accounts: 5, revenue: 110500, percentOfTotal: 16.8, avgPerAccount: 22100 }
  ];

  const netAccountMovement = {
    newAccounts: 32,
    reactivations: 12,
    accountsGoneStale: 18,
    accountsLost: 5,
    netChange: 21
  };

  const fillGrowthMetrics = {
    fillCountMoM: 4.5,
    fillCountQoQ: 4.8,
    fillCountYoY: 5.4,
    avgFillsPerAccount: 68.2,
    fillFrequencyDays: 5.3,
    avgFillValueGrowth: 3.1
  };

  const momentumSignals = [
    { account: 'Global Beauty Corp', consecutiveMonths: 6, avgGrowth: 8.5 },
    { account: 'EcoBeauty Enterprises', consecutiveMonths: 5, avgGrowth: 12.3 },
    { account: 'Natural Solutions Inc', consecutiveMonths: 4, avgGrowth: 9.7 },
    { account: 'Herbal Beauty Supply', consecutiveMonths: 4, avgGrowth: 11.2 }
  ];

  const warningSignals = [
    { account: 'Pure Ingredients Ltd', consecutiveMonths: 3, avgDecline: -4.2, daysSinceLastFill: 12 },
    { account: 'Classic Beauty Supply', consecutiveMonths: 4, avgDecline: -5.6, daysSinceLastFill: 21 },
    { account: 'Heritage Cosmetics', consecutiveMonths: 3, avgDecline: -3.8, daysSinceLastFill: 25 }
  ];

  const expandingAccounts = [
    { account: 'EcoBeauty Enterprises', growth: 15.7, revenue: 245800 },
    { account: 'Natural Solutions Inc', growth: 12.3, revenue: 298700 },
    { account: 'Herbal Beauty Supply', growth: 11.5, revenue: 152400 },
    { account: 'Beauty Essentials Inc', growth: 9.8, revenue: 187300 },
    { account: 'Global Beauty Corp', growth: 8.5, revenue: 342500 },
    { account: 'Wellness Products Co', growth: 6.4, revenue: 223600 },
    { account: 'Organic Formulations', growth: 4.2, revenue: 176200 },
    { account: 'Vitality Ingredients', growth: 3.8, revenue: 145300 },
    { account: 'Fresh Beauty Labs', growth: 2.9, revenue: 132800 },
    { account: 'Nature First Products', growth: 2.1, revenue: 118600 }
  ];

  // Leading Ingredient Performance data
  const topIngredientsByRevenue = [
    { ingredient: 'Semaglutide', revenue: 1245800, percentage: 21.3, fills: 2856, avgFillValue: 436.12, trend: 22.5 },
    { ingredient: 'Tirzepatide', revenue: 998600, percentage: 17.1, fills: 1998, avgFillValue: 499.80, trend: 15.8 },
    { ingredient: 'Sirolimus', revenue: 782400, percentage: 13.4, fills: 687, avgFillValue: 1138.90, trend: 18.2 },
    { ingredient: 'Testosterone', revenue: 567300, percentage: 9.7, fills: 1876, avgFillValue: 302.35, trend: -3.2 },
    { ingredient: 'Leucovorin', revenue: 487600, percentage: 8.3, fills: 1984, avgFillValue: 245.77, trend: -4.9 },
    { ingredient: 'Progesterone', revenue: 398700, percentage: 6.8, fills: 1456, avgFillValue: 273.83, trend: 2.1 },
    { ingredient: 'NAD+', revenue: 345200, percentage: 5.9, fills: 987, avgFillValue: 349.75, trend: 28.3 },
    { ingredient: 'Glutathione', revenue: 298400, percentage: 5.1, fills: 1234, avgFillValue: 241.78, trend: 8.7 },
    { ingredient: 'BPC-157', revenue: 234500, percentage: 4.0, fills: 567, avgFillValue: 413.58, trend: 12.4 },
    { ingredient: 'Ketamine', revenue: 187600, percentage: 3.2, fills: 456, avgFillValue: 411.40, trend: -8.5 }
  ];

  const topIngredientsByFills = [
    { ingredient: 'Semaglutide', fills: 2856, revenue: 1245800, avgFillValue: 436.12 },
    { ingredient: 'Tirzepatide', fills: 1998, revenue: 998600, avgFillValue: 499.80 },
    { ingredient: 'Leucovorin', fills: 1984, revenue: 487600, avgFillValue: 245.77 },
    { ingredient: 'Testosterone', fills: 1876, revenue: 567300, avgFillValue: 302.35 },
    { ingredient: 'Progesterone', fills: 1456, revenue: 398700, avgFillValue: 273.83 },
    { ingredient: 'Glutathione', fills: 1234, revenue: 298400, avgFillValue: 241.78 },
    { ingredient: 'NAD+', fills: 987, revenue: 345200, avgFillValue: 349.75 },
    { ingredient: 'Sirolimus', fills: 687, revenue: 782400, avgFillValue: 1138.90 },
    { ingredient: 'BPC-157', fills: 567, revenue: 234500, avgFillValue: 413.58 },
    { ingredient: 'Ketamine', fills: 456, revenue: 187600, avgFillValue: 411.40 }
  ];

  const fastestGrowingIngredients = [
    { ingredient: 'NAD+', growth: 28.3, revenue: 345200, priorRevenue: 269100 },
    { ingredient: 'Semaglutide', growth: 22.5, revenue: 1245800, priorRevenue: 1016900 },
    { ingredient: 'Sirolimus', growth: 18.2, revenue: 782400, priorRevenue: 661800 },
    { ingredient: 'Tirzepatide', growth: 15.8, revenue: 998600, priorRevenue: 862400 },
    { ingredient: 'BPC-157', growth: 12.4, revenue: 234500, priorRevenue: 208600 },
    { ingredient: 'Glutathione', growth: 8.7, revenue: 298400, priorRevenue: 274500 },
    { ingredient: 'Progesterone', growth: 2.1, revenue: 398700, priorRevenue: 390500 },
    { ingredient: 'Estradiol', growth: 1.8, revenue: 167800, priorRevenue: 164900 }
  ];

  const decliningIngredients = [
    { ingredient: 'Ketamine', decline: -8.5, revenue: 187600, priorRevenue: 205100 },
    { ingredient: 'Leucovorin', decline: -4.9, revenue: 487600, priorRevenue: 512800 },
    { ingredient: 'Testosterone', decline: -3.2, revenue: 567300, priorRevenue: 586100 },
    { ingredient: 'Hydrocortisone', decline: -6.7, revenue: 134500, priorRevenue: 144200 },
    { ingredient: 'Metformin', decline: -5.2, revenue: 112800, priorRevenue: 119000 }
  ];

  const ingredientConcentration = {
    top5Revenue: 4082000,
    top10Revenue: 5545700,
    totalRevenue: 5842340,
    top5Percentage: 69.9,
    top10Percentage: 94.9
  };

  const ingredientByUser = [
    { user: 'Sarah Johnson', semaglutide: 287500, tirzepatide: 198700, sirolimus: 156200 },
    { user: 'Mike Chen', semaglutide: 234800, tirzepatide: 176500, sirolimus: 98700 },
    { user: 'Emily Rodriguez', semaglutide: 198600, tirzepatide: 154300, sirolimus: 187400 },
    { user: 'David Kim', semaglutide: 176400, tirzepatide: 132900, sirolimus: 123800 },
    { user: 'Jessica Martinez', semaglutide: 154200, tirzepatide: 112600, sirolimus: 98500 }
  ];

  // Operational Metrics data
  const fillTrendsDaily = [
    { day: 'Mon', fills: 87, revenue: 34200 },
    { day: 'Tue', fills: 92, revenue: 36500 },
    { day: 'Wed', fills: 89, revenue: 35100 },
    { day: 'Thu', fills: 85, revenue: 33800 },
    { day: 'Fri', fills: 76, revenue: 30200 },
    { day: 'Sat', fills: 23, revenue: 9100 },
    { day: 'Sun', fills: 12, revenue: 4800 }
  ];

  const operationalMetrics = {
    fillsPerDay: 68.2,
    fillsPerWeek: 477,
    revenuePerBusinessDay: 33960,
    avgFillsPerDayGrowth: 4.2
  };

  const topPrescribers = [
    { prescriber: 'Dr. Sarah Chen', revenue: 487500, fills: 1234, accounts: 23, avgPerFill: 395.14 },
    { prescriber: 'Dr. Michael Roberts', revenue: 423800, fills: 1087, accounts: 19, avgPerFill: 389.88 },
    { prescriber: 'Dr. Jennifer Lopez', revenue: 398600, fills: 876, accounts: 16, avgPerFill: 455.02 },
    { prescriber: 'Dr. David Kim', revenue: 367200, fills: 945, accounts: 18, avgPerFill: 388.57 },
    { prescriber: 'Dr. Emily Martinez', revenue: 334500, fills: 823, accounts: 15, avgPerFill: 406.56 },
    { prescriber: 'Dr. James Wilson', revenue: 298700, fills: 756, accounts: 14, avgPerFill: 395.10 },
    { prescriber: 'Dr. Lisa Anderson', revenue: 276400, fills: 687, accounts: 13, avgPerFill: 402.33 },
    { prescriber: 'Dr. Robert Taylor', revenue: 254300, fills: 634, accounts: 12, avgPerFill: 401.10 }
  ];

  const prescriberMetrics = {
    totalPrescribers: 342,
    newPrescribersYTD: 47,
    avgPrescribersPerAccount: 2.3,
    topPrescriberConcentration: 23.4
  };

  // Account Activity Metrics data
  const activityMetrics = {
    totalVisits: 1243,
    totalCalls: 3456,
    totalEmails: 2876,
    totalActivities: 7575,
    priorVisits: 1189,
    priorCalls: 3298,
    priorEmails: 2654,
    priorTotalActivities: 7141
  };

  const activityTrends = [
    { week: 'Week 1', visits: 98, calls: 267, emails: 234 },
    { week: 'Week 2', visits: 105, calls: 289, emails: 245 },
    { week: 'Week 3', visits: 112, calls: 298, emails: 256 },
    { week: 'Week 4', visits: 89, calls: 234, emails: 198 },
    { week: 'Week 5', visits: 102, calls: 276, emails: 223 },
    { week: 'Week 6', visits: 108, calls: 287, emails: 238 }
  ];

  const activityByUser = [
    { user: 'Sarah Johnson', visits: 234, calls: 567, emails: 456, total: 1257, accountsTouched: 45, revenue: 886500 },
    { user: 'Mike Chen', visits: 198, calls: 498, emails: 387, total: 1083, accountsTouched: 38, revenue: 855000 },
    { user: 'Emily Rodriguez', visits: 187, calls: 445, emails: 398, total: 1030, accountsTouched: 42, revenue: 770800 },
    { user: 'David Kim', visits: 176, calls: 423, emails: 356, total: 955, accountsTouched: 36, revenue: 747200 },
    { user: 'Jessica Martinez', visits: 165, calls: 398, emails: 334, total: 897, accountsTouched: 33, revenue: 639100 }
  ];

  const highRevenueLoActivity = [
    { account: 'Premium Cosmetics LLC', revenue: 276400, activities: 12, lastActivityDate: '12/08/2024' },
    { account: 'Pure Ingredients Ltd', revenue: 198500, activities: 8, lastActivityDate: '11/28/2024' },
    { account: 'Advanced Skincare Co', revenue: 164900, activities: 9, lastActivityDate: '12/01/2024' }
  ];

  const highActivityLowRevenue = [
    { account: 'Startup Beauty Labs', revenue: 34500, activities: 67, avgPerActivity: 515 },
    { account: 'New Wellness Clinic', revenue: 28900, activities: 54, avgPerActivity: 535 },
    { account: 'Fresh Start Pharmacy', revenue: 23400, activities: 48, avgPerActivity: 488 }
  ];

  const activityByLifecycle = [
    { stage: 'Active', accounts: 218, visits: 987, calls: 2456, emails: 1987, avgPerAccount: 24.9 },
    { stage: 'Current Stale', accounts: 127, visits: 156, calls: 678, emails: 567, avgPerAccount: 11.0 },
    { stage: 'Prior Stale', accounts: 89, visits: 78, calls: 234, emails: 198, avgPerAccount: 5.7 },
    { stage: 'Lost', accounts: 42, visits: 22, calls: 88, emails: 124, avgPerAccount: 5.6 }
  ];

  const activityEfficiency = {
    revenuePerActivity: 771,
    revenuePerVisit: 4698,
    activitiesPerNewAccount: 28.4,
    activitiesToReactivation: 15.7
  };

  // Calculate percentage change
  const calculateChange = (current, prior) => {
    const change = ((current - prior) / prior) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0
    };
  };

  // Get current metrics based on selected timeframe
  const currentMetrics = metrics[timeframe];
  const revenueChange = calculateChange(currentMetrics.totalRevenue, currentMetrics.priorRevenue);
  const fillCountChange = calculateChange(currentMetrics.fillCount, currentMetrics.priorFillCount);
  const avgRevenueChange = calculateChange(currentMetrics.avgRevenuePerFill, currentMetrics.priorAvgRevenue);
  const accountsChange = calculateChange(currentMetrics.activeAccounts, currentMetrics.priorActiveAccounts);

  // Get trend data based on selected period
  const currentTrendData = trendData[trendPeriod];
  const maxRevenue = Math.max(
    ...currentTrendData.current.map(d => d.revenue),
    ...(showComparison ? currentTrendData.prior.map(d => d.revenue) : [0])
  );

  // MetricCard Component
  const MetricCard = ({ title, value, format, change, icon, iconCategory = 'utility' }) => (
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
            <Icon category={iconCategory} name={icon} size="x-small" style={{ fill: '#706e6b' }} />
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

  // Simple bar chart component
  const TrendChart = () => {
    const chartHeight = 300;

    return (
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #dddbda',
        borderRadius: '4px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 className="slds-text-heading_small" style={{ marginBottom: '4px' }}>
              Revenue Trend
            </h3>
            <p className="slds-text-body_small" style={{ color: '#706e6b', margin: 0 }}>
              {trendPeriod.charAt(0).toUpperCase() + trendPeriod.slice(1)} revenue comparison
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Toggle for period */}
            <ButtonGroup variant="list">
              <Button
                label="Daily"
                variant={trendPeriod === 'daily' ? 'brand' : 'neutral'}
                onClick={() => setTrendPeriod('daily')}
              />
              <Button
                label="Weekly"
                variant={trendPeriod === 'weekly' ? 'brand' : 'neutral'}
                onClick={() => setTrendPeriod('weekly')}
              />
              <Button
                label="Monthly"
                variant={trendPeriod === 'monthly' ? 'brand' : 'neutral'}
                onClick={() => setTrendPeriod('monthly')}
              />
            </ButtonGroup>
            {/* Toggle for comparison */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="show-comparison"
                checked={showComparison}
                onChange={(e) => setShowComparison(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="show-comparison" style={{ fontSize: '13px', cursor: 'pointer' }}>
                Show prior period
              </label>
            </div>
          </div>
        </div>

        {/* Chart Legend */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#0176d3', borderRadius: '2px' }}></div>
            <span>Current Period</span>
          </div>
          {showComparison && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#c9c7c5', borderRadius: '2px' }}></div>
              <span>Prior Period</span>
            </div>
          )}
        </div>

        {/* Simple Bar Chart */}
        <div style={{ position: 'relative', height: `${chartHeight}px`, borderBottom: '1px solid #dddbda', borderLeft: '1px solid #dddbda' }}>
          <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', paddingLeft: '10px' }}>
            {currentTrendData.current.map((dataPoint, index) => {
              const currentHeight = (dataPoint.revenue / maxRevenue) * (chartHeight - 20);
              const priorDataPoint = showComparison ? currentTrendData.prior[index] : null;
              const priorHeight = priorDataPoint ? (priorDataPoint.revenue / maxRevenue) * (chartHeight - 20) : 0;

              return (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    padding: '0 8px'
                  }}
                >
                  {showComparison && (
                    <div
                      style={{
                        width: '40%',
                        height: `${priorHeight}px`,
                        backgroundColor: '#c9c7c5',
                        borderRadius: '2px 2px 0 0',
                        position: 'relative'
                      }}
                      title={`Prior: $${priorDataPoint.revenue.toLocaleString()}`}
                    />
                  )}
                  <div
                    style={{
                      width: showComparison ? '40%' : '60%',
                      height: `${currentHeight}px`,
                      backgroundColor: '#0176d3',
                      borderRadius: '2px 2px 0 0',
                      position: 'relative'
                    }}
                    title={`Current: $${dataPoint.revenue.toLocaleString()}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* X-axis labels */}
        <div style={{ display: 'flex', marginTop: '8px', paddingLeft: '10px' }}>
          {currentTrendData.current.map((dataPoint, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '11px',
                color: '#706e6b'
              }}
            >
              {dataPoint.date}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="slds-text-heading_large" style={{ marginBottom: '8px' }}>
                Fill Dashboard
              </h1>
              <p className="slds-text-body_regular" style={{ color: '#706e6b', margin: 0 }}>
                Track fill performance and revenue metrics
              </p>
            </div>
            <div>
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
            </div>
          </div>
        </div>

        {/* Executive Summary Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '16px', color: '#080707' }}>
            Executive Summary
          </h2>

          {/* Key Metrics Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <MetricCard
              title="Total Revenue"
              value={currentMetrics.totalRevenue}
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
              title="Avg Revenue per Fill"
              value={currentMetrics.avgRevenuePerFill}
              format="currency"
              change={avgRevenueChange}
              icon="metrics"
            />
            <MetricCard
              title="Active Accounts"
              value={currentMetrics.activeAccounts}
              format="number"
              change={accountsChange}
              icon="people"
            />
          </div>

          {/* Trend Line */}
          <TrendChart />
        </div>

        {/* Account Lifecycle Overview Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '16px', color: '#080707' }}>
            Account Lifecycle Overview
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
            {/* Donut Chart */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Account Distribution
              </h3>

              {/* Simple Donut representation */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                  {/* Outer circle with segments */}
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    {/* Active - 45.8% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="transparent"
                      stroke="#2e844a"
                      strokeWidth="40"
                      strokeDasharray="229.3 270.7"
                      strokeDashoffset="0"
                      transform="rotate(-90 100 100)"
                    />
                    {/* Current Stale - 26.7% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="transparent"
                      stroke="#fe9339"
                      strokeWidth="40"
                      strokeDasharray="133.5 366.5"
                      strokeDashoffset="-229.3"
                      transform="rotate(-90 100 100)"
                    />
                    {/* Prior Stale - 18.7% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="transparent"
                      stroke="#ffb75d"
                      strokeWidth="40"
                      strokeDasharray="93.5 406.5"
                      strokeDashoffset="-362.8"
                      transform="rotate(-90 100 100)"
                    />
                    {/* Lost - 8.8% */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="transparent"
                      stroke="#c23934"
                      strokeWidth="40"
                      strokeDasharray="44 456"
                      strokeDashoffset="-456.3"
                      transform="rotate(-90 100 100)"
                    />
                    {/* Center circle for donut effect */}
                    <circle cx="100" cy="100" r="60" fill="white" />
                    <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="300">
                      {totalAccounts}
                    </text>
                    <text x="100" y="115" textAnchor="middle" fontSize="12" fill="#706e6b">
                      Total Accounts
                    </text>
                  </svg>
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {accountLifecycleData.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: item.color, borderRadius: '2px' }}></div>
                      <span style={{ fontSize: '13px' }}>{item.category}</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.count} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Category Breakdown Table */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '20px'
              }}>
                <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                  Category Details
                </h3>
                <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                  <thead>
                    <tr className="slds-line-height_reset">
                      <th scope="col" style={{ padding: '8px' }}>
                        <div className="slds-truncate">Category</div>
                      </th>
                      <th scope="col" style={{ padding: '8px' }}>
                        <div className="slds-truncate">Description</div>
                      </th>
                      <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                        <div className="slds-truncate">Count</div>
                      </th>
                      <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                        <div className="slds-truncate">% of Total</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountLifecycleData.map((item, index) => (
                      <tr key={index}>
                        <td style={{ padding: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', backgroundColor: item.color, borderRadius: '50%' }}></div>
                            <strong>{item.category}</strong>
                          </div>
                        </td>
                        <td style={{ padding: '8px', color: '#706e6b' }}>
                          {item.description}
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>
                          <strong>{item.count}</strong>
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>
                          {item.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Revenue at Risk Metric */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '20px',
                borderLeft: '4px solid #fe9339'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Icon category="utility" name="warning" size="x-small" style={{ fill: '#fe9339' }} />
                  <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
                    Revenue at Risk
                  </h3>
                </div>
                <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', marginBottom: '4px' }}>
                  ${revenueAtRisk.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '12px', color: '#706e6b' }}>
                  Last 12 months revenue from Current Stale + Prior Stale accounts
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Reactivations Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '16px', color: '#080707' }}>
            Account Reactivations
          </h2>

          {/* Reactivation Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #2e844a'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Icon category="utility" name="success" size="x-small" style={{ fill: '#2e844a' }} />
                <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
                  Total Reactivations
                </h3>
              </div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
                {reactivationData[timeframe].total}
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0, marginBottom: '8px' }}>
                Current Stale → Active
              </h3>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
                {reactivationData[timeframe].fromCurrentStale}
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0, marginBottom: '8px' }}>
                Prior Stale → Active
              </h3>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
                {reactivationData[timeframe].fromPriorStale}
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0, marginBottom: '8px' }}>
                Lost → Active
              </h3>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
                {reactivationData[timeframe].fromLost}
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #2e844a'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Icon category="utility" name="currency" size="x-small" style={{ fill: '#2e844a' }} />
                <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
                  Revenue Recovered
                </h3>
              </div>
              <div className="slds-text-heading_medium" style={{ fontSize: '24px', fontWeight: '300' }}>
                ${(reactivationData[timeframe].revenueRecovered / 1000).toFixed(1)}K
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #fe9339'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Icon category="utility" name="clock" size="x-small" style={{ fill: '#fe9339' }} />
                <h3 className="slds-text-title" style={{ color: '#706e6b', fontSize: '13px', margin: 0 }}>
                  Open Revenue
                </h3>
              </div>
              <div className="slds-text-heading_medium" style={{ fontSize: '24px', fontWeight: '300' }}>
                ${(reactivationData[timeframe].openRevenue / 1000).toFixed(1)}K
              </div>
            </div>
          </div>

          {/* Bottom Grid: Funnel Table, Trend Chart, Top Users */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {/* Reactivation Funnel */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Reactivation Funnel (YTD)
              </h3>
              <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '8px' }}>
                      <div className="slds-truncate">Source Stage</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Count</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Revenue</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reactivationFunnel.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px' }}>
                        <div style={{ fontSize: '13px' }}>{item.source}</div>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <strong>{item.count}</strong>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        ${(item.revenue / 1000).toFixed(1)}K
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reactivation Trends */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Monthly Reactivations (YTD)
              </h3>
              <div style={{ position: 'relative', height: '180px', borderBottom: '1px solid #dddbda', borderLeft: '1px solid #dddbda' }}>
                <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', paddingLeft: '10px' }}>
                  {reactivationTrends.map((dataPoint, index) => {
                    const maxReactivations = Math.max(...reactivationTrends.map(d => d.reactivations));
                    const barHeight = (dataPoint.reactivations / maxReactivations) * 160;

                    return (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-end'
                        }}
                      >
                        <div
                          style={{
                            width: '60%',
                            height: `${barHeight}px`,
                            backgroundColor: '#2e844a',
                            borderRadius: '2px 2px 0 0',
                            position: 'relative'
                          }}
                          title={`${dataPoint.month}: ${dataPoint.reactivations} reactivations`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '8px', paddingLeft: '10px' }}>
                {reactivationTrends.map((dataPoint, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '10px',
                      color: '#706e6b'
                    }}
                  >
                    {dataPoint.month}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Reactivators */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Top Reactivators (YTD)
              </h3>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>User</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Count</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Avg Days</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topReactivators.map((user, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '12px' }}>{user.user}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <strong style={{ fontSize: '12px' }}>{user.count}</strong>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', color: '#706e6b' }}>
                        <span style={{ fontSize: '12px' }}>{user.avgDays}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Account Performance Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '16px', color: '#080707' }}>
            Account Performance
          </h2>

          {/* Top Accounts Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Top 10 by Revenue */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Top 10 Accounts by Revenue (YTD)
              </h3>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Account</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Revenue</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Trend</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topAccountsByRevenue.map((account, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '12px' }}>{account.name}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <strong style={{ fontSize: '12px' }}>${(account.revenue / 1000).toFixed(1)}K</strong>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                          <Icon
                            category="utility"
                            name={account.trend >= 0 ? 'up' : 'down'}
                            size="xx-small"
                            style={{ fill: account.trend >= 0 ? '#2e844a' : '#c23934' }}
                          />
                          <span style={{
                            fontSize: '12px',
                            color: account.trend >= 0 ? '#2e844a' : '#c23934',
                            fontWeight: 'bold'
                          }}>
                            {Math.abs(account.trend).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top 10 by Fill Count */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Top 10 Accounts by Fill Count (YTD)
              </h3>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Account</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Fill Count</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Avg/Fill</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topAccountsByFillCount.map((account, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '12px' }}>{account.name}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <strong style={{ fontSize: '12px' }}>{account.fillCount}</strong>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', color: '#706e6b' }}>
                        <span style={{ fontSize: '12px' }}>${account.avgPerFill.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fastest Growing and Declining */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Fastest Growing */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #2e844a'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon category="utility" name="trending" size="x-small" style={{ fill: '#2e844a' }} />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  Fastest Growing Accounts (YTD)
                </h3>
              </div>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Account</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Growth</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Revenue</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fastestGrowingAccounts.map((account, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '12px' }}>{account.name}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <strong style={{ fontSize: '12px', color: '#2e844a' }}>
                          +{account.growth.toFixed(1)}%
                        </strong>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', color: '#706e6b' }}>
                        <span style={{ fontSize: '12px' }}>${(account.revenue / 1000).toFixed(1)}K</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Declining Accounts (Churn Risk) */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #c23934'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon category="utility" name="warning" size="x-small" style={{ fill: '#c23934' }} />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  Declining Revenue (Churn Risk)
                </h3>
              </div>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Account</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Decline</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '11px' }}>Days</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {decliningAccounts.map((account, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '12px' }}>{account.name}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <strong style={{ fontSize: '12px', color: '#c23934' }}>
                          {account.decline.toFixed(1)}%
                        </strong>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', color: '#706e6b' }}>
                        <span style={{ fontSize: '12px' }}>{account.daysSinceLastFill}d</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Account Health Metrics */}
          <div>
            <h3 className="slds-text-heading_small" style={{ marginBottom: '16px', color: '#080707' }}>
              Account Health Metrics
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              {/* Days Since Last Fill (Aging Report) */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '20px'
              }}>
                <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                  Days Since Last Fill
                </h3>
                <div style={{ marginBottom: '16px' }}>
                  {accountAging.map((bucket, index) => (
                    <div key={index} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                        <span>{bucket.range}</span>
                        <span style={{ fontWeight: 'bold' }}>{bucket.count} ({bucket.percentage}%)</span>
                      </div>
                      <div style={{ height: '8px', backgroundColor: '#f3f3f3', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${bucket.percentage}%`,
                            backgroundColor: index === 0 ? '#2e844a' : index === 1 ? '#4bca81' : index === 2 ? '#fe9339' : index === 3 ? '#ff6838' : '#c23934',
                            transition: 'width 0.3s ease'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '12px', backgroundColor: '#f3f3f3', borderRadius: '4px', fontSize: '12px', color: '#706e6b' }}>
                  <strong>Alert:</strong> {accountAging[accountAging.length - 1].count} accounts haven't ordered in 60+ days
                </div>
              </div>

              {/* Account Concentration Risk */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '20px'
              }}>
                <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                  Revenue Concentration Risk
                </h3>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Top 10 Accounts</div>
                    <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300', color: '#fe9339' }}>
                      {concentrationRisk.top10Percentage}%
                    </div>
                    <div style={{ fontSize: '12px', color: '#706e6b' }}>
                      ${(concentrationRisk.top10Revenue / 1000).toFixed(0)}K of total revenue
                    </div>
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#dddbda', margin: '16px 0' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Top 20 Accounts</div>
                    <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300', color: '#c23934' }}>
                      {concentrationRisk.top20Percentage}%
                    </div>
                    <div style={{ fontSize: '12px', color: '#706e6b' }}>
                      ${(concentrationRisk.top20Revenue / 1000).toFixed(0)}K of total revenue
                    </div>
                  </div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#fef5f5', border: '1px solid #c23934', borderRadius: '4px', fontSize: '12px' }}>
                  <strong style={{ color: '#c23934' }}>High Risk:</strong> Over 65% revenue from top 20 accounts
                </div>
              </div>

              {/* New vs. Returning */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '20px'
              }}>
                <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                  New vs. Returning Accounts
                </h3>

                {/* Simple stacked bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ height: '40px', display: 'flex', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${newVsReturning.returningAccountPercentage}%`,
                        backgroundColor: '#0176d3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {newVsReturning.returningAccountPercentage}%
                    </div>
                    <div
                      style={{
                        width: `${newVsReturning.newAccountPercentage}%`,
                        backgroundColor: '#4bca81',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {newVsReturning.newAccountPercentage}%
                    </div>
                    <div
                      style={{
                        width: `${newVsReturning.transferredAccountPercentage}%`,
                        backgroundColor: '#fe9339',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {newVsReturning.transferredAccountPercentage}%
                    </div>
                  </div>
                </div>

                {/* Legend & Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#0176d3', borderRadius: '2px' }}></div>
                      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Returning Accounts</span>
                    </div>
                    <div style={{ marginLeft: '20px', fontSize: '12px', color: '#706e6b' }}>
                      {newVsReturning.returningAccountCount} accounts • ${(newVsReturning.returningAccountRevenue / 1000000).toFixed(2)}M revenue
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#4bca81', borderRadius: '2px' }}></div>
                      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>New Accounts</span>
                    </div>
                    <div style={{ marginLeft: '20px', fontSize: '12px', color: '#706e6b' }}>
                      {newVsReturning.newAccountCount} accounts • ${(newVsReturning.newAccountRevenue / 1000).toFixed(0)}K revenue
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#fe9339', borderRadius: '2px' }}></div>
                      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Transferred Accounts</span>
                    </div>
                    <div style={{ marginLeft: '20px', fontSize: '12px', color: '#706e6b' }}>
                      {newVsReturning.transferredAccountCount} accounts • ${(newVsReturning.transferredAccountRevenue / 1000).toFixed(0)}K revenue
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue by Compound Category Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '16px', color: '#080707' }}>
            Revenue by Compound Category
          </h2>

          {/* Top Row: Donut Chart, Bar Chart, Key Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Donut Chart */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Revenue Mix (YTD)
              </h3>

              {/* Donut Chart */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{ position: 'relative', width: '180px', height: '180px' }}>
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    {/* GLP - 38.4% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="70"
                      fill="transparent"
                      stroke="#0176d3"
                      strokeWidth="35"
                      strokeDasharray="192 308"
                      strokeDashoffset="0"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Non-GLP - 32.1% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="70"
                      fill="transparent"
                      stroke="#706e6b"
                      strokeWidth="35"
                      strokeDasharray="160.5 339.5"
                      strokeDashoffset="-192"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Rare Disease - 16.8% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="70"
                      fill="transparent"
                      stroke="#9050e9"
                      strokeWidth="35"
                      strokeDasharray="84 416"
                      strokeDashoffset="-352.5"
                      transform="rotate(-90 90 90)"
                    />
                    {/* Folinic Acid - 8.3% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="70"
                      fill="transparent"
                      stroke="#fe9339"
                      strokeWidth="35"
                      strokeDasharray="41.5 458.5"
                      strokeDashoffset="-436.5"
                      transform="rotate(-90 90 90)"
                    />
                    {/* ENT - 4.3% */}
                    <circle
                      cx="90"
                      cy="90"
                      r="70"
                      fill="transparent"
                      stroke="#4bca81"
                      strokeWidth="35"
                      strokeDasharray="21.5 478.5"
                      strokeDashoffset="-478"
                      transform="rotate(-90 90 90)"
                    />
                    <circle cx="90" cy="90" r="52" fill="white" />
                    <text x="90" y="85" textAnchor="middle" fontSize="20" fontWeight="300">
                      ${(totalCategoryRevenue / 1000000).toFixed(1)}M
                    </text>
                    <text x="90" y="102" textAnchor="middle" fontSize="11" fill="#706e6b">
                      Total Revenue
                    </text>
                  </svg>
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {compoundCategories.map((cat, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '10px', height: '10px', backgroundColor: cat.color, borderRadius: '2px' }}></div>
                      <span>{cat.name}</span>
                    </div>
                    <span style={{ fontWeight: 'bold' }}>{cat.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar Chart - Ranked */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Revenue by Category (YTD)
              </h3>
              <div style={{ position: 'relative', height: '240px' }}>
                {compoundCategories.map((cat, index) => {
                  const maxRevenue = Math.max(...compoundCategories.map(c => c.revenue));
                  const barWidth = (cat.revenue / maxRevenue) * 85;

                  return (
                    <div key={index} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                        <span style={{ fontWeight: 'bold' }}>{cat.name}</span>
                        <span>${(cat.revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div style={{ height: '24px', backgroundColor: '#f3f3f3', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${barWidth}%`,
                            backgroundColor: cat.color,
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '8px',
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            transition: 'width 0.3s ease'
                          }}
                        >
                          {cat.percentage}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* GLP Concentration */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '16px',
                borderLeft: '4px solid #0176d3'
              }}>
                <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>GLP % of Total</div>
                <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300', color: '#0176d3' }}>
                  {glpMetrics.percentageOfTotal}%
                </div>
                <div style={{ fontSize: '12px', color: '#2e844a', fontWeight: 'bold', marginTop: '4px' }}>
                  +{glpMetrics.growthRate}% growth
                </div>
                <div style={{ fontSize: '11px', color: '#706e6b', marginTop: '8px' }}>
                  Risk: {glpMetrics.concentrationRisk}
                </div>
              </div>

              {/* Rare Disease */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '16px',
                borderLeft: '4px solid #9050e9'
              }}>
                <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Rare Disease</div>
                <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300', color: '#9050e9' }}>
                  ${(rareDiseaseMetrics.revenue / 1000).toFixed(0)}K
                </div>
                <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
                  ${rareDiseaseMetrics.avgFillValue.toFixed(0)} avg/fill
                </div>
                <div style={{ fontSize: '11px', color: '#706e6b', marginTop: '8px' }}>
                  Consistency: {rareDiseaseMetrics.consistency}
                </div>
              </div>
            </div>
          </div>

          {/* Category Performance Table */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dddbda',
            borderRadius: '4px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
              Category Performance (YTD)
            </h3>
            <table className="slds-table slds-table_bordered slds-table_cell-buffer">
              <thead>
                <tr className="slds-line-height_reset">
                  <th scope="col" style={{ padding: '8px' }}>
                    <div className="slds-truncate">Category</div>
                  </th>
                  <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                    <div className="slds-truncate">Revenue</div>
                  </th>
                  <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                    <div className="slds-truncate">% of Total</div>
                  </th>
                  <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                    <div className="slds-truncate">Fills</div>
                  </th>
                  <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                    <div className="slds-truncate">Avg Fill Value</div>
                  </th>
                  <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                    <div className="slds-truncate">vs Prior Period</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compoundCategories.map((cat, index) => (
                  <tr key={index}>
                    <td style={{ padding: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', backgroundColor: cat.color, borderRadius: '50%' }}></div>
                        <strong>{cat.name}</strong>
                      </div>
                      <div style={{ fontSize: '11px', color: '#706e6b', marginLeft: '16px' }}>{cat.description}</div>
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      <strong>${(cat.revenue / 1000).toFixed(1)}K</strong>
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      {cat.percentage}%
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      {cat.fills.toLocaleString()}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      ${cat.avgFillValue.toFixed(2)}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                        <Icon
                          category="utility"
                          name={cat.trend >= 0 ? 'up' : 'down'}
                          size="xx-small"
                          style={{ fill: cat.trend >= 0 ? '#2e844a' : '#c23934' }}
                        />
                        <span style={{
                          fontSize: '13px',
                          color: cat.trend >= 0 ? '#2e844a' : '#c23934',
                          fontWeight: 'bold'
                        }}>
                          {cat.trend >= 0 ? '+' : ''}{cat.trend.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Category Trends Chart */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dddbda',
            borderRadius: '4px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
              Category Revenue Trends (Monthly - YTD)
            </h3>

            {/* Stacked Area Chart representation */}
            <div style={{ position: 'relative', height: '200px', borderBottom: '1px solid #dddbda', borderLeft: '1px solid #dddbda' }}>
              <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', paddingLeft: '10px' }}>
                {categoryTrends.map((month, index) => {
                  const total = month.GLP + month.NonGLP + month.RareDisease + month.FolinicAcid + month.ENT;
                  const maxTotal = Math.max(...categoryTrends.map(m => m.GLP + m.NonGLP + m.RareDisease + m.FolinicAcid + m.ENT));

                  const glpHeight = (month.GLP / maxTotal) * 180;
                  const nonGLPHeight = (month.NonGLP / maxTotal) * 180;
                  const rareHeight = (month.RareDisease / maxTotal) * 180;
                  const folinicHeight = (month.FolinicAcid / maxTotal) * 180;
                  const entHeight = (month.ENT / maxTotal) * 180;

                  return (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        height: '100%',
                        justifyContent: 'flex-start'
                      }}
                    >
                      <div style={{ height: `${entHeight}px`, backgroundColor: '#4bca81' }} title={`ENT: $${(month.ENT / 1000).toFixed(1)}K`} />
                      <div style={{ height: `${folinicHeight}px`, backgroundColor: '#fe9339' }} title={`Folinic: $${(month.FolinicAcid / 1000).toFixed(1)}K`} />
                      <div style={{ height: `${rareHeight}px`, backgroundColor: '#9050e9' }} title={`Rare Disease: $${(month.RareDisease / 1000).toFixed(1)}K`} />
                      <div style={{ height: `${nonGLPHeight}px`, backgroundColor: '#706e6b' }} title={`Non-GLP: $${(month.NonGLP / 1000).toFixed(1)}K`} />
                      <div style={{ height: `${glpHeight}px`, backgroundColor: '#0176d3' }} title={`GLP: $${(month.GLP / 1000).toFixed(1)}K`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X-axis labels */}
            <div style={{ display: 'flex', marginTop: '8px', paddingLeft: '10px' }}>
              {categoryTrends.map((month, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '10px',
                    color: '#706e6b'
                  }}
                >
                  {month.month}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {compoundCategories.map((cat, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: cat.color, borderRadius: '2px' }}></div>
                  <span>{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Dimensional Analysis */}
          <div>
            <h3 className="slds-text-heading_small" style={{ marginBottom: '16px', color: '#080707' }}>
              Cross-Dimensional Analysis
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              {/* Category by User */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '20px'
              }}>
                <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                  Category by User (YTD Top 5)
                </h3>
                <table className="slds-table slds-table_cell-buffer">
                  <thead>
                    <tr className="slds-line-height_reset">
                      <th scope="col" style={{ padding: '4px 8px' }}>
                        <div className="slds-truncate" style={{ fontSize: '10px' }}>User</div>
                      </th>
                      <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <div className="slds-truncate" style={{ fontSize: '10px' }}>GLP</div>
                      </th>
                      <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <div className="slds-truncate" style={{ fontSize: '10px' }}>Rare</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryByUser.map((user, index) => (
                      <tr key={index}>
                        <td style={{ padding: '4px 8px' }}>
                          <div style={{ fontSize: '11px' }}>{user.user}</div>
                        </td>
                        <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                          ${(user.GLP / 1000).toFixed(0)}K
                        </td>
                        <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                          ${(user.RareDisease / 1000).toFixed(0)}K
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Category by Business Segment */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '20px'
              }}>
                <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                  Category by Business Segment
                </h3>
                <table className="slds-table slds-table_cell-buffer">
                  <thead>
                    <tr className="slds-line-height_reset">
                      <th scope="col" style={{ padding: '4px 8px' }}>
                        <div className="slds-truncate" style={{ fontSize: '10px' }}>Segment</div>
                      </th>
                      <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <div className="slds-truncate" style={{ fontSize: '10px' }}>GLP</div>
                      </th>
                      <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <div className="slds-truncate" style={{ fontSize: '10px' }}>Other</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryBySegment.map((seg, index) => {
                      const otherRevenue = seg.NonGLP + seg.RareDisease + seg.FolinicAcid + seg.ENT;
                      return (
                        <tr key={index}>
                          <td style={{ padding: '4px 8px' }}>
                            <div style={{ fontSize: '11px' }}>{seg.segment}</div>
                          </td>
                          <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                            ${(seg.GLP / 1000).toFixed(0)}K
                          </td>
                          <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                            ${(otherRevenue / 1000).toFixed(0)}K
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Category by Account Lifecycle */}
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #dddbda',
                borderRadius: '4px',
                padding: '20px'
              }}>
                <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                  Category by Account Lifecycle
                </h3>
                <table className="slds-table slds-table_cell-buffer">
                  <thead>
                    <tr className="slds-line-height_reset">
                      <th scope="col" style={{ padding: '4px 8px' }}>
                        <div className="slds-truncate" style={{ fontSize: '10px' }}>Stage</div>
                      </th>
                      <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <div className="slds-truncate" style={{ fontSize: '10px' }}>GLP</div>
                      </th>
                      <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <div className="slds-truncate" style={{ fontSize: '10px' }}>Non-GLP</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryByLifecycle.map((lifecycle, index) => (
                      <tr key={index}>
                        <td style={{ padding: '4px 8px' }}>
                          <div style={{ fontSize: '11px' }}>{lifecycle.stage}</div>
                        </td>
                        <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                          ${(lifecycle.GLP / 1000).toFixed(0)}K
                        </td>
                        <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                          ${(lifecycle.NonGLP / 1000).toFixed(0)}K
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* New Account Revenue by Category */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                New Account Revenue by Category (YTD)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                {newAccountByCategory.map((item, index) => (
                  <div key={index}>
                    <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>{item.category}</div>
                    <div className="slds-text-heading_medium" style={{ fontSize: '20px', fontWeight: '300' }}>
                      ${(item.revenue / 1000).toFixed(0)}K
                    </div>
                    <div style={{ fontSize: '12px', color: '#706e6b' }}>
                      {item.percentage}% of new
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Growth Metrics Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '16px', color: '#080707' }}>
            Growth Metrics
          </h2>

          {/* Core Growth KPIs (Top Row) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #2e844a'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>MoM Growth</div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', color: '#2e844a' }}>
                +{growthKPIs.MoM}%
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
                Month over Month
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>QoQ Growth</div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
                +{growthKPIs.QoQ}%
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
                Quarter over Quarter
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>YoY Growth</div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
                +{growthKPIs.YoY}%
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
                Year over Year
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #0176d3'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>New Accounts</div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', color: '#0176d3' }}>
                {newAccountMetrics.newAccountsYTD}
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
                YTD New Accounts
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Net Account Change</div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', color: '#2e844a' }}>
                +{netAccountMovement.netChange}
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
                Net gain this year
              </div>
            </div>
          </div>

          {/* Revenue Growth Trend & New Accounts */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Revenue Growth Trend */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Revenue Growth Trend (Monthly - YTD)
              </h3>
              <div style={{ position: 'relative', height: '200px', borderBottom: '1px solid #dddbda', borderLeft: '1px solid #dddbda' }}>
                <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', paddingLeft: '10px' }}>
                  {revenueGrowthTrend.map((dataPoint, index) => {
                    const maxRevenue = Math.max(...revenueGrowthTrend.map(d => d.revenue));
                    const barHeight = (dataPoint.revenue / maxRevenue) * 180;
                    const color = dataPoint.growthRate >= 0 ? '#2e844a' : '#c23934';

                    return (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          height: '100%'
                        }}
                      >
                        <div
                          style={{
                            fontSize: '9px',
                            color: color,
                            fontWeight: 'bold',
                            marginBottom: '2px'
                          }}
                        >
                          {dataPoint.growthRate >= 0 ? '+' : ''}{dataPoint.growthRate.toFixed(1)}%
                        </div>
                        <div
                          style={{
                            width: '70%',
                            height: `${barHeight}px`,
                            backgroundColor: '#0176d3',
                            borderRadius: '2px 2px 0 0'
                          }}
                          title={`${dataPoint.month}: $${(dataPoint.revenue / 1000).toFixed(0)}K (${dataPoint.growthRate >= 0 ? '+' : ''}${dataPoint.growthRate.toFixed(1)}%)`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '8px', paddingLeft: '10px' }}>
                {revenueGrowthTrend.map((dataPoint, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '10px',
                      color: '#706e6b'
                    }}
                  >
                    {dataPoint.month}
                  </div>
                ))}
              </div>
            </div>

            {/* New Accounts by Month */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                New Accounts by Month
              </h3>
              <div style={{ position: 'relative', height: '200px', borderBottom: '1px solid #dddbda', borderLeft: '1px solid #dddbda' }}>
                <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', paddingLeft: '10px' }}>
                  {newAccountsByMonth.map((dataPoint, index) => {
                    const maxRevenue = Math.max(...newAccountsByMonth.map(d => d.revenue));
                    const barHeight = (dataPoint.revenue / maxRevenue) * 180;

                    return (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-end'
                        }}
                      >
                        <div
                          style={{
                            width: '70%',
                            height: `${barHeight}px`,
                            backgroundColor: '#4bca81',
                            borderRadius: '2px 2px 0 0',
                            position: 'relative'
                          }}
                          title={`${dataPoint.month}: ${dataPoint.accounts} accounts, $${(dataPoint.revenue / 1000).toFixed(1)}K`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '8px', paddingLeft: '10px' }}>
                {newAccountsByMonth.map((dataPoint, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '10px',
                      color: '#706e6b'
                    }}
                  >
                    {dataPoint.month}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Growth by Category & Segment */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Growth by Category */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Growth by Compound Category (YTD)
              </h3>
              <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '8px' }}>
                      <div className="slds-truncate">Category</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Current</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Growth $</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Growth %</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {growthByCategory.map((cat, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px' }}>
                        <strong>{cat.category}</strong>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        ${(cat.current / 1000).toFixed(0)}K
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <span style={{ color: cat.growth >= 0 ? '#2e844a' : '#c23934' }}>
                          {cat.growth >= 0 ? '+' : ''}${(cat.growth / 1000).toFixed(0)}K
                        </span>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                          <Icon
                            category="utility"
                            name={cat.growthPct >= 0 ? 'up' : 'down'}
                            size="xx-small"
                            style={{ fill: cat.growthPct >= 0 ? '#2e844a' : '#c23934' }}
                          />
                          <span style={{
                            fontSize: '13px',
                            color: cat.growthPct >= 0 ? '#2e844a' : '#c23934',
                            fontWeight: 'bold'
                          }}>
                            {cat.growthPct >= 0 ? '+' : ''}{cat.growthPct.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Growth by Business Segment */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Growth by Business Segment (YTD)
              </h3>
              <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '8px' }}>
                      <div className="slds-truncate">Segment</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Current</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Growth %</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {growthBySegment.map((seg, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px' }}>
                        {seg.segment}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        ${(seg.current / 1000).toFixed(0)}K
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                          <Icon
                            category="utility"
                            name={seg.growthPct >= 0 ? 'up' : 'down'}
                            size="xx-small"
                            style={{ fill: seg.growthPct >= 0 ? '#2e844a' : '#c23934' }}
                          />
                          <span style={{
                            fontSize: '13px',
                            color: seg.growthPct >= 0 ? '#2e844a' : '#c23934',
                            fontWeight: 'bold'
                          }}>
                            {seg.growthPct >= 0 ? '+' : ''}{seg.growthPct.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* New Account Metrics & Growth by User */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* New Account Metrics */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                New Account Revenue (YTD)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>New Account Revenue</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '24px', fontWeight: '300' }}>
                    ${(newAccountMetrics.newAccountRevenueYTD / 1000).toFixed(0)}K
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>% of Total Revenue</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '24px', fontWeight: '300', color: '#4bca81' }}>
                    {newAccountMetrics.newAccountPercentOfTotal}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>New Accounts</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '24px', fontWeight: '300' }}>
                    {newAccountMetrics.newAccountsYTD}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Avg per New Account</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '24px', fontWeight: '300' }}>
                    ${newAccountMetrics.avgRevenuePerNewAccount.toLocaleString()}
                  </div>
                </div>
              </div>
              <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', marginTop: '16px' }}>
                New Accounts by User
              </h4>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>User</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Count</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Revenue</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newAccountsByUser.map((user, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{user.user}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        {user.accounts}
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        ${(user.revenue / 1000).toFixed(0)}K
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Growth by User */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Growth by User (YTD)
              </h3>
              <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '8px' }}>
                      <div className="slds-truncate">User</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Current</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Growth $</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Growth %</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {growthByUser.map((user, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px' }}>
                        {user.user}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        ${(user.currentRevenue / 1000).toFixed(0)}K
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <span style={{ color: user.growth >= 0 ? '#2e844a' : '#c23934' }}>
                          {user.growth >= 0 ? '+' : ''}${(user.growth / 1000).toFixed(0)}K
                        </span>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                          <Icon
                            category="utility"
                            name={user.growthPct >= 0 ? 'up' : 'down'}
                            size="xx-small"
                            style={{ fill: user.growthPct >= 0 ? '#2e844a' : '#c23934' }}
                          />
                          <span style={{
                            fontSize: '13px',
                            color: user.growthPct >= 0 ? '#2e844a' : '#c23934',
                            fontWeight: 'bold'
                          }}>
                            {user.growthPct >= 0 ? '+' : ''}{user.growthPct.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fill Growth & Net Account Movement */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Fill Growth Metrics */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Fill Growth Metrics
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Fill Count MoM Growth</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300', color: '#2e844a' }}>
                    +{fillGrowthMetrics.fillCountMoM}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Fill Count YoY Growth</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300', color: '#2e844a' }}>
                    +{fillGrowthMetrics.fillCountYoY}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Avg Fills per Account</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300' }}>
                    {fillGrowthMetrics.avgFillsPerAccount}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Avg Fill Value Growth</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300', color: '#2e844a' }}>
                    +{fillGrowthMetrics.avgFillValueGrowth}%
                  </div>
                </div>
              </div>
            </div>

            {/* Net Account Movement */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Net Account Movement (YTD)
              </h3>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '8px' }}>
                      <div className="slds-truncate">Metric</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Count</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Icon category="utility" name="add" size="xx-small" style={{ fill: '#2e844a' }} />
                        <span>New Accounts</span>
                      </div>
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#2e844a', fontWeight: 'bold' }}>
                      +{netAccountMovement.newAccounts}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Icon category="utility" name="add" size="xx-small" style={{ fill: '#2e844a' }} />
                        <span>Reactivations</span>
                      </div>
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#2e844a', fontWeight: 'bold' }}>
                      +{netAccountMovement.reactivations}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Icon category="utility" name="dash" size="xx-small" style={{ fill: '#fe9339' }} />
                        <span>Accounts Gone Stale</span>
                      </div>
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#fe9339', fontWeight: 'bold' }}>
                      -{netAccountMovement.accountsGoneStale}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Icon category="utility" name="dash" size="xx-small" style={{ fill: '#c23934' }} />
                        <span>Accounts Lost</span>
                      </div>
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#c23934', fontWeight: 'bold' }}>
                      -{netAccountMovement.accountsLost}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: '#f3f3f3' }}>
                    <td style={{ padding: '8px' }}>
                      <strong>Net Account Change</strong>
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>
                      <strong style={{ fontSize: '18px', color: '#2e844a' }}>
                        +{netAccountMovement.netChange}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Momentum & Warning Signals */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Momentum Signals */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #2e844a'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon category="utility" name="trending" size="x-small" style={{ fill: '#2e844a' }} />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  Momentum Signals
                </h3>
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginBottom: '12px' }}>
                Accounts with 3+ consecutive months of growth
              </div>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Account</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Months</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Avg Growth</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {momentumSignals.map((signal, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{signal.account}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        {signal.consecutiveMonths}
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#2e844a', fontWeight: 'bold' }}>
                        +{signal.avgGrowth.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Warning Signals */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #c23934'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon category="utility" name="warning" size="x-small" style={{ fill: '#c23934' }} />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  Warning Signals
                </h3>
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginBottom: '12px' }}>
                Accounts with 3+ consecutive months of decline
              </div>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Account</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Months</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Avg Decline</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Days</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {warningSignals.map((signal, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{signal.account}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        {signal.consecutiveMonths}
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#c23934', fontWeight: 'bold' }}>
                        {signal.avgDecline.toFixed(1)}%
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#706e6b' }}>
                        {signal.daysSinceLastFill}d
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leading Ingredient Performance Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '16px', color: '#080707' }}>
            Leading Ingredient Performance
          </h2>

          {/* Top Ingredients */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Top 10 by Revenue */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Top 10 Ingredients by Revenue (YTD)
              </h3>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Ingredient</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Revenue</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>% Total</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Trend</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topIngredientsByRevenue.map((ingredient, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{ingredient.ingredient}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        <strong>${(ingredient.revenue / 1000).toFixed(0)}K</strong>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        {ingredient.percentage}%
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                          <Icon
                            category="utility"
                            name={ingredient.trend >= 0 ? 'up' : 'down'}
                            size="xx-small"
                            style={{ fill: ingredient.trend >= 0 ? '#2e844a' : '#c23934' }}
                          />
                          <span style={{
                            fontSize: '11px',
                            color: ingredient.trend >= 0 ? '#2e844a' : '#c23934',
                            fontWeight: 'bold'
                          }}>
                            {ingredient.trend >= 0 ? '+' : ''}{ingredient.trend.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Top 10 by Fill Count */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Top 10 Ingredients by Fill Count (YTD)
              </h3>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Ingredient</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Fills</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Avg/Fill</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topIngredientsByFills.map((ingredient, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{ingredient.ingredient}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        <strong>{ingredient.fills.toLocaleString()}</strong>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#706e6b' }}>
                        ${ingredient.avgFillValue.toFixed(0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Growing and Declining Ingredients */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Fastest Growing */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #2e844a'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon category="utility" name="trending" size="x-small" style={{ fill: '#2e844a' }} />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  Fastest Growing Ingredients (YTD)
                </h3>
              </div>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Ingredient</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Growth</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Revenue</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fastestGrowingIngredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{ingredient.ingredient}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#2e844a', fontWeight: 'bold' }}>
                        +{ingredient.growth.toFixed(1)}%
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#706e6b' }}>
                        ${(ingredient.revenue / 1000).toFixed(0)}K
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Fastest Declining */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #c23934'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon category="utility" name="warning" size="x-small" style={{ fill: '#c23934' }} />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  Declining Ingredients (YTD)
                </h3>
              </div>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Ingredient</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Decline</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Revenue</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {decliningIngredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{ingredient.ingredient}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#c23934', fontWeight: 'bold' }}>
                        {ingredient.decline.toFixed(1)}%
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#706e6b' }}>
                        ${(ingredient.revenue / 1000).toFixed(0)}K
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ingredient Concentration & By User */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
            {/* Concentration Risk */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Ingredient Concentration Risk
              </h3>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Top 5 Ingredients</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '32px', fontWeight: '300', color: '#fe9339' }}>
                    {ingredientConcentration.top5Percentage}%
                  </div>
                  <div style={{ fontSize: '12px', color: '#706e6b' }}>
                    ${(ingredientConcentration.top5Revenue / 1000000).toFixed(1)}M of total
                  </div>
                </div>
                <div style={{ height: '1px', backgroundColor: '#dddbda', margin: '16px 0' }} />
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Top 10 Ingredients</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '32px', fontWeight: '300', color: '#c23934' }}>
                    {ingredientConcentration.top10Percentage}%
                  </div>
                  <div style={{ fontSize: '12px', color: '#706e6b' }}>
                    ${(ingredientConcentration.top10Revenue / 1000000).toFixed(1)}M of total
                  </div>
                </div>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#fef5f5', border: '1px solid #c23934', borderRadius: '4px', fontSize: '12px' }}>
                <strong style={{ color: '#c23934' }}>Very High Risk:</strong> 95% from top 10 ingredients
              </div>
            </div>

            {/* Ingredient by User */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Top Ingredients by User (YTD)
              </h3>
              <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '8px' }}>
                      <div className="slds-truncate">User</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Semaglutide</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Tirzepatide</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Sirolimus</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientByUser.map((user, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px' }}>
                        {user.user}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        ${(user.semaglutide / 1000).toFixed(0)}K
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        ${(user.tirzepatide / 1000).toFixed(0)}K
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        ${(user.sirolimus / 1000).toFixed(0)}K
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Operational Metrics Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '16px', color: '#080707' }}>
            Operational Metrics
          </h2>

          {/* Fill Trends & Operational KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Fill Count by Day of Week */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Fill Count by Day of Week
              </h3>
              <div style={{ position: 'relative', height: '200px', borderBottom: '1px solid #dddbda', borderLeft: '1px solid #dddbda' }}>
                <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', paddingLeft: '10px' }}>
                  {fillTrendsDaily.map((day, index) => {
                    const maxFills = Math.max(...fillTrendsDaily.map(d => d.fills));
                    const barHeight = (day.fills / maxFills) * 180;

                    return (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-end'
                        }}
                      >
                        <div
                          style={{
                            width: '70%',
                            height: `${barHeight}px`,
                            backgroundColor: '#0176d3',
                            borderRadius: '2px 2px 0 0'
                          }}
                          title={`${day.day}: ${day.fills} fills, $${(day.revenue / 1000).toFixed(1)}K`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '8px', paddingLeft: '10px' }}>
                {fillTrendsDaily.map((day, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '11px',
                      color: '#706e6b'
                    }}
                  >
                    {day.day}
                  </div>
                ))}
              </div>
            </div>

            {/* Operational KPIs */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Operational KPIs
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Fills per Day</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300' }}>
                    {operationalMetrics.fillsPerDay}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Fills per Week</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300' }}>
                    {operationalMetrics.fillsPerWeek}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Revenue/Business Day</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '24px', fontWeight: '300' }}>
                    ${operationalMetrics.revenuePerBusinessDay.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prescriber Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            {/* Top Prescribers */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Top Prescribers (YTD)
              </h3>
              <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '8px' }}>
                      <div className="slds-truncate">Prescriber</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Revenue</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Fills</div>
                    </th>
                    <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                      <div className="slds-truncate">Accounts</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topPrescribers.map((prescriber, index) => (
                    <tr key={index}>
                      <td style={{ padding: '8px' }}>
                        {prescriber.prescriber}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        <strong>${(prescriber.revenue / 1000).toFixed(0)}K</strong>
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        {prescriber.fills.toLocaleString()}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'right' }}>
                        {prescriber.accounts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Prescriber Metrics */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Prescriber Metrics (YTD)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Total Prescribers</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '32px', fontWeight: '300' }}>
                    {prescriberMetrics.totalPrescribers}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>New Prescribers</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '32px', fontWeight: '300', color: '#4bca81' }}>
                    {prescriberMetrics.newPrescribersYTD}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Avg per Account</div>
                  <div className="slds-text-heading_medium" style={{ fontSize: '32px', fontWeight: '300' }}>
                    {prescriberMetrics.avgPrescribersPerAccount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Activity Metrics Section */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '16px', color: '#080707' }}>
            Account Activity Metrics
          </h2>

          {/* Activity Summary Scorecards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Total Visits</div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
                {activityMetrics.totalVisits.toLocaleString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <Icon
                  category="utility"
                  name="up"
                  size="xx-small"
                  style={{ fill: '#2e844a' }}
                />
                <span style={{ fontSize: '12px', color: '#2e844a', fontWeight: 'bold' }}>
                  +{(((activityMetrics.totalVisits - activityMetrics.priorVisits) / activityMetrics.priorVisits) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Total Calls</div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
                {activityMetrics.totalCalls.toLocaleString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <Icon
                  category="utility"
                  name="up"
                  size="xx-small"
                  style={{ fill: '#2e844a' }}
                />
                <span style={{ fontSize: '12px', color: '#2e844a', fontWeight: 'bold' }}>
                  +{(((activityMetrics.totalCalls - activityMetrics.priorCalls) / activityMetrics.priorCalls) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Total Emails</div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
                {activityMetrics.totalEmails.toLocaleString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <Icon
                  category="utility"
                  name="up"
                  size="xx-small"
                  style={{ fill: '#2e844a' }}
                />
                <span style={{ fontSize: '12px', color: '#2e844a', fontWeight: 'bold' }}>
                  +{(((activityMetrics.totalEmails - activityMetrics.priorEmails) / activityMetrics.priorEmails) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #0176d3'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Total Activities</div>
              <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', color: '#0176d3' }}>
                {activityMetrics.totalActivities.toLocaleString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <Icon
                  category="utility"
                  name="up"
                  size="xx-small"
                  style={{ fill: '#2e844a' }}
                />
                <span style={{ fontSize: '12px', color: '#2e844a', fontWeight: 'bold' }}>
                  +{(((activityMetrics.totalActivities - activityMetrics.priorTotalActivities) / activityMetrics.priorTotalActivities) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Activity Trend & By User */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* Activity Trend */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Activity Trends (Weekly)
              </h3>
              <div style={{ position: 'relative', height: '200px', borderBottom: '1px solid #dddbda', borderLeft: '1px solid #dddbda' }}>
                <div style={{ display: 'flex', height: '100%', alignItems: 'flex-end', paddingLeft: '10px' }}>
                  {activityTrends.map((week, index) => {
                    const maxTotal = Math.max(...activityTrends.map(w => w.visits + w.calls + w.emails));
                    const total = week.visits + week.calls + week.emails;
                    const visitsHeight = (week.visits / maxTotal) * 180;
                    const callsHeight = (week.calls / maxTotal) * 180;
                    const emailsHeight = (week.emails / maxTotal) * 180;

                    return (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column-reverse',
                          height: '100%',
                          justifyContent: 'flex-start'
                        }}
                      >
                        <div style={{ height: `${emailsHeight}px`, backgroundColor: '#9050e9' }} title={`Emails: ${week.emails}`} />
                        <div style={{ height: `${callsHeight}px`, backgroundColor: '#fe9339' }} title={`Calls: ${week.calls}`} />
                        <div style={{ height: `${visitsHeight}px`, backgroundColor: '#0176d3' }} title={`Visits: ${week.visits}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: '8px', paddingLeft: '10px' }}>
                {activityTrends.map((week, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '10px',
                      color: '#706e6b'
                    }}
                  >
                    {week.week.replace('Week ', 'W')}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#0176d3', borderRadius: '2px' }}></div>
                  <span>Visits</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#fe9339', borderRadius: '2px' }}></div>
                  <span>Calls</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#9050e9', borderRadius: '2px' }}></div>
                  <span>Emails</span>
                </div>
              </div>
            </div>

            {/* Activity by User */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Activity by User (YTD)
              </h3>
              <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>User</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Total</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Accounts</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Revenue</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activityByUser.map((user, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{user.user}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        <strong>{user.total}</strong>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        {user.accountsTouched}
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        ${(user.revenue / 1000).toFixed(0)}K
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Insights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            {/* High Revenue Low Activity */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #fe9339'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon category="utility" name="warning" size="x-small" style={{ fill: '#fe9339' }} />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  High Revenue / Low Activity
                </h3>
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginBottom: '12px' }}>
                Risk: Under-engaged accounts
              </div>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Account</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Revenue</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Activities</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {highRevenueLoActivity.map((account, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{account.account}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        ${(account.revenue / 1000).toFixed(0)}K
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#fe9339', fontWeight: 'bold' }}>
                        {account.activities}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* High Activity Low Revenue */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px',
              borderLeft: '4px solid #0176d3'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon category="utility" name="info" size="x-small" style={{ fill: '#0176d3' }} />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  High Activity / Low Revenue
                </h3>
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginBottom: '12px' }}>
                Opportunity: Conversion issue
              </div>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Account</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Revenue</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Activities</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {highActivityLowRevenue.map((account, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{account.account}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        ${(account.revenue / 1000).toFixed(0)}K
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', color: '#0176d3', fontWeight: 'bold' }}>
                        {account.activities}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Activity by Lifecycle */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid #dddbda',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
                Activity by Lifecycle Stage
              </h3>
              <table className="slds-table slds-table_cell-buffer">
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ padding: '4px 8px' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Stage</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Accounts</div>
                    </th>
                    <th scope="col" style={{ padding: '4px 8px', textAlign: 'right' }}>
                      <div className="slds-truncate" style={{ fontSize: '10px' }}>Avg/Acct</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activityByLifecycle.map((lifecycle, index) => (
                    <tr key={index}>
                      <td style={{ padding: '4px 8px' }}>
                        <div style={{ fontSize: '11px' }}>{lifecycle.stage}</div>
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px' }}>
                        {lifecycle.accounts}
                      </td>
                      <td style={{ padding: '4px 8px', textAlign: 'right', fontSize: '11px', fontWeight: 'bold' }}>
                        {lifecycle.avgPerAccount.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Efficiency */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dddbda',
            borderRadius: '4px',
            padding: '20px'
          }}>
            <h3 className="slds-text-heading_small" style={{ marginBottom: '16px' }}>
              Activity Efficiency Metrics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Revenue per Activity</div>
                <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300' }}>
                  ${activityEfficiency.revenuePerActivity}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Revenue per Visit</div>
                <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300' }}>
                  ${activityEfficiency.revenuePerVisit.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Activities per New Account</div>
                <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300' }}>
                  {activityEfficiency.activitiesPerNewAccount}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Activities to Reactivation</div>
                <div className="slds-text-heading_medium" style={{ fontSize: '28px', fontWeight: '300' }}>
                  {activityEfficiency.activitiesToReactivation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillDashboard;
