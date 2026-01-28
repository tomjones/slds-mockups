import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Badge from '@salesforce/design-system-react/components/badge';
import Icon from '@salesforce/design-system-react/components/icon';
import Combobox from '@salesforce/design-system-react/components/combobox';

const SalesOrderLinesReadyToShip = ({ orderLines = [], testingLines = [], onAddToDelivery, onCompleteDelivery }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');

  // SAP Sales Order ID - same for all lines from this order
  const salesOrderNumber = '4500012345';

  // Transform orderLines and testingLines to match table format
  const readyToShipOrders = [
    // Include order lines that are ready to ship (sufficient stock in kg)
    // Filter out items that have been delivered and completed
    ...orderLines
      .filter(ol => {
        const totalKg = ol.orderedQuantity * ol.packSize;
        return ol.status === 'pending' &&
          ol.currentStock >= totalKg &&
          ol.deliveryStatus !== 'completed';
      })
      .map((ol) => {
        const totalKg = ol.orderedQuantity * ol.packSize;
        return {
          id: ol.id,
          orderNumber: salesOrderNumber,
          lineNumber: ol.lineNumber,
          status: 'Ready to Ship',
          product: {
            code: ol.itemCode,
            name: ol.productName,
            description: ''
          },
          orderedQty: ol.orderedQuantity,
          packSize: ol.packSize,
          totalKg: totalKg,
          currentStock: ol.currentStock,
          uom: ol.uom,
          dueDate: ol.dueDate,
          warehouse: ol.warehouse,
          notes: ol.notes || '',
          deliveryStatus: ol.deliveryStatus || null,
          source: 'stock'
        };
      }),
    // Include testing lines that have passed all tests
    // Filter out items that have been delivered and completed
    ...testingLines
      .filter(tl => {
        // Check if all tests are passed
        const allTestsPassed = tl.individualTests && tl.individualTests.every(test => test.status === 'passed');
        const totalKg = tl.quantity * (tl.packSize || 1);
        // Filter out completed deliveries and check stock
        return allTestsPassed && tl.deliveryStatus !== 'completed';
      })
      .map((tl) => {
        const totalKg = tl.quantity * (tl.packSize || 1);
        return {
          id: tl.id,
          orderNumber: salesOrderNumber,
          lineNumber: tl.lineNumber,
          status: 'Ready to Ship',
          product: {
            code: tl.itemCode,
            name: tl.productName,
            description: ''
          },
          orderedQty: tl.quantity,
          packSize: tl.packSize || 1,
          totalKg: totalKg,
          currentStock: totalKg, // Produced quantity becomes current stock in kg
          uom: tl.uom,
          dueDate: tl.dueDate,
          warehouse: tl.warehouse,
          notes: tl.notes || '',
          deliveryStatus: tl.deliveryStatus || null,
          source: 'production'
        };
      })
  ];

  // Helper functions
  const getStatusBadgeColor = (status) => {
    const colorMap = {
      'Ready to Ship': 'success',
      'In Delivery': 'default',
      'Delivered': 'success'
    };
    return colorMap[status] || 'light';
  };

  // Filter orders based on search and filters
  const filteredOrders = readyToShipOrders.filter(order => {
    const matchesSearch = searchTerm === '' ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesWarehouse = warehouseFilter === 'all' || order.warehouse === warehouseFilter;

    return matchesSearch && matchesStatus && matchesWarehouse;
  }).sort((a, b) => {
    // Sort by delivery status: null first, then 'in-delivery', then 'completed'
    const statusOrder = {
      null: 0,
      'in-delivery': 1,
      'completed': 2
    };
    const aOrder = statusOrder[a.deliveryStatus] !== undefined ? statusOrder[a.deliveryStatus] : 0;
    const bOrder = statusOrder[b.deliveryStatus] !== undefined ? statusOrder[b.deliveryStatus] : 0;
    return aOrder - bOrder;
  });

  // Custom DataTable Cells
  const OrderNumberCell = ({ item }) => (
    <DataTableCell>
      <span style={{ fontWeight: '500' }}>{item.orderNumber}</span>
    </DataTableCell>
  );
  OrderNumberCell.displayName = DataTableCell.displayName;

  const ProductCell = ({ item }) => (
    <DataTableCell>
      <div>
        <div style={{ fontWeight: '500' }}>{item.product.name}</div>
        <div style={{ fontSize: '0.875rem', color: '#706e6b' }}>{item.product.code}</div>
      </div>
    </DataTableCell>
  );
  ProductCell.displayName = DataTableCell.displayName;

  const StatusCell = ({ item }) => {
    let statusLabel = 'Ready to Ship';

    if (item.deliveryStatus === 'in-delivery') {
      statusLabel = 'In Delivery';
    } else if (item.deliveryStatus === 'completed') {
      statusLabel = 'Delivered';
    }

    return (
      <DataTableCell>
        {statusLabel === 'In Delivery' ? (
          <span className="slds-badge" style={{ backgroundColor: '#0176d3', color: 'white', border: 'none' }}>
            {statusLabel}
          </span>
        ) : (
          <Badge
            color="success"
            content={statusLabel}
          />
        )}
      </DataTableCell>
    );
  };
  StatusCell.displayName = DataTableCell.displayName;

  const QuantityCell = ({ item }) => (
    <DataTableCell>
      <div>
        <span style={{ fontWeight: '500' }}>{item.orderedQty}</span>
      </div>
    </DataTableCell>
  );
  QuantityCell.displayName = DataTableCell.displayName;

  const PackSizeCell = ({ item }) => (
    <DataTableCell>
      <div>
        <span style={{ fontWeight: '500' }}>{item.packSize} kg</span>
      </div>
    </DataTableCell>
  );
  PackSizeCell.displayName = DataTableCell.displayName;

  const TotalKgCell = ({ item }) => (
    <DataTableCell>
      <div>
        <span style={{ fontWeight: '500', color: '#0176d3' }}>{item.totalKg} kg</span>
      </div>
    </DataTableCell>
  );
  TotalKgCell.displayName = DataTableCell.displayName;

  const StockCell = ({ item }) => (
    <DataTableCell>
      <div>
        <span style={{
          fontWeight: '500',
          color: '#2e844a'
        }}>
          {item.currentStock} kg
        </span>
      </div>
    </DataTableCell>
  );
  StockCell.displayName = DataTableCell.displayName;

  const SourceCell = ({ item }) => (
    <DataTableCell>
      <div>
        <Badge
          color={item.source === 'production' ? 'light' : 'default'}
          content={item.source === 'production' ? 'Production' : 'Existing Stock'}
        />
      </div>
    </DataTableCell>
  );
  SourceCell.displayName = DataTableCell.displayName;

  const ActionsCell = ({ item }) => {
    const handleAddToDelivery = () => {
      if (onAddToDelivery) {
        onAddToDelivery(item.id, item.source);
      }
    };

    const handleCompleteDelivery = () => {
      if (onCompleteDelivery) {
        onCompleteDelivery(item.id, item.source);
      }
    };

    return (
      <DataTableCell>
        <div style={{ display: 'flex', gap: '4px' }}>
          {!item.deliveryStatus && (
            <Button
              label="Delivery"
              variant="brand"
              iconCategory="utility"
              iconName="add"
              iconPosition="left"
              onClick={handleAddToDelivery}
            />
          )}
          {item.deliveryStatus === 'in-delivery' && (
            <Button
              label="Close"
              variant="success"
              iconCategory="utility"
              iconName="check"
              iconPosition="left"
              onClick={handleCompleteDelivery}
            />
          )}
          {item.deliveryStatus === 'completed' && (
            <Badge color="success" content="Completed" />
          )}
        </div>
      </DataTableCell>
    );
  };
  ActionsCell.displayName = DataTableCell.displayName;

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="slds-p-around_medium slds-border_bottom">
        <div className="slds-grid slds-wrap slds-gutters">
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
            <div className="slds-form-element">
              <label className="slds-form-element__label" htmlFor="search-input-ready">
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
                  id="search-input-ready"
                  type="text"
                  className="slds-input"
                  placeholder="Search lines or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
            <Combobox
              labels={{ label: 'Status' }}
              options={[
                { id: 'all', label: 'All Statuses' },
                { id: 'Ready to Ship', label: 'Ready to Ship' },
                { id: 'In Delivery', label: 'In Delivery' },
                { id: 'Delivered', label: 'Delivered' }
              ]}
              selection={[{ id: statusFilter, label: statusFilter === 'all' ? 'All Statuses' : statusFilter }]}
              onSelect={(_event, data) => {
                setStatusFilter(data.selection[0]?.id || 'all');
              }}
              variant="readonly"
            />
          </div>
          <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
            <Combobox
              labels={{ label: 'Warehouse' }}
              options={[
                { id: 'all', label: 'All Warehouses' },
                { id: '01 - Hazlet', label: '01 - Hazlet' },
                { id: '02 - Crown', label: '02 - Crown' },
                { id: '03 - FMI', label: '03 - FMI' },
                { id: '04 - Koster Keunen', label: '04 - Koster Keunen' }
              ]}
              selection={[{ id: warehouseFilter, label: warehouseFilter === 'all' ? 'All Warehouses' : warehouseFilter }]}
              onSelect={(_event, data) => {
                setWarehouseFilter(data.selection[0]?.id || 'all');
              }}
              variant="readonly"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ overflowX: 'auto' }}>
        <DataTable items={filteredOrders} id="sales-order-lines-ready-to-ship-table">
          <DataTableColumn label="Order Number" property="orderNumber" width="10rem">
            <OrderNumberCell />
          </DataTableColumn>
          <DataTableColumn label="Product" property="product" width="15rem">
            <ProductCell />
          </DataTableColumn>
          <DataTableColumn label="Status" property="status" width="10rem">
            <StatusCell />
          </DataTableColumn>
          <DataTableColumn label="Qty" property="orderedQty" width="6rem">
            <QuantityCell />
          </DataTableColumn>
          <DataTableColumn label="Pack Size" property="packSize" width="8rem">
            <PackSizeCell />
          </DataTableColumn>
          <DataTableColumn label="Total Kg" property="totalKg" width="8rem">
            <TotalKgCell />
          </DataTableColumn>
          <DataTableColumn label="Current Stock" property="currentStock" width="10rem">
            <StockCell />
          </DataTableColumn>
          <DataTableColumn label="Due Date" property="dueDate" width="8rem" />
          <DataTableColumn label="Warehouse" property="warehouse" width="10rem" />
          <DataTableColumn label="Source" property="source" width="10rem">
            <SourceCell />
          </DataTableColumn>
          <DataTableColumn label="Actions" property="actions" width="12rem">
            <ActionsCell />
          </DataTableColumn>
        </DataTable>
      </div>

      {filteredOrders.length === 0 && (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="search" size="large" colorVariant="light" />
          <p className="slds-text-heading_small slds-m-top_medium">No sales order lines ready to ship</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default SalesOrderLinesReadyToShip;
