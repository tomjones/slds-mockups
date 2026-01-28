import React, { useState, useMemo } from 'react';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Combobox from '@salesforce/design-system-react/components/combobox';
import Badge from '@salesforce/design-system-react/components/badge';
import Icon from '@salesforce/design-system-react/components/icon';

const CMProductionOrdersMockup = ({ cmPurchaseOrders = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [manufacturerFilter, setManufacturerFilter] = useState('all');

  // Available contract manufacturers
  const manufacturers = [
    { id: 'all', label: 'All Manufacturers' },
    { id: 'fmi', label: 'FMI' },
    { id: 'vaigon', label: 'Vaigon' },
    { id: 'koster-keunen', label: 'Koster Keunen' }
  ];

  // Status options
  const statusOptions = [
    { id: 'all', label: 'All Statuses' },
    { id: 'not-received', label: 'Not Received' },
    { id: 'partially-received', label: 'Partially Received' },
    { id: 'received', label: 'Received' },
    { id: 'in-testing', label: 'In Testing' },
    { id: 'blocked', label: 'Blocked' }
  ];

  // Transform cmPurchaseOrders prop to match expected format
  const contractManufacturerOrders = cmPurchaseOrders.map((po) => {
    const totalKg = po.orderedQuantity * (po.packSize || 1);
    const receivedKg = (po.receivedQuantity || 0) * (po.packSize || 1);

    return {
      id: po.id,
      poNumber: po.poNumber,
      status: po.status === 'not-received' ? 'Not Received' :
              po.status === 'partially-received' ? 'Partially Received' :
              po.status === 'received' ? 'Received' :
              po.status === 'in-testing' ? 'In Testing' :
              po.status === 'blocked' ? 'Blocked' : 'Not Received',
      product: {
        code: po.itemCode,
        name: po.productName,
        description: ''
      },
      orderedQty: po.orderedQuantity,
      packSize: po.packSize || 1,
      totalKg: totalKg,
      receivedQty: po.receivedQuantity || 0,
      receivedKg: receivedKg,
      uom: po.uom,
      orderDate: po.orderDate,
      expectedDelivery: po.expectedDelivery,
      manufacturer: po.vendor || 'Contract Manufacturer Inc.',
      warehouse: po.warehouse,
      notes: po.notes || '',
      // Pre-receive steps
      batchReportReceived: po.batchReportReceived,
      sampleSentToHazlet: po.sampleSentToHazlet,
      coaSentElectronically: po.coaSentElectronically,
      labelApproval: po.labelApproval
    };
  });

  // Filter the orders
  const filteredOrders = useMemo(() => {
    return contractManufacturerOrders.filter(order => {
      // Search filter
      const searchMatch = !searchTerm ||
        order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const statusMatch = statusFilter === 'all' ||
        order.status.toLowerCase().replace(' ', '-') === statusFilter;

      // Manufacturer filter
      const manufacturerMatch = manufacturerFilter === 'all' ||
        order.manufacturer.toLowerCase().includes(manufacturers.find(m => m.id === manufacturerFilter)?.label.toLowerCase() || '');

      return searchMatch && statusMatch && manufacturerMatch;
    });
  }, [contractManufacturerOrders, searchTerm, statusFilter, manufacturerFilter]);

  // Custom cells
  const ProductCell = ({ children, ...props }) => (
    <DataTableCell {...props}>
      <div>
        <div style={{ fontWeight: '600', marginBottom: '2px' }}>
          {props.item.product.code}
        </div>
        <div style={{ fontSize: '13px', color: '#706e6b' }}>
          {props.item.product.name}
        </div>
      </div>
    </DataTableCell>
  );

  const StatusCell = ({ children, ...props }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Not Received':
          return 'warning';
        case 'Partially Received':
          return 'light';
        case 'Received':
          return 'success';
        case 'In Testing':
          return 'default';
        case 'Blocked':
          return 'error';
        default:
          return 'light';
      }
    };

    return (
      <DataTableCell {...props}>
        <Badge content={props.item.status} color={getStatusColor(props.item.status)} />
      </DataTableCell>
    );
  };

  const QuantityCell = ({ children, ...props }) => (
    <DataTableCell {...props}>
      <div>
        <div style={{ fontWeight: '600' }}>
          {props.item.receivedQty} / {props.item.orderedQty} packs
        </div>
        <div style={{ fontSize: '12px', color: '#706e6b' }}>
          {props.item.receivedKg} / {props.item.totalKg} kg
        </div>
        {props.item.receivedQty < props.item.orderedQty && (
          <div style={{ fontSize: '12px', color: '#c23934' }}>
            {props.item.orderedQty - props.item.receivedQty} packs ({(props.item.orderedQty - props.item.receivedQty) * props.item.packSize} kg) remaining
          </div>
        )}
      </div>
    </DataTableCell>
  );

  const PreReceiveStepsCell = ({ children, ...props }) => {
    const getStepBadge = (stepStatus) => {
      if (stepStatus === 'completed') return <Badge content="✓" color="success" />;
      if (stepStatus === 'skipped') return <Badge content="Skipped" color="light" />;
      return <Badge content="Pending" color="warning" />;
    };

    return (
      <DataTableCell {...props}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '100px' }}>Batch Report:</span>
            {getStepBadge(props.item.batchReportReceived)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '100px' }}>Sample to Hazlet:</span>
            {getStepBadge(props.item.sampleSentToHazlet)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '100px' }}>COA Sent:</span>
            {getStepBadge(props.item.coaSentElectronically)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '100px' }}>Label Approval:</span>
            {getStepBadge(props.item.labelApproval)}
          </div>
        </div>
      </DataTableCell>
    );
  };

  return (
    <div>
      {/* Filters - matching ProductionOrders.jsx structure */}
      <div className="slds-p-around_medium slds-border_bottom">
        <div className="slds-grid slds-wrap slds-gutters">
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="search-input-cm">
                Search
              </label>
              <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                <Icon
                  assistiveText={{ label: 'Search' }}
                  category="utility"
                  name="search"
                  size="x-small"
                  className="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default"
                />
                <input
                  id="search-input-cm"
                  type="text"
                  className="slds-input"
                  placeholder="Search PO number, product, or manufacturer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
            <Combobox
              labels={{ label: 'Status' }}
              options={statusOptions}
              selection={[statusOptions.find(opt => opt.id === statusFilter)]}
              onSelect={(_event, data) => {
                setStatusFilter(data.selection[0]?.id || 'all');
              }}
              variant="readonly"
            />
          </div>
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
            <Combobox
              labels={{ label: 'Contract Manufacturer' }}
              options={manufacturers}
              selection={[manufacturers.find(m => m.id === manufacturerFilter)]}
              onSelect={(_event, data) => {
                setManufacturerFilter(data.selection[0]?.id || 'all');
              }}
              variant="readonly"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ overflowX: 'auto' }}>
        <DataTable items={filteredOrders} id="cm-production-orders-table">
          <DataTableColumn label="PO Number" property="poNumber" width="10rem" />
          <DataTableColumn
            label="Product"
            property="product"
            width="15rem"
          >
            <ProductCell />
          </DataTableColumn>
          <DataTableColumn
            label="Status"
            property="status"
            width="9rem"
          >
            <StatusCell />
          </DataTableColumn>
          <DataTableColumn
            label="Quantity"
            property="orderedQty"
            width="10rem"
          >
            <QuantityCell />
          </DataTableColumn>
          <DataTableColumn label="Contract Manufacturer" property="manufacturer" width="12rem" />
          <DataTableColumn label="Order Date" property="orderDate" width="8rem" />
          <DataTableColumn label="Expected Delivery" property="expectedDelivery" width="10rem" />
          <DataTableColumn
            label="Pre-Receive Steps"
            property="preReceiveSteps"
            width="14rem"
          >
            <PreReceiveStepsCell />
          </DataTableColumn>
        </DataTable>
      </div>

      {filteredOrders.length === 0 && (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="search" size="large" colorVariant="light" />
          <p className="slds-text-heading_small slds-m-top_medium">No contract manufacturer purchase orders found</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default CMProductionOrdersMockup;
