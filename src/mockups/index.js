// Register your mockups here
// Add new mockups by importing them and adding to the mockups array

import CampaignBuilder from './CampaignBuilder';
import ComponentShowcase from './ComponentShowcase';
import CaseDueDateCalendar from './CaseDueDateCalendar';
import DonorHousehold from './DonorHousehold';
import ProductionOrders from './ProductionOrders';
import OpportunityProducts from './OpportunityProducts';

export const mockups = [
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
