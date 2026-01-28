// Register your mockups here
// Add new mockups by importing them and adding to the mockups array

import CampaignBuilder from './CampaignBuilder';
import ComponentShowcase from './ComponentShowcase';
import CaseDueDateCalendar from './CaseDueDateCalendar';
import DonorHousehold from './DonorHousehold';
import ProductionOrders from './ProductionOrders';
import OpportunityProducts from './OpportunityProducts';
import FillDashboard from './FillDashboard';
import NewProviderRevenue from './NewProviderRevenue';
import AccountComponents from './AccountComponents';
import ContactAddressComponents from './ContactAddressComponents';
import SAPB1AccountComponents from './SAPB1AccountComponents';
import FormulaComponents from './FormulaComponents';
import AccountContactCards from './AccountContactCards';
import OpportunitySAPComponents from './OpportunitySAPComponents';
import StripeComponents from './StripeComponents';
import OpportunityComponents from './OpportunityComponents';
import INNExplorer from './INNExplorer';

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
    name: 'Case Components',
    description: 'One-click calendar for updating Case Due Date',
    component: CaseDueDateCalendar,
  },
  {
    id: 'donor-household',
    name: 'Account Components (NPSP)',
    description: 'Household record page for donor management system',
    component: DonorHousehold,
  },
  {
    id: 'production-orders',
    name: 'Production Order Components',
    description: 'Manufacturing order overview with component visibility and material availability',
    component: ProductionOrders,
  },
  {
    id: 'opportunity-products',
    name: 'Opportunity Products',
    description: 'Add products to opportunities with inventory & ATP visibility',
    component: OpportunityProducts,
  },
  {
    id: 'fill-dashboard',
    name: 'Fill Dashboard',
    description: 'Track fill performance and revenue metrics with trend analysis',
    component: FillDashboard,
  },
  {
    id: 'new-provider-revenue',
    name: 'New Provider Revenue - Last 12 Weeks',
    description: 'Track new providers and their ordering patterns over the last 12 weeks',
    component: NewProviderRevenue,
  },
  {
    id: 'account-components',
    name: 'Account Components (Compounding)',
    description: 'Individual drag-and-drop components for Account record pages with metrics from Fill Dashboard',
    component: AccountComponents,
  },
  {
    id: 'contact-address-components',
    name: 'Contact & Address Components',
    description: 'Interactive Contact and Address cards with SAP Business One sync, activities, and validation',
    component: ContactAddressComponents,
  },
  {
    id: 'sapb1-account-components',
    name: 'Account Components (SAP)',
    description: 'Sales by Product with kg units organized by Product Category - SAP Business One integration',
    component: SAPB1AccountComponents,
  },
  {
    id: 'formula-components',
    name: 'Formula Components',
    description: 'Formulation Line Items with drag-and-drop reordering within phases',
    component: FormulaComponents,
  },
  {
    id: 'account-contact-cards',
    name: 'Account Components',
    description: 'Related contact cards for Account records - generic for any industry',
    component: AccountContactCards,
  },
  {
    id: 'opportunity-sap-components',
    name: 'Opportunity Components (SAP)',
    description: 'Detailed opportunity stage tracking with production orders, testing, and fulfillment information with production workload scheduler',
    component: OpportunitySAPComponents,
  },
  {
    id: 'stripe-components',
    name: 'Opportunity Components (Stripe)',
    description: 'Stripe payment tracking components for Opportunities - payment information, transaction history, payment methods, and invoices',
    component: StripeComponents,
  },
  {
    id: 'opportunity-components',
    name: 'Opportunity Components (Campaign)',
    description: 'Campaign information display for Opportunity records - shows campaign metrics, revenue, and performance data',
    component: OpportunityComponents,
  },
  {
    id: 'inn-explorer',
    name: 'Contact Components (INN)',
    description: 'INN (donor intelligence) data explorer with filtering by DS Rating, State, and Capacity - linked to Salesforce Contacts',
    component: INNExplorer,
  },
];

// Auto-generate shareId for each mockup based on its id
export const mockups = mockupsBase.map(mockup => ({
  ...mockup,
  shareId: generateShareId(mockup.id)
}));
