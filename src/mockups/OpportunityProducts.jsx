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
      name: 'GLB Custom Witch Hazel 2335 5X GL',
      code: 'GLB-2335.5D',
      sapCode: 'GLB-2335.5D',
      family: 'Botanical',
      description: 'Custom formulated witch hazel extract with enhanced potency',
      active: true,
      inventory: {
        totalOnHand: 245,
        orderedByCustomers: 120,
        orderedFromVendors: 50,
        warehouses: [
          { name: '01 - Hazlet', available: 125, allocated: 45, leadTime: '2 days' },
          { name: '02 - Crown', available: 80, allocated: 35, leadTime: '3 days' },
          { name: '06 - Vigon', available: 40, allocated: 40, leadTime: '5 days' }
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
      name: 'GreenGard PA3',
      code: 'GLE-10069',
      sapCode: 'GLE-10069',
      family: 'GreenGard',
      description: 'Broad spectrum preservative for personal care applications',
      active: true,
      inventory: {
        totalOnHand: 45,
        orderedByCustomers: 80,
        orderedFromVendors: 100,
        warehouses: [
          { name: '01 - Hazlet', available: 25, allocated: 20, leadTime: '2 days' },
          { name: '02 - Crown', available: 15, allocated: 10, leadTime: '3 days' },
          { name: '03 - FMI', available: 5, allocated: 5, leadTime: '7 days' }
        ],
        batches: [
          { number: 'BATCH-2024-PA-001', expiration: '2025-02-28', quantity: 30, status: 'Short Expiration' },
          { number: 'BATCH-2024-PA-002', expiration: '2026-08-15', quantity: 15, status: 'Good' }
        ]
      },
      defaultATP: 'In Stock – Expiration Short',
      stockLevel: 'low'
    },
    {
      id: 'P003',
      name: 'GreenSens P30 MB',
      code: 'GLE-10095',
      sapCode: 'GLE-10095',
      family: 'GreenSens',
      description: 'Emollient ester with excellent sensory properties',
      active: true,
      inventory: {
        totalOnHand: 8,
        orderedByCustomers: 25,
        orderedFromVendors: 0,
        warehouses: [
          { name: '01 - Hazlet', available: 5, allocated: 5, leadTime: '2 days' },
          { name: '04 - Koster Keunen', available: 3, allocated: 2, leadTime: '4 days' },
          { name: '07 - Samples/R&D', available: 0, allocated: 0, leadTime: 'N/A' }
        ],
        batches: [
          { number: 'BATCH-2024-P30-001', expiration: 'N/A', quantity: 8, status: 'Good' }
        ]
      },
      defaultATP: 'Needs Production',
      stockLevel: 'critical'
    },
    {
      id: 'P004',
      name: 'ElderMax BF',
      code: 'GLA-11005',
      sapCode: 'GLA-11005',
      family: 'Actives',
      description: 'Elder berry fruit extract with antioxidant benefits',
      active: true,
      inventory: {
        totalOnHand: 0,
        orderedByCustomers: 15,
        orderedFromVendors: 0,
        warehouses: [
          { name: '01 - Hazlet', available: 0, allocated: 0, leadTime: 'N/A' },
          { name: '02 - Crown', available: 0, allocated: 0, leadTime: 'N/A' },
          { name: '08 - Maine', available: 0, allocated: 0, leadTime: 'N/A' }
        ],
        batches: []
      },
      defaultATP: 'Needs Raw Materials',
      stockLevel: 'out'
    },
    {
      id: 'P005',
      name: 'GLB Royal Jelly 10GLY',
      code: 'BH6300',
      sapCode: 'BH6300',
      family: 'Standards',
      description: 'Royal jelly extract in glycerin for skin nourishment',
      active: true,
      inventory: {
        totalOnHand: 0,
        orderedByCustomers: 45,
        orderedFromVendors: 0,
        warehouses: [
          { name: '01 - Hazlet', available: 0, allocated: 0, leadTime: 'N/A' },
          { name: '05 - Blended Wax', available: 0, allocated: 0, leadTime: 'N/A' },
          { name: '06 - Vigon', available: 0, allocated: 0, leadTime: 'N/A' }
        ],
        batches: []
      },
      defaultATP: 'Backordered / Not Available',
      stockLevel: 'out'
    },
    {
      id: 'P006',
      name: 'GreenSolv Clear',
      code: 'GLE-10081',
      sapCode: 'GLE-10081',
      family: 'GreenSolv',
      description: 'Natural solvent for cosmetic formulations',
      active: true,
      inventory: {
        totalOnHand: 180,
        orderedByCustomers: 60,
        orderedFromVendors: 200,
        warehouses: [
          { name: '01 - Hazlet', available: 95, allocated: 30, leadTime: '2 days' },
          { name: '02 - Crown', available: 65, allocated: 20, leadTime: '3 days' },
          { name: '03 - FMI', available: 20, allocated: 10, leadTime: '5 days' }
        ],
        batches: [
          { number: 'BATCH-2024-GS-101', expiration: '2027-03-15', quantity: 120, status: 'Good' },
          { number: 'BATCH-2024-GS-102', expiration: '2026-09-30', quantity: 60, status: 'Good' }
        ]
      },
      defaultATP: 'Available to Ship',
      stockLevel: 'high'
    },
    {
      id: 'P007',
      name: 'GreenWax GL',
      code: 'GLE-10054-020',
      sapCode: 'GLE-10054-020',
      family: 'GreenWax',
      description: 'Glyceryl ester wax for emulsion stabilization',
      active: true,
      inventory: {
        totalOnHand: 65,
        orderedByCustomers: 40,
        orderedFromVendors: 75,
        warehouses: [
          { name: '04 - Koster Keunen', available: 40, allocated: 20, leadTime: '2 days' },
          { name: '05 - Blended Wax', available: 20, allocated: 15, leadTime: '3 days' },
          { name: '01 - Hazlet', available: 5, allocated: 5, leadTime: '4 days' }
        ],
        batches: [
          { number: 'BATCH-2024-WX-501', expiration: 'N/A', quantity: 65, status: 'Good' }
        ]
      },
      defaultATP: 'Available to Ship',
      stockLevel: 'high'
    },
    {
      id: 'P008',
      name: 'GreenSoft PG5O',
      code: 'GLE-10050',
      sapCode: 'GLE-10050',
      family: 'GreenSoft',
      description: 'Plant-based emollient with silky skin feel',
      active: true,
      inventory: {
        totalOnHand: 32,
        orderedByCustomers: 55,
        orderedFromVendors: 50,
        warehouses: [
          { name: '01 - Hazlet', available: 18, allocated: 12, leadTime: '2 days' },
          { name: '06 - Vigon', available: 10, allocated: 8, leadTime: '3 days' },
          { name: '02 - Crown', available: 4, allocated: 4, leadTime: '6 days' }
        ],
        batches: [
          { number: 'BATCH-2024-SF-201', expiration: '2026-01-20', quantity: 32, status: 'Good' }
        ]
      },
      defaultATP: 'Available to Ship',
      stockLevel: 'low'
    },
    {
      id: 'P009',
      name: 'Imbue Shea MB',
      code: 'GLE-10101',
      sapCode: 'GLE-10101',
      family: 'Imbue',
      description: 'Shea butter based multifunctional ingredient',
      active: true,
      inventory: {
        totalOnHand: 15,
        orderedByCustomers: 35,
        orderedFromVendors: 0,
        warehouses: [
          { name: '01 - Hazlet', available: 10, allocated: 8, leadTime: '2 days' },
          { name: '04 - Koster Keunen', available: 5, allocated: 3, leadTime: '3 days' },
          { name: '07 - Samples/R&D', available: 0, allocated: 0, leadTime: 'N/A' }
        ],
        batches: [
          { number: 'BATCH-2024-IM-301', expiration: '2025-04-10', quantity: 15, status: 'Short Expiration' }
        ]
      },
      defaultATP: 'In Stock – Expiration Short',
      stockLevel: 'critical'
    },
    {
      id: 'P010',
      name: 'GLB Radigard SF',
      code: 'GLB-10003',
      sapCode: 'GLB-10003',
      family: 'Radigard',
      description: 'Sunflower seed extract with antioxidant properties',
      active: true,
      inventory: {
        totalOnHand: 88,
        orderedByCustomers: 45,
        orderedFromVendors: 100,
        warehouses: [
          { name: '01 - Hazlet', available: 50, allocated: 25, leadTime: '2 days' },
          { name: '06 - Vigon', available: 30, allocated: 15, leadTime: '3 days' },
          { name: '08 - Maine', available: 8, allocated: 5, leadTime: '4 days' }
        ],
        batches: [
          { number: 'BATCH-2024-RG-401', expiration: '2026-12-31', quantity: 50, status: 'Good' },
          { number: 'BATCH-2024-RG-402', expiration: '2025-06-15', quantity: 38, status: 'Short Expiration' }
        ]
      },
      defaultATP: 'Available to Ship',
      stockLevel: 'high'
    },
    {
      id: 'P011',
      name: 'GLE Green Tea Catechins',
      code: 'GLE-10114',
      sapCode: 'GLE-10114',
      family: 'Essential Other',
      description: 'Green tea extract rich in polyphenols',
      active: true,
      inventory: {
        totalOnHand: 22,
        orderedByCustomers: 30,
        orderedFromVendors: 50,
        warehouses: [
          { name: '01 - Hazlet', available: 15, allocated: 10, leadTime: '2 days' },
          { name: '02 - Crown', available: 5, allocated: 3, leadTime: '3 days' },
          { name: '07 - Samples/R&D', available: 2, allocated: 2, leadTime: '5 days' }
        ],
        batches: [
          { number: 'BATCH-2024-GT-601', expiration: '2026-07-22', quantity: 22, status: 'Good' }
        ]
      },
      defaultATP: 'Available to Ship',
      stockLevel: 'low'
    },
    {
      id: 'P012',
      name: 'Vivify Plus',
      code: 'GLA-11006',
      sapCode: 'GLA-11006',
      family: 'Actives',
      description: 'Enhanced bioactive complex for skin revitalization',
      active: true,
      inventory: {
        totalOnHand: 12,
        orderedByCustomers: 28,
        orderedFromVendors: 0,
        warehouses: [
          { name: '01 - Hazlet', available: 8, allocated: 6, leadTime: '2 days' },
          { name: '07 - Samples/R&D', available: 4, allocated: 2, leadTime: '3 days' },
          { name: '08 - Maine', available: 0, allocated: 0, leadTime: 'N/A' }
        ],
        batches: [
          { number: 'BATCH-2024-VP-701', expiration: '2025-05-30', quantity: 12, status: 'Short Expiration' }
        ]
      },
      defaultATP: 'In Stock – Expiration Short',
      stockLevel: 'critical'
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
      <Card heading="">
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="slds-form-element__label" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                Search Products
              </label>
              <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">
                <Icon
                  assistiveText={{ label: 'Search' }}
                  category="utility"
                  name="search"
                  size="x-small"
                  className="slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default"
                />
                <input
                  type="text"
                  className="slds-input"
                  placeholder="Search by name, product code, or SAP code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
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
                <option value="Actives">Actives</option>
                <option value="Botanical">Botanical</option>
                <option value="Essential Other">Essential Other</option>
                <option value="GreenGard">GreenGard</option>
                <option value="GreenSens">GreenSens</option>
                <option value="GreenSolv">GreenSolv</option>
                <option value="GreenSoft">GreenSoft</option>
                <option value="GreenWax">GreenWax</option>
                <option value="Imbue">Imbue</option>
                <option value="Radigard">Radigard</option>
                <option value="Standards">Standards</option>
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
        <Card heading="">
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
          <Card key={productId} heading="" style={{ marginBottom: '16px' }}>
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
          Specify quantity, pricing, and warehouse for each product.
        </p>
      </div>

      {selectedProducts.map(productId => {
        const product = products.find(p => p.id === productId);
        const lineItem = lineItems[productId] || {};
        const availableQty = product.inventory.totalOnHand;
        const showWarning = lineItem.quantity > availableQty;

        return (
          <Card key={productId} heading="" style={{ marginBottom: '16px' }}>
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
                  Please adjust the quantity or select a different warehouse.
                </Alert>
              )}

              {/* Configuration Form */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
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
                <div>
                  <label className="slds-form-element__label slds-form-element__label_required" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                    <abbr className="slds-required" title="required">* </abbr>
                    Unit Price
                  </label>
                  <div className="slds-form-element__control">
                    <div className="slds-input-has-icon slds-input-has-icon_left">
                      <span className="slds-icon_container slds-icon-utility-dollar" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
                        <span style={{ fontSize: '14px', color: '#706e6b' }}>$</span>
                      </span>
                      <input
                        type="number"
                        className="slds-input"
                        style={{ paddingLeft: '1.75rem' }}
                        value={lineItem.unitPrice || ''}
                        onChange={(e) => {
                          const newLineItems = { ...lineItems };
                          newLineItems[productId] = {
                            ...newLineItems[productId],
                            unitPrice: parseFloat(e.target.value) || 0
                          };
                          setLineItems(newLineItems);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
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

        <Card heading="">
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
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <strong>${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: '#f3f3f3' }}>
                  <td colSpan="4" style={{ padding: '12px', textAlign: 'right' }}>
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
      </div>
    </div>
  );
};

export default OpportunityProductsMockup;
