import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Badge from '@salesforce/design-system-react/components/badge';
import Icon from '@salesforce/design-system-react/components/icon';
import Combobox from '@salesforce/design-system-react/components/combobox';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';

const INNExplorerTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dsRatingFilter, setDsRatingFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');

  // Sample INN data with diverse names and locations
  const innData = [
    {
      id: '001',
      contactId: '0033i000004Z7W0',
      firstName: 'Michael',
      lastName: 'Richardson',
      dsRating: 'DS1-1',
      qualityScore: 19.7,
      rfmTotal: 152,
      lastGiftDate: '2024-12-03',
      totalGiftAmount: 2665,
      city: 'Portland',
      state: 'ME',
      estimatedCapacity: 1214228,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'Maybe',
      lastInnRefresh: '2025-01-15',
      spouseFirst: 'hobart',
      spouseLast: 'guion',
      totalLikelyMatches: 23750,
      giftMatches: 33,
      foundationAssets: 0,
      politicalLikelyCount: 1056,
      politicalLikelyTotal: 211791,
      largestGiftLowerRange: 10000,
      realEstateEst: 883728,
      numProperties: 1,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 316000,
      medianHouseholdIncome: 111000,
      rfmRecentGift: 52,
      rfmFreq: 0,
      rfmMoney: 100,
      classicQualityScore: 16.2,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 1,
      artsGiftTotal: 0,
      republicanGiftCount: 372,
      republicanGiftTotal: 97141,
      democraticGiftCount: 683,
      democraticGiftTotal: 114530,
      largestGiftOrgName: 'Concord Academy',
      largestGiftType: 'Annual',
      largestGiftCategory: 'Education'
    },
    {
      id: '002',
      contactId: '0033i000020JWVM',
      firstName: 'Sarah',
      lastName: 'Thompson',
      dsRating: 'DS1-1',
      qualityScore: 18.6,
      rfmTotal: 167,
      lastGiftDate: '2024-12-27',
      totalGiftAmount: 2049,
      city: 'Burlington',
      state: 'VT',
      estimatedCapacity: 119577,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-15',
      spouseFirst: 'christopher',
      spouseLast: 'graff',
      totalLikelyMatches: 25950,
      giftMatches: 54,
      foundationAssets: 0,
      politicalLikelyCount: 17,
      politicalLikelyTotal: 9750,
      largestGiftLowerRange: 5000,
      realEstateEst: 819237,
      numProperties: 2,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 325000,
      medianHouseholdIncome: 113000,
      rfmRecentGift: 68,
      rfmFreq: 0,
      rfmMoney: 99,
      classicQualityScore: 15.2,
      higherEducationCount: 8,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 28,
      artsGiftTotal: 24150,
      republicanGiftCount: 4,
      republicanGiftTotal: 1750,
      democraticGiftCount: 13,
      democraticGiftTotal: 8000,
      largestGiftOrgName: 'Vermont Historical Society',
      largestGiftType: 'Cumulative',
      largestGiftCategory: 'Arts culture and Humanities'
    },
    {
      id: '003',
      contactId: '0033i000004Z5wS',
      firstName: 'Robert',
      lastName: 'Chen',
      dsRating: 'DS1-1',
      qualityScore: 19.4,
      rfmTotal: 118,
      lastGiftDate: '2023-11-28',
      totalGiftAmount: 2980,
      city: 'Seattle',
      state: 'WA',
      estimatedCapacity: 40358,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-15',
      spouseFirst: 'nancy',
      spouseLast: 'martin',
      totalLikelyMatches: 234401,
      giftMatches: 38,
      foundationAssets: 0,
      politicalLikelyCount: 0,
      politicalLikelyTotal: 0,
      largestGiftLowerRange: 50000,
      realEstateEst: 491219,
      numProperties: 1,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 236000,
      medianHouseholdIncome: 81000,
      rfmRecentGift: 18,
      rfmFreq: 0,
      rfmMoney: 100,
      classicQualityScore: 14.5,
      higherEducationCount: 1,
      higherEducationTotal: 100,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 26,
      artsGiftTotal: 234000,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: 'Vermont Historical Society',
      largestGiftType: 'Cumulative',
      largestGiftCategory: 'Arts culture and Humanities'
    },
    {
      id: '004',
      contactId: '0033i00001ruu7R',
      firstName: 'Jennifer',
      lastName: 'Anderson',
      dsRating: 'DS1-1',
      qualityScore: 19.0,
      rfmTotal: 193,
      lastGiftDate: '2025-04-01',
      totalGiftAmount: 3000,
      city: 'Boston',
      state: 'MA',
      estimatedCapacity: 1098089,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-15',
      spouseFirst: 'mary',
      spouseLast: 'ottaway',
      totalLikelyMatches: 19158004,
      giftMatches: 253,
      foundationAssets: 11106143,
      politicalLikelyCount: 502,
      politicalLikelyTotal: 189627,
      largestGiftLowerRange: 500000,
      realEstateEst: 2039832,
      numProperties: 3,
      secStockValue: 0,
      secStockOrInsider: 'Yes',
      averageHomeValue: 416000,
      medianHouseholdIncome: 146000,
      rfmRecentGift: 93,
      rfmFreq: 0,
      rfmMoney: 100,
      classicQualityScore: 15.2,
      higherEducationCount: 27,
      higherEducationTotal: 442001,
      philanthropyCount: 14,
      philanthropyTotal: 603500,
      artsGiftCount: 87,
      artsGiftTotal: 16317301,
      republicanGiftCount: 306,
      republicanGiftTotal: 147542,
      democraticGiftCount: 195,
      democraticGiftTotal: 40085,
      largestGiftOrgName: 'Brooklyn Academy Of Music Inc',
      largestGiftType: 'Annual',
      largestGiftCategory: 'Arts culture and Humanities'
    },
    {
      id: '005',
      contactId: '0033i00002Tlb99',
      firstName: 'David',
      lastName: 'Martinez',
      dsRating: 'DS1-1',
      qualityScore: 19.0,
      rfmTotal: 110,
      lastGiftDate: '2022-12-31',
      totalGiftAmount: 2340,
      city: 'Phoenix',
      state: 'AZ',
      estimatedCapacity: 69504,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-15',
      spouseFirst: 'susan',
      spouseLast: 'ring',
      totalLikelyMatches: 12205,
      giftMatches: 21,
      foundationAssets: 0,
      politicalLikelyCount: 35,
      politicalLikelyTotal: 12297,
      largestGiftLowerRange: 5000,
      realEstateEst: 546636,
      numProperties: 1,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 616000,
      medianHouseholdIncome: 212000,
      rfmRecentGift: 11,
      rfmFreq: 0,
      rfmMoney: 99,
      classicQualityScore: 15.3,
      higherEducationCount: 2,
      higherEducationTotal: 5101,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 1,
      artsGiftTotal: 250,
      republicanGiftCount: 27,
      republicanGiftTotal: 5647,
      democraticGiftCount: 7,
      democraticGiftTotal: 6150,
      largestGiftOrgName: 'University Of Arizona',
      largestGiftType: 'Annual',
      largestGiftCategory: 'Higher Education'
    },
    {
      id: '006',
      contactId: '0033i000004uRSu',
      firstName: 'Patricia',
      lastName: 'Williams',
      dsRating: 'DS1-1',
      qualityScore: 18.9,
      rfmTotal: 168,
      lastGiftDate: '2024-12-27',
      totalGiftAmount: 3247,
      city: 'Denver',
      state: 'CO',
      estimatedCapacity: 45750,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-15',
      spouseFirst: 'mary',
      spouseLast: 'hawkins',
      totalLikelyMatches: 14997,
      giftMatches: 28,
      foundationAssets: 0,
      politicalLikelyCount: 0,
      politicalLikelyTotal: 0,
      largestGiftLowerRange: 5000,
      realEstateEst: 556857,
      numProperties: 1,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 511000,
      medianHouseholdIncome: 179000,
      rfmRecentGift: 68,
      rfmFreq: 0,
      rfmMoney: 100,
      classicQualityScore: 14.4,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 1,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: 'Vermont Institute Of Natural Science Inc',
      largestGiftType: 'Annual',
      largestGiftCategory: 'Environment'
    },
    {
      id: '007',
      contactId: '0033i000004uCXq',
      firstName: 'Christopher',
      lastName: 'Davis',
      dsRating: 'DS1-2',
      qualityScore: 17.2,
      rfmTotal: 177,
      lastGiftDate: '2025-02-04',
      totalGiftAmount: 2000,
      city: 'Austin',
      state: 'TX',
      estimatedCapacity: 89880,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-14',
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 8,
      foundationAssets: 0,
      politicalLikelyCount: 39,
      politicalLikelyTotal: 23085,
      largestGiftLowerRange: 2900,
      realEstateEst: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'Maybe',
      averageHomeValue: 475000,
      medianHouseholdIncome: 165000,
      rfmRecentGift: 78,
      rfmFreq: 0,
      rfmMoney: 99,
      classicQualityScore: 12.1,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 1,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 29,
      republicanGiftTotal: 18085,
      democraticGiftCount: 10,
      democraticGiftTotal: 5000,
      largestGiftOrgName: 'MOLLY FOR VERMONT',
      largestGiftType: 'Political',
      largestGiftCategory: 'DEM'
    },
    {
      id: '008',
      contactId: '0033i000004Z6WI',
      firstName: 'Elizabeth',
      lastName: 'Taylor',
      dsRating: 'DS1-2',
      qualityScore: 17.2,
      rfmTotal: 144,
      lastGiftDate: '2024-11-19',
      totalGiftAmount: 2472,
      city: 'Charlotte',
      state: 'NC',
      estimatedCapacity: 39550,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-14',
      politicalLikelyTotal: 11775,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '009',
      contactId: '0033i00000AAWSE',
      firstName: 'Daniel',
      lastName: 'Wilson',
      dsRating: 'DS1-2',
      qualityScore: 17.0,
      rfmTotal: 139,
      lastGiftDate: '2024-09-20',
      totalGiftAmount: 124452,
      city: 'Minneapolis',
      state: 'MN',
      estimatedCapacity: 441971,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-14',
      politicalLikelyTotal: 0,
      realEstateEst: 2426286,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '010',
      contactId: '0033i000004Z6CH',
      firstName: 'Michelle',
      lastName: 'Rodriguez',
      dsRating: 'DS1-2',
      qualityScore: 19.1,
      rfmTotal: 190,
      lastGiftDate: '2025-03-28',
      totalGiftAmount: 2505,
      city: 'San Diego',
      state: 'CA',
      estimatedCapacity: 369310,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-14',
      politicalLikelyTotal: 1110,
      realEstateEst: 2088970,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '011',
      contactId: '0033i000004Z8mN',
      firstName: 'Kevin',
      lastName: 'Moore',
      dsRating: 'DS1-3',
      qualityScore: 17.2,
      rfmTotal: 176,
      lastGiftDate: '2025-02-01',
      totalGiftAmount: 2246,
      city: 'Atlanta',
      state: 'GA',
      estimatedCapacity: 26720,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-13',
      politicalLikelyTotal: 5860,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '012',
      contactId: '0033i000004Z6N5',
      firstName: 'Amanda',
      lastName: 'Jackson',
      dsRating: 'DS1-3',
      qualityScore: 19.4,
      rfmTotal: 167,
      lastGiftDate: '2024-12-27',
      totalGiftAmount: 2600,
      city: 'Nashville',
      state: 'TN',
      estimatedCapacity: 155401,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-13',
      politicalLikelyTotal: 8082,
      realEstateEst: 1139803,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '013',
      contactId: '0033i000004Z5mP',
      firstName: 'Brian',
      lastName: 'White',
      dsRating: 'DS1-3',
      qualityScore: 18.4,
      rfmTotal: 191,
      lastGiftDate: '2025-03-31',
      totalGiftAmount: 2034,
      city: 'Milwaukee',
      state: 'WI',
      estimatedCapacity: 43974,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-13',
      politicalLikelyTotal: 7601,
      realEstateEst: 350205,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '014',
      contactId: '0033i000004Z89T',
      firstName: 'Rachel',
      lastName: 'Harris',
      dsRating: 'DS1-3',
      qualityScore: 17.6,
      rfmTotal: 115,
      lastGiftDate: '2023-10-05',
      totalGiftAmount: 2830,
      city: 'Richmond',
      state: 'VA',
      estimatedCapacity: 21925,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-13',
      politicalLikelyTotal: 4650,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '015',
      contactId: '0033i00000CIGfh',
      firstName: 'Thomas',
      lastName: 'Lewis',
      dsRating: 'DS1-4',
      qualityScore: 17.2,
      rfmTotal: 121,
      lastGiftDate: '2023-12-12',
      totalGiftAmount: 4250,
      city: 'Salt Lake City',
      state: 'UT',
      estimatedCapacity: 12250,
      majorGiftLikelihood: 'No',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 0,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '016',
      contactId: '0033i000004Z5k8',
      firstName: 'Jessica',
      lastName: 'Young',
      dsRating: 'DS1-4',
      qualityScore: 18.5,
      rfmTotal: 121,
      lastGiftDate: '2023-12-12',
      totalGiftAmount: 4340,
      city: 'Columbus',
      state: 'OH',
      estimatedCapacity: 57033,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 851,
      realEstateEst: 683819,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '017',
      contactId: '0033i000004Z8WH',
      firstName: 'Jason',
      lastName: 'King',
      dsRating: 'DS1-4',
      qualityScore: 18.2,
      rfmTotal: 120,
      lastGiftDate: '2023-12-12',
      totalGiftAmount: 2300,
      city: 'Indianapolis',
      state: 'IN',
      estimatedCapacity: 48076,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 2201,
      realEstateEst: 531584,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '018',
      contactId: '0033i00000OX9ED',
      firstName: 'Lisa',
      lastName: 'Scott',
      dsRating: 'DS1-4',
      qualityScore: 17.6,
      rfmTotal: 127,
      lastGiftDate: '2023-12-31',
      totalGiftAmount: 2612,
      city: 'Kansas City',
      state: 'MO',
      estimatedCapacity: 12700,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 200,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '019',
      contactId: '0033i000004Z7MN',
      firstName: 'Matthew',
      lastName: 'Green',
      dsRating: 'DS1-4',
      qualityScore: 19.3,
      rfmTotal: 156,
      lastGiftDate: '2024-12-09',
      totalGiftAmount: 3425,
      city: 'Oklahoma City',
      state: 'OK',
      estimatedCapacity: 13250,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 0,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '020',
      contactId: '0033i000004uDkw',
      firstName: 'Ashley',
      lastName: 'Baker',
      dsRating: 'DS1-4',
      qualityScore: 17.8,
      rfmTotal: 151,
      lastGiftDate: '2024-12-03',
      totalGiftAmount: 2135,
      city: 'Louisville',
      state: 'KY',
      estimatedCapacity: 12938,
      majorGiftLikelihood: 'No',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 1419,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '021',
      contactId: '0033i000004uDEH',
      firstName: 'Andrew',
      lastName: 'Adams',
      dsRating: 'DS1-4',
      qualityScore: 0.0,
      rfmTotal: 110,
      lastGiftDate: '2022-12-31',
      totalGiftAmount: 2051,
      city: 'Raleigh',
      state: 'NC',
      estimatedCapacity: 88625,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 0,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '022',
      contactId: '003PQ000005kSst',
      firstName: 'Stephanie',
      lastName: 'Nelson',
      dsRating: 'DS1-4',
      qualityScore: 17.0,
      rfmTotal: 155,
      lastGiftDate: '2024-12-09',
      totalGiftAmount: 2130,
      city: 'Memphis',
      state: 'TN',
      estimatedCapacity: 20625,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 0,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '023',
      contactId: '0033i000004Z7Qy',
      firstName: 'Nicholas',
      lastName: 'Carter',
      dsRating: 'DS1-4',
      qualityScore: 18.7,
      rfmTotal: 188,
      lastGiftDate: '2025-03-26',
      totalGiftAmount: 2321,
      city: 'Albuquerque',
      state: 'NM',
      estimatedCapacity: 57234,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 250,
      realEstateEst: 693583,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '024',
      contactId: '0033i000004Z6IU',
      firstName: 'Rebecca',
      lastName: 'Mitchell',
      dsRating: 'DS1-4',
      qualityScore: 18.3,
      rfmTotal: 160,
      lastGiftDate: '2024-12-16',
      totalGiftAmount: 2252,
      city: 'Des Moines',
      state: 'IA',
      estimatedCapacity: 12950,
      majorGiftLikelihood: 'Yes',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 450,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '025',
      contactId: '0033i00000Me05u',
      firstName: 'Gregory',
      lastName: 'Perez',
      dsRating: 'DS1-4',
      qualityScore: 19.2,
      rfmTotal: 135,
      lastGiftDate: '2024-08-10',
      totalGiftAmount: 3108,
      city: 'Boise',
      state: 'ID',
      estimatedCapacity: 23032,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-12',
      politicalLikelyTotal: 4016,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '026',
      contactId: '0033i00000H8v4V',
      firstName: 'Laura',
      lastName: 'Roberts',
      dsRating: 'DS1-5',
      qualityScore: 20.0,
      rfmTotal: 196,
      lastGiftDate: '2025-04-04',
      totalGiftAmount: 2450,
      city: 'Spokane',
      state: 'WA',
      estimatedCapacity: 21141,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-11',
      politicalLikelyTotal: 0,
      realEstateEst: 257328,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '027',
      contactId: '003PQ000007DP9T',
      firstName: 'Brandon',
      lastName: 'Turner',
      dsRating: 'DS1-5',
      qualityScore: 0.0,
      rfmTotal: 174,
      lastGiftDate: '2025-01-03',
      totalGiftAmount: 2000,
      city: 'Little Rock',
      state: 'AR',
      estimatedCapacity: 35125,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-11',
      politicalLikelyTotal: 0,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '028',
      contactId: '0033i000004Z6Ra',
      firstName: 'Katherine',
      lastName: 'Phillips',
      dsRating: 'DS1-5',
      qualityScore: 0.0,
      rfmTotal: 174,
      lastGiftDate: '2024-12-31',
      totalGiftAmount: 2200,
      city: 'Tulsa',
      state: 'OK',
      estimatedCapacity: 16000,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-11',
      politicalLikelyTotal: 0,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '029',
      contactId: '0033i00002TmjRI',
      firstName: 'Timothy',
      lastName: 'Campbell',
      dsRating: 'DS1-5',
      qualityScore: 0.0,
      rfmTotal: 196,
      lastGiftDate: '2025-04-04',
      totalGiftAmount: 2536,
      city: 'Omaha',
      state: 'NE',
      estimatedCapacity: 11300,
      majorGiftLikelihood: 'No',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-11',
      politicalLikelyTotal: 0,
      realEstateEst: 0,
      foundationAssets: 0,
      spouseFirst: '',
      spouseLast: '',
      totalLikelyMatches: 0,
      giftMatches: 0,
      politicalLikelyCount: 0,
      largestGiftLowerRange: 0,
      numProperties: 0,
      secStockValue: 0,
      secStockOrInsider: 'No',
      averageHomeValue: 0,
      medianHouseholdIncome: 0,
      rfmRecentGift: 0,
      rfmFreq: 0,
      rfmMoney: 0,
      classicQualityScore: 0,
      higherEducationCount: 0,
      higherEducationTotal: 0,
      philanthropyCount: 0,
      philanthropyTotal: 0,
      artsGiftCount: 0,
      artsGiftTotal: 0,
      republicanGiftCount: 0,
      republicanGiftTotal: 0,
      democraticGiftCount: 0,
      democraticGiftTotal: 0,
      largestGiftOrgName: '',
      largestGiftType: '',
      largestGiftCategory: ''
    },
    {
      id: '030',
      contactId: '0033i000004Z8Vc',
      firstName: 'Emily',
      lastName: 'Parker',
      dsRating: 'DS1-5',
      qualityScore: 20.0,
      rfmTotal: 161,
      lastGiftDate: '2024-12-19',
      totalGiftAmount: 2000,
      city: 'Fresno',
      state: 'CA',
      estimatedCapacity: 22989,
      majorGiftLikelihood: 'Maybe',
      annualFundLikelihood: 'No',
      lastInnRefresh: '2025-01-11',
      politicalLikelyTotal: 0,
      realEstateEst: 303589,
      foundationAssets: 0
    }
  ];

  // Filter data based on search and filters
  const filteredData = innData.filter(donor => {
    const matchesSearch = searchTerm === '' ||
      donor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDsRating = dsRatingFilter === 'all' || donor.dsRating === dsRatingFilter;
    const matchesState = stateFilter === 'all' || donor.state === stateFilter;

    let matchesCapacity = true;
    if (capacityFilter === 'high') {
      matchesCapacity = donor.estimatedCapacity >= 100000;
    } else if (capacityFilter === 'medium') {
      matchesCapacity = donor.estimatedCapacity >= 25000 && donor.estimatedCapacity < 100000;
    } else if (capacityFilter === 'low') {
      matchesCapacity = donor.estimatedCapacity < 25000;
    }

    return matchesSearch && matchesDsRating && matchesState && matchesCapacity;
  });

  // Custom cells
  const NameCell = ({ item }) => (
    <DataTableCell>
      <div>
        <div style={{ fontWeight: '500', color: '#0176d3', cursor: 'pointer' }}>
          {item.firstName} {item.lastName}
        </div>
      </div>
    </DataTableCell>
  );
  NameCell.displayName = DataTableCell.displayName;

  const LocationCell = ({ item }) => (
    <DataTableCell>
      <div>
        <div>{item.city}</div>
        <div style={{ fontSize: '0.875rem', color: '#706e6b' }}>{item.state}</div>
      </div>
    </DataTableCell>
  );
  LocationCell.displayName = DataTableCell.displayName;

  const DSRatingCell = ({ item }) => {
    const getRatingColor = (rating) => {
      if (rating.startsWith('DS1-1')) return 'success';
      if (rating.startsWith('DS1-2')) return 'default';
      if (rating.startsWith('DS1-3')) return 'warning';
      return 'light';
    };

    return (
      <DataTableCell>
        <Badge color={getRatingColor(item.dsRating)} content={item.dsRating} />
      </DataTableCell>
    );
  };
  DSRatingCell.displayName = DataTableCell.displayName;

  const QualityScoreCell = ({ item, property }) => {
    const score = property ? (item[property] ?? 0) : (item.qualityScore ?? 0);
    return (
      <DataTableCell>
        <div style={{
          fontWeight: '500',
          color: score >= 19 ? '#2e844a' : score >= 17 ? '#0176d3' : '#706e6b'
        }}>
          {score.toFixed(1)}
        </div>
      </DataTableCell>
    );
  };
  QualityScoreCell.displayName = DataTableCell.displayName;

  const CurrencyCell = ({ item, property }) => {
    const value = item[property] ?? 0;
    return (
      <DataTableCell>
        <div style={{ fontWeight: '500' }}>
          ${value.toLocaleString()}
        </div>
      </DataTableCell>
    );
  };
  CurrencyCell.displayName = DataTableCell.displayName;

  const LikelihoodCell = ({ item, property }) => {
    const value = item[property];
    const getColor = () => {
      if (value === 'Yes') return 'success';
      if (value === 'Maybe') return 'warning';
      return 'light';
    };

    return (
      <DataTableCell>
        <Badge color={getColor()} content={value} />
      </DataTableCell>
    );
  };
  LikelihoodCell.displayName = DataTableCell.displayName;

  const DateCell = ({ item, property }) => {
    const date = new Date(item[property]);
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return (
      <DataTableCell>
        <div>{formatted}</div>
      </DataTableCell>
    );
  };
  DateCell.displayName = DataTableCell.displayName;

  const RefreshDateCell = ({ item }) => {
    const date = new Date(item.lastInnRefresh);
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return (
      <DataTableCell>
        <div>
          <div style={{ fontWeight: '500' }}>{formatted}</div>
          <div style={{ fontSize: '0.75rem', color: '#706e6b' }}>
            {diffDays} days ago
          </div>
        </div>
      </DataTableCell>
    );
  };
  RefreshDateCell.displayName = DataTableCell.displayName;

  // Get unique states for filter
  const uniqueStates = [...new Set(innData.map(d => d.state))].sort();
  const stateOptions = [
    { id: 'all', label: 'All States' },
    ...uniqueStates.map(state => ({ id: state, label: state }))
  ];

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="slds-p-around_medium slds-border_bottom" style={{ backgroundColor: '#fafaf9' }}>
        <div className="slds-grid slds-wrap slds-gutters">
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-4">
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="search-input-inn">
                Search
              </label>
              <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                <Icon
                  assistiveText={{ label: 'Search' }}
                  category="utility"
                  name="search"
                  size="x-small"
                  className="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default"
                />
                <input
                  id="search-input-inn"
                  type="text"
                  className="slds-input"
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-4">
            <Combobox
              labels={{ label: 'DS Rating' }}
              options={[
                { id: 'all', label: 'All Ratings' },
                { id: 'DS1-1', label: 'DS1-1' },
                { id: 'DS1-2', label: 'DS1-2' },
                { id: 'DS1-3', label: 'DS1-3' },
                { id: 'DS1-4', label: 'DS1-4' },
                { id: 'DS1-5', label: 'DS1-5' },
              ]}
              selection={[{ id: dsRatingFilter, label: dsRatingFilter === 'all' ? 'All Ratings' : dsRatingFilter }]}
              onSelect={(_event, data) => {
                setDsRatingFilter(data.selection[0]?.id || 'all');
              }}
              variant="readonly"
            />
          </div>
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-4">
            <Combobox
              labels={{ label: 'State' }}
              options={stateOptions}
              selection={[{ id: stateFilter, label: stateFilter === 'all' ? 'All States' : stateFilter }]}
              onSelect={(_event, data) => {
                setStateFilter(data.selection[0]?.id || 'all');
              }}
              variant="readonly"
            />
          </div>
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-4">
            <Combobox
              labels={{ label: 'Estimated Capacity' }}
              options={[
                { id: 'all', label: 'All Capacities' },
                { id: 'high', label: 'High ($100K+)' },
                { id: 'medium', label: 'Medium ($25K-$100K)' },
                { id: 'low', label: 'Low (< $25K)' }
              ]}
              selection={[{
                id: capacityFilter,
                label: capacityFilter === 'all' ? 'All Capacities' :
                       capacityFilter === 'high' ? 'High ($100K+)' :
                       capacityFilter === 'medium' ? 'Medium ($25K-$100K)' :
                       'Low (< $25K)'
              }]}
              onSelect={(_event, data) => {
                setCapacityFilter(data.selection[0]?.id || 'all');
              }}
              variant="readonly"
            />
          </div>
        </div>
        <div className="slds-m-top_small">
          <span className="slds-text-body_small slds-text-color_weak">
            Showing {filteredData.length} of {innData.length} donors
          </span>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ overflowX: 'auto' }}>
        <DataTable items={filteredData} id="inn-explorer-table" fixedLayout>
          <DataTableColumn label="Donor Name" property="name" width="12rem">
            <NameCell />
          </DataTableColumn>
          <DataTableColumn label="Location" property="location" width="9rem">
            <LocationCell />
          </DataTableColumn>
          <DataTableColumn label="DS Rating" property="dsRating" width="7rem">
            <DSRatingCell />
          </DataTableColumn>
          <DataTableColumn label="Quality Score" property="qualityScore" width="8rem">
            <QualityScoreCell />
          </DataTableColumn>
          <DataTableColumn label="RFM Total" property="rfmTotal" width="7rem" />
          <DataTableColumn label="Last Gift Date" property="lastGiftDate" width="9rem">
            <DateCell property="lastGiftDate" />
          </DataTableColumn>
          <DataTableColumn label="Total Gifts" property="totalGiftAmount" width="8rem">
            <CurrencyCell property="totalGiftAmount" />
          </DataTableColumn>
          <DataTableColumn label="Est. Capacity" property="estimatedCapacity" width="9rem">
            <CurrencyCell property="estimatedCapacity" />
          </DataTableColumn>
          <DataTableColumn label="Major Gift" property="majorGiftLikelihood" width="8rem">
            <LikelihoodCell property="majorGiftLikelihood" />
          </DataTableColumn>
          <DataTableColumn label="Annual Fund" property="annualFundLikelihood" width="8rem">
            <LikelihoodCell property="annualFundLikelihood" />
          </DataTableColumn>
          <DataTableColumn label="Last INN Refresh" property="lastInnRefresh" width="10rem">
            <RefreshDateCell />
          </DataTableColumn>
          <DataTableColumn label="Spouse First" property="spouseFirst" width="8rem" />
          <DataTableColumn label="Spouse Last" property="spouseLast" width="8rem" />
          <DataTableColumn label="Total Likely Matches" property="totalLikelyMatches" width="10rem">
            <CurrencyCell property="totalLikelyMatches" />
          </DataTableColumn>
          <DataTableColumn label="# Gift Matches" property="giftMatches" width="8rem" />
          <DataTableColumn label="Foundation Assets" property="foundationAssets" width="10rem">
            <CurrencyCell property="foundationAssets" />
          </DataTableColumn>
          <DataTableColumn label="Political Likely Count" property="politicalLikelyCount" width="10rem" />
          <DataTableColumn label="Political Likely Total" property="politicalLikelyTotal" width="10rem">
            <CurrencyCell property="politicalLikelyTotal" />
          </DataTableColumn>
          <DataTableColumn label="Largest Gift Lower Range" property="largestGiftLowerRange" width="12rem">
            <CurrencyCell property="largestGiftLowerRange" />
          </DataTableColumn>
          <DataTableColumn label="Real Estate Est" property="realEstateEst" width="10rem">
            <CurrencyCell property="realEstateEst" />
          </DataTableColumn>
          <DataTableColumn label="# Of Prop" property="numProperties" width="7rem" />
          <DataTableColumn label="SEC Stock Value" property="secStockValue" width="10rem">
            <CurrencyCell property="secStockValue" />
          </DataTableColumn>
          <DataTableColumn label="SEC Stock or Insider" property="secStockOrInsider" width="10rem" />
          <DataTableColumn label="Average Home Value" property="averageHomeValue" width="10rem">
            <CurrencyCell property="averageHomeValue" />
          </DataTableColumn>
          <DataTableColumn label="Median HH Income" property="medianHouseholdIncome" width="10rem">
            <CurrencyCell property="medianHouseholdIncome" />
          </DataTableColumn>
          <DataTableColumn label="RFM Recent Gift" property="rfmRecentGift" width="9rem" />
          <DataTableColumn label="RFM Freq" property="rfmFreq" width="7rem" />
          <DataTableColumn label="RFM Money" property="rfmMoney" width="8rem" />
          <DataTableColumn label="Classic Quality Score" property="classicQualityScore" width="10rem">
            <QualityScoreCell property="classicQualityScore" />
          </DataTableColumn>
          <DataTableColumn label="Higher Ed Count" property="higherEducationCount" width="9rem" />
          <DataTableColumn label="Higher Ed Total" property="higherEducationTotal" width="9rem">
            <CurrencyCell property="higherEducationTotal" />
          </DataTableColumn>
          <DataTableColumn label="Philanthropy Count" property="philanthropyCount" width="10rem" />
          <DataTableColumn label="Philanthropy Total" property="philanthropyTotal" width="10rem">
            <CurrencyCell property="philanthropyTotal" />
          </DataTableColumn>
          <DataTableColumn label="Arts Gift Count" property="artsGiftCount" width="9rem" />
          <DataTableColumn label="Arts Gift Total" property="artsGiftTotal" width="9rem">
            <CurrencyCell property="artsGiftTotal" />
          </DataTableColumn>
          <DataTableColumn label="Republican Gift Count" property="republicanGiftCount" width="11rem" />
          <DataTableColumn label="Republican Gift Total" property="republicanGiftTotal" width="11rem">
            <CurrencyCell property="republicanGiftTotal" />
          </DataTableColumn>
          <DataTableColumn label="Democratic Gift Count" property="democraticGiftCount" width="11rem" />
          <DataTableColumn label="Democratic Gift Total" property="democraticGiftTotal" width="11rem">
            <CurrencyCell property="democraticGiftTotal" />
          </DataTableColumn>
          <DataTableColumn label="Largest Gift Org Name" property="largestGiftOrgName" width="14rem" />
          <DataTableColumn label="Largest Gift Type" property="largestGiftType" width="10rem" />
          <DataTableColumn label="Largest Gift Category" property="largestGiftCategory" width="14rem" />
        </DataTable>
      </div>

      {filteredData.length === 0 && (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="search" size="large" colorVariant="light" />
          <p className="slds-text-heading_small slds-m-top_medium">No donors found</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

// ComponentCard wrapper for consistent styling
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

// INN Contact Detail Component for Contact Record Page
const INNContactDetail = () => {
  const [showDetails, setShowDetails] = useState(false);

  // Sample contact data - in real implementation, this would come from the Contact record
  const contactData = {
    firstName: 'Jennifer',
    lastName: 'Anderson',
    dsRating: 'DS1-1',
    qualityScore: 19.0,
    rfmTotal: 193,
    lastGiftDate: '2025-04-01',
    totalGiftAmount: 3000,
    city: 'Boston',
    state: 'MA',
    estimatedCapacity: 1098089,
    majorGiftLikelihood: 'Yes',
    annualFundLikelihood: 'No',
    lastInnRefresh: '2025-01-15',
    spouseFirst: 'mary',
    spouseLast: 'ottaway',
    totalLikelyMatches: 19158004,
    giftMatches: 253,
    foundationAssets: 11106143,
    politicalLikelyCount: 502,
    politicalLikelyTotal: 189627,
    largestGiftLowerRange: 500000,
    realEstateEst: 2039832,
    numProperties: 3,
    secStockValue: 0,
    secStockOrInsider: 'Yes',
    averageHomeValue: 416000,
    medianHouseholdIncome: 146000,
    rfmRecentGift: 93,
    rfmFreq: 0,
    rfmMoney: 100,
    classicQualityScore: 15.2,
    higherEducationCount: 27,
    higherEducationTotal: 442001,
    philanthropyCount: 14,
    philanthropyTotal: 603500,
    artsGiftCount: 87,
    artsGiftTotal: 16317301,
    republicanGiftCount: 306,
    republicanGiftTotal: 147542,
    democraticGiftCount: 195,
    democraticGiftTotal: 40085,
    largestGiftOrgName: 'Brooklyn Academy Of Music Inc',
    largestGiftType: 'Annual',
    largestGiftCategory: 'Arts culture and Humanities'
  };

  const formatCurrency = (value) => {
    return value ? `$${value.toLocaleString()}` : '$0';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  const getRatingColor = (rating) => {
    if (rating.startsWith('DS1-1')) return '#2e844a';
    if (rating.startsWith('DS1-2')) return '#0176d3';
    if (rating.startsWith('DS1-3')) return '#f59f00';
    return '#706e6b';
  };

  const MetricCard = ({ label, value, subtext }) => (
    <div style={{
      backgroundColor: '#f3f3f3',
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '12px'
    }}>
      <div style={{ fontSize: '0.75rem', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
        {label}
      </div>
      <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#080707' }}>
        {value}
      </div>
      {subtext && (
        <div style={{ fontSize: '0.75rem', color: '#706e6b', marginTop: '4px' }}>
          {subtext}
        </div>
      )}
    </div>
  );

  const DataRow = ({ label, value, highlight }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
      borderBottom: '1px solid #e5e5e5'
    }}>
      <span style={{ fontSize: '0.875rem', color: '#3e3e3c' }}>{label}</span>
      <span style={{
        fontSize: '0.875rem',
        fontWeight: highlight ? '600' : '400',
        color: highlight ? '#0176d3' : '#080707'
      }}>
        {value}
      </span>
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
            {contactData.firstName} {contactData.lastName}
          </h2>
          <Badge
            color="success"
            content={contactData.dsRating}
            style={{ backgroundColor: getRatingColor(contactData.dsRating) }}
          />
        </div>
        <div style={{ fontSize: '0.875rem', color: '#706e6b' }}>
          {contactData.city}, {contactData.state}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <MetricCard
          label="Estimated Capacity"
          value={formatCurrency(contactData.estimatedCapacity)}
        />
        <MetricCard
          label="Quality Score"
          value={contactData.qualityScore.toFixed(1)}
        />
        <MetricCard
          label="Total Gifts"
          value={formatCurrency(contactData.totalGiftAmount)}
          subtext={`Last: ${formatDate(contactData.lastGiftDate)}`}
        />
        <MetricCard
          label="RFM Total"
          value={contactData.rfmTotal}
        />
      </div>

      {/* Card Footer with Toggle */}
      <div style={{
        borderTop: '1px solid #e5e5e5',
        padding: '12px 0',
        textAlign: 'center'
      }}>
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{
            background: 'none',
            border: 'none',
            color: '#0176d3',
            fontSize: '0.875rem',
            fontWeight: '400',
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          {showDetails ? 'Hide details' : 'View details'}
        </button>
      </div>

      {/* Detailed Information - Scrollable */}
      {showDetails && (
        <div style={{
          maxHeight: '500px',
          overflowY: 'auto',
          borderTop: '1px solid #e5e5e5',
          paddingTop: '20px',
          marginTop: '12px'
        }}>
          {/* Wealth Indicators */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', color: '#3e3e3c', marginBottom: '12px' }}>
              Wealth Indicators
            </h3>
            <DataRow label="Foundation Assets" value={formatCurrency(contactData.foundationAssets)} highlight={contactData.foundationAssets > 0} />
            <DataRow label="Real Estate Estimate" value={formatCurrency(contactData.realEstateEst)} />
            <DataRow label="# of Properties" value={contactData.numProperties} />
            <DataRow label="Average Home Value" value={formatCurrency(contactData.averageHomeValue)} />
            <DataRow label="SEC Stock or Insider" value={contactData.secStockOrInsider} />
            <DataRow label="Median HH Income" value={formatCurrency(contactData.medianHouseholdIncome)} />
          </div>

          {/* Giving History */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', color: '#3e3e3c', marginBottom: '12px' }}>
              Giving History
            </h3>
            <DataRow label="Total Likely Matches" value={formatCurrency(contactData.totalLikelyMatches)} />
            <DataRow label="# of Gift Matches" value={contactData.giftMatches} />
            <DataRow label="Largest Gift (Lower Range)" value={formatCurrency(contactData.largestGiftLowerRange)} highlight />
            <DataRow label="Higher Education Gifts" value={`${contactData.higherEducationCount} (${formatCurrency(contactData.higherEducationTotal)})`} />
            <DataRow label="Arts & Culture Gifts" value={`${contactData.artsGiftCount} (${formatCurrency(contactData.artsGiftTotal)})`} />
            <DataRow label="Philanthropy Gifts" value={`${contactData.philanthropyCount} (${formatCurrency(contactData.philanthropyTotal)})`} />
          </div>

          {/* Political Giving */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', color: '#3e3e3c', marginBottom: '12px' }}>
              Political Giving
            </h3>
            <DataRow label="Total Political Giving" value={formatCurrency(contactData.politicalLikelyTotal)} />
            <DataRow label="Republican Gifts" value={`${contactData.republicanGiftCount} (${formatCurrency(contactData.republicanGiftTotal)})`} />
            <DataRow label="Democratic Gifts" value={`${contactData.democraticGiftCount} (${formatCurrency(contactData.democraticGiftTotal)})`} />
          </div>

          {/* Largest Gift */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', color: '#3e3e3c', marginBottom: '12px' }}>
              Largest Known Gift
            </h3>
            <DataRow label="Organization" value={contactData.largestGiftOrgName} />
            <DataRow label="Category" value={contactData.largestGiftCategory} />
            <DataRow label="Type" value={contactData.largestGiftType} />
          </div>

          {/* Spouse Information */}
          {contactData.spouseFirst && contactData.spouseLast && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', color: '#3e3e3c', marginBottom: '12px' }}>
                Spouse Information
              </h3>
              <DataRow label="Spouse Name" value={`${contactData.spouseFirst} ${contactData.spouseLast}`} />
            </div>
          )}

          {/* RFM Scores */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', color: '#3e3e3c', marginBottom: '12px' }}>
              RFM Analysis
            </h3>
            <DataRow label="RFM Recent Gift" value={contactData.rfmRecentGift} />
            <DataRow label="RFM Frequency" value={contactData.rfmFreq} />
            <DataRow label="RFM Money" value={contactData.rfmMoney} />
            <DataRow label="Classic Quality Score" value={contactData.classicQualityScore.toFixed(1)} />
          </div>

          {/* Likelihood Scores */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '700', textTransform: 'uppercase', color: '#3e3e3c', marginBottom: '12px' }}>
              Giving Likelihood
            </h3>
            <DataRow label="Major Gift Likelihood" value={contactData.majorGiftLikelihood} highlight={contactData.majorGiftLikelihood === 'Yes'} />
            <DataRow label="Annual Fund Likelihood" value={contactData.annualFundLikelihood} />
          </div>

          {/* Last Refresh */}
          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '12px',
            borderRadius: '4px',
            borderLeft: '3px solid #0176d3'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#706e6b' }}>
              Last INN Refresh
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#080707', marginTop: '4px' }}>
              {formatDate(contactData.lastInnRefresh)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#706e6b', marginTop: '4px' }}>
              {getDaysAgo(contactData.lastInnRefresh)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const INNExplorer = () => {
  return (
    <IconSettings iconPath="/assets/icons">
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3', padding: '24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* COMPONENT 1: INN Explorer Table */}
          <ComponentCard
            title="INN Explorer"
          >
            <INNExplorerTable />
          </ComponentCard>

          {/* COMPONENT 2: INN Contact Detail (Half-Column Width) */}
          <div style={{ maxWidth: '600px' }}>
            <ComponentCard
              title="INN Contact Detail"
            >
              <INNContactDetail />
            </ComponentCard>
          </div>
        </div>
      </div>
    </IconSettings>
  );
};

export default INNExplorer;
