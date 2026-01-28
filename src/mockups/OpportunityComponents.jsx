import React from 'react';
import Icon from '@salesforce/design-system-react/components/icon';
import Button from '@salesforce/design-system-react/components/button';
import Badge from '@salesforce/design-system-react/components/badge';

// Component Card wrapper with blue border
const ComponentCard = ({ title, children, icon, actions, label }) => (
  <div style={{
    backgroundColor: 'white',
    border: '2px solid #0176d3',
    borderRadius: '4px',
    padding: '20px',
    marginBottom: '24px',
    position: 'relative'
  }}>
    {label && (
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
        {label}
      </div>
    )}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon && (
          <Icon category="standard" name={icon} size="small" />
        )}
        <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#080707' }}>
          {title}
        </h2>
      </div>
      {actions && <div>{actions}</div>}
    </div>
    {children}
  </div>
);

const OpportunityComponents = () => {
  // Campaign data
  const campaignData = {
    name: 'Q1 2026 Enterprise Outreach',
    parentCampaign: 'Annual Enterprise Program',
    type: 'Email',
    status: 'In Progress',
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    totalContacts: 1247,
    totalLeads: 892,
    convertedLeads: 156,
    totalOpportunities: 43,
    wonOpportunities: 12,
    expectedRevenue: 2450000.00,
    actualRevenue: 875000.00,
    budgetedCost: 125000.00,
    actualCost: 98750.00,
    description: 'Strategic enterprise outreach campaign targeting Fortune 1000 companies with our new product suite.',
    thisOpportunityAmount: 125000.00  // This specific opportunity's value
  };

  const opportunityPercentage = (campaignData.thisOpportunityAmount / campaignData.actualRevenue) * 100;
  const otherOpportunitiesAmount = campaignData.actualRevenue - campaignData.thisOpportunityAmount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'In Progress': { color: 'warning' },
      'Completed': { color: 'success' },
      'Planned': { color: 'default' },
      'Aborted': { color: 'error' }
    };

    const config = statusConfig[status] || { color: 'default' };
    return <Badge content={status} color={config.color} />;
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#080707' }}>
          Opportunity Components
        </h1>

        {/* Campaign Information Component */}
        <ComponentCard
          title={campaignData.name}
          icon="campaign"
          label="CAMPAIGN"
          actions={
            <Button
              label="View Campaign"
              variant="outline-brand"
              iconCategory="utility"
              iconName="new_window"
              iconPosition="right"
            />
          }
        >
          {/* Parent Campaign */}
          {campaignData.parentCampaign && (
            <div style={{
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e5e5e5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon
                  category="utility"
                  name="link"
                  size="x-small"
                  style={{ fill: '#706e6b' }}
                />
                <span style={{ fontSize: '12px', color: '#706e6b' }}>Parent Campaign:</span>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#0176d3' }}>
                  {campaignData.parentCampaign}
                </span>
              </div>
            </div>
          )}

          {/* Campaign Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Type
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#080707' }}>
                {campaignData.type}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Status
              </div>
              <div>{getStatusBadge(campaignData.status)}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Campaign Period
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#080707' }}>
                {campaignData.startDate} - {campaignData.endDate}
              </div>
            </div>
          </div>

          {/* Key Performance Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '16px',
              backgroundColor: '#f3f9ff',
              borderRadius: '4px',
              border: '1px solid #d8e6fe'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '6px', textTransform: 'uppercase' }}>
                Opportunities
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#0176d3' }}>
                {campaignData.totalOpportunities}
              </div>
              <div style={{ fontSize: '12px', color: '#2e844a', fontWeight: '600', marginTop: '4px' }}>
                {campaignData.wonOpportunities} Won ({((campaignData.wonOpportunities / campaignData.totalOpportunities) * 100).toFixed(0)}%)
              </div>
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: '#f0f9f2',
              borderRadius: '4px',
              border: '1px solid #c9e7cd'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '6px', textTransform: 'uppercase', textAlign: 'center' }}>
                Revenue Generated
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#2e844a', textAlign: 'center' }}>
                {formatCurrency(campaignData.actualRevenue)}
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px', textAlign: 'center', marginBottom: '12px' }}>
                of {formatCurrency(campaignData.expectedRevenue)} expected
              </div>

              {/* Revenue Breakdown */}
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #c9e7cd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#2e844a', fontWeight: '600' }}>This Opportunity</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#2e844a' }}>
                    {formatCurrency(campaignData.thisOpportunityAmount)}
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  backgroundColor: '#e8f5e9',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '6px'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${opportunityPercentage}%`,
                    backgroundColor: '#2e844a',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#706e6b' }}>
                  <span>{opportunityPercentage.toFixed(1)}% of campaign revenue</span>
                  <span>Other: {formatCurrency(otherOpportunitiesAmount)}</span>
                </div>
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '16px',
              backgroundColor: '#fef8f3',
              borderRadius: '4px',
              border: '1px solid #fedfc7'
            }}>
              <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '6px', textTransform: 'uppercase' }}>
                Campaign ROI
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#2e844a' }}>
                {(((campaignData.actualRevenue - campaignData.actualCost) / campaignData.actualCost) * 100).toFixed(0)}%
              </div>
              <div style={{ fontSize: '12px', color: '#706e6b', marginTop: '4px' }}>
                Cost: {formatCurrency(campaignData.actualCost)}
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
};

export default OpportunityComponents;
