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
import Avatar from '@salesforce/design-system-react/components/avatar';
import ProgressBar from '@salesforce/design-system-react/components/progress-bar';

// Custom cell for donation amount
const CurrencyCell = ({ children }) => (
  <DataTableCell>
    <span style={{ fontWeight: '600', color: '#2e844a' }}>{children}</span>
  </DataTableCell>
);
CurrencyCell.displayName = DataTableCell.displayName;

// Custom cell for donation type badge
const DonationTypeCell = ({ children }) => {
  const colors = {
    'One-Time': { bg: '#d4edfc', color: '#0176d3' },
    'Recurring': { bg: '#c2f5e9', color: '#0e6b5e' },
    'Major Gift': { bg: '#fce4b8', color: '#8c4b02' },
    'Pledge': { bg: '#e8d4f8', color: '#5a1ba9' },
    'In-Kind': { bg: '#fdd4d9', color: '#ba0517' },
  };
  const style = colors[children] || { bg: '#f3f3f3', color: '#181818' };
  return (
    <DataTableCell>
      <Badge content={children} style={{ backgroundColor: style.bg, color: style.color }} />
    </DataTableCell>
  );
};
DonationTypeCell.displayName = DataTableCell.displayName;

// Custom cell for status
const StatusCell = ({ children }) => {
  const colors = {
    'Completed': { bg: '#c2f5e9', color: '#0e6b5e' },
    'Pending': { bg: '#fce4b8', color: '#8c4b02' },
    'Pledged': { bg: '#e8d4f8', color: '#5a1ba9' },
  };
  const style = colors[children] || { bg: '#f3f3f3', color: '#181818' };
  return (
    <DataTableCell>
      <Badge content={children} style={{ backgroundColor: style.bg, color: style.color }} />
    </DataTableCell>
  );
};
StatusCell.displayName = DataTableCell.displayName;

const DonorHousehold = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Mock household data
  const household = {
    name: 'The Morrison Family',
    primaryContact: 'Margaret Morrison',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    phone: '(555) 234-5678',
    email: 'morrison.family@email.com',
    donorSince: '2018',
    donorLevel: 'Gold Circle',
    lifetimeGiving: 47500,
    thisYearGiving: 8500,
    lastYearGiving: 12000,
    yearGoal: 15000,
    preferredContact: 'Email',
    communicationPrefs: ['Annual Report', 'Event Invitations', 'Newsletter'],
    tags: ['Major Donor', 'Board Connection', 'Event Sponsor'],
  };

  const members = [
    {
      id: '1',
      name: 'Margaret Morrison',
      role: 'Primary Contact',
      email: 'margaret.morrison@email.com',
      phone: '(555) 234-5678',
      isPrimary: true,
      employer: 'Morrison Law Group',
      title: 'Managing Partner',
    },
    {
      id: '2',
      name: 'Robert Morrison',
      role: 'Spouse',
      email: 'robert.morrison@email.com',
      phone: '(555) 234-5679',
      isPrimary: false,
      employer: 'Springfield Medical Center',
      title: 'Chief of Surgery',
    },
    {
      id: '3',
      name: 'Emily Morrison',
      role: 'Child (Adult)',
      email: 'emily.m@email.com',
      phone: '(555) 987-6543',
      isPrimary: false,
      employer: 'Tech Startup Inc',
      title: 'Software Engineer',
    },
  ];

  const donations = [
    { id: '1', date: '2025-11-15', amount: '$5,000', type: 'Major Gift', campaign: 'Year-End Appeal 2025', status: 'Completed', method: 'Check' },
    { id: '2', date: '2025-09-01', amount: '$500', type: 'Recurring', campaign: 'Monthly Giving Program', status: 'Completed', method: 'Credit Card' },
    { id: '3', date: '2025-08-01', amount: '$500', type: 'Recurring', campaign: 'Monthly Giving Program', status: 'Completed', method: 'Credit Card' },
    { id: '4', date: '2025-07-01', amount: '$500', type: 'Recurring', campaign: 'Monthly Giving Program', status: 'Completed', method: 'Credit Card' },
    { id: '5', date: '2025-05-20', amount: '$2,000', type: 'One-Time', campaign: 'Spring Gala 2025', status: 'Completed', method: 'Credit Card' },
    { id: '6', date: '2025-03-15', amount: '$10,000', type: 'Pledge', campaign: 'Capital Campaign', status: 'Pledged', method: 'Pledge' },
    { id: '7', date: '2024-12-20', amount: '$7,500', type: 'Major Gift', campaign: 'Year-End Appeal 2024', status: 'Completed', method: 'Wire Transfer' },
    { id: '8', date: '2024-06-10', amount: '$2,500', type: 'One-Time', campaign: 'Summer Fundraiser', status: 'Completed', method: 'Check' },
  ];

  const activities = [
    { id: '1', date: '2025-12-10', type: 'Email', subject: 'Year-End Appeal Follow-up', assignedTo: 'Sarah Chen', status: 'Completed' },
    { id: '2', date: '2025-11-20', type: 'Meeting', subject: 'Stewardship Visit', assignedTo: 'David Park', status: 'Completed' },
    { id: '3', date: '2025-10-15', type: 'Event', subject: 'Donor Appreciation Dinner', assignedTo: 'Events Team', status: 'Attended' },
    { id: '4', date: '2025-09-05', type: 'Call', subject: 'Quarterly Check-in', assignedTo: 'Sarah Chen', status: 'Completed' },
    { id: '5', date: '2025-06-20', type: 'Meeting', subject: 'Capital Campaign Presentation', assignedTo: 'David Park', status: 'Completed' },
    { id: '6', date: '2025-01-15', type: 'Task', subject: 'Send Thank You Card', assignedTo: 'Admin Team', status: 'Completed' },
  ];

  const pledges = [
    { id: '1', campaign: 'Capital Campaign', totalAmount: '$50,000', paidAmount: '$20,000', balance: '$30,000', startDate: '2024-01-01', endDate: '2026-12-31', status: 'Active' },
    { id: '2', campaign: 'Scholarship Fund', totalAmount: '$10,000', paidAmount: '$10,000', balance: '$0', startDate: '2022-01-01', endDate: '2023-12-31', status: 'Fulfilled' },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  };

  const yearProgress = (household.thisYearGiving / household.yearGoal) * 100;

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      {/* Page Header */}
      <div className="slds-page-header slds-page-header_record-home slds-m-bottom_medium" style={{ backgroundColor: '#ffffff' }}>
        <div className="slds-page-header__row">
          <div className="slds-page-header__col-title">
            <div className="slds-media">
              <div className="slds-media__figure">
                <span className="slds-icon_container slds-icon-standard-household" style={{ backgroundColor: '#7f8de1' }}>
                  <Icon
                    assistiveText={{ label: 'Household' }}
                    category="standard"
                    name="household"
                    size="medium"
                  />
                </span>
              </div>
              <div className="slds-media__body">
                <div className="slds-page-header__name">
                  <div className="slds-page-header__name-title">
                    <h1>
                      <span className="slds-page-header__title slds-truncate" title={household.name}>
                        {household.name}
                      </span>
                    </h1>
                  </div>
                </div>
                <p className="slds-page-header__name-meta">
                  Household • Donor Since {household.donorSince} •
                  <span style={{ marginLeft: '8px' }}>
                    <Badge content={household.donorLevel} style={{ backgroundColor: '#fce4b8', color: '#8c4b02' }} />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="slds-page-header__col-actions">
            <div className="slds-page-header__controls">
              <div className="slds-page-header__control">
                <ButtonGroup>
                  <Button label="Log Activity" variant="neutral" />
                  <Button label="New Donation" variant="neutral" />
                  <Button label="Send Email" variant="neutral" />
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
                <div className="slds-text-title slds-truncate" title="Primary Contact">Primary Contact</div>
                <div className="slds-truncate" title={household.primaryContact}>
                  <a href="#" onClick={(e) => e.preventDefault()}>{household.primaryContact}</a>
                </div>
              </li>
              <li className="slds-page-header__detail-block">
                <div className="slds-text-title slds-truncate" title="Email">Email</div>
                <div className="slds-truncate" title={household.email}>
                  <a href={`mailto:${household.email}`}>{household.email}</a>
                </div>
              </li>
              <li className="slds-page-header__detail-block">
                <div className="slds-text-title slds-truncate" title="Phone">Phone</div>
                <div className="slds-truncate" title={household.phone}>{household.phone}</div>
              </li>
              <li className="slds-page-header__detail-block">
                <div className="slds-text-title slds-truncate" title="Address">Address</div>
                <div className="slds-truncate" title={`${household.address}, ${household.city}, ${household.state}`}>
                  {household.address}, {household.city}, {household.state} {household.zip}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giving Summary Cards */}
      <div className="slds-grid slds-gutters slds-m-bottom_medium">
        <div className="slds-col slds-size_1-of-4">
          <Card hasNoHeader>
            <div className="slds-p-around_medium" style={{ textAlign: 'center' }}>
              <p className="slds-text-title slds-text-color_weak">Lifetime Giving</p>
              <p className="slds-text-heading_large" style={{ color: '#0176d3', fontWeight: '700' }}>
                {formatCurrency(household.lifetimeGiving)}
              </p>
            </div>
          </Card>
        </div>
        <div className="slds-col slds-size_1-of-4">
          <Card hasNoHeader>
            <div className="slds-p-around_medium" style={{ textAlign: 'center' }}>
              <p className="slds-text-title slds-text-color_weak">This Year</p>
              <p className="slds-text-heading_large" style={{ color: '#2e844a', fontWeight: '700' }}>
                {formatCurrency(household.thisYearGiving)}
              </p>
              <div className="slds-m-top_x-small">
                <ProgressBar value={yearProgress} size="small" color="success" />
                <p className="slds-text-body_small slds-text-color_weak slds-m-top_xx-small">
                  {Math.round(yearProgress)}% of {formatCurrency(household.yearGoal)} goal
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="slds-col slds-size_1-of-4">
          <Card hasNoHeader>
            <div className="slds-p-around_medium" style={{ textAlign: 'center' }}>
              <p className="slds-text-title slds-text-color_weak">Last Year</p>
              <p className="slds-text-heading_large" style={{ color: '#706e6b', fontWeight: '700' }}>
                {formatCurrency(household.lastYearGiving)}
              </p>
              <p className="slds-text-body_small slds-text-color_weak slds-m-top_x-small">
                {household.thisYearGiving < household.lastYearGiving ? (
                  <span style={{ color: '#ea001e' }}>
                    <Icon category="utility" name="down" size="xx-small" style={{ fill: '#ea001e' }} />
                    {' '}{Math.round((1 - household.thisYearGiving / household.lastYearGiving) * 100)}% vs last year
                  </span>
                ) : (
                  <span style={{ color: '#2e844a' }}>
                    <Icon category="utility" name="up" size="xx-small" style={{ fill: '#2e844a' }} />
                    {' '}{Math.round((household.thisYearGiving / household.lastYearGiving - 1) * 100)}% vs last year
                  </span>
                )}
              </p>
            </div>
          </Card>
        </div>
        <div className="slds-col slds-size_1-of-4">
          <Card hasNoHeader>
            <div className="slds-p-around_medium" style={{ textAlign: 'center' }}>
              <p className="slds-text-title slds-text-color_weak">Open Pledges</p>
              <p className="slds-text-heading_large" style={{ color: '#5a1ba9', fontWeight: '700' }}>
                $30,000
              </p>
              <p className="slds-text-body_small slds-text-color_weak slds-m-top_x-small">
                1 active pledge
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Card hasNoHeader>
        <Tabs
          selectedIndex={selectedTab}
          onSelect={(index) => setSelectedTab(index)}
        >
          <TabsPanel label="Household Members">
            <div className="slds-p-around_medium">
              <div className="slds-grid slds-grid_align-end slds-m-bottom_medium">
                <Button label="Add Member" iconCategory="utility" iconName="add" iconPosition="left" />
              </div>
              <div className="slds-grid slds-wrap slds-gutters">
                {members.map((member) => (
                  <div key={member.id} className="slds-col slds-size_1-of-3 slds-m-bottom_medium">
                    <div className="slds-box slds-box_small" style={{
                      border: member.isPrimary ? '2px solid #0176d3' : '1px solid #e5e5e5',
                      borderRadius: '8px',
                      height: '100%'
                    }}>
                      <div className="slds-grid slds-grid_vertical-align-center slds-m-bottom_small">
                        <Avatar
                          variant="user"
                          size="medium"
                          label={member.name}
                        />
                        <div className="slds-m-left_small">
                          <p className="slds-text-heading_small">
                            <a href="#" onClick={(e) => e.preventDefault()}>{member.name}</a>
                          </p>
                          <p className="slds-text-body_small slds-text-color_weak">{member.role}</p>
                        </div>
                        {member.isPrimary && (
                          <Badge content="Primary" className="slds-m-left_small" style={{ backgroundColor: '#0176d3', color: '#fff' }} />
                        )}
                      </div>
                      <dl className="slds-list_horizontal slds-wrap">
                        <dt className="slds-item_label slds-text-color_weak" style={{ width: '30%' }}>Email</dt>
                        <dd className="slds-item_detail slds-truncate" style={{ width: '70%' }}>
                          <a href={`mailto:${member.email}`}>{member.email}</a>
                        </dd>
                        <dt className="slds-item_label slds-text-color_weak slds-m-top_xx-small" style={{ width: '30%' }}>Phone</dt>
                        <dd className="slds-item_detail slds-m-top_xx-small" style={{ width: '70%' }}>{member.phone}</dd>
                        <dt className="slds-item_label slds-text-color_weak slds-m-top_xx-small" style={{ width: '30%' }}>Employer</dt>
                        <dd className="slds-item_detail slds-truncate slds-m-top_xx-small" style={{ width: '70%' }}>{member.employer}</dd>
                        <dt className="slds-item_label slds-text-color_weak slds-m-top_xx-small" style={{ width: '30%' }}>Title</dt>
                        <dd className="slds-item_detail slds-m-top_xx-small" style={{ width: '70%' }}>{member.title}</dd>
                      </dl>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsPanel>

          <TabsPanel label="Donation History">
            <div className="slds-p-around_medium">
              <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_medium">
                <p className="slds-text-body_regular slds-text-color_weak">
                  Showing {donations.length} donations
                </p>
                <Button label="New Donation" iconCategory="utility" iconName="add" iconPosition="left" variant="brand" />
              </div>
              <DataTable items={donations} id="donation-table">
                <DataTableColumn label="Date" property="date" width="120px" />
                <DataTableColumn label="Amount" property="amount" width="120px">
                  <CurrencyCell />
                </DataTableColumn>
                <DataTableColumn label="Type" property="type" width="120px">
                  <DonationTypeCell />
                </DataTableColumn>
                <DataTableColumn label="Campaign" property="campaign" />
                <DataTableColumn label="Status" property="status" width="120px">
                  <StatusCell />
                </DataTableColumn>
                <DataTableColumn label="Method" property="method" width="120px" />
              </DataTable>
            </div>
          </TabsPanel>

          <TabsPanel label="Pledges">
            <div className="slds-p-around_medium">
              <div className="slds-grid slds-grid_align-end slds-m-bottom_medium">
                <Button label="New Pledge" iconCategory="utility" iconName="add" iconPosition="left" variant="brand" />
              </div>
              {pledges.map((pledge) => (
                <div key={pledge.id} className="slds-box slds-m-bottom_medium" style={{ borderLeft: pledge.status === 'Active' ? '4px solid #5a1ba9' : '4px solid #2e844a' }}>
                  <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_small">
                    <div>
                      <p className="slds-text-heading_small">{pledge.campaign}</p>
                      <p className="slds-text-body_small slds-text-color_weak">
                        {pledge.startDate} - {pledge.endDate}
                      </p>
                    </div>
                    <Badge
                      content={pledge.status}
                      style={{
                        backgroundColor: pledge.status === 'Active' ? '#e8d4f8' : '#c2f5e9',
                        color: pledge.status === 'Active' ? '#5a1ba9' : '#0e6b5e'
                      }}
                    />
                  </div>
                  <div className="slds-grid slds-gutters slds-m-bottom_small">
                    <div className="slds-col slds-size_1-of-3">
                      <p className="slds-text-title slds-text-color_weak">Total Pledged</p>
                      <p className="slds-text-heading_medium" style={{ fontWeight: '600' }}>{pledge.totalAmount}</p>
                    </div>
                    <div className="slds-col slds-size_1-of-3">
                      <p className="slds-text-title slds-text-color_weak">Paid</p>
                      <p className="slds-text-heading_medium" style={{ fontWeight: '600', color: '#2e844a' }}>{pledge.paidAmount}</p>
                    </div>
                    <div className="slds-col slds-size_1-of-3">
                      <p className="slds-text-title slds-text-color_weak">Balance</p>
                      <p className="slds-text-heading_medium" style={{ fontWeight: '600', color: pledge.balance === '$0' ? '#2e844a' : '#ea001e' }}>{pledge.balance}</p>
                    </div>
                  </div>
                  <ProgressBar
                    value={(parseInt(pledge.paidAmount.replace(/[$,]/g, '')) / parseInt(pledge.totalAmount.replace(/[$,]/g, ''))) * 100}
                    size="small"
                    color={pledge.status === 'Fulfilled' ? 'success' : undefined}
                  />
                </div>
              ))}
            </div>
          </TabsPanel>

          <TabsPanel label="Activities">
            <div className="slds-p-around_medium">
              <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center slds-m-bottom_medium">
                <p className="slds-text-body_regular slds-text-color_weak">
                  Recent activities and interactions
                </p>
                <Button label="Log Activity" iconCategory="utility" iconName="add" iconPosition="left" />
              </div>
              <ul className="slds-timeline">
                {activities.map((activity, index) => {
                  const iconMap = {
                    'Email': { name: 'email', color: '#0176d3' },
                    'Meeting': { name: 'event', color: '#7f8de1' },
                    'Call': { name: 'call', color: '#2e844a' },
                    'Event': { name: 'date_time', color: '#fe9339' },
                    'Task': { name: 'task', color: '#706e6b' },
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
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      </div>
                      {index < activities.length - 1 && (
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
          </TabsPanel>

          <TabsPanel label="Communication">
            <div className="slds-p-around_medium">
              <div className="slds-grid slds-gutters">
                <div className="slds-col slds-size_1-of-2">
                  <div className="slds-box">
                    <p className="slds-text-heading_small slds-m-bottom_medium">Preferences</p>
                    <dl className="slds-list_horizontal slds-wrap">
                      <dt className="slds-item_label slds-text-color_weak" style={{ width: '40%' }}>Preferred Method</dt>
                      <dd className="slds-item_detail" style={{ width: '60%' }}>{household.preferredContact}</dd>
                      <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Do Not Call</dt>
                      <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>No</dd>
                      <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Do Not Email</dt>
                      <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>No</dd>
                      <dt className="slds-item_label slds-text-color_weak slds-m-top_small" style={{ width: '40%' }}>Do Not Mail</dt>
                      <dd className="slds-item_detail slds-m-top_small" style={{ width: '60%' }}>No</dd>
                    </dl>
                  </div>
                </div>
                <div className="slds-col slds-size_1-of-2">
                  <div className="slds-box">
                    <p className="slds-text-heading_small slds-m-bottom_medium">Subscriptions</p>
                    <ul>
                      {household.communicationPrefs.map((pref) => (
                        <li key={pref} className="slds-p-vertical_xx-small">
                          <Icon category="utility" name="check" size="x-small" style={{ fill: '#2e844a', marginRight: '8px' }} />
                          {pref}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="slds-box slds-m-top_medium">
                <p className="slds-text-heading_small slds-m-bottom_medium">Tags</p>
                <div className="slds-grid slds-wrap" style={{ gap: '8px' }}>
                  {household.tags.map((tag) => (
                    <Badge key={tag} content={tag} style={{ backgroundColor: '#f3f3f3', color: '#181818' }} />
                  ))}
                  <Button
                    iconCategory="utility"
                    iconName="add"
                    variant="icon"
                    iconSize="small"
                    assistiveText={{ icon: 'Add Tag' }}
                  />
                </div>
              </div>
            </div>
          </TabsPanel>
        </Tabs>
      </Card>
    </div>
  );
};

export default DonorHousehold;
