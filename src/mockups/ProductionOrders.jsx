import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Card from '@salesforce/design-system-react/components/card';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Badge from '@salesforce/design-system-react/components/badge';
import Alert from '@salesforce/design-system-react/components/alert';
import Icon from '@salesforce/design-system-react/components/icon';
import Input from '@salesforce/design-system-react/components/input';
import Combobox from '@salesforce/design-system-react/components/combobox';
import Tabs from '@salesforce/design-system-react/components/tabs';
import TabsPanel from '@salesforce/design-system-react/components/tabs/panel';
import ProgressBar from '@salesforce/design-system-react/components/progress-bar';
import ProgressIndicator from '@salesforce/design-system-react/components/progress-indicator';

const ProductionOrdersMockup = () => {
  // State management
  const [currentView, setCurrentView] = useState('overview');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [expandedRows, setExpandedRows] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  // Sample data - Production Orders with all 7 scenarios
  const productionOrders = [
    // Scenario 1: Ready to Start
    {
      id: '1',
      orderNumber: 'PO-2024-0015',
      status: 'Released',
      product: {
        code: 'FG-LOTION-100',
        name: 'Moisturizing Lotion 100ml',
        description: 'Hydrating body lotion with vitamin E and aloe vera'
      },
      plannedQty: 500,
      actualQty: 0,
      uom: 'EA',
      startDate: '2024-12-20',
      dueDate: '2024-12-27',
      priority: 'High',
      warehouse: '01 - Hazlet',
      materialStatus: 'available',
      owner: 'Sarah Chen',
      notes: 'Rush order for holiday promotion',
      components: [
        {
          id: 'c1-1',
          itemCode: 'RM-LOTION-BASE',
          name: 'Lotion Base',
          plannedQty: 45,
          issuedQty: 0,
          uom: 'KG',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available',
          onHand: 150,
          reserved: 20,
          warehouses: [
            { name: '01 - Hazlet', available: 130, allocated: 20, leadTime: '0 days' },
            { name: '02 - Crown', available: 50, allocated: 10, leadTime: '1 day' }
          ]
        },
        {
          id: 'c1-2',
          itemCode: 'RM-VITAMIN-E',
          name: 'Vitamin E Oil',
          plannedQty: 2.5,
          issuedQty: 0,
          uom: 'L',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available',
          onHand: 25,
          reserved: 5,
          warehouses: [
            { name: '01 - Hazlet', available: 20, allocated: 5, leadTime: '0 days' }
          ]
        },
        {
          id: 'c1-3',
          itemCode: 'PKG-BOTTLE-100',
          name: '100ml Bottle with Pump',
          plannedQty: 500,
          issuedQty: 0,
          uom: 'EA',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available',
          onHand: 2000,
          reserved: 500,
          warehouses: [
            { name: '01 - Hazlet', available: 1500, allocated: 500, leadTime: '0 days' }
          ]
        }
      ]
    },
    // Scenario 2: In Production
    {
      id: '2',
      orderNumber: 'PO-2024-0012',
      status: 'In Production',
      product: {
        code: 'FG-CREAM-50',
        name: 'Anti-Aging Cream 50g',
        description: 'Premium anti-aging face cream with retinol and peptides'
      },
      plannedQty: 300,
      actualQty: 180,
      uom: 'EA',
      startDate: '2024-12-15',
      dueDate: '2024-12-22',
      priority: 'Medium',
      warehouse: '01 - Hazlet',
      materialStatus: 'available',
      owner: 'Mike Rodriguez',
      notes: 'Standard production run',
      components: [
        {
          id: 'c2-1',
          itemCode: 'RM-CREAM-BASE',
          name: 'Cream Base',
          plannedQty: 13.5,
          issuedQty: 8.1,
          uom: 'KG',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available',
          onHand: 80,
          reserved: 15
        },
        {
          id: 'c2-2',
          itemCode: 'RM-RETINOL',
          name: 'Retinol Complex',
          plannedQty: 0.9,
          issuedQty: 0.54,
          uom: 'KG',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available',
          onHand: 5,
          reserved: 1
        }
      ]
    },
    // Scenario 3: Material Shortage
    {
      id: '3',
      orderNumber: 'PO-2024-0018',
      status: 'Planned',
      product: {
        code: 'FG-SERUM-30',
        name: 'Vitamin C Serum 30ml',
        description: 'Brightening serum with 20% vitamin C and hyaluronic acid'
      },
      plannedQty: 200,
      actualQty: 0,
      uom: 'EA',
      startDate: '2024-12-23',
      dueDate: '2024-12-30',
      priority: 'High',
      warehouse: '02 - Crown',
      materialStatus: 'shortage',
      owner: 'Sarah Chen',
      notes: 'Waiting for vitamin C powder shipment',
      components: [
        {
          id: 'c3-1',
          itemCode: 'RM-SERUM-BASE',
          name: 'Serum Base',
          plannedQty: 5,
          issuedQty: 0,
          uom: 'L',
          warehouse: '02 - Crown',
          availabilityStatus: 'Available',
          onHand: 15,
          reserved: 3
        },
        {
          id: 'c3-2',
          itemCode: 'RM-VIT-C-POWDER',
          name: 'Vitamin C Powder',
          plannedQty: 1.2,
          issuedQty: 0,
          uom: 'KG',
          warehouse: '02 - Crown',
          availabilityStatus: 'Not Available',
          onHand: 0,
          reserved: 0,
          leadTime: '5 days',
          supplier: 'Premium Ingredients Inc.'
        },
        {
          id: 'c3-3',
          itemCode: 'RM-HYALURONIC',
          name: 'Hyaluronic Acid',
          plannedQty: 0.4,
          issuedQty: 0,
          uom: 'KG',
          warehouse: '02 - Crown',
          availabilityStatus: 'Available',
          onHand: 2,
          reserved: 0.5
        }
      ]
    },
    // Scenario 4: Partial Materials
    {
      id: '4',
      orderNumber: 'PO-2024-0016',
      status: 'Released',
      product: {
        code: 'FG-TONER-200',
        name: 'Rose Water Toner 200ml',
        description: 'Refreshing facial toner with rose water and witch hazel'
      },
      plannedQty: 400,
      actualQty: 0,
      uom: 'EA',
      startDate: '2024-12-21',
      dueDate: '2024-12-28',
      priority: 'Medium',
      warehouse: '01 - Hazlet',
      materialStatus: 'partial',
      owner: 'Mike Rodriguez',
      notes: 'Can produce ~250 units with current inventory',
      components: [
        {
          id: 'c4-1',
          itemCode: 'RM-ROSE-WATER',
          name: 'Rose Water',
          plannedQty: 64,
          issuedQty: 0,
          uom: 'L',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Partial',
          onHand: 40,
          reserved: 10
        },
        {
          id: 'c4-2',
          itemCode: 'RM-WITCH-HAZEL',
          name: 'Witch Hazel Extract',
          plannedQty: 16,
          issuedQty: 0,
          uom: 'L',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available',
          onHand: 50,
          reserved: 8
        },
        {
          id: 'c4-3',
          itemCode: 'PKG-BOTTLE-200',
          name: '200ml Spray Bottle',
          plannedQty: 400,
          issuedQty: 0,
          uom: 'EA',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available',
          onHand: 1500,
          reserved: 200
        }
      ]
    },
    // Scenario 5: Delayed (Past Due)
    {
      id: '5',
      orderNumber: 'PO-2024-0010',
      status: 'In Production',
      product: {
        code: 'FG-MASK-75',
        name: 'Clay Mask 75g',
        description: 'Purifying clay mask with activated charcoal'
      },
      plannedQty: 150,
      actualQty: 85,
      uom: 'EA',
      startDate: '2024-12-10',
      dueDate: '2024-12-18',
      priority: 'High',
      warehouse: '02 - Crown',
      materialStatus: 'partial',
      owner: 'Sarah Chen',
      notes: 'Production delayed due to equipment maintenance',
      components: [
        {
          id: 'c5-1',
          itemCode: 'RM-CLAY',
          name: 'Bentonite Clay',
          plannedQty: 9,
          issuedQty: 5.1,
          uom: 'KG',
          warehouse: '02 - Crown',
          availabilityStatus: 'Available',
          onHand: 25,
          reserved: 5
        },
        {
          id: 'c5-2',
          itemCode: 'RM-CHARCOAL',
          name: 'Activated Charcoal',
          plannedQty: 1.5,
          issuedQty: 0.85,
          uom: 'KG',
          warehouse: '02 - Crown',
          availabilityStatus: 'Partial',
          onHand: 1.2,
          reserved: 0.5
        }
      ]
    },
    // Scenario 6: Completed
    {
      id: '6',
      orderNumber: 'PO-2024-0008',
      status: 'Closed',
      product: {
        code: 'FG-CLEANSER-150',
        name: 'Gentle Cleanser 150ml',
        description: 'pH-balanced facial cleanser for sensitive skin'
      },
      plannedQty: 250,
      actualQty: 250,
      uom: 'EA',
      startDate: '2024-12-05',
      dueDate: '2024-12-12',
      completionDate: '2024-12-11',
      priority: 'Medium',
      warehouse: '01 - Hazlet',
      materialStatus: 'n/a',
      owner: 'Mike Rodriguez',
      notes: 'Completed ahead of schedule',
      components: [
        {
          id: 'c6-1',
          itemCode: 'RM-CLEANSER-BASE',
          name: 'Cleanser Base',
          plannedQty: 35,
          issuedQty: 35,
          uom: 'L',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available'
        }
      ]
    },
    // Scenario 7: Cancelled
    {
      id: '7',
      orderNumber: 'PO-2024-0014',
      status: 'Cancelled',
      product: {
        code: 'FG-SCRUB-100',
        name: 'Exfoliating Scrub 100g',
        description: 'Gentle exfoliating scrub with apricot seeds'
      },
      plannedQty: 100,
      actualQty: 0,
      uom: 'EA',
      startDate: '2024-12-17',
      dueDate: '2024-12-24',
      priority: 'Low',
      warehouse: '03 - FMI',
      materialStatus: 'n/a',
      owner: 'Sarah Chen',
      notes: 'Customer order cancelled',
      components: []
    },
    // Additional order for variety
    {
      id: '8',
      orderNumber: 'PO-2024-0019',
      status: 'Planned',
      product: {
        code: 'FG-SUNSCREEN-50',
        name: 'SPF 50 Sunscreen 50ml',
        description: 'Broad spectrum mineral sunscreen'
      },
      plannedQty: 350,
      actualQty: 0,
      uom: 'EA',
      startDate: '2024-12-26',
      dueDate: '2025-01-05',
      priority: 'Low',
      warehouse: '01 - Hazlet',
      materialStatus: 'available',
      owner: 'Mike Rodriguez',
      notes: 'Pre-season production for spring launch',
      components: [
        {
          id: 'c8-1',
          itemCode: 'RM-ZINC-OXIDE',
          name: 'Zinc Oxide',
          plannedQty: 7,
          issuedQty: 0,
          uom: 'KG',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available',
          onHand: 50,
          reserved: 10
        },
        {
          id: 'c8-2',
          itemCode: 'RM-TITANIUM-DIOXIDE',
          name: 'Titanium Dioxide',
          plannedQty: 3.5,
          issuedQty: 0,
          uom: 'KG',
          warehouse: '01 - Hazlet',
          availabilityStatus: 'Available',
          onHand: 30,
          reserved: 5
        }
      ]
    }
  ];

  // Activity timeline sample data
  const getActivityTimeline = (order) => {
    const baseActivities = [
      {
        id: 'a1',
        type: 'created',
        title: 'Production Order Created',
        user: order.owner,
        date: order.startDate,
        icon: 'new',
        iconColor: 'default'
      }
    ];

    if (order.status === 'Released' || order.status === 'In Production' || order.status === 'Closed') {
      baseActivities.push({
        id: 'a2',
        type: 'released',
        title: 'Order Released to Production',
        user: order.owner,
        date: order.startDate,
        icon: 'approval',
        iconColor: 'success'
      });
    }

    if (order.status === 'In Production' || order.status === 'Closed') {
      baseActivities.push({
        id: 'a3',
        type: 'material_issue',
        title: 'Materials Issued',
        user: 'System',
        date: order.startDate,
        description: `Issued ${order.components?.length || 0} component materials`,
        icon: 'record',
        iconColor: 'warning'
      });
    }

    if (order.status === 'Closed') {
      baseActivities.push({
        id: 'a4',
        type: 'completed',
        title: 'Production Completed',
        user: order.owner,
        date: order.completionDate || order.dueDate,
        description: `Produced ${order.actualQty} ${order.uom}`,
        icon: 'success',
        iconColor: 'success'
      });
    }

    if (order.status === 'Cancelled') {
      baseActivities.push({
        id: 'a5',
        type: 'cancelled',
        title: 'Order Cancelled',
        user: order.owner,
        date: order.startDate,
        description: order.notes,
        icon: 'close',
        iconColor: 'error'
      });
    }

    return baseActivities.reverse();
  };

  // Helper functions
  const getStatusBadgeColor = (status) => {
    const colorMap = {
      'Planned': 'light',
      'Released': 'warning',
      'In Production': 'light',
      'Closed': 'success',
      'Cancelled': 'error'
    };
    return colorMap[status] || 'light';
  };

  const getAvailabilityBadgeColor = (status) => {
    const colorMap = {
      'Available': 'success',
      'Partial': 'warning',
      'Not Available': 'error'
    };
    return colorMap[status] || 'light';
  };

  const getMaterialStatusIcon = (status) => {
    if (status === 'shortage') {
      return <Icon category="utility" name="warning" size="x-small" colorVariant="error" />;
    }
    if (status === 'partial') {
      return <Icon category="utility" name="warning" size="x-small" colorVariant="warning" />;
    }
    return null;
  };

  const getPriorityBadgeColor = (priority) => {
    const colorMap = {
      'High': 'error',
      'Medium': 'warning',
      'Low': 'light'
    };
    return colorMap[priority] || 'light';
  };

  const isOverdue = (order) => {
    if (order.status === 'Closed' || order.status === 'Cancelled') return false;
    const dueDate = new Date(order.dueDate);
    const today = new Date();
    return dueDate < today;
  };

  const calculateRemainingQty = (component) => {
    return component.plannedQty - component.issuedQty;
  };

  const getProgressSteps = (status) => {
    const steps = [
      { id: 1, label: 'Planned' },
      { id: 2, label: 'Released' },
      { id: 3, label: 'In Production' },
      { id: 4, label: 'Completed' }
    ];

    const statusToStep = {
      'Planned': 1,
      'Released': 2,
      'In Production': 3,
      'Closed': 4,
      'Cancelled': 1
    };

    return {
      steps,
      currentStep: statusToStep[status] || 1
    };
  };

  // Filter orders based on search and filters
  const filteredOrders = productionOrders.filter(order => {
    const matchesSearch = searchTerm === '' ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesWarehouse = warehouseFilter === 'all' || order.warehouse === warehouseFilter;

    return matchesSearch && matchesStatus && matchesWarehouse;
  });

  // Navigation handlers
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setCurrentView('detail');
    setActiveTab(0);
    setExpandedRows([]);
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedOrder(null);
  };

  const toggleRowExpansion = (rowId) => {
    setExpandedRows(prev =>
      prev.includes(rowId)
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  // Custom DataTable Cells
  const OrderNumberCell = ({ item }) => (
    <DataTableCell>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleOrderClick(item);
        }}
        style={{ color: '#0176d3', textDecoration: 'none' }}
      >
        {item.orderNumber}
      </a>
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
      <Badge color={getStatusBadgeColor(item.status)} content={item.status} />
    </DataTableCell>
  );
  StatusCell.displayName = DataTableCell.displayName;

  const QuantityCell = ({ item }) => (
    <DataTableCell>
      <div>
        <span style={{ fontWeight: '500' }}>{item.actualQty} / {item.plannedQty}</span> {item.uom}
      </div>
    </DataTableCell>
  );
  QuantityCell.displayName = DataTableCell.displayName;

  const PriorityCell = ({ item }) => (
    <DataTableCell>
      <Badge color={getPriorityBadgeColor(item.priority)} content={item.priority} />
    </DataTableCell>
  );
  PriorityCell.displayName = DataTableCell.displayName;

  const MaterialStatusCell = ({ item }) => (
    <DataTableCell>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {getMaterialStatusIcon(item.materialStatus)}
        {item.materialStatus !== 'n/a' && (
          <span style={{
            textTransform: 'capitalize',
            color: item.materialStatus === 'shortage' ? '#c23934' :
                   item.materialStatus === 'partial' ? '#8c4b02' : '#3e3e3c'
          }}>
            {item.materialStatus}
          </span>
        )}
      </div>
    </DataTableCell>
  );
  MaterialStatusCell.displayName = DataTableCell.displayName;

  const ComponentNameCell = ({ item }) => (
    <DataTableCell>
      <div>
        <div style={{ fontWeight: '500' }}>{item.name}</div>
        <div style={{ fontSize: '0.875rem', color: '#706e6b' }}>{item.itemCode}</div>
      </div>
    </DataTableCell>
  );
  ComponentNameCell.displayName = DataTableCell.displayName;

  const AvailabilityStatusCell = ({ item }) => (
    <DataTableCell>
      <Badge color={getAvailabilityBadgeColor(item.availabilityStatus)} content={item.availabilityStatus} />
    </DataTableCell>
  );
  AvailabilityStatusCell.displayName = DataTableCell.displayName;

  // Render Overview Screen
  const renderOverview = () => (
    <div className="slds-p-around_large" style={{ backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <Card
        heading="Production Orders"
        icon={<Icon category="standard" name="orders" />}
        headerActions={
          <Button label="New Production Order" variant="brand" disabled />
        }
      >
        {/* Search and Filter Controls */}
        <div className="slds-p-around_medium slds-border_bottom">
          <div className="slds-grid slds-wrap slds-gutters">
            <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
              <Input
                iconLeft={<Icon category="utility" name="search" size="x-small" />}
                placeholder="Search orders or products..."
                value={searchTerm}
                onChange={(e, { value }) => setSearchTerm(value)}
              />
            </div>
            <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
              <Combobox
                labels={{ label: 'Status' }}
                options={[
                  { id: 'all', label: 'All Statuses' },
                  { id: 'Planned', label: 'Planned' },
                  { id: 'Released', label: 'Released' },
                  { id: 'In Production', label: 'In Production' },
                  { id: 'Closed', label: 'Closed' },
                  { id: 'Cancelled', label: 'Cancelled' }
                ]}
                selection={[{ id: statusFilter, label: statusFilter === 'all' ? 'All Statuses' : statusFilter }]}
                onSelect={(event, data) => {
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
                  { id: '03 - FMI', label: '03 - FMI' }
                ]}
                selection={[{ id: warehouseFilter, label: warehouseFilter === 'all' ? 'All Warehouses' : warehouseFilter }]}
                onSelect={(event, data) => {
                  setWarehouseFilter(data.selection[0]?.id || 'all');
                }}
                variant="readonly"
              />
            </div>
          </div>
        </div>

        {/* Production Orders DataTable */}
        <DataTable items={filteredOrders} id="production-orders-table">
          <DataTableColumn label="Order Number" property="orderNumber" width="10rem">
            <OrderNumberCell />
          </DataTableColumn>
          <DataTableColumn label="Product" property="product" width="15rem">
            <ProductCell />
          </DataTableColumn>
          <DataTableColumn label="Status" property="status" width="9rem">
            <StatusCell />
          </DataTableColumn>
          <DataTableColumn label="Quantity" property="quantity" width="10rem">
            <QuantityCell />
          </DataTableColumn>
          <DataTableColumn label="Start Date" property="startDate" width="8rem" />
          <DataTableColumn label="Due Date" property="dueDate" width="8rem" />
          <DataTableColumn label="Priority" property="priority" width="7rem">
            <PriorityCell />
          </DataTableColumn>
          <DataTableColumn label="Warehouse" property="warehouse" width="10rem" />
          <DataTableColumn label="Material Status" property="materialStatus" width="10rem">
            <MaterialStatusCell />
          </DataTableColumn>
        </DataTable>

        {filteredOrders.length === 0 && (
          <div className="slds-p-around_large slds-text-align_center">
            <Icon category="utility" name="search" size="large" colorVariant="light" />
            <p className="slds-text-heading_small slds-m-top_medium">No production orders found</p>
            <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </Card>
    </div>
  );

  // Render Detail View
  const renderDetailView = () => {
    if (!selectedOrder) return null;

    const progressData = getProgressSteps(selectedOrder.status);
    const progressPercentage = selectedOrder.plannedQty > 0
      ? Math.round((selectedOrder.actualQty / selectedOrder.plannedQty) * 100)
      : 0;

    return (
      <div className="slds-p-around_large" style={{ backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
        {/* Alerts for warnings */}
        {isOverdue(selectedOrder) && (
          <Alert
            variant="error"
            labels={{ heading: 'Order Past Due' }}
            icon={<Icon category="utility" name="error" />}
            className="slds-m-bottom_medium"
          >
            This production order was due on {selectedOrder.dueDate}. Please expedite production.
          </Alert>
        )}

        {selectedOrder.materialStatus === 'shortage' && (
          <Alert
            variant="warning"
            labels={{ heading: 'Material Shortage Detected' }}
            icon={<Icon category="utility" name="warning" />}
            className="slds-m-bottom_medium"
          >
            {selectedOrder.components.filter(c => c.availabilityStatus === 'Not Available').length} component materials are not available. Production cannot start until materials are received.
          </Alert>
        )}

        {selectedOrder.materialStatus === 'partial' && (
          <Alert
            variant="info"
            labels={{ heading: 'Partial Materials Available' }}
            icon={<Icon category="utility" name="info" />}
            className="slds-m-bottom_medium"
          >
            Some materials are only partially available. You may be able to produce a reduced quantity.
          </Alert>
        )}

        {/* Header Card */}
        <Card
          icon={<Icon category="standard" name="orders" />}
          heading={
            <div className="slds-grid slds-grid_vertical-align-center">
              <Button
                iconCategory="utility"
                iconName="back"
                iconSize="large"
                variant="icon"
                assistiveText={{ icon: 'Back to Overview' }}
                onClick={handleBackToOverview}
                className="slds-m-right_small"
              />
              <span>{selectedOrder.orderNumber}</span>
            </div>
          }
          headerActions={
            <div className="slds-button-group">
              <Button label="Issue Materials" variant="brand" disabled />
              <Button label="Complete Order" variant="success" disabled />
              <Button label="Cancel" variant="destructive" disabled />
            </div>
          }
        >
          <div className="slds-p-around_medium">
            {/* Product and Status Section */}
            <div className="slds-grid slds-wrap slds-gutters slds-m-bottom_medium">
              <div className="slds-col slds-size_1-of-1 slds-medium-size_2-of-3">
                <div className="slds-m-bottom_small">
                  <div className="slds-text-title slds-text-color_weak">Product</div>
                  <div className="slds-text-heading_medium" style={{ fontWeight: 'bold' }}>
                    {selectedOrder.product.name}
                  </div>
                  <div className="slds-text-body_regular slds-text-color_weak">
                    {selectedOrder.product.code}
                  </div>
                  <div className="slds-text-body_small slds-text-color_weak slds-m-top_xx-small">
                    {selectedOrder.product.description}
                  </div>
                </div>
              </div>
              <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
                <div className="slds-m-bottom_small">
                  <div className="slds-text-title slds-text-color_weak">Status</div>
                  <div className="slds-m-top_xx-small">
                    <Badge
                      color={getStatusBadgeColor(selectedOrder.status)}
                      content={selectedOrder.status}
                      style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {selectedOrder.status !== 'Cancelled' && (
              <div className="slds-m-bottom_medium">
                <div className="slds-grid slds-grid_align-spread slds-m-bottom_xx-small">
                  <span className="slds-text-title slds-text-color_weak">Production Progress</span>
                  <span className="slds-text-body_regular" style={{ fontWeight: '500' }}>
                    {selectedOrder.actualQty} / {selectedOrder.plannedQty} {selectedOrder.uom} ({progressPercentage}%)
                  </span>
                </div>
                <ProgressBar value={progressPercentage} color={progressPercentage === 100 ? 'success' : undefined} />
              </div>
            )}

            {/* Details Grid */}
            <div className="slds-grid slds-wrap slds-gutters">
              <div className="slds-col slds-size_1-of-2 slds-medium-size_1-of-4">
                <div className="slds-text-title slds-text-color_weak">Start Date</div>
                <div className="slds-text-body_regular">{selectedOrder.startDate}</div>
              </div>
              <div className="slds-col slds-size_1-of-2 slds-medium-size_1-of-4">
                <div className="slds-text-title slds-text-color_weak">Due Date</div>
                <div className="slds-text-body_regular" style={{
                  color: isOverdue(selectedOrder) ? '#c23934' : undefined,
                  fontWeight: isOverdue(selectedOrder) ? '500' : undefined
                }}>
                  {selectedOrder.dueDate}
                  {isOverdue(selectedOrder) && (
                    <Icon category="utility" name="warning" size="x-small" colorVariant="error" className="slds-m-left_xx-small" />
                  )}
                </div>
              </div>
              {selectedOrder.completionDate && (
                <div className="slds-col slds-size_1-of-2 slds-medium-size_1-of-4">
                  <div className="slds-text-title slds-text-color_weak">Completed</div>
                  <div className="slds-text-body_regular">{selectedOrder.completionDate}</div>
                </div>
              )}
              <div className="slds-col slds-size_1-of-2 slds-medium-size_1-of-4">
                <div className="slds-text-title slds-text-color_weak">Priority</div>
                <div className="slds-text-body_regular">
                  <Badge color={getPriorityBadgeColor(selectedOrder.priority)} content={selectedOrder.priority} />
                </div>
              </div>
              <div className="slds-col slds-size_1-of-2 slds-medium-size_1-of-4">
                <div className="slds-text-title slds-text-color_weak">Warehouse</div>
                <div className="slds-text-body_regular">{selectedOrder.warehouse}</div>
              </div>
              <div className="slds-col slds-size_1-of-2 slds-medium-size_1-of-4">
                <div className="slds-text-title slds-text-color_weak">Owner</div>
                <div className="slds-text-body_regular">{selectedOrder.owner}</div>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div className="slds-m-top_medium">
                <div className="slds-text-title slds-text-color_weak slds-m-bottom_xx-small">Notes</div>
                <div className="slds-box slds-box_small">
                  {selectedOrder.notes}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Tabs Section */}
        <div className="slds-m-top_medium">
          <Tabs
            id="production-order-tabs"
            selectedIndex={activeTab}
            onSelect={(index) => setActiveTab(index)}
          >
            <TabsPanel label="Summary">
              <div className="slds-p-around_medium">
                {/* Progress Indicator */}
                <Card heading="Production Stages">
                  <div className="slds-p-around_medium">
                    <ProgressIndicator
                      steps={progressData.steps}
                      selectedStep={progressData.currentStep}
                      variant="base"
                    />
                  </div>
                </Card>
              </div>
            </TabsPanel>

            <TabsPanel label="Components">
              <div className="slds-p-around_medium">
                <Card heading="Component Materials">
                  {selectedOrder.components.length > 0 ? (
                    <DataTable items={selectedOrder.components} id="components-table">
                      <DataTableColumn label="Component" property="name" width="15rem">
                        <ComponentNameCell />
                      </DataTableColumn>
                      <DataTableColumn label="Planned Qty" property="plannedQty" width="8rem">
                        <DataTableCell>
                          {(item) => `${item.plannedQty} ${item.uom}`}
                        </DataTableCell>
                      </DataTableColumn>
                      <DataTableColumn label="Issued Qty" property="issuedQty" width="8rem">
                        <DataTableCell>
                          {(item) => `${item.issuedQty} ${item.uom}`}
                        </DataTableCell>
                      </DataTableColumn>
                      <DataTableColumn label="Remaining" property="remaining" width="8rem">
                        <DataTableCell>
                          {(item) => `${calculateRemainingQty(item)} ${item.uom}`}
                        </DataTableCell>
                      </DataTableColumn>
                      <DataTableColumn label="Warehouse" property="warehouse" width="10rem" />
                      <DataTableColumn label="Availability" property="availabilityStatus" width="10rem">
                        <AvailabilityStatusCell />
                      </DataTableColumn>
                      <DataTableColumn label="On Hand" property="onHand" width="8rem">
                        <DataTableCell>
                          {(item) => item.onHand !== undefined ? `${item.onHand} ${item.uom}` : '-'}
                        </DataTableCell>
                      </DataTableColumn>
                    </DataTable>
                  ) : (
                    <div className="slds-p-around_large slds-text-align_center">
                      <p className="slds-text-body_regular slds-text-color_weak">
                        No components defined for this production order
                      </p>
                    </div>
                  )}
                </Card>

                {/* Expandable inventory details could be added here in a future enhancement */}
                {selectedOrder.components.some(c => c.warehouses) && (
                  <div className="slds-m-top_medium">
                    <Card heading="Warehouse Availability Details">
                      <div className="slds-p-around_medium">
                        <p className="slds-text-body_small slds-text-color_weak">
                          Click on individual components above to view detailed warehouse breakdown and batch information.
                        </p>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </TabsPanel>

            <TabsPanel label="Progress">
              <div className="slds-p-around_medium">
                <Card heading="Activity Timeline">
                  <div className="slds-p-around_medium">
                    {/* Vertical Timeline */}
                    <ul className="slds-timeline">
                      {getActivityTimeline(selectedOrder).map((activity, index) => (
                        <li key={activity.id} className="slds-timeline__item">
                          <span className="slds-assistive-text">{activity.type}</span>
                          <div className="slds-media">
                            <div className="slds-media__figure">
                              <div className={`slds-icon_container slds-icon-utility-${activity.icon} slds-timeline__icon`}>
                                <Icon
                                  category="utility"
                                  name={activity.icon}
                                  size="x-small"
                                  colorVariant={activity.iconColor}
                                />
                              </div>
                            </div>
                            <div className="slds-media__body">
                              <div className="slds-grid slds-grid_align-spread slds-timeline__trigger">
                                <div className="slds-grid slds-grid_vertical-align-center">
                                  <h3 className="slds-truncate" title={activity.title}>
                                    <strong>{activity.title}</strong>
                                  </h3>
                                </div>
                                <div className="slds-timeline__actions slds-m-right_large">
                                  <p className="slds-text-body_small slds-text-color_weak">{activity.date}</p>
                                </div>
                              </div>
                              {activity.description && (
                                <p className="slds-m-vertical_xx-small slds-text-body_small">
                                  {activity.description}
                                </p>
                              )}
                              <p className="slds-text-body_small slds-text-color_weak">
                                By {activity.user}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            </TabsPanel>
          </Tabs>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'overview' ? renderOverview() : renderDetailView()}
    </div>
  );
};

export default ProductionOrdersMockup;
