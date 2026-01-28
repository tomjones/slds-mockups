import React, { useState, useMemo } from 'react';
import Card from '@salesforce/design-system-react/components/card';
import Icon from '@salesforce/design-system-react/components/icon';

const NewProviderRevenue = () => {
  const [accountOwnerFilter, setAccountOwnerFilter] = useState('all');
  const [weekRangeFilter, setWeekRangeFilter] = useState('all');
  const [fillCategoryFilter, setFillCategoryFilter] = useState('all');

  // Generate week ranges for the last 12 weeks
  const generateWeekRanges = () => {
    const weeks = [];
    const endDate = new Date('2025-12-13');

    for (let i = 0; i < 12; i++) {
      const weekEnd = new Date(endDate);
      weekEnd.setDate(weekEnd.getDate() - (i * 7));

      const weekStart = new Date(weekEnd);
      weekStart.setDate(weekStart.getDate() - 6);

      weeks.push({
        id: `week${i}`,
        start: weekStart.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        end: weekEnd.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        label: `${weekStart.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`
      });
    }

    return weeks;
  };

  const weekRanges = generateWeekRanges();

  // Sample provider data (based on the user's example data)
  const providerData = [
    // Bobbie Mills' providers
    {
      accountOwner: 'Bobbie Mills',
      providerName: 'ANNA DONOVAN',
      fillCategory: 'Non-GLP',
      recordCount: 1,
      totalRevenue: 129.00,
      weekRevenue: {
        'week0': 129.00
      },
      nonGLPRevenue: { 'week0': 129.00 },
      glpRevenue: {}
    },
    {
      accountOwner: 'Bobbie Mills',
      providerName: 'BENJAMIN WYCHERLY',
      fillCategory: 'Rare Disease',
      recordCount: 2,
      totalRevenue: 266.00,
      weekRevenue: {
        'week0': 190.00, 'week3': 76.00
      },
      nonGLPRevenue: { 'week0': 190.00, 'week3': 76.00 },
      glpRevenue: {}
    },
    {
      accountOwner: 'Bobbie Mills',
      providerName: 'BRENT YODER',
      fillCategory: 'GLP',
      recordCount: 1,
      totalRevenue: 228.51,
      weekRevenue: {
        'week0': 228.51
      },
      nonGLPRevenue: { 'week0': 228.51 },
      glpRevenue: { 'week0': 228.51 }
    },
    {
      accountOwner: 'Bobbie Mills',
      providerName: 'MARIA NOVAK',
      fillCategory: 'Folinic Acid',
      recordCount: 6,
      totalRevenue: 1144.67,
      weekRevenue: {
        'week0': 716.67, 'week1': 114.00, 'week2': 157.00, 'week4': 57.00, 'week5': 100.00
      },
      nonGLPRevenue: { 'week0': 716.67 },
      glpRevenue: { 'week1': 114.00, 'week2': 157.00, 'week4': 57.00, 'week5': 100.00 }
    },
    {
      accountOwner: 'Bobbie Mills',
      providerName: 'RICHARD HEYES',
      fillCategory: 'ENT',
      recordCount: 15,
      totalRevenue: 2850.35,
      weekRevenue: {
        'week0': 1291.35, 'week1': 525.00, 'week2': 225.00, 'week3': 189.00, 'week4': 125.00, 'week5': 89.00, 'week6': 114.00, 'week7': 125.00, 'week8': 57.00, 'week9': 110.00
      },
      nonGLPRevenue: { 'week0': 1291.35, 'week2': 125.00, 'week4': 125.00 },
      glpRevenue: { 'week0': 400.00, 'week1': 525.00, 'week2': 100.00, 'week3': 189.00, 'week5': 89.00, 'week6': 114.00, 'week7': 125.00, 'week8': 57.00, 'week9': 110.00 }
    },
    // Brenton Westbrook's providers (sample)
    {
      accountOwner: 'Brenton Westbrook',
      providerName: 'COLBY FAGAN',
      fillCategory: 'GLP',
      recordCount: 17,
      totalRevenue: 6845.75,
      weekRevenue: {
        'week0': 4374.41, 'week1': 1053.34, 'week2': 225.00, 'week3': 189.00, 'week4': 257.00, 'week5': 125.00, 'week6': 89.00, 'week7': 178.00, 'week8': 95.00, 'week9': 110.00, 'week10': 75.00, 'week11': 75.00
      },
      nonGLPRevenue: { 'week0': 4374.41, 'week2': 125.00, 'week5': 125.00 },
      glpRevenue: { 'week0': 460.44, 'week1': 1053.34, 'week2': 100.00, 'week3': 189.00, 'week4': 257.00, 'week6': 89.00, 'week7': 178.00, 'week8': 95.00, 'week9': 110.00, 'week10': 75.00, 'week11': 75.00 }
    },
    {
      accountOwner: 'Brenton Westbrook',
      providerName: 'JAMES PATHOULAS THOMAS',
      fillCategory: 'Non-GLP',
      recordCount: 2,
      totalRevenue: 5907.54,
      weekRevenue: {
        'week0': 3938.36, 'week1': 1969.18
      },
      nonGLPRevenue: { 'week0': 3938.36 },
      glpRevenue: { 'week1': 1969.18 }
    },
    {
      accountOwner: 'Brenton Westbrook',
      providerName: 'LINDA STEWART',
      fillCategory: 'Rare Disease',
      recordCount: 29,
      totalRevenue: 12540.00,
      weekRevenue: {
        'week0': 7900.00, 'week1': 940.00, 'week2': 450.00, 'week3': 340.00, 'week4': 285.00, 'week5': 390.00, 'week6': 275.00, 'week7': 225.00, 'week8': 320.00, 'week9': 410.00, 'week10': 515.00, 'week11': 490.00
      },
      nonGLPRevenue: { 'week1': 7900.00, 'week3': 340.00, 'week5': 390.00, 'week7': 225.00, 'week9': 410.00 },
      glpRevenue: { 'week1': 940.00, 'week2': 450.00, 'week4': 285.00, 'week6': 275.00, 'week8': 320.00, 'week10': 515.00, 'week11': 490.00 }
    },
    {
      accountOwner: 'Brenton Westbrook',
      providerName: 'ALYSSA BACCARELLA',
      fillCategory: 'Folinic Acid',
      recordCount: 2,
      totalRevenue: 403.92,
      weekRevenue: {
        'week0': 278.92, 'week4': 125.00
      },
      nonGLPRevenue: { 'week0': 278.92, 'week4': 125.00 },
      glpRevenue: {}
    },
    {
      accountOwner: 'Brenton Westbrook',
      providerName: 'AMY BALKA',
      fillCategory: 'ENT',
      recordCount: 2,
      totalRevenue: 267.00,
      weekRevenue: {
        'week0': 178.00, 'week1': 89.00
      },
      nonGLPRevenue: { 'week0': 178.00 },
      glpRevenue: { 'week0': 89.00 }
    },
    // Elaina Lorefice's providers (sample)
    {
      accountOwner: 'Elaina Lorefice',
      providerName: 'CHELSEA STEWART',
      fillCategory: 'GLP',
      recordCount: 12,
      totalRevenue: 1875.04,
      weekRevenue: {
        'week0': 1125.04, 'week1': 125.00, 'week2': 100.00, 'week4': 95.00, 'week5': 110.00, 'week6': 75.00, 'week7': 85.00, 'week8': 50.00, 'week9': 45.00, 'week10': 65.00
      },
      nonGLPRevenue: { 'week0': 25.04, 'week1': 1100.00, 'week4': 95.00, 'week6': 75.00, 'week8': 50.00, 'week10': 65.00 },
      glpRevenue: { 'week1': 125.00, 'week2': 100.00, 'week5': 110.00, 'week7': 85.00, 'week9': 45.00 }
    },
    {
      accountOwner: 'Elaina Lorefice',
      providerName: 'JESSICA DIXON',
      fillCategory: 'Non-GLP',
      recordCount: 8,
      totalRevenue: 2150.00,
      weekRevenue: {
        'week0': 1065.00, 'week1': 710.00, 'week3': 125.00, 'week5': 85.00, 'week7': 95.00, 'week9': 70.00
      },
      nonGLPRevenue: { 'week0': 615.00, 'week1': 450.00, 'week3': 125.00, 'week7': 95.00 },
      glpRevenue: { 'week0': 490.00, 'week1': 220.00, 'week5': 85.00, 'week9': 70.00 }
    },
    {
      accountOwner: 'Elaina Lorefice',
      providerName: 'AGNIESZKA CHROSTOWSKI',
      fillCategory: 'GLP',
      recordCount: 2,
      totalRevenue: 225.02,
      weekRevenue: {
        'week0': 225.02
      },
      nonGLPRevenue: { 'week0': 0.02 },
      glpRevenue: { 'week0': 225.00 }
    },
    {
      accountOwner: 'Elaina Lorefice',
      providerName: 'ANGELINA HWANG',
      fillCategory: 'Non-GLP',
      recordCount: 3,
      totalRevenue: 897.00,
      weekRevenue: {
        'week0': 673.00, 'week3': 112.00, 'week6': 112.00
      },
      nonGLPRevenue: { 'week0': 673.00, 'week3': 112.00, 'week6': 112.00 },
      glpRevenue: {}
    },
    {
      accountOwner: 'Elaina Lorefice',
      providerName: 'CASEY BOURQUE',
      fillCategory: 'Rare Disease',
      recordCount: 3,
      totalRevenue: 400.00,
      weekRevenue: {
        'week0': 300.00, 'week1': 100.00
      },
      nonGLPRevenue: { 'week0': 300.00 },
      glpRevenue: { 'week1': 100.00 }
    },
    // Jabril Mohamed's providers (sample)
    {
      accountOwner: 'Jabril Mohamed',
      providerName: 'NILOFAR KURAISHI',
      fillCategory: 'Folinic Acid',
      recordCount: 22,
      totalRevenue: 7250.00,
      weekRevenue: {
        'week0': 3810.00, 'week1': 1190.00, 'week2': 340.00, 'week3': 295.00, 'week4': 225.00, 'week5': 180.00, 'week6': 240.00, 'week7': 195.00, 'week8': 170.00, 'week9': 205.00, 'week10': 225.00, 'week11': 175.00
      },
      nonGLPRevenue: { 'week1': 3810.00, 'week3': 295.00, 'week5': 180.00, 'week7': 195.00, 'week9': 205.00, 'week11': 175.00 },
      glpRevenue: { 'week0': 680.00, 'week1': 510.00, 'week2': 340.00, 'week4': 225.00, 'week6': 240.00, 'week8': 170.00, 'week10': 225.00 }
    },
    {
      accountOwner: 'Jabril Mohamed',
      providerName: 'FADI ASSAF',
      fillCategory: 'ENT',
      recordCount: 11,
      totalRevenue: 2015.05,
      weekRevenue: {
        'week0': 1145.05, 'week1': 310.00, 'week2': 125.00, 'week4': 95.00, 'week5': 75.00, 'week7': 85.00, 'week9': 90.00, 'week10': 90.00
      },
      nonGLPRevenue: { 'week0': 470.05, 'week1': 675.00, 'week2': 125.00, 'week5': 75.00, 'week9': 90.00 },
      glpRevenue: { 'week0': 225.00, 'week1': 85.00, 'week4': 95.00, 'week7': 85.00, 'week10': 90.00 }
    },
    {
      accountOwner: 'Jabril Mohamed',
      providerName: 'KAREN CLAISE',
      fillCategory: 'GLP',
      recordCount: 16,
      totalRevenue: 3578.00,
      weekRevenue: {
        'week0': 1756.00, 'week1': 967.00, 'week2': 178.00, 'week3': 145.00, 'week4': 112.00, 'week5': 95.00, 'week6': 85.00, 'week8': 75.00, 'week9': 85.00, 'week11': 80.00
      },
      nonGLPRevenue: { 'week0': 1756.00, 'week2': 178.00, 'week4': 112.00, 'week6': 85.00, 'week8': 75.00, 'week11': 80.00 },
      glpRevenue: { 'week0': 89.00, 'week1': 878.00, 'week3': 145.00, 'week5': 95.00, 'week9': 85.00 }
    },
    {
      accountOwner: 'Jabril Mohamed',
      providerName: 'ANNA MENDENHALL',
      fillCategory: 'Non-GLP',
      recordCount: 2,
      totalRevenue: 1421.82,
      weekRevenue: {
        'week0': 947.88, 'week1': 473.94
      },
      nonGLPRevenue: { 'week0': 947.88 },
      glpRevenue: { 'week1': 473.94 }
    },
    {
      accountOwner: 'Jabril Mohamed',
      providerName: 'CLAISE KAREN',
      fillCategory: 'Rare Disease',
      recordCount: 2,
      totalRevenue: 627.00,
      weekRevenue: {
        'week0': 502.00, 'week5': 125.00
      },
      nonGLPRevenue: { 'week0': 502.00, 'week5': 125.00 },
      glpRevenue: {}
    },
    // Molly Enright's providers (sample)
    {
      accountOwner: 'Molly Enright',
      providerName: 'EMMA HAYNES',
      fillCategory: 'Folinic Acid',
      recordCount: 35,
      totalRevenue: 5827.27,
      weekRevenue: {
        'week0': 3247.13, 'week1': 740.14, 'week2': 225.00, 'week3': 178.00, 'week4': 195.00, 'week5': 145.00, 'week6': 189.00, 'week7': 157.00, 'week8': 125.00, 'week9': 110.00, 'week10': 178.00, 'week11': 138.00
      },
      nonGLPRevenue: { 'week0': 3247.13, 'week2': 125.00, 'week4': 195.00, 'week6': 189.00, 'week8': 125.00, 'week10': 178.00 },
      glpRevenue: { 'week0': 574.86, 'week1': 165.28, 'week2': 100.00, 'week3': 178.00, 'week5': 145.00, 'week7': 157.00, 'week9': 110.00, 'week11': 138.00 }
    },
    {
      accountOwner: 'Molly Enright',
      providerName: 'ELIZABETH HARTMAN',
      fillCategory: 'ENT',
      recordCount: 8,
      totalRevenue: 2533.05,
      weekRevenue: {
        'week0': 1908.05, 'week2': 125.00, 'week4': 125.00, 'week6': 125.00, 'week8': 125.00, 'week10': 125.00
      },
      nonGLPRevenue: { 'week0': 1908.05, 'week2': 125.00, 'week6': 125.00, 'week10': 125.00 },
      glpRevenue: { 'week4': 125.00, 'week8': 125.00 }
    },
    {
      accountOwner: 'Molly Enright',
      providerName: 'CODY SMITH',
      fillCategory: 'GLP',
      recordCount: 10,
      totalRevenue: 1893.37,
      weekRevenue: {
        'week0': 823.66, 'week1': 544.71, 'week3': 125.00, 'week5': 95.00, 'week7': 110.00, 'week9': 95.00, 'week11': 100.00
      },
      nonGLPRevenue: { 'week0': 823.66, 'week3': 125.00, 'week7': 110.00, 'week11': 100.00 },
      glpRevenue: { 'week0': 296.88, 'week1': 247.83, 'week5': 95.00, 'week9': 95.00 }
    },
    {
      accountOwner: 'Molly Enright',
      providerName: 'TODD LAMBERT',
      fillCategory: 'Non-GLP',
      recordCount: 10,
      totalRevenue: 1593.95,
      weekRevenue: {
        'week0': 868.95, 'week2': 125.00, 'week4': 125.00, 'week5': 100.00, 'week7': 95.00, 'week8': 85.00, 'week10': 95.00, 'week11': 100.00
      },
      nonGLPRevenue: { 'week0': 868.95, 'week2': 125.00, 'week5': 100.00, 'week8': 85.00, 'week11': 100.00 },
      glpRevenue: { 'week4': 125.00, 'week7': 95.00, 'week10': 95.00 }
    },
    {
      accountOwner: 'Molly Enright',
      providerName: 'EDWIN LEE',
      fillCategory: 'Rare Disease',
      recordCount: 7,
      totalRevenue: 1145.12,
      weekRevenue: {
        'week0': 718.12, 'week1': 52.00, 'week3': 95.00, 'week5': 85.00, 'week7': 95.00, 'week9': 100.00
      },
      nonGLPRevenue: { 'week0': 718.12, 'week3': 95.00, 'week7': 95.00 },
      glpRevenue: { 'week1': 52.00, 'week5': 85.00, 'week9': 100.00 }
    },
    // Riley Greus's providers (sample)
    {
      accountOwner: 'Riley Greus',
      providerName: 'CHLOE ABOLVERDI',
      fillCategory: 'Folinic Acid',
      recordCount: 9,
      totalRevenue: 1072.36,
      weekRevenue: {
        'week0': 890.36, 'week1': 182.00
      },
      nonGLPRevenue: { 'week0': 890.36 },
      glpRevenue: { 'week0': 125.00, 'week1': 57.00 }
    },
    {
      accountOwner: 'Riley Greus',
      providerName: 'FAHAD ALDHAHRI',
      fillCategory: 'ENT',
      recordCount: 10,
      totalRevenue: 984.22,
      weekRevenue: {
        'week0': 813.22, 'week1': 171.00
      },
      nonGLPRevenue: { 'week0': 813.22 },
      glpRevenue: { 'week0': 57.00, 'week1': 114.00 }
    },
    {
      accountOwner: 'Riley Greus',
      providerName: 'JESSICA STAVAR',
      fillCategory: 'GLP',
      recordCount: 6,
      totalRevenue: 672.46,
      weekRevenue: {
        'week0': 672.46, 'week1': 0
      },
      nonGLPRevenue: { 'week0': 672.46 },
      glpRevenue: {}
    },
    {
      accountOwner: 'Riley Greus',
      providerName: 'JOSHUA LIGHT',
      fillCategory: 'Non-GLP',
      recordCount: 5,
      totalRevenue: 330.77,
      weekRevenue: {
        'week0': 330.77, 'week1': 0
      },
      nonGLPRevenue: { 'week0': 330.77 },
      glpRevenue: {}
    },
    {
      accountOwner: 'Riley Greus',
      providerName: 'RAM MADASU',
      fillCategory: 'Rare Disease',
      recordCount: 4,
      totalRevenue: 663.59,
      weekRevenue: {
        'week0': 483.27, 'week1': 180.32
      },
      nonGLPRevenue: { 'week0': 483.27 },
      glpRevenue: { 'week0': 302.95, 'week1': 180.32 }
    },
    // Shae Katz's providers (sample)
    {
      accountOwner: 'Shae Katz',
      providerName: 'KEONHO KONG',
      fillCategory: 'Folinic Acid',
      recordCount: 33,
      totalRevenue: 4822.31,
      weekRevenue: {
        'week0': 2643.13, 'week1': 639.18, 'week2': 195.00, 'week3': 145.00, 'week4': 178.00, 'week5': 125.00, 'week6': 157.00, 'week7': 145.00, 'week8': 125.00, 'week9': 110.00, 'week10': 189.00, 'week11': 171.00
      },
      nonGLPRevenue: { 'week0': 2643.13, 'week2': 95.00, 'week4': 178.00, 'week6': 157.00, 'week8': 125.00, 'week10': 189.00 },
      glpRevenue: { 'week0': 57.00, 'week1': 291.18, 'week2': 100.00, 'week3': 145.00, 'week5': 125.00, 'week7': 145.00, 'week9': 110.00, 'week11': 171.00 }
    },
    {
      accountOwner: 'Shae Katz',
      providerName: 'SRIRAM NAVULURI',
      fillCategory: 'ENT',
      recordCount: 35,
      totalRevenue: 5286.44,
      weekRevenue: {
        'week0': 2564.31, 'week1': 882.13, 'week2': 225.00, 'week3': 189.00, 'week4': 178.00, 'week5': 145.00, 'week6': 195.00, 'week7': 157.00, 'week8': 125.00, 'week9': 145.00, 'week10': 189.00, 'week11': 292.00
      },
      nonGLPRevenue: { 'week0': 2564.31, 'week2': 125.00, 'week4': 178.00, 'week6': 195.00, 'week8': 125.00, 'week10': 189.00 },
      glpRevenue: { 'week0': 494.00, 'week1': 388.13, 'week2': 100.00, 'week3': 189.00, 'week5': 145.00, 'week7': 157.00, 'week9': 145.00, 'week11': 292.00 }
    },
    {
      accountOwner: 'Shae Katz',
      providerName: 'TYLER JANZ',
      fillCategory: 'GLP',
      recordCount: 11,
      totalRevenue: 2520.33,
      weekRevenue: {
        'week0': 1485.34, 'week1': 389.99, 'week2': 125.00, 'week4': 110.00, 'week5': 95.00, 'week7': 85.00, 'week9': 115.00, 'week11': 115.00
      },
      nonGLPRevenue: { 'week0': 1485.34, 'week2': 125.00, 'week5': 95.00, 'week9': 115.00 },
      glpRevenue: { 'week0': 229.35, 'week1': 160.64, 'week4': 110.00, 'week7': 85.00, 'week11': 115.00 }
    },
    {
      accountOwner: 'Shae Katz',
      providerName: 'CHRISTINE FRANZESE',
      fillCategory: 'Non-GLP',
      recordCount: 18,
      totalRevenue: 2476.05,
      weekRevenue: {
        'week0': 1351.05, 'week1': 125.00, 'week2': 145.00, 'week3': 125.00, 'week4': 110.00, 'week5': 95.00, 'week6': 89.00, 'week7': 85.00, 'week8': 75.00, 'week9': 95.00, 'week10': 95.00, 'week11': 86.00
      },
      nonGLPRevenue: { 'week0': 1351.05, 'week2': 145.00, 'week4': 110.00, 'week6': 89.00, 'week8': 75.00, 'week10': 95.00 },
      glpRevenue: { 'week0': 125.00, 'week1': 125.00, 'week3': 125.00, 'week5': 95.00, 'week7': 85.00, 'week9': 95.00, 'week11': 86.00 }
    },
    {
      accountOwner: 'Shae Katz',
      providerName: 'SHIVANAND MAHARAJ',
      fillCategory: 'Rare Disease',
      recordCount: 9,
      totalRevenue: 1781.87,
      weekRevenue: {
        'week0': 1000.08, 'week1': 256.79, 'week3': 125.00, 'week5': 100.00, 'week7': 95.00, 'week9': 95.00, 'week11': 110.00
      },
      nonGLPRevenue: { 'week0': 1000.08, 'week3': 125.00, 'week7': 95.00, 'week11': 110.00 },
      glpRevenue: { 'week0': 256.79, 'week1': 256.79, 'week5': 100.00, 'week9': 95.00 }
    }
  ];

  // Get row color based on record count
  const getRowColor = (recordCount) => {
    if (recordCount === 1) return '#ffffff'; // White
    if (recordCount >= 2 && recordCount <= 3) return '#ffe6e6'; // Light red
    if (recordCount >= 4 && recordCount <= 5) return '#fff8e6'; // Light yellow
    if (recordCount >= 6) return '#e6f7e6'; // Light green
    return '#ffffff';
  };

  // Get badge color for record count
  const getBadgeColor = (recordCount) => {
    if (recordCount === 1) return 'default';
    if (recordCount >= 2 && recordCount <= 3) return 'error';
    if (recordCount >= 4 && recordCount <= 5) return 'warning';
    if (recordCount >= 6) return 'success';
    return 'default';
  };

  // Filter providers
  const filteredProviders = providerData.filter(provider => {
    const matchesOwner = accountOwnerFilter === 'all' || provider.accountOwner === accountOwnerFilter;
    const matchesCategory = fillCategoryFilter === 'all' || provider.fillCategory === fillCategoryFilter;
    return matchesOwner && matchesCategory;
  });

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalProviders = filteredProviders.length;
    const providersWithMultipleOrders = filteredProviders.filter(p => p.recordCount >= 2).length;
    const totalRevenue = filteredProviders.reduce((sum, p) => sum + p.totalRevenue, 0);
    const totalFills = filteredProviders.reduce((sum, p) => sum + p.recordCount, 0);

    return {
      totalProviders,
      providersWithMultipleOrders,
      totalRevenue,
      totalFills,
      repeatRate: totalProviders > 0 ? ((providersWithMultipleOrders / totalProviders) * 100).toFixed(1) : 0
    };
  }, [filteredProviders]);

  // Get unique account owners for filter
  const accountOwners = [...new Set(providerData.map(p => p.accountOwner))].sort();

  // Get unique fill categories for filter
  const fillCategories = [...new Set(providerData.map(p => p.fillCategory).filter(c => c))].sort();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <Icon category="standard" name="account" size="medium" />
            <h1 className="slds-text-heading_large">
              New Provider Revenue - Last 12 Weeks
            </h1>
          </div>
          <p className="slds-text-body_regular" style={{ color: '#706e6b' }}>
            Track new providers and their ordering patterns over the last 12 weeks
          </p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {/* Total Providers Card */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dddbda',
            borderRadius: '4px',
            padding: '20px',
            borderLeft: '4px solid #0176d3'
          }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Total Providers</div>
            <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', color: '#0176d3' }}>
              {summaryStats.totalProviders}
            </div>
            <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
              New providers added
            </div>
          </div>

          {/* Multiple Orders Card */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dddbda',
            borderRadius: '4px',
            padding: '20px',
            borderLeft: '4px solid #2e844a'
          }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>With 2+ Orders</div>
            <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300', color: '#2e844a' }}>
              {summaryStats.providersWithMultipleOrders}
            </div>
            <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
              Providers who reordered
            </div>
          </div>

          {/* Repeat Rate Card */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dddbda',
            borderRadius: '4px',
            padding: '20px'
          }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Repeat Rate</div>
            <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
              {summaryStats.repeatRate}%
            </div>
            <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
              Percentage reordering
            </div>
          </div>

          {/* Total Fills Card */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dddbda',
            borderRadius: '4px',
            padding: '20px'
          }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Total Fills</div>
            <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
              {summaryStats.totalFills}
            </div>
            <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
              Combined fill count
            </div>
          </div>

          {/* Total Revenue Card */}
          <div style={{
            backgroundColor: 'white',
            border: '1px solid #dddbda',
            borderRadius: '4px',
            padding: '20px'
          }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px' }}>Total Revenue</div>
            <div className="slds-text-heading_large" style={{ fontSize: '32px', fontWeight: '300' }}>
              ${summaryStats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
              Combined revenue
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <div style={{ padding: '16px', borderBottom: '1px solid #dddbda' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '300px 300px', gap: '16px' }}>
              <div>
                <label className="slds-form-element__label" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                  Account Owner
                </label>
                <select
                  className="slds-select"
                  value={accountOwnerFilter}
                  onChange={(e) => setAccountOwnerFilter(e.target.value)}
                >
                  <option value="all">All Account Owners</option>
                  {accountOwners.map(owner => (
                    <option key={owner} value={owner}>{owner}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="slds-form-element__label" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                  Fill Category
                </label>
                <select
                  className="slds-select"
                  value={fillCategoryFilter}
                  onChange={(e) => setFillCategoryFilter(e.target.value)}
                >
                  <option value="all">All Fill Categories</option>
                  {fillCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Color Legend */}
          <div style={{ padding: '16px', backgroundColor: '#f3f3f3', borderBottom: '1px solid #dddbda' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
              <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Fill Count Color Code:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '20px', backgroundColor: '#ffffff', border: '1px solid #dddbda' }}></div>
                <span>1 fill</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '20px', backgroundColor: '#ffe6e6', border: '1px solid #dddbda' }}></div>
                <span>2-3 fills</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '20px', backgroundColor: '#fff8e6', border: '1px solid #dddbda' }}></div>
                <span>4-5 fills</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '20px', backgroundColor: '#e6f7e6', border: '1px solid #dddbda' }}></div>
                <span>6+ fills</span>
              </div>
            </div>
          </div>

          {/* Provider Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="slds-table slds-table_bordered slds-table_cell-buffer slds-table_fixed-layout">
              <thead>
                <tr className="slds-line-height_reset">
                  <th scope="col" style={{ width: '150px', padding: '12px', position: 'sticky', left: 0, backgroundColor: '#fafaf9', zIndex: 2 }}>
                    <div className="slds-truncate" style={{ fontWeight: 'bold' }}>Account Owner</div>
                  </th>
                  <th scope="col" style={{ width: '200px', padding: '12px', position: 'sticky', left: '150px', backgroundColor: '#fafaf9', zIndex: 2 }}>
                    <div className="slds-truncate" style={{ fontWeight: 'bold' }}>Provider Name</div>
                  </th>
                  <th scope="col" style={{ width: '100px', padding: '12px', textAlign: 'center', backgroundColor: '#fafaf9' }}>
                    <div className="slds-truncate" style={{ fontWeight: 'bold' }}>Fill Count</div>
                  </th>
                  <th scope="col" style={{ width: '120px', padding: '12px', textAlign: 'right', backgroundColor: '#fafaf9' }}>
                    <div className="slds-truncate" style={{ fontWeight: 'bold' }}>Total Revenue</div>
                  </th>
                  {weekRanges.map((week, idx) => (
                    <th key={week.id} scope="col" style={{ width: '120px', padding: '12px', textAlign: 'right', backgroundColor: '#fafaf9' }}>
                      <div style={{ fontSize: '11px', fontWeight: 'bold' }}>{week.label}</div>
                    </th>
                  ))}
                  <th scope="col" style={{ width: '120px', padding: '12px', textAlign: 'right', backgroundColor: '#fafaf9', borderLeft: '2px solid #dddbda' }}>
                    <div className="slds-truncate" style={{ fontWeight: 'bold' }}>Total Revenue</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((provider, idx) => (
                  <tr
                    key={`${provider.accountOwner}-${provider.providerName}-${idx}`}
                    style={{ backgroundColor: getRowColor(provider.recordCount) }}
                  >
                    <td style={{ padding: '12px', position: 'sticky', left: 0, backgroundColor: getRowColor(provider.recordCount), zIndex: 1, borderRight: '1px solid #dddbda' }}>
                      <div className="slds-truncate" style={{ fontSize: '13px' }}>{provider.accountOwner}</div>
                    </td>
                    <td style={{ padding: '12px', position: 'sticky', left: '150px', backgroundColor: getRowColor(provider.recordCount), zIndex: 1, borderRight: '1px solid #dddbda' }}>
                      <div style={{ fontWeight: '500', fontSize: '13px' }}>{provider.providerName}</div>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '13px',
                          fontWeight: 'bold',
                          backgroundColor: provider.recordCount >= 6 ? '#2e844a' : provider.recordCount >= 4 ? '#fe9339' : provider.recordCount >= 2 ? '#c23934' : '#706e6b',
                          color: 'white'
                        }}
                      >
                        {provider.recordCount}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <strong style={{ fontSize: '13px' }}>
                        ${provider.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </strong>
                    </td>
                    {weekRanges.map(week => (
                      <td key={week.id} style={{ padding: '12px', textAlign: 'right' }}>
                        <div style={{ fontSize: '13px' }}>
                          {provider.weekRevenue[week.id] ? `$${provider.weekRevenue[week.id].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                        </div>
                      </td>
                    ))}
                    <td style={{ padding: '12px', textAlign: 'right', borderLeft: '2px solid #dddbda', backgroundColor: '#fafaf9' }}>
                      <strong style={{ fontSize: '13px' }}>
                        ${provider.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: '#f3f3f3', fontWeight: 'bold' }}>
                  <td colSpan="2" style={{ padding: '12px', position: 'sticky', left: 0, backgroundColor: '#f3f3f3', zIndex: 1 }}>
                    <strong>Total ({filteredProviders.length} providers)</strong>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <strong>{summaryStats.totalFills}</strong>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <strong>${summaryStats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </td>
                  {weekRanges.map(week => {
                    const weekTotal = filteredProviders.reduce((sum, p) => sum + (p.weekRevenue[week.id] || 0), 0);
                    return (
                      <td key={week.id} style={{ padding: '12px', textAlign: 'right' }}>
                        <strong>{weekTotal > 0 ? `$${weekTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}</strong>
                      </td>
                    );
                  })}
                  <td style={{ padding: '12px', textAlign: 'right', borderLeft: '2px solid #dddbda', backgroundColor: '#f3f3f3' }}>
                    <strong>${summaryStats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NewProviderRevenue;
