// Register your mockups here
// Add new mockups by importing them and adding to the mockups array

import CampaignBuilder from './CampaignBuilder';
import ComponentShowcase from './ComponentShowcase';
import CaseDueDateCalendar from './CaseDueDateCalendar';
import DonorHousehold from './DonorHousehold';
import ProductionOrders from './ProductionOrders';
import OpportunityProducts from './OpportunityProducts';

// Simple deterministic hash function to generate consistent share IDs
const generateShareId = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to UUID-like format
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const hash2 = Math.abs(hash * 7919).toString(16).padStart(8, '0');
  const hash3 = Math.abs(hash * 7927).toString(16).padStart(8, '0');
  const hash4 = Math.abs(hash * 7933).toString(16).padStart(8, '0');
  return `${hex.slice(0,8)}-${hash2.slice(0,4)}-${hash3.slice(0,4)}-${hash4.slice(0,4)}-${hash2.slice(4,8)}${hex.slice(4,8)}`;
};

const mockupsBase = [
  {
    id: 'campaign-builder',
    name: 'Campaign Builder',
    description: 'Screen flow for Opportunity campaign package selection',
    component: CampaignBuilder,
  },
  {
    id: 'component-showcase',
    name: 'Component Showcase',
    description: 'Comprehensive examples of all SLDS React components',
    component: ComponentShowcase,
  },
  {
    id: 'case-due-date-calendar',
    name: 'Case Due Date Calendar',
    description: 'One-click calendar for updating Case Due Date',
    component: CaseDueDateCalendar,
  },
  {
    id: 'donor-household',
    name: 'Donor Household',
    description: 'Household record page for donor management system',
    component: DonorHousehold,
  },
  {
    id: 'production-orders',
    name: 'Production Orders',
    description: 'Manufacturing order overview with component visibility and material availability',
    component: ProductionOrders,
  },
  {
    id: 'opportunity-products',
    name: 'Opportunity Products',
    description: 'Add products to opportunities with inventory & ATP visibility',
    component: OpportunityProducts,
  },
];

// Auto-generate shareId for each mockup based on its id
export const mockups = mockupsBase.map(mockup => ({
  ...mockup,
  shareId: generateShareId(mockup.id)
}));
