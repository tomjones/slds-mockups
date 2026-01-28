import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Badge from '@salesforce/design-system-react/components/badge';
import Icon from '@salesforce/design-system-react/components/icon';
import Combobox from '@salesforce/design-system-react/components/combobox';
import Input from '@salesforce/design-system-react/components/input';

const SalesOrderLinesNeedingProduction = ({ orderLines = [], onCreateProductionOrder, onOrderMaterials, onReceiveMaterials }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');

  // SAP Sales Order ID - same for all lines from this order
  const salesOrderNumber = '4500012345';

  // Transform orderLines (pending orders) to match table format
  const pendingOrders = orderLines
    .filter(ol => ol.status === 'pending')
    .map((ol) => {
      const totalKg = ol.orderedQuantity * ol.packSize;

      // Determine raw materials status (independent of finished goods stock)
      // Use rawMaterialsStatus if set, otherwise calculate based on line properties
      let materialStatus = ol.rawMaterialsStatus || 'available';

      // If not explicitly set, determine based on line properties for initial state
      if (!ol.rawMaterialsStatus) {
        if (ol.productionOrderNumber) {
          // If production order already exists, materials are on order
          materialStatus = 'on-order';
        } else if (totalKg > 100) {
          // Large orders might need materials ordered
          materialStatus = 'short';
        } else if (ol.lineNumber % 3 === 0) {
          // Vary for demo: every 3rd item has materials on order
          materialStatus = 'on-order';
        } else if (totalKg < 50) {
          // Small orders usually have materials available
          materialStatus = 'available';
        }
      }

      // Determine status based on stock (in kg) and materials
      let status = 'Pending';
      if (ol.currentStock >= totalKg) {
        status = 'Available to Ship';
      } else {
        // Check raw materials status for pending lines
        if (materialStatus === 'available') {
          status = 'Available to Produce';
        } else if (materialStatus === 'short') {
          status = 'Short';
        } else if (materialStatus === 'on-order') {
          status = 'On Order';
        }
      }

      return {
        id: ol.id,
        orderNumber: salesOrderNumber,
        lineNumber: ol.lineNumber,
        status: status,
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
        materialStatus: materialStatus,
        notes: ol.notes || ''
      };
    });

  // Helper functions
  const getStatusBadgeColor = (status) => {
    const colorMap = {
      'Pending': 'warning',
      'Available to Ship': 'success',
      'Available to Produce': 'success',
      'Short': 'error',
      'On Order': 'default'
    };
    return colorMap[status] || 'light';
  };

  const getMaterialStatusIcon = (status) => {
    if (status === 'short') {
      return <Icon category="utility" name="warning" size="x-small" colorVariant="error" />;
    }
    if (status === 'available') {
      return <Icon category="utility" name="success" size="x-small" colorVariant="success" />;
    }
    if (status === 'on-order') {
      return <Icon category="utility" name="clock" size="x-small" style={{ fill: '#0176d3' }} />;
    }
    return null;
  };

  // Filter orders based on search and filters
  const filteredOrders = pendingOrders.filter(order => {
    const matchesSearch = searchTerm === '' ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesWarehouse = warehouseFilter === 'all' || order.warehouse === warehouseFilter;

    return matchesSearch && matchesStatus && matchesWarehouse;
  }).sort((a, b) => {
    // Sort by status: Available to Produce, Short, On Order, Available to Ship
    const statusOrder = {
      'Available to Produce': 0,
      'Short': 1,
      'On Order': 2,
      'Available to Ship': 3
    };
    const aOrder = statusOrder[a.status] !== undefined ? statusOrder[a.status] : 999;
    const bOrder = statusOrder[b.status] !== undefined ? statusOrder[b.status] : 999;
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

  const StatusCell = ({ item }) => (
    <DataTableCell>
      {item.status === 'On Order' ? (
        <span className="slds-badge" style={{ backgroundColor: '#0176d3', color: 'white', border: 'none' }}>
          {item.status}
        </span>
      ) : (
        <Badge
          color={getStatusBadgeColor(item.status)}
          content={item.status}
        />
      )}
    </DataTableCell>
  );
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
          color: item.currentStock >= item.totalKg ? '#2e844a' : '#c23934'
        }}>
          {item.currentStock} kg
        </span>
      </div>
    </DataTableCell>
  );
  StockCell.displayName = DataTableCell.displayName;

  const MaterialStatusCell = ({ item }) => {
    const getStatusText = (status) => {
      if (status === 'short') return 'Short';
      if (status === 'available') return 'Available';
      if (status === 'on-order') return 'On Order';
      return status;
    };

    const getStatusColor = (status) => {
      if (status === 'short') return '#c23934'; // Red
      if (status === 'available') return '#2e844a'; // Green
      if (status === 'on-order') return '#0176d3'; // Blue
      return '#3e3e3c'; // Gray default
    };

    return (
      <DataTableCell>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {getMaterialStatusIcon(item.materialStatus)}
          <span style={{
            color: getStatusColor(item.materialStatus),
            fontWeight: '500'
          }}>
            {getStatusText(item.materialStatus)}
          </span>
        </div>
      </DataTableCell>
    );
  };
  MaterialStatusCell.displayName = DataTableCell.displayName;

  const ActionsCell = ({ item }) => {
    const handleProduce = () => {
      if (onCreateProductionOrder) {
        onCreateProductionOrder(item.id);
      }
    };

    const handleViewMaterials = () => {
      // Placeholder for future functionality
      console.log('View materials for:', item);
    };

    const handleOrderMaterials = () => {
      if (onOrderMaterials) {
        onOrderMaterials(item.id);
      }
    };

    const handleReceiveMaterials = () => {
      if (onReceiveMaterials) {
        onReceiveMaterials(item.id);
      }
    };

    return (
      <DataTableCell>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ minWidth: '100px' }}>
            <Button
              label="Materials"
              variant="neutral"
              iconCategory="utility"
              iconName="list"
              iconPosition="left"
              onClick={handleViewMaterials}
            />
          </div>
          {item.materialStatus === 'short' && (
            <div style={{ minWidth: '160px' }}>
              <Button
                label="Purchase Order"
                variant="brand"
                iconCategory="utility"
                iconName="add"
                iconPosition="left"
                onClick={handleOrderMaterials}
              />
            </div>
          )}
          {item.materialStatus === 'on-order' && (
            <div style={{ minWidth: '120px' }}>
              <Button
                label="Receive PO"
                variant="success"
                iconCategory="utility"
                iconName="left"
                iconPosition="left"
                onClick={handleReceiveMaterials}
              />
            </div>
          )}
          {item.materialStatus === 'available' && (
            <Button
              label="Produce"
              variant="brand"
              iconCategory="utility"
              iconName="add"
              iconPosition="left"
              onClick={handleProduce}
            />
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
              <label className="slds-form-element__label" htmlFor="search-input">
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
                  id="search-input"
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
                { id: 'Available to Ship', label: 'Available to Ship' },
                { id: 'Available to Produce', label: 'Available to Produce' },
                { id: 'Short', label: 'Short' },
                { id: 'On Order', label: 'On Order' },
                { id: 'Pending', label: 'Pending' }
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
        <DataTable items={filteredOrders} id="sales-order-lines-table">
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
          <DataTableColumn label="Actions" property="actions" width="18rem">
            <ActionsCell />
          </DataTableColumn>
        </DataTable>
      </div>

      {filteredOrders.length === 0 && (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="search" size="large" colorVariant="light" />
          <p className="slds-text-heading_small slds-m-top_medium">No sales order lines found</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default SalesOrderLinesNeedingProduction;
