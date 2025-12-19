import React, { useState } from 'react';
import Card from '@salesforce/design-system-react/components/card';
import Button from '@salesforce/design-system-react/components/button';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import Icon from '@salesforce/design-system-react/components/icon';
import Badge from '@salesforce/design-system-react/components/badge';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Tabs from '@salesforce/design-system-react/components/tabs';
import TabsPanel from '@salesforce/design-system-react/components/tabs/panel';
import Accordion from '@salesforce/design-system-react/components/accordion';
import AccordionPanel from '@salesforce/design-system-react/components/accordion/panel';

/**
 * AccountLexLayout - Enhanced Lightning Experience Account Record Page Mockup
 *
 * Demonstrates a multi-pharmacy performance visualization layout for ChemistryRx,
 * showing account details, fill history, provider relationships, and business metrics
 * across 4 pharmacy locations (Folcroft PA, Scottsdale AZ, Wilmington DE, Ann Arbor MI).
 */

// Custom cell for currency values
const CurrencyCell = ({ children }) => (
  <DataTableCell>
    <span style={{ fontWeight: '600', color: '#2e844a' }}>{children}</span>
  </DataTableCell>
);
CurrencyCell.displayName = DataTableCell.displayName;

// Custom cell for status badges
const StatusBadgeCell = ({ children }) => {
  const colors = {
    'Filled': { bg: '#c2f5e9', color: '#0e6b5e' },
    'Open': { bg: '#d4edfc', color: '#0176d3' },
    'Pending': { bg: '#fce4b8', color: '#8c4b02' },
    'Error': { bg: '#fdd4d9', color: '#ba0517' },
    'Commissionable': { bg: '#c2f5e9', color: '#0e6b5e' },
    'Not Commissionable': { bg: '#f3f3f3', color: '#706e6b' },
    'Success': { bg: '#c2f5e9', color: '#0e6b5e' },
    'Failed': { bg: '#fdd4d9', color: '#ba0517' },
    'Eligible': { bg: '#c2f5e9', color: '#0e6b5e' },
  };
  const style = colors[children] || { bg: '#f3f3f3', color: '#181818' };
  return (
    <DataTableCell>
      <Badge content={children} style={{ backgroundColor: style.bg, color: style.color }} />
    </DataTableCell>
  );
};
StatusBadgeCell.displayName = DataTableCell.displayName;

const AccountLexLayout = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedSections, setExpandedSections] = useState({ 0: true });

  // Mock Account Data
  const mockAccountData = {
    id: 'ACC-001234',
    name: 'Premier Medical Practice',
    recordType: 'Practice',
    owner: 'Sarah Johnson',
    business: 'Chemistry Rx',
    accountCategory: 'Current',
    commissionStatus: 'Eligible',
    totalRevenueThisCY: 271000,
    lastFillDate: '2025-12-17',
    isCurrentAccount: true,
    region: 'Northeast',
    typeOfPractice: 'Internal Medicine',
    fillsAllTime: 995,
    firstFillDate: '2020-01-15',
    phone: '(215) 555-0123',
    billingAddress: {
      street: '1234 Medical Center Drive',
      city: 'Philadelphia',
      state: 'PA',
      postalCode: '19103'
    }
  };

  // Pharmacy Performance Data
  const pharmacyPerformance = [
    {
      location: 'Folcroft, PA',
      totalRevenue: 125000,
      fillCount: 450,
      openFills: 12,
      lastFillDate: '2025-12-17',
      daysSinceLastFill: 2,
      lastIngredient: 'Minoxidil',
      status: 'active'
    },
    {
      location: 'Scottsdale, AZ',
      totalRevenue: 89000,
      fillCount: 320,
      openFills: 8,
      lastFillDate: '2025-12-14',
      daysSinceLastFill: 5,
      lastIngredient: 'Finasteride',
      status: 'active'
    },
    {
      location: 'Wilmington, DE',
      totalRevenue: 45000,
      fillCount: 180,
      openFills: 3,
      lastFillDate: '2025-12-04',
      daysSinceLastFill: 15,
      lastIngredient: 'Biotin',
      status: 'warning'
    },
    {
      location: 'Ann Arbor, MI',
      totalRevenue: 12000,
      fillCount: 45,
      openFills: 1,
      lastFillDate: '2025-09-19',
      daysSinceLastFill: 91,
      lastIngredient: 'L-Carnitine',
      status: 'inactive'
    }
  ];

  // Fill Records Sample Data
  const fillRecords = [
    { id: 'Fill-001234', pharmacy: 'Folcroft, PA', provider: 'Dr. John Smith', status: 'Filled', ingredient: 'Minoxidil 5%', revenue: '$450', fillDate: '2025-12-17', rxDateEntered: '2025-12-15', newOrRefill: 'New', commissionStatus: 'Commissionable', enrichedStatus: 'Success' },
    { id: 'Fill-001235', pharmacy: 'Scottsdale, AZ', provider: 'Dr. Sarah Wilson', status: 'Filled', ingredient: 'Finasteride 1mg', revenue: '$380', fillDate: '2025-12-16', rxDateEntered: '2025-12-14', newOrRefill: 'Refill', commissionStatus: 'Commissionable', enrichedStatus: 'Success' },
    { id: 'Fill-001236', pharmacy: 'Folcroft, PA', provider: 'Dr. John Smith', status: 'Open', ingredient: 'Biotin Complex', revenue: '$290', fillDate: '', rxDateEntered: '2025-12-15', newOrRefill: 'New', commissionStatus: 'Commissionable', enrichedStatus: 'Pending' },
    { id: 'Fill-001237', pharmacy: 'Wilmington, DE', provider: 'Dr. Michael Chen', status: 'Filled', ingredient: 'L-Carnitine 500mg', revenue: '$350', fillDate: '2025-12-14', rxDateEntered: '2025-12-12', newOrRefill: 'New', commissionStatus: 'Commissionable', enrichedStatus: 'Success' },
    { id: 'Fill-001238', pharmacy: 'Scottsdale, AZ', provider: 'Dr. Sarah Wilson', status: 'Open', ingredient: 'Minoxidil 10%', revenue: '$520', fillDate: '', rxDateEntered: '2025-12-13', newOrRefill: 'New', commissionStatus: 'Commissionable', enrichedStatus: 'Pending' },
    { id: 'Fill-001239', pharmacy: 'Folcroft, PA', provider: 'Dr. Emily Rodriguez', status: 'Filled', ingredient: 'Testosterone Cream', revenue: '$680', fillDate: '2025-12-13', rxDateEntered: '2025-12-11', newOrRefill: 'Refill', commissionStatus: 'Commissionable', enrichedStatus: 'Success' },
    { id: 'Fill-001240', pharmacy: 'Ann Arbor, MI', provider: 'Dr. James Park', status: 'Pending', ingredient: 'Vitamin D3 50000 IU', revenue: '$150', fillDate: '', rxDateEntered: '2025-12-12', newOrRefill: 'New', commissionStatus: 'Commissionable', enrichedStatus: 'Pending' },
    { id: 'Fill-001241', pharmacy: 'Folcroft, PA', provider: 'Dr. John Smith', status: 'Filled', ingredient: 'Progesterone Capsules', revenue: '$420', fillDate: '2025-12-12', rxDateEntered: '2025-12-10', newOrRefill: 'New', commissionStatus: 'Commissionable', enrichedStatus: 'Success' },
    { id: 'Fill-001242', pharmacy: 'Wilmington, DE', provider: 'Dr. Michael Chen', status: 'Error', ingredient: 'DHEA 25mg', revenue: '$0', fillDate: '', rxDateEntered: '2025-12-11', newOrRefill: 'New', commissionStatus: 'Not Commissionable', enrichedStatus: 'Failed' },
    { id: 'Fill-001243', pharmacy: 'Scottsdale, AZ', provider: 'Dr. Lisa Anderson', status: 'Filled', ingredient: 'Estradiol Cream', revenue: '$540', fillDate: '2025-12-11', rxDateEntered: '2025-12-09', newOrRefill: 'Refill', commissionStatus: 'Commissionable', enrichedStatus: 'Success' },
  ];

  // Provider/Contact Data
  const providerContacts = [
    { id: 'CON-001', name: 'Dr. John Smith', title: 'Internal Medicine', npiNumber: '1234567890', email: 'jsmith@premiermed.com', phone: '(215) 555-0145', firstFillDate: '2020-03-12', totalRevenue: '$45,000', fillCount: 145 },
    { id: 'CON-002', name: 'Dr. Sarah Wilson', title: 'Family Practice', npiNumber: '1234567891', email: 'swilson@premiermed.com', phone: '(215) 555-0146', firstFillDate: '2020-06-18', totalRevenue: '$38,500', fillCount: 112 },
    { id: 'CON-003', name: 'Dr. Michael Chen', title: 'Endocrinology', npiNumber: '1234567892', email: 'mchen@premiermed.com', phone: '(215) 555-0147', firstFillDate: '2021-01-22', totalRevenue: '$52,300', fillCount: 156 },
    { id: 'CON-004', name: 'Dr. Emily Rodriguez', title: 'OB/GYN', npiNumber: '1234567893', email: 'erodriguez@premiermed.com', phone: '(215) 555-0148', firstFillDate: '2021-08-05', totalRevenue: '$67,800', fillCount: 203 },
    { id: 'CON-005', name: 'Dr. James Park', title: 'Sports Medicine', npiNumber: '1234567894', email: 'jpark@premiermed.com', phone: '(215) 555-0149', firstFillDate: '2022-02-14', totalRevenue: '$29,400', fillCount: 87 },
    { id: 'CON-006', name: 'Dr. Lisa Anderson', title: 'Anti-Aging Medicine', npiNumber: '1234567895', email: 'landerson@premiermed.com', phone: '(215) 555-0150', firstFillDate: '2022-09-30', totalRevenue: '$38,000', fillCount: 95 },
  ];

  // Business Summaries Data
  const businessSummaries = [
    { id: 'BS-001', month: 'December 2025', totalRevenue: '$28,500', fillCount: 92, avgFillRevenue: '$310', topIngredient: 'Minoxidil', topPharmacy: 'Folcroft, PA' },
    { id: 'BS-002', month: 'November 2025', totalRevenue: '$26,200', fillCount: 85, avgFillRevenue: '$308', topIngredient: 'Finasteride', topPharmacy: 'Scottsdale, AZ' },
    { id: 'BS-003', month: 'October 2025', totalRevenue: '$24,800', fillCount: 81, avgFillRevenue: '$306', topIngredient: 'Testosterone', topPharmacy: 'Folcroft, PA' },
    { id: 'BS-004', month: 'September 2025', totalRevenue: '$22,100', fillCount: 73, avgFillRevenue: '$303', topIngredient: 'Progesterone', topPharmacy: 'Wilmington, DE' },
    { id: 'BS-005', month: 'August 2025', totalRevenue: '$25,900', fillCount: 88, avgFillRevenue: '$294', topIngredient: 'Estradiol', topPharmacy: 'Scottsdale, AZ' },
  ];

  // Activity Data
  const activities = [
    { id: 'ACT-001', date: '2025-12-18', type: 'Call', subject: 'Q4 Business Review Discussion', assignedTo: 'Sarah Johnson', status: 'Completed', contact: 'Dr. John Smith' },
    { id: 'ACT-002', date: '2025-12-15', type: 'Email', subject: 'New Product Introduction - Hair Loss Treatment', assignedTo: 'Sarah Johnson', status: 'Completed', contact: 'Dr. Sarah Wilson' },
    { id: 'ACT-003', date: '2025-12-10', type: 'Visit', subject: 'On-site Practice Visit', assignedTo: 'Sarah Johnson', status: 'Completed', contact: 'Office Manager' },
    { id: 'ACT-004', date: '2025-12-05', type: 'Task', subject: 'Send Monthly Performance Report', assignedTo: 'Sarah Johnson', status: 'Completed', contact: 'Dr. John Smith' },
    { id: 'ACT-005', date: '2025-11-28', type: 'Meeting', subject: 'Quarterly Business Review', assignedTo: 'Sarah Johnson', status: 'Completed', contact: 'Practice Leadership' },
  ];

  // Helper Functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': { bg: '#c2f5e9', color: '#0e6b5e', icon: 'success' },
      'warning': { bg: '#fce4b8', color: '#8c4b02', icon: 'warning' },
      'inactive': { bg: '#fdd4d9', color: '#ba0517', icon: 'error' }
    };
    return colors[status] || colors['inactive'];
  };

  // Calculate aggregate metrics
  const totalActivePharmacies = pharmacyPerformance.filter(p => p.daysSinceLastFill < 365).length;
  const totalActiveProviders = providerContacts.length;
  const avgFillRevenue = Math.round(mockAccountData.totalRevenueThisCY / mockAccountData.fillsAllTime);

  // Filter fills by status
  const filledFills = fillRecords.filter(f => f.status === 'Filled');
  const openFills = fillRecords.filter(f => f.status === 'Open');
  const pendingFills = fillRecords.filter(f => f.status === 'Pending');
  const errorFills = fillRecords.filter(f => f.status === 'Error');

  // Page Header Component
  const PageHeaderComponent = () => (
    <div className="slds-page-header slds-page-header_record-home slds-m-bottom_medium" style={{ backgroundColor: '#ffffff' }}>
      <div className="slds-page-header__row">
        <div className="slds-page-header__col-title">
          <div className="slds-media">
            <div className="slds-media__figure">
              <span className="slds-icon_container slds-icon-standard-account" style={{ backgroundColor: '#7f8de1' }}>
                <Icon
                  assistiveText={{ label: 'Account' }}
                  category="standard"
                  name="account"
                  size="medium"
                />
              </span>
            </div>
            <div className="slds-media__body">
              <div className="slds-page-header__name">
                <div className="slds-page-header__name-title">
                  <h1>
                    <span className="slds-page-header__title slds-truncate" title={mockAccountData.name}>
                      {mockAccountData.name}
                    </span>
                  </h1>
                </div>
              </div>
              <p className="slds-page-header__name-meta">
                Account • {mockAccountData.recordType} • Owner: {mockAccountData.owner}
                {mockAccountData.isCurrentAccount && (
                  <span style={{ marginLeft: '8px' }}>
                    <Badge content="Current Account" style={{ backgroundColor: '#c2f5e9', color: '#0e6b5e' }} />
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="slds-page-header__col-actions">
          <div className="slds-page-header__controls">
            <div className="slds-page-header__control">
              <ButtonGroup>
                <Button label="Log a Call" variant="neutral" iconCategory="utility" iconName="call" iconPosition="left" />
                <Button label="New Fill" variant="neutral" iconCategory="utility" iconName="add" iconPosition="left" />
                <Button label="Send Email" variant="neutral" iconCategory="utility" iconName="email" iconPosition="left" />
              </ButtonGroup>
            </div>
            <div className="slds-page-header__control">
              <Button label="Edit" variant="brand" />
            </div>
          </div>
        </div>
      </div>
      <div className="slds-page-header__row slds-page-header__row_gutters">
        <div className="slds-page-header__col-details">
          <ul className="slds-page-header__detail-row">
            <li className="slds-page-header__detail-block">
              <div className="slds-text-title slds-truncate" title="Business">Business</div>
              <div className="slds-truncate" title={mockAccountData.business}>{mockAccountData.business}</div>
            </li>
            <li className="slds-page-header__detail-block">
              <div className="slds-text-title slds-truncate" title="Type of Practice">Type of Practice</div>
              <div className="slds-truncate" title={mockAccountData.typeOfPractice}>{mockAccountData.typeOfPractice}</div>
            </li>
            <li className="slds-page-header__detail-block">
              <div className="slds-text-title slds-truncate" title="Phone">Phone</div>
              <div className="slds-truncate" title={mockAccountData.phone}>{mockAccountData.phone}</div>
            </li>
            <li className="slds-page-header__detail-block">
              <div className="slds-text-title slds-truncate" title="Commission Status">Commission Status</div>
              <div className="slds-truncate">
                <Badge content={mockAccountData.commissionStatus} style={{ backgroundColor: '#c2f5e9', color: '#0e6b5e' }} />
              </div>
            </li>
            <li className="slds-page-header__detail-block">
              <div className="slds-text-title slds-truncate" title="Total Revenue (CY)">Total Revenue (CY)</div>
              <div className="slds-truncate" style={{ fontWeight: '600', color: '#2e844a' }}>{formatCurrency(mockAccountData.totalRevenueThisCY)}</div>
            </li>
            <li className="slds-page-header__detail-block">
              <div className="slds-text-title slds-truncate" title="Last Fill Date">Last Fill Date</div>
              <div className="slds-truncate">{formatDate(mockAccountData.lastFillDate)}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Pharmacy Performance Card Component
  const PharmacyCard = ({ pharmacy }) => {
    const statusColor = getStatusColor(pharmacy.status);
    return (
      <div className="slds-col slds-size_1-of-2 slds-m-bottom_medium">
        <div className="slds-box" style={{
          border: `2px solid ${statusColor.color}`,
          borderRadius: '8px',
          height: '100%',
          backgroundColor: '#ffffff'
        }}>
          <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_small">
            <div className="slds-media slds-media_center">
              <div className="slds-media__figure">
                <Icon category="utility" name={statusColor.icon} size="small" style={{ fill: statusColor.color }} />
              </div>
              <div className="slds-media__body">
                <p className="slds-text-heading_small" style={{ fontWeight: '700' }}>{pharmacy.location}</p>
              </div>
            </div>
            <Button
              label="View Fills"
              variant="neutral"
              onClick={() => setSelectedTab(2)}
            />
          </div>
          <div className="slds-grid slds-gutters slds-m-bottom_small">
            <div className="slds-col slds-size_1-of-2">
              <p className="slds-text-title slds-text-color_weak">Total Revenue</p>
              <p className="slds-text-heading_medium" style={{ fontWeight: '700', color: '#2e844a' }}>
                {formatCurrency(pharmacy.totalRevenue)}
              </p>
            </div>
            <div className="slds-col slds-size_1-of-2">
              <p className="slds-text-title slds-text-color_weak">Fill Count</p>
              <p className="slds-text-heading_medium" style={{ fontWeight: '700' }}>
                {pharmacy.fillCount} <span style={{ fontSize: '14px', color: '#706e6b' }}>({pharmacy.openFills} open)</span>
              </p>
            </div>
          </div>
          <div className="slds-grid slds-gutters">
            <div className="slds-col slds-size_1-of-2">
              <p className="slds-text-title slds-text-color_weak">Last Fill</p>
              <p className="slds-text-body_regular">{formatDate(pharmacy.lastFillDate)}</p>
              <p className="slds-text-body_small" style={{ color: statusColor.color }}>
                {pharmacy.daysSinceLastFill} days ago
              </p>
            </div>
            <div className="slds-col slds-size_1-of-2">
              <p className="slds-text-title slds-text-color_weak">Last Ingredient</p>
              <p className="slds-text-body_regular">{pharmacy.lastIngredient}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Overview Tab Component
  const OverviewTab = () => (
    <div className="slds-p-around_medium">
      {/* Multi-Pharmacy Performance Cards */}
      <div className="slds-m-bottom_large">
        <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_small">
          <h2 className="slds-text-heading_medium">Pharmacy Performance</h2>
        </div>
        <div className="slds-grid slds-wrap slds-gutters">
          {pharmacyPerformance.map((pharmacy, idx) => (
            <PharmacyCard key={idx} pharmacy={pharmacy} />
          ))}
        </div>
      </div>

      {/* Account Health Scorecard */}
      <div className="slds-m-bottom_large">
        <h2 className="slds-text-heading_medium slds-m-bottom_small">Account Health Scorecard</h2>
        <div className="slds-grid slds-gutters">
          <div className="slds-col slds-size_1-of-4">
            <Card hasNoHeader>
              <div className="slds-p-around_medium" style={{ textAlign: 'center' }}>
                <p className="slds-text-title slds-text-color_weak">Lifetime Revenue</p>
                <p className="slds-text-heading_large" style={{ color: '#2e844a', fontWeight: '700' }}>
                  {formatCurrency(mockAccountData.totalRevenueThisCY)}
                </p>
              </div>
            </Card>
          </div>
          <div className="slds-col slds-size_1-of-4">
            <Card hasNoHeader>
              <div className="slds-p-around_medium" style={{ textAlign: 'center' }}>
                <p className="slds-text-title slds-text-color_weak">Active Pharmacies</p>
                <p className="slds-text-heading_large" style={{ color: '#0176d3', fontWeight: '700' }}>
                  {totalActivePharmacies}
                </p>
                <p className="slds-text-body_small slds-text-color_weak">of 4 locations</p>
              </div>
            </Card>
          </div>
          <div className="slds-col slds-size_1-of-4">
            <Card hasNoHeader>
              <div className="slds-p-around_medium" style={{ textAlign: 'center' }}>
                <p className="slds-text-title slds-text-color_weak">Active Providers</p>
                <p className="slds-text-heading_large" style={{ color: '#5a1ba9', fontWeight: '700' }}>
                  {totalActiveProviders}
                </p>
              </div>
            </Card>
          </div>
          <div className="slds-col slds-size_1-of-4">
            <Card hasNoHeader>
              <div className="slds-p-around_medium" style={{ textAlign: 'center' }}>
                <p className="slds-text-title slds-text-color_weak">Avg Fill Revenue</p>
                <p className="slds-text-heading_large" style={{ color: '#fe9339', fontWeight: '700' }}>
                  {formatCurrency(avgFillRevenue)}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="slds-m-bottom_large">
        <h2 className="slds-text-heading_medium slds-m-bottom_small">Recent Activity</h2>
        <Card hasNoHeader>
          <div className="slds-p-around_medium">
            <ul className="slds-timeline">
              {activities.slice(0, 3).map((activity, index) => {
                const iconMap = {
                  'Email': { name: 'email', color: '#0176d3' },
                  'Call': { name: 'call', color: '#2e844a' },
                  'Visit': { name: 'event', color: '#7f8de1' },
                  'Task': { name: 'task', color: '#706e6b' },
                  'Meeting': { name: 'date_time', color: '#fe9339' },
                };
                const iconInfo = iconMap[activity.type] || { name: 'record', color: '#706e6b' };

                return (
                  <li key={activity.id} className="slds-timeline__item">
                    <div className="slds-media">
                      <div className="slds-media__figure">
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: iconInfo.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon
                            category="utility"
                            name={iconInfo.name}
                            size="x-small"
                            style={{ fill: '#ffffff' }}
                          />
                        </div>
                      </div>
                      <div className="slds-media__body">
                        <div className="slds-grid slds-grid_align-spread">
                          <div>
                            <p className="slds-truncate">
                              <strong>{activity.type}:</strong> {activity.subject}
                            </p>
                            <p className="slds-text-body_small slds-text-color_weak">
                              {activity.assignedTo} • {activity.status}
                            </p>
                          </div>
                          <p className="slds-text-body_small slds-text-color_weak">
                            {formatDate(activity.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {index < 2 && (
                      <div style={{
                        borderLeft: '1px solid #e5e5e5',
                        height: '24px',
                        marginLeft: '15px',
                        marginTop: '8px',
                        marginBottom: '8px'
                      }} />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      </div>

      {/* Key Dates */}
      <div>
        <h2 className="slds-text-heading_medium slds-m-bottom_small">Key Dates</h2>
        <div className="slds-grid slds-gutters">
          <div className="slds-col slds-size_1-of-2">
            <Card hasNoHeader>
              <div className="slds-p-around_medium">
                <dl className="slds-list_horizontal slds-wrap">
                  <dt className="slds-item_label slds-text-color_weak" style={{ width: '40%' }}>First Fill Date</dt>
                  <dd className="slds-item_detail" style={{ width: '60%' }}>{formatDate(mockAccountData.firstFillDate)}</dd>
                  <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Last Fill Date</dt>
                  <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>{formatDate(mockAccountData.lastFillDate)}</dd>
                </dl>
              </div>
            </Card>
          </div>
          <div className="slds-col slds-size_1-of-2">
            <Card hasNoHeader>
              <div className="slds-p-around_medium">
                <dl className="slds-list_horizontal slds-wrap">
                  <dt className="slds-item_label slds-text-color_weak" style={{ width: '40%' }}>Account Category</dt>
                  <dd className="slds-item_detail" style={{ width: '60%' }}>{mockAccountData.accountCategory}</dd>
                  <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Total Fills</dt>
                  <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>{mockAccountData.fillsAllTime}</dd>
                </dl>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // Business Summaries Tab Component
  const BusinessSummariesTab = () => (
    <div className="slds-p-around_medium">
      <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_medium">
        <h2 className="slds-text-heading_medium">Monthly Business Summaries</h2>
        <Button label="Export Report" variant="neutral" iconCategory="utility" iconName="download" iconPosition="left" />
      </div>
      <DataTable items={businessSummaries} id="business-summaries-table">
        <DataTableColumn label="Month" property="month" width="180px" />
        <DataTableColumn label="Total Revenue" property="totalRevenue" width="140px">
          <CurrencyCell />
        </DataTableColumn>
        <DataTableColumn label="Fill Count" property="fillCount" width="120px" />
        <DataTableColumn label="Avg Fill Revenue" property="avgFillRevenue" width="140px" />
        <DataTableColumn label="Top Ingredient" property="topIngredient" width="180px" />
        <DataTableColumn label="Top Pharmacy" property="topPharmacy" />
      </DataTable>
    </div>
  );

  // Fills Tab Component with Accordion
  const FillsTab = () => (
    <div className="slds-p-around_medium">
      <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_medium">
        <h2 className="slds-text-heading_medium">Fill Records</h2>
        <Button label="New Fill" variant="brand" iconCategory="utility" iconName="add" iconPosition="left" />
      </div>

      <Accordion>
        <AccordionPanel
          expanded={expandedSections[0]}
          id="all-fills"
          onTogglePanel={() => setExpandedSections({ ...expandedSections, 0: !expandedSections[0] })}
          summary={`All Fills (${fillRecords.length})`}
        >
          <DataTable items={fillRecords} id="all-fills-table">
            <DataTableColumn label="Fill Name" property="id" width="130px" />
            <DataTableColumn label="Pharmacy" property="pharmacy" width="140px" />
            <DataTableColumn label="Provider" property="provider" width="150px" />
            <DataTableColumn label="Status" property="status" width="100px">
              <StatusBadgeCell />
            </DataTableColumn>
            <DataTableColumn label="Ingredient" property="ingredient" />
            <DataTableColumn label="Revenue" property="revenue" width="100px">
              <CurrencyCell />
            </DataTableColumn>
            <DataTableColumn label="Fill Date" property="fillDate" width="120px" />
            <DataTableColumn label="Commission" property="commissionStatus" width="140px">
              <StatusBadgeCell />
            </DataTableColumn>
          </DataTable>
        </AccordionPanel>

        <AccordionPanel
          expanded={expandedSections[1]}
          id="filled-fills"
          onTogglePanel={() => setExpandedSections({ ...expandedSections, 1: !expandedSections[1] })}
          summary={`Filled Prescriptions (${filledFills.length})`}
        >
          <DataTable items={filledFills} id="filled-fills-table">
            <DataTableColumn label="Fill Name" property="id" width="130px" />
            <DataTableColumn label="Pharmacy" property="pharmacy" width="140px" />
            <DataTableColumn label="Provider" property="provider" width="150px" />
            <DataTableColumn label="Ingredient" property="ingredient" />
            <DataTableColumn label="Revenue" property="revenue" width="100px">
              <CurrencyCell />
            </DataTableColumn>
            <DataTableColumn label="Fill Date" property="fillDate" width="120px" />
          </DataTable>
        </AccordionPanel>

        <AccordionPanel
          expanded={expandedSections[2]}
          id="open-fills"
          onTogglePanel={() => setExpandedSections({ ...expandedSections, 2: !expandedSections[2] })}
          summary={`Open Prescriptions (${openFills.length})`}
        >
          <DataTable items={openFills} id="open-fills-table">
            <DataTableColumn label="Fill Name" property="id" width="130px" />
            <DataTableColumn label="Pharmacy" property="pharmacy" width="140px" />
            <DataTableColumn label="Provider" property="provider" width="150px" />
            <DataTableColumn label="Ingredient" property="ingredient" />
            <DataTableColumn label="Revenue" property="revenue" width="100px">
              <CurrencyCell />
            </DataTableColumn>
            <DataTableColumn label="Rx Date Entered" property="rxDateEntered" width="140px" />
          </DataTable>
        </AccordionPanel>

        <AccordionPanel
          expanded={expandedSections[3]}
          id="pending-fills"
          onTogglePanel={() => setExpandedSections({ ...expandedSections, 3: !expandedSections[3] })}
          summary={`Pending Enrichment (${pendingFills.length})`}
        >
          <DataTable items={pendingFills} id="pending-fills-table">
            <DataTableColumn label="Fill Name" property="id" width="130px" />
            <DataTableColumn label="Pharmacy" property="pharmacy" width="140px" />
            <DataTableColumn label="Provider" property="provider" width="150px" />
            <DataTableColumn label="Ingredient" property="ingredient" />
            <DataTableColumn label="Rx Date Entered" property="rxDateEntered" width="140px" />
            <DataTableColumn label="Enriched Status" property="enrichedStatus" width="140px">
              <StatusBadgeCell />
            </DataTableColumn>
          </DataTable>
        </AccordionPanel>

        <AccordionPanel
          expanded={expandedSections[4]}
          id="error-fills"
          onTogglePanel={() => setExpandedSections({ ...expandedSections, 4: !expandedSections[4] })}
          summary={`Fills with Errors (${errorFills.length})`}
        >
          <DataTable items={errorFills} id="error-fills-table">
            <DataTableColumn label="Fill Name" property="id" width="130px" />
            <DataTableColumn label="Pharmacy" property="pharmacy" width="140px" />
            <DataTableColumn label="Provider" property="provider" width="150px" />
            <DataTableColumn label="Ingredient" property="ingredient" />
            <DataTableColumn label="Status" property="status" width="100px">
              <StatusBadgeCell />
            </DataTableColumn>
            <DataTableColumn label="Enriched Status" property="enrichedStatus" width="140px">
              <StatusBadgeCell />
            </DataTableColumn>
          </DataTable>
        </AccordionPanel>
      </Accordion>
    </div>
  );

  // Contacts Tab Component
  const ContactsTab = () => (
    <div className="slds-p-around_medium">
      <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_medium">
        <h2 className="slds-text-heading_medium">Provider Contacts ({providerContacts.length})</h2>
        <Button label="New Contact" variant="brand" iconCategory="utility" iconName="add" iconPosition="left" />
      </div>
      <DataTable items={providerContacts} id="contacts-table">
        <DataTableColumn label="Name" property="name" width="180px" />
        <DataTableColumn label="Title" property="title" width="180px" />
        <DataTableColumn label="NPI Number" property="npiNumber" width="130px" />
        <DataTableColumn label="Email" property="email" />
        <DataTableColumn label="Phone" property="phone" width="140px" />
        <DataTableColumn label="First Fill" property="firstFillDate" width="120px" />
        <DataTableColumn label="Total Revenue" property="totalRevenue" width="120px">
          <CurrencyCell />
        </DataTableColumn>
        <DataTableColumn label="Fill Count" property="fillCount" width="100px" />
      </DataTable>
    </div>
  );

  // Activity Tab Component
  const ActivityTab = () => (
    <div className="slds-p-around_medium">
      <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_medium">
        <h2 className="slds-text-heading_medium">Activity & Engagement</h2>
        <Button label="Log Activity" variant="brand" iconCategory="utility" iconName="add" iconPosition="left" />
      </div>
      <DataTable items={activities} id="activities-table">
        <DataTableColumn label="Date" property="date" width="130px" />
        <DataTableColumn label="Type" property="type" width="100px" />
        <DataTableColumn label="Subject" property="subject" />
        <DataTableColumn label="Contact" property="contact" width="180px" />
        <DataTableColumn label="Assigned To" property="assignedTo" width="140px" />
        <DataTableColumn label="Status" property="status" width="120px">
          <StatusBadgeCell />
        </DataTableColumn>
      </DataTable>
    </div>
  );

  // Reports Tab Component
  const ReportsTab = () => (
    <div className="slds-p-around_medium">
      <h2 className="slds-text-heading_medium slds-m-bottom_medium">Reports & Analytics</h2>
      <div className="slds-grid slds-gutters slds-wrap">
        <div className="slds-col slds-size_1-of-2">
          <Card heading="Product Mix">
            <div className="slds-p-around_medium" style={{ textAlign: 'center', minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <Icon category="utility" name="chart" size="large" style={{ fill: '#c9c7c5' }} />
                <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
                  Product Mix Chart Visualization
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="slds-col slds-size_1-of-2">
          <Card heading="Fills by Provider">
            <div className="slds-p-around_medium" style={{ textAlign: 'center', minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <Icon category="utility" name="chart" size="large" style={{ fill: '#c9c7c5' }} />
                <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
                  Fills by Provider Chart
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="slds-col slds-size_1-of-1 slds-m-top_medium">
          <Card heading="Revenue Trend">
            <div className="slds-p-around_medium" style={{ textAlign: 'center', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <Icon category="utility" name="chart" size="large" style={{ fill: '#c9c7c5' }} />
                <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
                  Revenue Trend Chart (12 months)
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  // Collaborate Tab Component
  const CollaborateTab = () => (
    <div className="slds-p-around_medium">
      <h2 className="slds-text-heading_medium slds-m-bottom_medium">Chatter Feed</h2>
      <Card hasNoHeader>
        <div className="slds-p-around_medium" style={{ textAlign: 'center', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <Icon category="utility" name="groups" size="large" style={{ fill: '#c9c7c5' }} />
            <p className="slds-text-heading_small slds-m-top_small">Chatter Feed</p>
            <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
              Collaborate with your team, share updates, and track conversations
            </p>
            <Button label="Post" variant="brand" className="slds-m-top_medium" />
          </div>
        </div>
      </Card>
    </div>
  );

  // Left Sidebar Component
  const LeftSidebar = () => (
    <div className="slds-col slds-size_1-of-4 slds-p-right_medium">
      <Card heading="Account Details">
        <div className="slds-p-around_medium">
          <dl className="slds-list_horizontal slds-wrap">
            <dt className="slds-item_label slds-text-color_weak" style={{ width: '40%' }}>Account Name</dt>
            <dd className="slds-item_detail slds-truncate" style={{ width: '60%' }}>{mockAccountData.name}</dd>

            <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Record Type</dt>
            <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>{mockAccountData.recordType}</dd>

            <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Owner</dt>
            <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>{mockAccountData.owner}</dd>

            <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Business</dt>
            <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>{mockAccountData.business}</dd>

            <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Category</dt>
            <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>{mockAccountData.accountCategory}</dd>

            <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Region</dt>
            <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>{mockAccountData.region}</dd>

            <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Phone</dt>
            <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>{mockAccountData.phone}</dd>

            <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Address</dt>
            <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>
              {mockAccountData.billingAddress.street}<br />
              {mockAccountData.billingAddress.city}, {mockAccountData.billingAddress.state} {mockAccountData.billingAddress.postalCode}
            </dd>
          </dl>
        </div>
      </Card>
    </div>
  );

  // Main Render
  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <PageHeaderComponent />

      <div className="slds-grid">
        <LeftSidebar />

        <div className="slds-col slds-size_3-of-4">
          <Card hasNoHeader>
            <Tabs
              selectedIndex={selectedTab}
              onSelect={(index) => setSelectedTab(index)}
            >
              <TabsPanel label="Overview">
                <OverviewTab />
              </TabsPanel>

              <TabsPanel label="Business Summaries">
                <BusinessSummariesTab />
              </TabsPanel>

              <TabsPanel label={`Fills (${fillRecords.length})`}>
                <FillsTab />
              </TabsPanel>

              <TabsPanel label={`Contacts (${providerContacts.length})`}>
                <ContactsTab />
              </TabsPanel>

              <TabsPanel label="Activity & Engagement">
                <ActivityTab />
              </TabsPanel>

              <TabsPanel label="Reports & Analytics">
                <ReportsTab />
              </TabsPanel>

              <TabsPanel label="Collaborate">
                <CollaborateTab />
              </TabsPanel>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountLexLayout;
