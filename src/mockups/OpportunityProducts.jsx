import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Card from '@salesforce/design-system-react/components/card';
import Checkbox from '@salesforce/design-system-react/components/checkbox';
import Icon from '@salesforce/design-system-react/components/icon';
import Input from '@salesforce/design-system-react/components/input';
import ProgressIndicator from '@salesforce/design-system-react/components/progress-indicator';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Combobox from '@salesforce/design-system-react/components/combobox';
import Badge from '@salesforce/design-system-react/components/badge';
import Alert from '@salesforce/design-system-react/components/alert';
import Dropdown from '@salesforce/design-system-react/components/menu-dropdown';

const OpportunityProductsMockup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [lineItems, setLineItems] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample product data with inventory and ATP information
  const products = [
    {
      id: 'P001',
      name: 'Industrial Valve - Model X200',
      code: 'IV-X200',
      sapCode: 'SAP-IV-200',
      family: 'Industrial Valves',
      description: 'Heavy-duty industrial valve for high-pressure systems',
      active: true,
      inventory: {
        totalOnHand: 245,
        orderedByCustomers: 120,
        orderedFromVendors: 50,
        warehouses: [
          { name: 'Warehouse A - Seattle', available: 125, allocated: 45, leadTime: '2 days' },
          { name: 'Warehouse B - Phoenix', available: 80, allocated: 35, leadTime: '3 days' },
          { name: 'Warehouse C - Atlanta', available: 40, allocated: 40, leadTime: '5 days' }
        ],
        batches: [
          { number: 'BATCH-2024-001', expiration: '2026-06-15', quantity: 100, status: 'Good' },
          { number: 'BATCH-2024-002', expiration: '2025-03-20', quantity: 80, status: 'Short Expiration' },
          { number: 'BATCH-2024-003', expiration: '2027-01-10', quantity: 65, status: 'Good' }
        ]
      },
      defaultATP: 'Available to Ship',
      stockLevel: 'high'
    },
    {
      id: 'P002',
      name: 'Pressure Sensor - PS-500',
      code: 'PS-500',
      sapCode: 'SAP-PS-500',
      family: 'Sensors',
      description: 'High-precision pressure sensor for industrial applications',
      active: true,
      inventory: {
        totalOnHand: 45,
        orderedByCustomers: 80,
        orderedFromVendors: 100,
        warehouses: [
          { name: 'Warehouse A - Seattle', available: 25, allocated: 20, leadTime: '2 days' },
          { name: 'Warehouse B - Phoenix', available: 15, allocated: 10, leadTime: '3 days' },
          { name: 'Warehouse C - Atlanta', available: 5, allocated: 5, leadTime: '7 days' }
        ],
        batches: [
          { number: 'BATCH-2024-PS-001', expiration: '2025-02-28', quantity: 30, status: 'Short Expiration' },
          { number: 'BATCH-2024-PS-002', expiration: '2026-08-15', quantity: 15, status: 'Good' }
        ]
      },
      defaultATP: 'In Stock – Expiration Short',
      stockLevel: 'low'
    },
    {
      id: 'P003',
      name: 'Control Panel - CP-1000',
      code: 'CP-1000',
      sapCode: 'SAP-CP-1000',
      family: 'Control Systems',
      description: 'Advanced control panel with digital display',
      active: true,
      inventory: {
        totalOnHand: 8,
        orderedByCustomers: 25,
        orderedFromVendors: 0,
        warehouses: [
          { name: 'Warehouse A - Seattle', available: 5, allocated: 5, leadTime: '2 days' },
          { name: 'Warehouse B - Phoenix', available: 3, allocated: 2, leadTime: '4 days' },
          { name: 'Warehouse C - Atlanta', available: 0, allocated: 0, leadTime: 'N/A' }
        ],
        batches: [
          { number: 'BATCH-2024-CP-001', expiration: 'N/A', quantity: 8, status: 'Good' }
        ]
      },
      defaultATP: 'Needs Production',
      stockLevel: 'critical'
    },
    {
      id: 'P004',
      name: 'Flow Meter - FM-750',
      code: 'FM-750',
      sapCode: 'SAP-FM-750',
      family: 'Meters',
      description: 'Digital flow meter with remote monitoring capability',
      active: true,
      inventory: {
        totalOnHand: 0,
        orderedByCustomers: 15,
        orderedFromVendors: 0,
        warehouses: [
          { name: 'Warehouse A - Seattle', available: 0, allocated: 0, leadTime: 'N/A' },
          { name: 'Warehouse B - Phoenix', available: 0, allocated: 0, leadTime: 'N/A' },
          { name: 'Warehouse C - Atlanta', available: 0, allocated: 0, leadTime: 'N/A' }
        ],
        batches: []
      },
      defaultATP: 'Needs Raw Materials',
      stockLevel: 'out'
    },
    {
      id: 'P005',
      name: 'Safety Valve - SV-300',
      code: 'SV-300',
      sapCode: 'SAP-SV-300',
      family: 'Safety Equipment',
      description: 'Pressure relief safety valve with automatic shutoff',
      active: true,
      inventory: {
        totalOnHand: 0,
        orderedByCustomers: 45,
        orderedFromVendors: 0,
        warehouses: [
          { name: 'Warehouse A - Seattle', available: 0, allocated: 0, leadTime: 'N/A' },
          { name: 'Warehouse B - Phoenix', available: 0, allocated: 0, leadTime: 'N/A' },
          { name: 'Warehouse C - Atlanta', available: 0, allocated: 0, leadTime: 'N/A' }
        ],
        batches: []
      },
      defaultATP: 'Backordered / Not Available',
      stockLevel: 'out'
    }
  ];

  const atpStatuses = [
    { id: 'available', label: 'Available to Ship', value: 'Available to Ship' },
    { id: 'expiration-short', label: 'In Stock – Expiration Short', value: 'In Stock – Expiration Short' },
    { id: 'needs-production', label: 'Needs Production', value: 'Needs Production' },
    { id: 'needs-materials', label: 'Needs Raw Materials', value: 'Needs Raw Materials' },
    { id: 'backordered', label: 'Backordered / Not Available', value: 'Backordered / Not Available' }
  ];

  const steps = [
    { id: 0, label: 'Search Products' },
    { id: 1, label: 'View Inventory' },
    { id: 2, label: 'Configure Items' },
    { id: 3, label: 'Review' }
  ];

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getStockLevelBadge = (level) => {
    const configs = {
      high: { color: 'success', label: 'In Stock' },
      low: { color: 'warning', label: 'Low Stock' },
      critical: { color: 'error', label: 'Critical' },
      out: { color: 'light', label: 'Out of Stock' }
    };
    const config = configs[level] || configs.low;
    return <Badge color={config.color} content={config.label} />;
  };

  const getATPBadgeColor = (atp) => {
    if (atp === 'Available to Ship') return 'success';
    if (atp === 'In Stock – Expiration Short') return 'warning';
    if (atp === 'Needs Production') return 'default';
    if (atp === 'Needs Raw Materials') return 'warning';
    return 'error';
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = searchTerm === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sapCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.family === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Step 0: Product Search Screen
  const ProductSearchScreen = () => (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="slds-text-heading_medium" style={{ marginBottom: '8px' }}>
          Search and Select Products
        </h2>
        <p className="slds-text-body_regular" style={{ color: '#706e6b' }}>
          Find products to add to your opportunity. Select one or more products to continue.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '16px', marginBottom: '16px' }}>
            <Input
              label="Search Products"
              placeholder="Search by name, product code, or SAP code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              iconRight={
                <Icon category="utility" name="search" size="x-small" style={{ fill: '#706e6b' }} />
              }
            />
            <div>
              <label className="slds-form-element__label" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                Product Family
              </label>
              <select
                className="slds-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Families</option>
                <option value="Industrial Valves">Industrial Valves</option>
                <option value="Sensors">Sensors</option>
                <option value="Control Systems">Control Systems</option>
                <option value="Meters">Meters</option>
                <option value="Safety Equipment">Safety Equipment</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div style={{ fontSize: '14px', color: '#706e6b', marginBottom: '8px' }}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            {selectedProducts.length > 0 && ` • ${selectedProducts.length} selected`}
          </div>
        </div>
      </Card>

      {/* Product Results Table */}
      <div style={{ marginTop: '16px' }}>
        <Card>
          <div style={{ padding: '0' }}>
            <table className="slds-table slds-table_bordered slds-table_cell-buffer">
              <thead>
                <tr className="slds-line-height_reset">
                  <th style={{ width: '40px', padding: '12px' }}>
                    <span className="slds-assistive-text">Select</span>
                  </th>
                  <th scope="col" style={{ padding: '12px' }}>
                    <div className="slds-truncate">Product Name</div>
                  </th>
                  <th scope="col" style={{ padding: '12px' }}>
                    <div className="slds-truncate">Code</div>
                  </th>
                  <th scope="col" style={{ padding: '12px' }}>
                    <div className="slds-truncate">SAP Code</div>
                  </th>
                  <th scope="col" style={{ padding: '12px' }}>
                    <div className="slds-truncate">Family</div>
                  </th>
                  <th scope="col" style={{ padding: '12px' }}>
                    <div className="slds-truncate">Stock Status</div>
                  </th>
                  <th scope="col" style={{ padding: '12px', textAlign: 'right' }}>
                    <div className="slds-truncate">On Hand</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="slds-hint-parent">
                    <td style={{ padding: '12px' }}>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        variant="base"
                      />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div className="slds-truncate" title={product.name}>
                        <strong>{product.name}</strong>
                      </div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                        {product.description}
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div className="slds-truncate">{product.code}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div className="slds-truncate">{product.sapCode}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div className="slds-truncate">{product.family}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {getStockLevelBadge(product.stockLevel)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <strong>{product.inventory.totalOnHand.toLocaleString()}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          label="View Inventory Details"
          variant="brand"
          disabled={selectedProducts.length === 0}
          onClick={() => {
            // Initialize line items for selected products
            const newLineItems = {};
            selectedProducts.forEach(productId => {
              const product = products.find(p => p.id === productId);
              newLineItems[productId] = {
                quantity: 1,
                unitPrice: 0,
                warehouse: product.inventory.warehouses[0]?.name || '',
                atpStatus: product.defaultATP
              };
            });
            setLineItems(newLineItems);
            setCurrentStep(1);
          }}
        />
      </div>
    </div>
  );

  // Step 1: Inventory Status Display
  const InventoryStatusScreen = () => (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="slds-text-heading_medium" style={{ marginBottom: '8px' }}>
          Inventory Status & Availability
        </h2>
        <p className="slds-text-body_regular" style={{ color: '#706e6b' }}>
          Review inventory availability for selected products. Click on a product to view batch details.
        </p>
      </div>

      {selectedProducts.map(productId => {
        const product = products.find(p => p.id === productId);
        const isExpanded = expandedProduct === productId;

        return (
          <Card key={productId} style={{ marginBottom: '16px' }}>
            <div style={{ padding: '16px' }}>
              {/* Product Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <h3 className="slds-text-heading_small">{product.name}</h3>
                    {getStockLevelBadge(product.stockLevel)}
                    <Badge color={getATPBadgeColor(product.defaultATP)} content={product.defaultATP} />
                  </div>
                  <div className="slds-text-body_small" style={{ color: '#706e6b' }}>
                    {product.code} • {product.sapCode}
                  </div>
                </div>
                <Button
                  label={isExpanded ? "Hide Batch Details" : "View Batch Details"}
                  variant="neutral"
                  onClick={() => setExpandedProduct(isExpanded ? null : productId)}
                />
              </div>

              {/* Inventory Summary */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#f3f3f3',
                borderRadius: '4px',
                marginBottom: '16px'
              }}>
                <div>
                  <div className="slds-text-title" style={{ fontSize: '12px', color: '#706e6b', marginBottom: '4px' }}>
                    Total On Hand
                  </div>
                  <div className="slds-text-heading_small">
                    {product.inventory.totalOnHand.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="slds-text-title" style={{ fontSize: '12px', color: '#706e6b', marginBottom: '4px' }}>
                    Ordered by Customers
                  </div>
                  <div className="slds-text-heading_small">
                    {product.inventory.orderedByCustomers.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="slds-text-title" style={{ fontSize: '12px', color: '#706e6b', marginBottom: '4px' }}>
                    Ordered from Vendors
                  </div>
                  <div className="slds-text-heading_small">
                    {product.inventory.orderedFromVendors.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Warehouse Breakdown */}
              <div style={{ marginBottom: isExpanded ? '16px' : '0' }}>
                <h4 className="slds-text-heading_small" style={{ marginBottom: '12px' }}>
                  Warehouse Availability
                </h4>
                <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                  <thead>
                    <tr className="slds-line-height_reset">
                      <th scope="col" style={{ padding: '8px' }}>
                        <div className="slds-truncate">Warehouse</div>
                      </th>
                      <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                        <div className="slds-truncate">Available</div>
                      </th>
                      <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                        <div className="slds-truncate">Allocated</div>
                      </th>
                      <th scope="col" style={{ padding: '8px' }}>
                        <div className="slds-truncate">Lead Time</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.inventory.warehouses.map((warehouse, idx) => (
                      <tr key={idx}>
                        <td style={{ padding: '8px' }}>
                          <div className="slds-truncate">{warehouse.name}</div>
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>
                          <span style={{
                            color: warehouse.available > 50 ? '#2e844a' : warehouse.available > 10 ? '#fe9339' : '#ea001e'
                          }}>
                            <strong>{warehouse.available}</strong>
                          </span>
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>
                          {warehouse.allocated}
                        </td>
                        <td style={{ padding: '8px' }}>
                          {warehouse.leadTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Batch Details (Expandable) */}
              {isExpanded && (
                <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#fef8e8', borderRadius: '4px', border: '1px solid #ddaa00' }}>
                  <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon category="utility" name="date_input" size="x-small" />
                    Batch & Expiration Details
                  </h4>
                  {product.inventory.batches.length === 0 ? (
                    <p className="slds-text-body_small" style={{ color: '#706e6b' }}>
                      No batch information available for this product.
                    </p>
                  ) : (
                    <table className="slds-table slds-table_bordered slds-table_cell-buffer">
                      <thead>
                        <tr className="slds-line-height_reset">
                          <th scope="col" style={{ padding: '8px' }}>
                            <div className="slds-truncate">Batch Number</div>
                          </th>
                          <th scope="col" style={{ padding: '8px' }}>
                            <div className="slds-truncate">Expiration Date</div>
                          </th>
                          <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                            <div className="slds-truncate">Quantity</div>
                          </th>
                          <th scope="col" style={{ padding: '8px' }}>
                            <div className="slds-truncate">Status</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.inventory.batches.map((batch, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '8px' }}>
                              <code style={{ fontSize: '13px' }}>{batch.number}</code>
                            </td>
                            <td style={{ padding: '8px' }}>
                              {batch.expiration}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>
                              {batch.quantity}
                            </td>
                            <td style={{ padding: '8px' }}>
                              <Badge
                                color={batch.status === 'Good' ? 'success' : 'warning'}
                                content={batch.status}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </Card>
        );
      })}

      {/* Action Buttons */}
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          label="Previous"
          variant="neutral"
          onClick={() => setCurrentStep(0)}
        />
        <Button
          label="Configure Line Items"
          variant="brand"
          onClick={() => setCurrentStep(2)}
        />
      </div>
    </div>
  );

  // Step 2: Line Item Configuration
  const LineItemConfigurationScreen = () => (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="slds-text-heading_medium" style={{ marginBottom: '8px' }}>
          Configure Opportunity Line Items
        </h2>
        <p className="slds-text-body_regular" style={{ color: '#706e6b' }}>
          Specify quantity, pricing, warehouse, and ATP status for each product.
        </p>
      </div>

      {selectedProducts.map(productId => {
        const product = products.find(p => p.id === productId);
        const lineItem = lineItems[productId] || {};
        const availableQty = product.inventory.totalOnHand;
        const showWarning = lineItem.quantity > availableQty;

        return (
          <Card key={productId} style={{ marginBottom: '16px' }}>
            <div style={{ padding: '16px' }}>
              {/* Product Header */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <h3 className="slds-text-heading_small">{product.name}</h3>
                  {getStockLevelBadge(product.stockLevel)}
                </div>
                <div className="slds-text-body_small" style={{ color: '#706e6b' }}>
                  {product.code} • Available: {availableQty} units
                </div>
              </div>

              {/* Warning Alert for Overcommitment */}
              {showWarning && (
                <Alert
                  labels={{ heading: 'Quantity Exceeds Available Inventory' }}
                  variant="warning"
                  style={{ marginBottom: '16px' }}
                >
                  Requested quantity ({lineItem.quantity}) exceeds available inventory ({availableQty}).
                  Please adjust or select appropriate ATP status.
                </Alert>
              )}

              {/* Configuration Form */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <Input
                  label="Quantity"
                  type="number"
                  value={lineItem.quantity || ''}
                  onChange={(e) => {
                    const newLineItems = { ...lineItems };
                    newLineItems[productId] = {
                      ...newLineItems[productId],
                      quantity: parseInt(e.target.value) || 0
                    };
                    setLineItems(newLineItems);
                  }}
                  required
                  errorText={showWarning ? "Exceeds available inventory" : null}
                />
                <Input
                  label="Unit Price"
                  type="number"
                  value={lineItem.unitPrice || ''}
                  onChange={(e) => {
                    const newLineItems = { ...lineItems };
                    newLineItems[productId] = {
                      ...newLineItems[productId],
                      unitPrice: parseFloat(e.target.value) || 0
                    };
                    setLineItems(newLineItems);
                  }}
                  iconLeft={
                    <span style={{ marginRight: '4px' }}>$</span>
                  }
                  required
                />
                <div>
                  <label className="slds-form-element__label slds-form-element__label_required" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                    <abbr className="slds-required" title="required">* </abbr>
                    Warehouse
                  </label>
                  <select
                    className="slds-select"
                    value={lineItem.warehouse || ''}
                    onChange={(e) => {
                      const newLineItems = { ...lineItems };
                      newLineItems[productId] = {
                        ...newLineItems[productId],
                        warehouse: e.target.value
                      };
                      setLineItems(newLineItems);
                    }}
                    required
                  >
                    <option value="">Select Warehouse...</option>
                    {product.inventory.warehouses.map((wh, idx) => (
                      <option key={idx} value={wh.name}>
                        {wh.name} ({wh.available} available)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="slds-form-element__label slds-form-element__label_required" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                    <abbr className="slds-required" title="required">* </abbr>
                    ATP Status
                  </label>
                  <select
                    className="slds-select"
                    value={lineItem.atpStatus || product.defaultATP}
                    onChange={(e) => {
                      const newLineItems = { ...lineItems };
                      newLineItems[productId] = {
                        ...newLineItems[productId],
                        atpStatus: e.target.value
                      };
                      setLineItems(newLineItems);
                    }}
                    required
                  >
                    {atpStatuses.map(status => (
                      <option key={status.id} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Line Total */}
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f3f3f3', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="slds-text-heading_small">Line Item Total:</span>
                  <span className="slds-text-heading_medium">
                    ${((lineItem.quantity || 0) * (lineItem.unitPrice || 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      {/* Action Buttons */}
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          label="Previous"
          variant="neutral"
          onClick={() => setCurrentStep(1)}
        />
        <Button
          label="Review & Confirm"
          variant="brand"
          onClick={() => setCurrentStep(3)}
        />
      </div>
    </div>
  );

  // Step 3: Review & Confirm
  const ReviewScreen = () => {
    const grandTotal = selectedProducts.reduce((sum, productId) => {
      const lineItem = lineItems[productId] || {};
      return sum + ((lineItem.quantity || 0) * (lineItem.unitPrice || 0));
    }, 0);

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h2 className="slds-text-heading_medium" style={{ marginBottom: '8px' }}>
            Review Opportunity Products
          </h2>
          <p className="slds-text-body_regular" style={{ color: '#706e6b' }}>
            Review your selections before adding to the opportunity.
          </p>
        </div>

        <Card>
          <div style={{ padding: '0' }}>
            <table className="slds-table slds-table_bordered slds-table_cell-buffer">
              <thead>
                <tr className="slds-line-height_reset">
                  <th scope="col" style={{ padding: '12px' }}>
                    <div className="slds-truncate">Product</div>
                  </th>
                  <th scope="col" style={{ padding: '12px', textAlign: 'right' }}>
                    <div className="slds-truncate">Quantity</div>
                  </th>
                  <th scope="col" style={{ padding: '12px', textAlign: 'right' }}>
                    <div className="slds-truncate">Unit Price</div>
                  </th>
                  <th scope="col" style={{ padding: '12px' }}>
                    <div className="slds-truncate">Warehouse</div>
                  </th>
                  <th scope="col" style={{ padding: '12px' }}>
                    <div className="slds-truncate">ATP Status</div>
                  </th>
                  <th scope="col" style={{ padding: '12px', textAlign: 'right' }}>
                    <div className="slds-truncate">Total</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map(productId => {
                  const product = products.find(p => p.id === productId);
                  const lineItem = lineItems[productId] || {};
                  const total = (lineItem.quantity || 0) * (lineItem.unitPrice || 0);

                  return (
                    <tr key={productId}>
                      <td style={{ padding: '12px' }}>
                        <div className="slds-truncate">
                          <strong>{product.name}</strong>
                        </div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                          {product.code}
                        </div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        {lineItem.quantity || 0}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        ${(lineItem.unitPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div className="slds-truncate">{lineItem.warehouse || 'N/A'}</div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <Badge
                          color={getATPBadgeColor(lineItem.atpStatus)}
                          content={lineItem.atpStatus}
                        />
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <strong>${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: '#f3f3f3' }}>
                  <td colSpan="5" style={{ padding: '12px', textAlign: 'right' }}>
                    <strong className="slds-text-heading_small">Grand Total:</strong>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <strong className="slds-text-heading_medium">
                      ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        {/* Action Buttons */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
          <Button
            label="Previous"
            variant="neutral"
            onClick={() => setCurrentStep(2)}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              label="Add Another Product"
              variant="neutral"
              onClick={() => {
                setCurrentStep(0);
                setSelectedProducts([]);
                setLineItems({});
              }}
            />
            <Button
              label="Add to Opportunity"
              variant="brand"
              onClick={() => setShowSuccess(true)}
            />
          </div>
        </div>
      </div>
    );
  };

  // Success Screen
  const SuccessScreen = () => (
    <div style={{ padding: '48px', textAlign: 'center' }}>
      <div style={{ marginBottom: '24px' }}>
        <Icon
          category="utility"
          name="success"
          size="large"
          colorVariant="success"
          style={{ fill: '#2e844a' }}
        />
      </div>
      <h2 className="slds-text-heading_large" style={{ marginBottom: '16px', color: '#2e844a' }}>
        Products Added Successfully!
      </h2>
      <p className="slds-text-body_regular" style={{ color: '#706e6b', marginBottom: '32px', maxWidth: '600px', margin: '0 auto' }}>
        {selectedProducts.length} product{selectedProducts.length !== 1 ? 's have' : ' has'} been added to the opportunity.
        Line items are now visible in the Opportunity Products related list.
      </p>
      <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Button
          label="Add More Products"
          variant="neutral"
          onClick={() => {
            setShowSuccess(false);
            setCurrentStep(0);
            setSelectedProducts([]);
            setLineItems({});
          }}
        />
        <Button
          label="View Opportunity"
          variant="brand"
          onClick={() => {
            setShowSuccess(false);
            setCurrentStep(0);
            setSelectedProducts([]);
            setLineItems({});
          }}
        />
      </div>
    </div>
  );

  // Main render
  if (showSuccess) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3', paddingTop: '60px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <SuccessScreen />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3', paddingTop: '60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '4px 4px 0 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h1 className="slds-text-heading_large" style={{ marginBottom: '8px' }}>
            Add Products to Opportunity
          </h1>
          <p className="slds-text-body_regular" style={{ color: '#706e6b' }}>
            Opportunity: Q1 2025 Industrial Equipment Deal
          </p>
        </div>

        {/* Progress Indicator */}
        <div style={{ backgroundColor: 'white', padding: '0 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <ProgressIndicator
            id="opportunity-products-progress"
            selectedStep={currentStep}
            steps={steps}
            variant="base"
            onStepClick={(event, data) => {
              // Allow navigation to previous steps
              if (data.step < currentStep) {
                setCurrentStep(data.step);
              }
            }}
          />
        </div>

        {/* Main Content */}
        <div style={{ backgroundColor: 'white', borderRadius: '0 0 4px 4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minHeight: '500px' }}>
          {currentStep === 0 && <ProductSearchScreen />}
          {currentStep === 1 && <InventoryStatusScreen />}
          {currentStep === 2 && <LineItemConfigurationScreen />}
          {currentStep === 3 && <ReviewScreen />}
        </div>

        {/* Design Annotations */}
        <Card style={{ marginTop: '24px' }}>
          <div style={{ padding: '16px' }}>
            <h3 className="slds-text-heading_small" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon category="utility" name="info" size="x-small" />
              Design Annotations
            </h3>
            <ul style={{ listStyle: 'disc inside', fontSize: '14px', color: '#706e6b' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Multi-select:</strong> Users can select multiple products from the search results table
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Stock Indicators:</strong> Color-coded badges (green/yellow/red) show inventory levels at a glance
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Warehouse Breakdown:</strong> Detailed view of inventory across multiple warehouse locations
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Batch Details:</strong> Optional expandable section shows batch numbers and expiration dates
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>ATP Status:</strong> 5 predefined statuses help categorize product availability
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Validation:</strong> Warning alerts when requested quantity exceeds available inventory
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Navigation:</strong> Progress indicator allows backward navigation; forward requires completion
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OpportunityProductsMockup;
