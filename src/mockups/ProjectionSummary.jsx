import React, { useState, useMemo } from 'react';
import Icon from '@salesforce/design-system-react/components/icon';
import Button from '@salesforce/design-system-react/components/button';

const ProjectionSummary = () => {
  const projections = useMemo(() => [
    {
      id: 1,
      year: 2026,
      projectedAmount: 250000,
      confidence: 85,
      installments: [
        { id: 101, expectedDate: '2026-01-15', amount: 50000, received: true, receivedDate: '2026-01-14', receivedAmount: 50000 },
        { id: 102, expectedDate: '2026-03-15', amount: 50000, received: true, receivedDate: '2026-03-16', receivedAmount: 48500 },
        { id: 103, expectedDate: '2026-06-15', amount: 50000, received: false, receivedDate: null, receivedAmount: null },
        { id: 104, expectedDate: '2026-09-15', amount: 50000, received: false, receivedDate: null, receivedAmount: null },
        { id: 105, expectedDate: '2026-12-15', amount: 50000, received: false, receivedDate: null, receivedAmount: null },
      ],
    },
    {
      id: 2,
      year: 2025,
      projectedAmount: 200000,
      confidence: 100,
      installments: [
        { id: 201, expectedDate: '2025-01-15', amount: 50000, received: true, receivedDate: '2025-01-15', receivedAmount: 50000 },
        { id: 202, expectedDate: '2025-04-15', amount: 50000, received: true, receivedDate: '2025-04-14', receivedAmount: 50000 },
        { id: 203, expectedDate: '2025-07-15', amount: 50000, received: true, receivedDate: '2025-07-16', receivedAmount: 50000 },
        { id: 204, expectedDate: '2025-10-15', amount: 50000, received: true, receivedDate: '2025-10-15', receivedAmount: 50000 },
      ],
    },
    {
      id: 3,
      year: 2027,
      projectedAmount: 300000,
      confidence: 50,
      installments: [
        { id: 301, expectedDate: '2027-03-01', amount: 100000, received: false, receivedDate: null, receivedAmount: null },
        { id: 302, expectedDate: '2027-06-01', amount: 100000, received: false, receivedDate: null, receivedAmount: null },
        { id: 303, expectedDate: '2027-09-01', amount: 100000, received: false, receivedDate: null, receivedAmount: null },
      ],
    },
    {
      id: 4,
      year: 2024,
      projectedAmount: 180000,
      confidence: 90,
      installments: [
        { id: 401, expectedDate: '2024-03-15', amount: 45000, received: true, receivedDate: '2024-03-14', receivedAmount: 45000 },
        { id: 402, expectedDate: '2024-06-15', amount: 45000, received: true, receivedDate: '2024-06-20', receivedAmount: 45000 },
        { id: 403, expectedDate: '2024-09-15', amount: 45000, received: true, receivedDate: '2024-09-15', receivedAmount: 40000 },
        { id: 404, expectedDate: '2024-12-15', amount: 45000, received: false, receivedDate: null, receivedAmount: null },
      ],
    },
  ], []);

  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const formatCurrency = (value) => {
    if (value == null) return '—';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTotalReceived = (projection) =>
    projection.installments
      .filter((i) => i.received)
      .reduce((sum, i) => sum + (i.receivedAmount || 0), 0);

  const getWeightedProjection = (projection) =>
    Math.round(projection.projectedAmount * (projection.confidence / 100));

  const getProgressPercent = (projection) => {
    const received = getTotalReceived(projection);
    return Math.min(100, Math.round((received / projection.projectedAmount) * 100));
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#2e844a';
    if (confidence >= 50) return '#fe9339';
    return '#c23934';
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getInstallmentStatus = (installment) => {
    if (installment.received && installment.receivedAmount >= installment.amount) return 'Fully Fulfilled';
    if (installment.received) return 'Partially Fulfilled';
    const expected = new Date(installment.expectedDate + 'T00:00:00');
    if (expected < today) return 'Overdue';
    return 'Not Started';
  };

  const getProjectionStatus = (projection) => {
    const allFulfilled = projection.installments.every((i) => i.received && i.receivedAmount >= i.amount);
    if (allFulfilled) return 'Fully Fulfilled';
    const anyReceived = projection.installments.some((i) => i.received);
    if (anyReceived) return 'Partially Fulfilled';
    return 'Not Started';
  };

  const statusColors = {
    'Fully Fulfilled': { bg: '#e6f4ea', color: '#2e844a' },
    'Partially Fulfilled': { bg: '#fef3e8', color: '#fe9339' },
    'Not Started': { bg: '#f0f0f0', color: '#706e6b' },
    'Overdue': { bg: '#fde8e8', color: '#c23934' },
  };

  const StatusPill = ({ status }) => {
    const colors = statusColors[status];
    return (
      <span style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '700',
        backgroundColor: colors.bg,
        color: colors.color,
        whiteSpace: 'nowrap',
      }}>
        {status}
      </span>
    );
  };

  const ComponentCard = ({ title, children, icon, actions }) => (
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
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && <Icon category="utility" name={icon} size="small" />}
          <h3 className="slds-text-heading_small" style={{ margin: 0 }}>{title}</h3>
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );

  const ProjectionRow = ({ projection }) => {
    const isExpanded = expandedIds.includes(projection.id);
    const totalReceived = getTotalReceived(projection);
    const weightedProjection = getWeightedProjection(projection);
    const progressPercent = getProgressPercent(projection);
    const confidenceColor = getConfidenceColor(projection.confidence);

    return (
      <div style={{
        border: '1px solid #dddbda',
        borderRadius: '4px',
        marginBottom: '8px',
        overflow: 'hidden',
      }}>
        {/* Collapsed View / Header */}
        <div
          onClick={() => toggleExpand(projection.id)}
          style={{
            padding: '12px 16px',
            cursor: 'pointer',
            backgroundColor: isExpanded ? '#f3f3f3' : 'white',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => { if (!isExpanded) e.currentTarget.style.backgroundColor = '#f9f9f9'; }}
          onMouseLeave={(e) => { if (!isExpanded) e.currentTarget.style.backgroundColor = 'white'; }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Icon
              category="utility"
              name={isExpanded ? 'chevrondown' : 'chevronright'}
              size="x-small"
              style={{ flexShrink: 0 }}
            />
            <span style={{ fontWeight: '700', fontSize: '15px', color: '#181818' }}>
              {projection.year} Projection
            </span>
            <StatusPill status={getProjectionStatus(projection)} />
          </div>

          {/* Summary Fields */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '12px',
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', fontWeight: '600', marginBottom: '2px' }}>
                Projected Amount
              </div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#181818' }}>
                {formatCurrency(projection.projectedAmount)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', fontWeight: '600', marginBottom: '2px' }}>
                Confidence
              </div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: confidenceColor }}>
                {projection.confidence}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', fontWeight: '600', marginBottom: '2px' }}>
                Total Received
              </div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#2e844a' }}>
                {formatCurrency(totalReceived)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', color: '#706e6b' }}>
                {formatCurrency(totalReceived)} of {formatCurrency(projection.projectedAmount)}
              </span>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#706e6b' }}>
                {progressPercent}%
              </span>
            </div>
            <div style={{
              height: '8px',
              backgroundColor: '#e5e5e5',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                backgroundColor: progressPercent >= 100 ? '#2e844a' : '#0176d3',
                borderRadius: '4px',
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Expanded View - Installments */}
        {isExpanded && (
          <div style={{ borderTop: '1px solid #dddbda', padding: '16px', backgroundColor: 'white' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#181818', marginBottom: '12px' }}>
              Projection Installments ({projection.installments.length})
            </h4>

            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr 1fr',
              gap: '8px',
              padding: '8px 12px',
              backgroundColor: '#fafaf9',
              borderRadius: '4px 4px 0 0',
              borderBottom: '1px solid #dddbda',
            }}>
              {['Expected Date', 'Amount', 'Status', 'Received Date', 'Received Amount'].map((header) => (
                <div key={header} style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#706e6b',
                  textTransform: 'uppercase',
                }}>
                  {header}
                </div>
              ))}
            </div>

            {/* Installment Rows */}
            {projection.installments.map((installment, idx) => (
              <div
                key={installment.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 0.8fr 1fr 1fr',
                  gap: '8px',
                  padding: '10px 12px',
                  alignItems: 'center',
                  borderBottom: idx < projection.installments.length - 1 ? '1px solid #f0f0f0' : 'none',
                }}
              >
                <div style={{ fontSize: '13px', color: '#181818' }}>
                  {formatDate(installment.expectedDate)}
                </div>
                <div style={{ fontSize: '13px', color: '#181818' }}>
                  {formatCurrency(installment.amount)}
                </div>
                <div>
                  <StatusPill status={getInstallmentStatus(installment)} />
                </div>
                <div style={{ fontSize: '13px', color: installment.receivedDate ? '#181818' : '#b0adab' }}>
                  {formatDate(installment.receivedDate)}
                </div>
                <div style={{ fontSize: '13px', fontWeight: installment.receivedAmount ? '600' : '400', color: installment.receivedAmount ? '#2e844a' : '#b0adab' }}>
                  {formatCurrency(installment.receivedAmount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <ComponentCard
          title="Projection Summary"
          icon="graph"
          actions={
            <Button
              label="New Projection"
              variant="neutral"
              iconCategory="utility"
              iconName="add"
              iconPosition="left"
            />
          }
        >
          {/* Projection Rows */}
          {projections.map((projection) => (
            <ProjectionRow key={projection.id} projection={projection} />
          ))}

          {/* Summary Footer */}
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            backgroundColor: '#fafaf9',
            borderRadius: '4px',
            border: '1px solid #dddbda',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#181818' }}>
              All Projections Total
            </span>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', fontWeight: '600' }}>Projected</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#181818' }}>
                  {formatCurrency(projections.reduce((sum, p) => sum + p.projectedAmount, 0))}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', fontWeight: '600' }}>Received</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#2e844a' }}>
                  {formatCurrency(projections.reduce((sum, p) => sum + getTotalReceived(p), 0))}
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
};

export default ProjectionSummary;
