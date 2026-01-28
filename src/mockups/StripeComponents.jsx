import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Icon from '@salesforce/design-system-react/components/icon';
import Badge from '@salesforce/design-system-react/components/badge';
import Input from '@salesforce/design-system-react/components/input';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';

// Component Card wrapper with blue border (matching SAP components style)
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
          <Icon category="utility" name={icon} size="small" style={{ fill: '#0176d3' }} />
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

const StripeComponents = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false);
  const [newPaymentMethodType, setNewPaymentMethodType] = useState('card');

  // Card brand logo component
  const CardBrandLogo = ({ brand }) => {
    const brandStyles = {
      Visa: { backgroundColor: '#1434CB', text: 'VISA' },
      Mastercard: { backgroundColor: '#EB001B', text: 'MC' },
      Amex: { backgroundColor: '#006FCF', text: 'AMEX' },
      Discover: { backgroundColor: '#FF6000', text: 'DISC' }
    };

    const style = brandStyles[brand] || { backgroundColor: '#706e6b', text: brand.toUpperCase() };

    return (
      <div style={{
        backgroundColor: style.backgroundColor,
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        minWidth: '45px',
        textAlign: 'center'
      }}>
        {style.text}
      </div>
    );
  };

  // Sample Stripe payment data
  const paymentInfo = {
    amount: 125000.00,
    currency: 'USD',
    status: 'succeeded',
    paymentIntentId: 'pi_3QRtX2D9u4qY8iKz1nJ2gH5v',
    customerId: 'cus_R8pL3mK9tQw2Xy',
    paymentMethod: 'Visa •••• 4242',
    created: '2026-01-15 10:23:45',
    description: 'Payment for Opportunity OPP-2026-001234'
  };

  // Payment methods on file
  const paymentMethods = [
    {
      id: 'pm_1QRtX2D9u4qY8iKz',
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expMonth: '12',
      expYear: '2027',
      isDefault: true,
      isExpired: false
    },
    {
      id: 'pm_2QRtW9D9u4qY8iKz',
      type: 'card',
      brand: 'Mastercard',
      last4: '5555',
      expMonth: '08',
      expYear: '2026',
      isDefault: false,
      isExpired: false
    },
    {
      id: 'pm_4QRtU3D9u4qY8iKz',
      type: 'card',
      brand: 'Amex',
      last4: '1005',
      expMonth: '03',
      expYear: '2028',
      isDefault: false,
      isExpired: false
    },
    {
      id: 'pm_5QRtT1D9u4qY8iKz',
      type: 'card',
      brand: 'Discover',
      last4: '6011',
      expMonth: '11',
      expYear: '2025',
      isDefault: false,
      isExpired: true
    },
    {
      id: 'pm_3QRtV5D9u4qY8iKz',
      type: 'bank_account',
      bank: 'Chase',
      last4: '6789',
      accountType: 'checking',
      isDefault: false,
      isExpired: false
    }
  ];

  // Subscriptions
  const subscriptions = [
    {
      id: 'sub_1QRtX2D9u4qY8iKz',
      status: 'active',
      product: 'Premium Support Plan',
      interval: 'Monthly',
      amount: 299.00,
      lastCharge: '2026-01-01',
      nextCharge: '2026-02-01',
      paymentMethod: 'Visa •••• 4242',
      paymentMethodBrand: 'Visa'
    },
    {
      id: 'sub_2QRtW9D9u4qY8iKz',
      status: 'active',
      product: 'API Access - Enterprise',
      interval: 'Yearly',
      amount: 12000.00,
      lastCharge: '2025-12-15',
      nextCharge: '2026-12-15',
      paymentMethod: 'Mastercard •••• 5555',
      paymentMethodBrand: 'Mastercard'
    },
    {
      id: 'sub_3QRtV5D9u4qY8iKz',
      status: 'active',
      product: 'Data Storage Add-on',
      interval: 'Monthly',
      amount: 149.00,
      lastCharge: '2026-01-10',
      nextCharge: '2026-02-10',
      paymentMethod: 'ACH •••• 6789',
      paymentMethodBrand: null
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      succeeded: { label: 'Succeeded', color: 'success' },
      paid: { label: 'Paid', color: 'success' },
      active: { label: 'Active', color: 'success' },
      pending: { label: 'Pending', color: 'warning' },
      open: { label: 'Open', color: 'warning' },
      failed: { label: 'Failed', color: 'error' },
      refunded: { label: 'Refunded', color: 'default' },
      canceled: { label: 'Canceled', color: 'default' }
    };

    const config = statusConfig[status] || { label: status, color: 'default' };
    return <Badge content={config.label} color={config.color} />;
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#080707' }}>
          Stripe Components for Opportunity
        </h1>

        {/* Payment Information Component */}
        <ComponentCard
          title="Stripe Payment Information"
          icon="currency"
          label="STRIPE"
          actions={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                label="View in Stripe"
                variant="outline-brand"
                iconCategory="utility"
                iconName="new_window"
                iconPosition="right"
              />
              <Button
                label="Refund Charge"
                variant="destructive"
                iconCategory="utility"
                iconName="undo"
                iconPosition="left"
              />
            </div>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Payment Intent
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#080707' }}>
                {paymentInfo.paymentIntentId}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Customer ID
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#080707' }}>
                {paymentInfo.customerId}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Status
              </div>
              <div>{getStatusBadge(paymentInfo.status)}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Amount
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#080707' }}>
                {formatCurrency(paymentInfo.amount)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Payment Method
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CardBrandLogo brand="Visa" />
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#080707' }}>
                  •••• 4242
                </span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
                Created
              </div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#080707' }}>
                {paymentInfo.created}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e5e5' }}>
            <div style={{ fontSize: '11px', color: '#706e6b', textTransform: 'uppercase', marginBottom: '4px' }}>
              Description
            </div>
            <div style={{ fontSize: '14px', color: '#3e3e3c' }}>
              {paymentInfo.description}
            </div>
          </div>
        </ComponentCard>

        {/* Payment Methods Component */}
        <ComponentCard
          title="Payment Methods"
          icon="adduser"
          label="STRIPE"
          actions={
            !isAddingPaymentMethod && (
              <Button
                label="Add Payment Method"
                variant="brand"
                iconCategory="utility"
                iconName="add"
                iconPosition="left"
                onClick={() => setIsAddingPaymentMethod(true)}
              />
            )
          }
        >
          {!isAddingPaymentMethod ? (
            <div style={{ display: 'grid', gap: '12px' }}>
              {paymentMethods.map((method) => (
              <div
                key={method.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  border: '1px solid #dddbda',
                  borderRadius: '4px',
                  backgroundColor: method.isExpired ? '#ffebeb' : method.isDefault ? '#ecfaec' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {method.type === 'card' ? (
                    <CardBrandLogo brand={method.brand} />
                  ) : (
                    <div style={{
                      backgroundColor: '#706e6b',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.5px',
                      minWidth: '45px',
                      textAlign: 'center'
                    }}>
                      ACH
                    </div>
                  )}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '600', fontSize: '14px' }}>
                        {method.type === 'card' ? `•••• ${method.last4}` : `${method.bank} •••• ${method.last4}`}
                      </span>
                      {method.isDefault && (
                        <Badge content="Default" color="success" />
                      )}
                      {method.isExpired && (
                        <Badge content="Expired" color="error" />
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: method.isExpired ? '#ea001e' : '#706e6b', marginTop: '4px' }}>
                      {method.type === 'card'
                        ? `Expires ${method.expMonth}/${method.expYear}`
                        : method.accountType.charAt(0).toUpperCase() + method.accountType.slice(1)
                      }
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {!method.isDefault && (
                    <Button label="Set as Default" variant="neutral" />
                  )}
                  <Button
                    iconCategory="utility"
                    iconName="delete"
                    iconVariant="border"
                    variant="icon"
                    iconStyle={{ fill: '#ea001e' }}
                  />
                </div>
              </div>
            ))}
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#080707' }}>
                  Add New Payment Method
                </h3>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <Button
                    label="Credit/Debit Card"
                    variant={newPaymentMethodType === 'card' ? 'brand' : 'neutral'}
                    onClick={() => setNewPaymentMethodType('card')}
                  />
                  <Button
                    label="Bank Account (ACH)"
                    variant={newPaymentMethodType === 'bank' ? 'brand' : 'neutral'}
                    onClick={() => setNewPaymentMethodType('bank')}
                  />
                </div>
              </div>

              {newPaymentMethodType === 'card' ? (
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        Card Number
                      </label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        Cardholder Name
                      </label>
                      <Input
                        placeholder="John Doe"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        Expiration Month
                      </label>
                      <Input
                        placeholder="MM"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        Expiration Year
                      </label>
                      <Input
                        placeholder="YYYY"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        CVV
                      </label>
                      <Input
                        placeholder="123"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        Billing ZIP Code
                      </label>
                      <Input
                        placeholder="12345"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="checkbox" />
                        <span style={{ fontSize: '12px', color: '#080707' }}>Set as default payment method</span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        Account Holder Name
                      </label>
                      <Input
                        placeholder="John Doe"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        Account Type
                      </label>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <Button label="Checking" variant="brand" />
                        <Button label="Savings" variant="neutral" />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        Routing Number
                      </label>
                      <Input
                        placeholder="110000000"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px', color: '#080707' }}>
                        Account Number
                      </label>
                      <Input
                        placeholder="000123456789"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" />
                      <span style={{ fontSize: '12px', color: '#080707' }}>Set as default payment method</span>
                    </label>
                  </div>
                </div>
              )}

              <div style={{
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid #e5e5e5',
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <Button
                  label="Cancel"
                  variant="neutral"
                  onClick={() => setIsAddingPaymentMethod(false)}
                />
                <Button
                  label="Save Payment Method"
                  variant="brand"
                  iconCategory="utility"
                  iconName="check"
                  iconPosition="left"
                />
              </div>
            </div>
          )}
        </ComponentCard>

        {/* Subscriptions Component */}
        <ComponentCard
          title="Subscriptions"
          icon="recurring_exception"
          label="STRIPE"
          actions={
            <Button
              label="Create Subscription"
              variant="brand"
              iconCategory="utility"
              iconName="add"
              iconPosition="left"
            />
          }
        >
          <div style={{ display: 'grid', gap: '12px' }}>
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  border: '1px solid #dddbda',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.2s',
                  minHeight: '72px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <Icon
                    category="utility"
                    name="bundle_config"
                    size="small"
                    style={{ fill: '#0176d3' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '600', fontSize: '14px' }}>
                        {subscription.product}
                      </span>
                      {getStatusBadge(subscription.status)}
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '16px',
                      fontSize: '12px'
                    }}>
                      <div>
                        <div style={{ color: '#706e6b' }}>Interval: <span style={{ fontWeight: '600', color: '#080707' }}>{subscription.interval}</span></div>
                      </div>
                      <div>
                        <div style={{ color: '#706e6b' }}>Amount: <span style={{ fontWeight: '600', color: '#080707' }}>{formatCurrency(subscription.amount)}</span></div>
                      </div>
                      <div>
                        <div style={{ color: '#706e6b' }}>Last: <span style={{ fontWeight: '600', color: '#080707' }}>{subscription.lastCharge}</span></div>
                      </div>
                      <div>
                        <div style={{ color: '#706e6b' }}>Next: <span style={{ fontWeight: '600', color: '#0176d3' }}>{subscription.nextCharge}</span></div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {subscription.paymentMethodBrand ? (
                          <>
                            <CardBrandLogo brand={subscription.paymentMethodBrand} />
                            <span style={{ fontWeight: '600', fontSize: '11px' }}>
                              {subscription.paymentMethod.replace(/^(Visa|Mastercard|Amex|Discover)\s*/, '')}
                            </span>
                          </>
                        ) : (
                          <>
                            <div style={{
                              backgroundColor: '#706e6b',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: '700',
                              letterSpacing: '0.5px',
                              minWidth: '45px',
                              textAlign: 'center'
                            }}>
                              ACH
                            </div>
                            <span style={{ fontWeight: '600', fontSize: '11px' }}>
                              {subscription.paymentMethod.replace('ACH ', '')}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    label="Manage"
                    variant="neutral"
                    iconCategory="utility"
                    iconName="settings"
                    iconPosition="left"
                  />
                  {subscription.status === 'active' && (
                    <Button
                      label="Cancel"
                      variant="destructive"
                      iconCategory="utility"
                      iconName="ban"
                      iconPosition="left"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>

      </div>
    </div>
  );
};

export default StripeComponents;
