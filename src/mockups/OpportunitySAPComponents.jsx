import React, { useState, useEffect } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Icon from '@salesforce/design-system-react/components/icon';
import Badge from '@salesforce/design-system-react/components/badge';
import Input from '@salesforce/design-system-react/components/input';
import Toast from '@salesforce/design-system-react/components/toast';
import ToastContainer from '@salesforce/design-system-react/components/toast/container';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import ProductionOrdersMockup from './ProductionOrders';
import CMProductionOrdersMockup from './CMProductionOrders';
import SalesOrderLinesNeedingProduction from './SalesOrderLinesNeedingProduction';
import SalesOrderLinesReadyToShip from './SalesOrderLinesReadyToShip';
import OpenTestsComponent from './OpenTestsComponent';

// Component Card wrapper
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

const OpportunitySAPComponents = () => {
  const [currentStage, setCurrentStage] = useState('open'); // The actual current stage of the opportunity
  const [selectedStage, setSelectedStage] = useState('open'); // The stage being viewed
  const [expandedItem, setExpandedItem] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [tempNote, setTempNote] = useState('');
  const [isSyncedToSAP, setIsSyncedToSAP] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [previousStatuses, setPreviousStatuses] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [sapStatusExpanded, setSapStatusExpanded] = useState(false);

  // Production Scheduler state
  const [draggedOrder, setDraggedOrder] = useState(null);

  // SAP Sync Data
  const sapSyncData = {
    salesOrderNumber: 'SO-2026-1234',
    syncDate: '2026-01-20',
    syncTime: '14:35:22',
    sapCustomerCode: 'C10045',
    sapCustomerName: 'Acme Corporation',
    totalValue: 125000,
    currency: 'USD',
    paymentTerms: 'Net 30',
    deliveryDate: '2026-02-28',
  };

  // Initial order lines data (shown in Open stage before sync)
  const initialOrderLinesData = [
    {
      id: '1',
      lineNumber: 1,
      productName: 'GLB Custom Witch Hazel 2335 5X GL',
      itemCode: 'GLB-2335.5D',
      bpItemNumber: 'WH-2335-5X',
      orderedQuantity: 1, // Number of packs
      uom: 'packs',
      packSize: 180,
      unitPrice: 45.50,
      currentStock: 45,
      status: 'pending',
      dueDate: '2026-02-15',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'available'
    },
    {
      id: '2',
      lineNumber: 2,
      productName: 'GreenGard PA3',
      itemCode: 'GLE-10069',
      bpItemNumber: 'GG-PA3',
      orderedQuantity: 15, // Number of packs
      uom: 'packs',
      packSize: 18,
      unitPrice: 32.75,
      currentStock: 78,
      status: 'pending',
      dueDate: '2026-02-18',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'short'
    },
    {
      id: '3',
      lineNumber: 3,
      productName: 'GreenSens P30 MB',
      itemCode: 'GLE-10095',
      bpItemNumber: 'GS-P30-MB',
      orderedQuantity: 2, // Number of packs
      uom: 'packs',
      packSize: 180,
      unitPrice: 28.90,
      currentStock: 120,
      status: 'pending',
      dueDate: '2026-02-20',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'on-order'
    },
    {
      id: '4',
      lineNumber: 4,
      productName: 'ElderMax BF',
      itemCode: 'GLA-11005',
      bpItemNumber: 'EM-BF',
      orderedQuantity: 10, // Number of packs
      uom: 'packs',
      packSize: 18,
      unitPrice: 52.00,
      currentStock: 200,
      status: 'pending',
      dueDate: '2026-02-22',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'available'
    },
    {
      id: '5',
      lineNumber: 5,
      productName: 'GLB Royal Jelly 10GLY',
      itemCode: 'BH6300',
      bpItemNumber: 'RJ-10GLY',
      orderedQuantity: 18, // Number of packs
      uom: 'packs',
      packSize: 5,
      unitPrice: 125.00,
      currentStock: 0,
      status: 'pending',
      dueDate: '2026-02-28',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'available'
    },
    {
      id: '6',
      lineNumber: 6,
      productName: 'GreenSolv Clear',
      itemCode: 'GLE-10081',
      bpItemNumber: 'GSC-CLR',
      orderedQuantity: 2, // Number of packs
      uom: 'packs',
      packSize: 180,
      unitPrice: 18.50,
      currentStock: 180,
      status: 'pending',
      dueDate: '2026-02-15',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'short'
    },
    {
      id: '7',
      lineNumber: 7,
      productName: 'GreenWax GL',
      itemCode: 'GLE-10054-020',
      bpItemNumber: 'GW-GL-020',
      orderedQuantity: 10, // Number of packs
      uom: 'packs',
      packSize: 18,
      unitPrice: 42.25,
      currentStock: 65,
      status: 'pending',
      dueDate: '2026-02-18',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'on-order'
    },
    {
      id: '8',
      lineNumber: 8,
      productName: 'GreenSoft PG5O',
      itemCode: 'GLE-10050',
      bpItemNumber: 'GS-PG5O',
      orderedQuantity: 18, // Number of packs
      uom: 'packs',
      packSize: 5,
      unitPrice: 38.75,
      currentStock: 32,
      status: 'pending',
      dueDate: '2026-02-20',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'available'
    },
    {
      id: '9',
      lineNumber: 9,
      productName: 'Imbue Shea MB',
      itemCode: 'GLE-10101',
      bpItemNumber: 'IS-MB',
      orderedQuantity: 9, // Number of packs
      uom: 'packs',
      packSize: 5,
      unitPrice: 68.50,
      currentStock: 15,
      status: 'pending',
      dueDate: '2026-02-22',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'short'
    },
    {
      id: '10',
      lineNumber: 10,
      productName: 'GLB Radigard SF',
      itemCode: 'GLB-10003',
      bpItemNumber: 'RG-SF',
      orderedQuantity: 1, // Number of packs
      uom: 'packs',
      packSize: 180,
      unitPrice: 34.90,
      currentStock: 88,
      status: 'pending',
      dueDate: '2026-02-15',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'on-order'
    },
    {
      id: '11',
      lineNumber: 11,
      productName: 'GLE Green Tea Catechins',
      itemCode: 'GLE-10114',
      bpItemNumber: 'GTC-114',
      orderedQuantity: 18, // Number of packs
      uom: 'packs',
      packSize: 5,
      unitPrice: 78.00,
      currentStock: 22,
      status: 'pending',
      dueDate: '2026-02-25',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'available'
    },
    {
      id: '12',
      lineNumber: 12,
      productName: 'Argan Oil Organic',
      itemCode: 'GLA-10088',
      bpItemNumber: 'AO-ORG',
      orderedQuantity: 18, // Number of packs
      uom: 'packs',
      packSize: 5,
      unitPrice: 145.00,
      currentStock: 33,
      status: 'pending',
      dueDate: '2026-02-28',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'short'
    },
    {
      id: '13',
      lineNumber: 13,
      productName: 'Rosehip Seed Oil',
      itemCode: 'GLA-10092',
      bpItemNumber: 'RH-SO',
      orderedQuantity: 9, // Number of packs
      uom: 'packs',
      packSize: 5,
      unitPrice: 92.50,
      currentStock: 18,
      status: 'pending',
      dueDate: '2026-03-01',
      warehouse: '01 - Hazlet',
      notes: null,
      productionOrderNumber: null,
      rawMaterialsStatus: 'on-order'
    }
  ];

  // Order lines for "Awaiting Commitment" stage
  const [orderLines, setOrderLines] = useState([]);

  // Production Lines for "In Production" stage
  const [productionLines, setProductionLines] = useState([]);

  // Contract Manufacturing Purchase Orders for "Contract Manufacturing" stage
  const [cmPurchaseOrders, setCmPurchaseOrders] = useState([]);

  // Tests for "In Testing" stage - grouped by production order
  const [tests, setTests] = useState([]);

  // Delivery lines for "Delivery" stage
  const [deliveryLines, setDeliveryLines] = useState([]);
  const [selectedDeliveryLines, setSelectedDeliveryLines] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);

  // Accounting deliveries for "Accounting" stage
  const [accountingDeliveries, setAccountingDeliveries] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  // Closed stage data
  const closedData = {
    shipment: {
      id: 'ship-1',
      shipmentNumber: 'SHIP-2026-012',
      carrier: 'FedEx Freight',
      trackingNumber: 'FX-7894561230',
      shipDate: '2026-01-15',
      estimatedDelivery: '2026-01-18',
      actualDelivery: '2026-01-18',
      status: 'delivered',
      recipient: 'John Wilson - Acme Corp Warehouse',
      address: '123 Market Street, San Francisco, CA 94102',
      notes: 'Delivered on time, signed by receiving manager',
    },
    delivery: {
      id: 'del-1',
      deliveryNumber: 'DEL-2026-012',
      deliveryDate: '2026-01-18',
      receivedBy: 'John Wilson',
      condition: 'excellent',
      pallets: 12,
      weight: 15000,
      weightUom: 'KG',
      notes: 'All items in perfect condition, no damages reported',
    },
    invoice: {
      id: 'inv-1',
      invoiceNumber: 'INV-2026-012',
      invoiceDate: '2026-01-18',
      dueDate: '2026-02-17',
      amount: 125000,
      currency: 'USD',
      status: 'paid',
      paidDate: '2026-01-22',
      paymentMethod: 'Wire Transfer',
      notes: 'Payment received in full',
    },
  };

  // Helper functions
  const getStatusColor = (status) => {
    const colorMap = {
      // Production Orders
      pending: '#fe9339',
      scheduled: '#0176d3',
      ready: '#2e844a',

      // Production Lines
      'not-started': '#706e6b',
      'in-progress': '#0176d3',
      delayed: '#c23934',
      blocked: '#c23934',
      completed: '#2e844a',

      // Tests
      'not-started': '#706e6b',
      'in-progress': '#0176d3',
      passed: '#2e844a',
      failed: '#c23934',
      'rework-created': '#c23934',

      // Shipment/Invoice
      delivered: '#2e844a',
      paid: '#2e844a',
      pending: '#fe9339',
    };
    return colorMap[status] || '#706e6b';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      // Production Orders
      pending: { color: 'warning', label: 'Pending', icon: 'clock' },
      scheduled: { color: 'default', label: 'Scheduled', icon: 'event' },
      ready: { color: 'success', label: 'Ready', icon: 'check' },

      // Production Lines
      'not-started': { color: 'light', label: 'Not Started', icon: 'clock' },
      'in-progress': { color: 'default', label: 'In Progress', icon: 'refresh' },
      delayed: { color: 'error', label: 'Delayed', icon: 'warning' },
      blocked: { color: 'error', label: 'Blocked', icon: 'ban' },
      completed: { color: 'success', label: 'Completed', icon: 'success' },

      // Tests
      'not-started': { color: 'light', label: 'Not Started', icon: 'clock' },
      'in-progress': { color: 'default', label: 'In Progress', icon: 'refresh' },
      passed: { color: 'success', label: 'Passed', icon: 'success' },
      failed: { color: 'error', label: 'Failed', icon: 'error' },
      'rework-created': { color: 'error', label: 'Failed - Rework Created', icon: 'error' },

      // Shipment/Invoice
      delivered: { color: 'success', label: 'Delivered', icon: 'success' },
      paid: { color: 'success', label: 'Paid', icon: 'success' },
    };
    return statusConfig[status] || { color: 'light', label: status, icon: 'info' };
  };

  const getPriorityBadgeColor = (priority) => {
    const priorityColors = {
      High: 'error',
      Medium: 'warning',
      Low: 'light',
    };
    return priorityColors[priority] || 'light';
  };

  const toggleExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleNoteEdit = (itemId, currentNote) => {
    setTempNote(currentNote || '');
    setEditingNote(itemId);
  };

  const handleNoteSave = (itemId, itemType) => {
    if (itemType === 'productionLine') {
      setProductionLines(prev => prev.map(item =>
        item.id === itemId ? { ...item, notes: tempNote } : item
      ));
    } else if (itemType === 'test') {
      setTests(prev => prev.map(item =>
        item.id === itemId ? { ...item, notes: tempNote } : item
      ));
    }
    setEditingNote(null);
    setTempNote('');
  };

  const handleNoteCancel = () => {
    setEditingNote(null);
    setTempNote('');
  };

  const handleStatusChange = (itemId, newStatus, itemType) => {
    // Collapse the item if marking as in-progress, delayed, or completed
    if (newStatus === 'in-progress' || newStatus === 'delayed' || newStatus === 'completed') {
      setExpandedItem(null);
    }

    if (itemType === 'productionLine') {
      setProductionLines(prev => prev.map(item => {
        if (item.id === itemId) {
          // When issuing for production, set progress to 50%
          if (newStatus === 'in-progress') {
            return {
              ...item,
              status: newStatus,
              producedQty: Math.round(item.orderedQuantity * 0.5)
            };
          }
          // When receiving from production, set progress to 100% and create test entry
          if (newStatus === 'completed') {
            const completedItem = {
              ...item,
              status: newStatus,
              producedQty: item.orderedQuantity
            };

            // Check if test entry already exists for this production line
            setTests(prev => {
              const testExists = prev.some(t => t.id === `test-${itemId}`);

              if (!testExists) {
                // Create test entry for this production order
                const newTestEntry = {
                  id: `test-${itemId}`,
                  productionOrderNumber: item.productionOrderNumber,
                  productName: item.productName,
                  itemCode: item.itemCode,
                  lineNumber: item.lineNumber,
                  quantity: item.orderedQuantity,
                  uom: item.uom,
                  overallStatus: 'in-progress',
                  receivedDate: new Date().toISOString().split('T')[0],
                  individualTests: [
                    {
                      id: `${itemId}-test-1`,
                      testName: 'Viscosity Test',
                      testType: 'Quality Control',
                      status: 'not-started',
                      testDate: new Date().toISOString().split('T')[0],
                      testedBy: 'QA Lab',
                      result: 'Not started',
                      notes: null,
                    },
                    {
                      id: `${itemId}-test-2`,
                      testName: 'pH Level Test',
                      testType: 'Quality Control',
                      status: 'not-started',
                      testDate: new Date().toISOString().split('T')[0],
                      testedBy: 'QA Lab',
                      result: 'Not started',
                      notes: null,
                    },
                    {
                      id: `${itemId}-test-3`,
                      testName: 'Contamination Screening',
                      testType: 'Quality Control',
                      status: 'not-started',
                      testDate: new Date().toISOString().split('T')[0],
                      testedBy: 'QA Lab',
                      result: 'Not started',
                      notes: null,
                    },
                  ],
                  notes: null,
                };
                return [...prev, newTestEntry];
              }
              return prev;
            });

            return completedItem;
          }
          return { ...item, status: newStatus };
        }
        return item;
      }));
    } else if (itemType === 'test') {
      setTests(prev => prev.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      ));
    }
  };

  const calculateProgress = (items, statusField = 'status', completeStatuses = ['ready', 'completed', 'passed']) => {
    const total = items.length;
    const completed = items.filter(item => completeStatuses.includes(item[statusField])).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const calculateProductionProgress = (producedQty, totalQty) => {
    return totalQty > 0 ? Math.round((producedQty / totalQty) * 100) : 0;
  };

  // Stage selection
  const stages = [
    { id: 'open', label: 'Open' },
    { id: 'awaiting-production', label: 'Awaiting Commitment' },
    { id: 'in-production', label: 'In Production' },
    { id: 'in-testing', label: 'In Testing' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'accounting', label: 'Accounting' },
    { id: 'closed', label: 'Closed' },
  ];

  const handleCreateProductionOrder = (lineId) => {
    const line = orderLines.find(l => l.id === lineId);
    if (!line) return;

    const poNumber = `PO-2026-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    // Close expanded state
    setExpandedItem(null);

    // Update order line status
    setOrderLines(prev => prev.map(l =>
      l.id === lineId ? {
        ...l,
        status: 'production-order-created',
        productionOrderNumber: poNumber
      } : l
    ));

    // Determine priority based on due date
    const dueDate = new Date(line.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    let priority = 'Low';
    if (daysUntilDue <= 7) priority = 'High';
    else if (daysUntilDue <= 14) priority = 'Medium';

    // Create production line entry for In Production stage
    // Calculate effort hours between 1-4 hours
    const effortHours = Math.floor(Math.random() * 4) + 1; // Random between 1-4

    // Assign operators in rotation for variety
    const operators = ['Kelly Skochil', 'Serena Martz', 'Lisa Pritchard', 'Marla Provenzano'];
    const assignedOperator = operators[line.lineNumber % operators.length];

    const startDate = new Date().toISOString().split('T')[0];
    const newProductionLine = {
      id: `pl-${lineId}`,
      lineNumber: line.lineNumber,
      productionOrderNumber: poNumber,
      productName: line.productName,
      itemCode: line.itemCode,
      orderedQuantity: line.orderedQuantity,
      producedQty: 0,
      uom: line.uom,
      status: 'not-started',
      startDate: startDate,
      estimatedCompletion: startDate,
      operator: assignedOperator,
      warehouse: '01 - Hazlet',
      notes: null,
      scheduledDate: null, // null = unscheduled
      priority: priority,
      effortHours: effortHours,
    };

    setProductionLines(prev => [...prev, newProductionLine]);
  };

  const handleOrderMaterials = (lineId) => {
    // Change raw materials status from 'short' to 'on-order'
    setOrderLines(prev => prev.map(l =>
      l.id === lineId ? {
        ...l,
        rawMaterialsStatus: 'on-order'
      } : l
    ));
  };

  const handleReceiveMaterials = (lineId) => {
    // Change raw materials status from 'on-order' to 'available'
    setOrderLines(prev => prev.map(l =>
      l.id === lineId ? {
        ...l,
        rawMaterialsStatus: 'available'
      } : l
    ));
  };

  const handleUseExistingStock = (lineId) => {
    const line = orderLines.find(l => l.id === lineId);
    if (!line) return;

    // Close expanded state
    setExpandedItem(null);

    setOrderLines(prev => prev.map(l =>
      l.id === lineId ? { ...l, status: 'using-stock' } : l
    ));

    // Create delivery line directly (skipping production and testing)
    // If order is blocked, set status to 'blocked', otherwise 'ready-for-delivery'
    const newDeliveryLine = {
      id: `delivery-stock-${lineId}`,
      testGroupId: null, // No test group since using existing stock
      productionOrderNumber: 'STOCK', // Indicate this is from stock
      productName: line.productName,
      itemCode: line.itemCode,
      lineNumber: line.lineNumber,
      quantity: line.orderedQuantity,
      uom: line.uom,
      status: isBlocked ? 'blocked' : 'ready-for-delivery',
      testsPassedDate: new Date().toISOString().split('T')[0],
      warehouse: line.warehouse,
      notes: 'Committed from existing inventory',
    };

    setDeliveryLines(prev => [...prev, newDeliveryLine]);
  };

  const handleCreateCMPurchaseOrder = (lineId) => {
    const line = orderLines.find(l => l.id === lineId);
    if (!line) return;

    const cmPoNumber = `CM-PO-2026-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

    // Randomly assign a contract manufacturer
    const manufacturers = ['FMI', 'Vaigon', 'Koster Keunen'];
    const randomManufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];

    // Close expanded state
    setExpandedItem(null);

    // Update order line status
    setOrderLines(prev => prev.map(l =>
      l.id === lineId ? {
        ...l,
        status: 'cm-po-created',
        productionOrderNumber: cmPoNumber
      } : l
    ));

    // Create CM purchase order entry for Contract Manufacturing stage
    const newCMPO = {
      id: `cm-${lineId}`,
      lineNumber: line.lineNumber,
      poNumber: cmPoNumber,
      productName: line.productName,
      itemCode: line.itemCode,
      orderedQuantity: line.orderedQuantity,
      receivedQuantity: 0,
      uom: line.uom,
      status: 'not-received',
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery: line.dueDate,
      vendor: randomManufacturer,
      warehouse: line.warehouse,
      notes: null,
      // CM Pre-receive steps
      batchReportReceived: 'pending', // pending, completed, skipped
      sampleSentToHazlet: 'pending',
      coaSentElectronically: 'pending',
      labelApproval: 'pending',
    };

    setCmPurchaseOrders(prev => [...prev, newCMPO]);
  };

  const handleCMStepAction = (cmPoId, stepName, action) => {
    setCmPurchaseOrders(prev => prev.map(po => {
      if (po.id === cmPoId) {
        const updatedPO = { ...po, [stepName]: action };

        // If "Sample Sent to Hazlet" is completed, create test entry
        if (stepName === 'sampleSentToHazlet' && action === 'completed') {
          // Check if test already exists
          const testExists = tests.some(t => t.id === `test-cm-${cmPoId}`);
          if (!testExists) {
            const newTestGroup = {
              id: `test-cm-${cmPoId}`,
              productionOrderNumber: po.poNumber,
              productName: po.productName,
              itemCode: po.itemCode,
              lineNumber: po.lineNumber,
              quantity: po.orderedQuantity,
              uom: po.uom,
              overallStatus: 'not-started',
              warehouse: po.warehouse,
              testResults: [
                { id: `test-cm-${cmPoId}-1`, name: 'Quality Inspection', status: 'not-started', result: null },
                { id: `test-cm-${cmPoId}-2`, name: 'Specification Compliance', status: 'not-started', result: null },
                { id: `test-cm-${cmPoId}-3`, name: 'Packaging Verification', status: 'not-started', result: null },
              ],
            };
            setTests(prev => [...prev, newTestGroup]);
          }
        }

        return updatedPO;
      }
      return po;
    }));
  };

  const handleReceiveCMPO = (cmPoId) => {
    // Close expanded state and collapse
    setExpandedItem(null);

    // Update CM PO status to received
    setCmPurchaseOrders(prev => prev.map(po =>
      po.id === cmPoId ? {
        ...po,
        status: 'received',
        receivedQuantity: po.orderedQuantity
      } : po
    ));
  };

  const handleIssueForProduction = (order) => {
    // Change status from 'not-started' to 'in-progress'
    // Set producedQty to 50% of orderedQuantity
    setProductionLines(prev => prev.map(pl =>
      pl.id === order.id ? {
        ...pl,
        status: 'in-progress',
        producedQty: Math.round(pl.orderedQuantity * 0.5)
      } : pl
    ));
  };

  const handleReceiveFromProduction = (order) => {
    // Change status from 'in-progress' to 'completed'
    // Set producedQty to orderedQuantity
    setProductionLines(prev => prev.map(pl =>
      pl.id === order.id ? {
        ...pl,
        status: 'completed',
        producedQty: pl.orderedQuantity,
        completionDate: new Date().toISOString().split('T')[0]
      } : pl
    ));

    // Create test group for the completed production order
    const completedPL = productionLines.find(pl => pl.id === order.id);
    if (completedPL) {
      const receivedDate = new Date().toISOString().split('T')[0];
      const newTestGroup = {
        id: `test-${completedPL.id}-${Date.now()}`,
        productionOrderNumber: completedPL.productionOrderNumber,
        productName: completedPL.productName,
        itemCode: completedPL.itemCode,
        lineNumber: completedPL.lineNumber,
        quantity: completedPL.orderedQuantity, // Changed from producedQty to quantity
        uom: completedPL.uom,
        overallStatus: 'pending',
        warehouse: completedPL.warehouse,
        receivedDate: receivedDate, // Added receivedDate
        individualTests: [
          {
            id: `test-${completedPL.id}-1`,
            testName: 'Quality Control',
            testType: 'Quality Control',
            status: 'not-started',
            result: 'Awaiting test',
            testedBy: 'Unassigned'
          },
          {
            id: `test-${completedPL.id}-2`,
            testName: 'Specification Compliance',
            testType: 'Compliance',
            status: 'not-started',
            result: 'Awaiting test',
            testedBy: 'Unassigned'
          },
          {
            id: `test-${completedPL.id}-3`,
            testName: 'Final Inspection',
            testType: 'Visual Inspection',
            status: 'not-started',
            result: 'Awaiting test',
            testedBy: 'Unassigned'
          },
        ],
      };
      setTests(prev => [...prev, newTestGroup]);
    }
  };

  const handleDelayProduction = (order) => {
    // Change status from 'in-progress' to 'delayed'
    setProductionLines(prev => prev.map(pl =>
      pl.id === order.id ? {
        ...pl,
        status: 'delayed',
        previousStatus: pl.status // Store the previous status to restore later
      } : pl
    ));
  };

  const handleUndelayProduction = (order) => {
    // Change status from 'delayed' back to previous status (usually 'in-progress')
    setProductionLines(prev => prev.map(pl =>
      pl.id === order.id ? {
        ...pl,
        status: pl.previousStatus || 'in-progress', // Restore previous status or default to in-progress
        previousStatus: undefined // Clear the stored previous status
      } : pl
    ));
  };

  // Handle passing a test (from OpenTestsComponent or In Testing stage)
  const handlePassTest = (testGroupId, testId) => {
    setTests(prev => {
      const updated = prev.map(tg =>
        tg.id === testGroupId ? {
          ...tg,
          individualTests: tg.individualTests.map(t =>
            t.id === testId ? { ...t, status: 'passed', result: 'Test Passed', testedBy: 'QC Team' } : t
          )
        } : tg
      );

      // Check if all tests in this group are now passed
      const updatedGroup = updated.find(tg => tg.id === testGroupId);
      const allPassed = updatedGroup?.individualTests.every(t => t.status === 'passed');

      // If all tests passed, the delivery line will be created by the useEffect hook

      return updated;
    });
  };

  // Handle failing a test (from OpenTestsComponent or In Testing stage)
  const handleFailTest = (testGroupId, testId) => {
    setTests(prev => prev.map(tg =>
      tg.id === testGroupId ? {
        ...tg,
        individualTests: tg.individualTests.map(t =>
          t.id === testId ? { ...t, status: 'failed', result: 'Test Failed', testedBy: 'QC Team' } : t
        )
      } : tg
    ));
  };

  const handleRework = (testGroupId, testId) => {
    // Find the test group and the specific test
    const testGroup = tests.find(tg => tg.id === testGroupId);
    if (!testGroup) return;

    // Generate new production order number for rework
    const reworkPONumber = `${testGroup.productionOrderNumber}-R${String(Math.floor(Math.random() * 100)).padStart(2, '0')}`;

    // Determine priority based on due date
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 7); // Due in 1 week for rework
    const priority = 'High'; // Rework is always high priority

    // Create new production line for rework
    // Rework effort hours between 1-4 hours
    const reworkEffortHours = Math.floor(Math.random() * 4) + 1; // Random between 1-4

    // Assign operators in rotation for variety
    const operators = ['Kelly Skochil', 'Serena Martz', 'Lisa Pritchard', 'Marla Provenzano'];
    const assignedOperator = operators[testGroup.lineNumber % operators.length];

    const reworkStartDate = new Date().toISOString().split('T')[0];
    const reworkProductionLine = {
      id: `pl-rework-${testGroupId}-${Date.now()}`,
      lineNumber: testGroup.lineNumber,
      productionOrderNumber: reworkPONumber,
      productName: testGroup.productName,
      itemCode: testGroup.itemCode,
      orderedQuantity: testGroup.quantity,
      producedQty: 0,
      uom: testGroup.uom,
      status: 'not-started',
      startDate: reworkStartDate,
      estimatedCompletion: reworkStartDate,
      operator: assignedOperator,
      warehouse: '01 - Hazlet',
      notes: `Rework due to failed test: ${tests.find(tg => tg.id === testGroupId)?.individualTests.find(t => t.id === testId)?.testName}`,
      scheduledDate: null,
      priority: priority,
      effortHours: reworkEffortHours,
    };

    setProductionLines(prev => [...prev, reworkProductionLine]);

    // Mark the entire test group as failed
    setTests(prev => prev.map(tg =>
      tg.id === testGroupId ? { ...tg, overallStatus: 'failed' } : tg
    ));

    // Close expanded view
    setExpandedItem(null);
  };

  const getStockStatusColor = (currentStock, orderedQuantity) => {
    if (currentStock >= orderedQuantity) return '#2e844a'; // Green - sufficient stock
    if (currentStock >= orderedQuantity * 0.5) return '#fe9339'; // Orange - partial stock
    return '#c23934'; // Red - insufficient stock
  };

  // Production Scheduler Functions
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: `day-${i}`,
        date: date,
        dateString: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        monthName: date.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return dates;
  };

  const dates = generateDates();

  const handleDragStart = (e, order, sourceColumn) => {
    setDraggedOrder({ order, sourceColumn });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();

    if (!draggedOrder) return;

    const { order } = draggedOrder;

    // Calculate the actual date from the column ID
    let actualDate = null;
    if (targetColumn !== 'unscheduled') {
      // Extract the day offset from the column ID (e.g., "day-0" -> 0, "day-1" -> 1)
      const dayOffset = parseInt(targetColumn.split('-')[1]);
      const today = new Date();
      const scheduledDate = new Date(today);
      scheduledDate.setDate(today.getDate() + dayOffset);
      actualDate = scheduledDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }

    // Update the production line's scheduled date
    setProductionLines(prev => prev.map(pl => {
      if (pl.id === order.id) {
        return {
          ...pl,
          scheduledDate: actualDate
        };
      }
      return pl;
    }));

    setDraggedOrder(null);
  };

  const getOrdersForColumn = (columnId) => {
    if (columnId === 'unscheduled') {
      // Return production lines that have no scheduled date
      return productionLines.filter(pl => pl.scheduledDate === null);
    }

    // Calculate the date for this column
    const dayOffset = parseInt(columnId.split('-')[1]);
    const today = new Date();
    const columnDate = new Date(today);
    columnDate.setDate(today.getDate() + dayOffset);
    const columnDateString = columnDate.toISOString().split('T')[0];

    // Return production lines scheduled for this date
    return productionLines.filter(pl => pl.scheduledDate === columnDateString);
  };

  // Calculate total effort hours for a column
  const getTotalHoursForColumn = (columnId) => {
    const orders = getOrdersForColumn(columnId);
    return orders.reduce((sum, order) => sum + (order.effortHours || 0), 0);
  };

  // Calculate still open hours (not-started + in-progress) for a column
  const getStillOpenHoursForColumn = (columnId) => {
    const orders = getOrdersForColumn(columnId);
    return orders
      .filter(order => order.status === 'not-started' || order.status === 'in-progress')
      .reduce((sum, order) => sum + (order.effortHours || 0), 0);
  };

  // Calculate delayed hours (orders past their estimated completion date)
  const getDelayedHoursForColumn = (columnId) => {
    const orders = getOrdersForColumn(columnId);
    const today = new Date().toISOString().split('T')[0];

    return orders
      .filter(order => {
        // Order is delayed if it's not completed and estimated completion is in the past
        return order.status !== 'completed' && order.estimatedCompletion < today;
      })
      .reduce((sum, order) => sum + (order.effortHours || 0), 0);
  };

  const renderOrderCard = (order, sourceColumn, isCompleted = false) => {
    const priorityColors = {
      High: 'error',
      Medium: 'warning',
      Low: 'light',
    };

    const statusInfo = getStatusBadge(order.status);

    // Get initials from operator name
    const getInitials = (name) => {
      if (!name) return '?';
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
      <div
        key={order.id}
        draggable={!isCompleted}
        onDragStart={(e) => !isCompleted && handleDragStart(e, order, sourceColumn)}
        style={{
          padding: '12px',
          backgroundColor: 'white',
          border: '1px solid #dddbda',
          borderRadius: '4px',
          marginBottom: '8px',
          cursor: isCompleted ? 'default' : 'grab',
          transition: 'box-shadow 0.2s',
          opacity: isCompleted ? 0.7 : 1,
        }}
        onMouseEnter={(e) => !isCompleted && (e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)')}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
          <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600', fontSize: '13px' }}>
            {order.productionOrderNumber}
          </h5>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Badge color={priorityColors[order.priority]} content={order.priority} />
            {/* Assignee Initials Circle */}
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: '#0176d3',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
                flexShrink: 0
              }}
              title={order.operator || 'Unassigned'}
            >
              {getInitials(order.operator)}
            </div>
          </div>
        </div>
        <div className="slds-text-body_small" style={{ marginBottom: '4px', fontWeight: '600' }}>
          {order.productName}
        </div>
        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
          {order.itemCode} • {order.orderedQuantity} {order.uom}
        </div>
        {order.effortHours && (
          <div className="slds-text-body_small" style={{ color: '#0176d3', fontSize: '11px', fontWeight: '600', marginBottom: '8px' }}>
            {order.effortHours} hrs
          </div>
        )}
        {/* Status Badge */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Badge color={statusInfo.color} content={statusInfo.label} />
        </div>
      </div>
    );
  };

  // Check if all order lines are processed and move to In Production
  useEffect(() => {
    // Don't auto-progress stages when order is blocked
    if (isBlocked) return;

    const allProcessed = orderLines.every(line => line.status !== 'pending');
    if (allProcessed && orderLines.length > 0 && currentStage === 'awaiting-production') {
      const hasProductionOrders = orderLines.some(line => line.status === 'production-order-created');
      const hasCMOrders = orderLines.some(line => line.status === 'cm-po-created');

      // If any production or CM orders, go to In Production
      if (hasProductionOrders || hasCMOrders) {
        setCurrentStage('in-production');
        setSelectedStage('in-production');
      }
      // If only using stock, stay in awaiting-production (delivery lines will be created automatically)
    }
  }, [orderLines, currentStage, isBlocked]);

  // Check if all production lines and CM POs are completed and move to In Testing
  useEffect(() => {
    // Don't auto-progress stages when order is blocked
    if (isBlocked) return;

    const allProductionCompleted = productionLines.length === 0 || productionLines.every(line => line.status === 'completed');
    const allCMReceived = cmPurchaseOrders.length === 0 || cmPurchaseOrders.every(po => po.status === 'received');
    const hasItems = productionLines.length > 0 || cmPurchaseOrders.length > 0;

    if (allProductionCompleted && allCMReceived && hasItems && currentStage === 'in-production') {
      setCurrentStage('in-testing');
      setSelectedStage('in-testing');
    }
  }, [productionLines, cmPurchaseOrders, currentStage, isBlocked]);

  // Check if all tests for a production order are passed and create delivery line
  useEffect(() => {
    tests.forEach(testGroup => {
      const allTestsPassed = testGroup.individualTests.every(t => t.status === 'passed');

      setDeliveryLines(prev => {
        const alreadyInDelivery = prev.some(dl => dl.testGroupId === testGroup.id);

        if (allTestsPassed && !alreadyInDelivery) {
          // Create delivery line for this test group
          // If order is blocked, set status to 'blocked', otherwise 'ready-for-delivery'
          const newDeliveryLine = {
            id: `delivery-${testGroup.id}`,
            testGroupId: testGroup.id,
            productionOrderNumber: testGroup.productionOrderNumber,
            productName: testGroup.productName,
            itemCode: testGroup.itemCode,
            lineNumber: testGroup.lineNumber,
            quantity: testGroup.quantity,
            uom: testGroup.uom,
            status: isBlocked ? 'blocked' : 'ready-for-delivery',
            testsPassedDate: new Date().toISOString().split('T')[0],
            warehouse: '01 - Hazlet',
            notes: null,
          };
          return [...prev, newDeliveryLine];
        }
        return prev;
      });
    });
  }, [tests, isBlocked]);

  // Check if all tests are complete and move to Delivery stage
  useEffect(() => {
    // Don't auto-progress stages when order is blocked
    if (isBlocked) return;

    // Only progress if we're currently in testing stage
    if (currentStage !== 'in-testing') return;

    // Check if there are any tests
    if (tests.length === 0) return;

    // Check if all tests in all test groups are complete (no more in-progress or not-started tests)
    const allTestsComplete = tests.every(testGroup =>
      testGroup.individualTests.every(test =>
        test.status === 'passed' || test.status === 'failed'
      )
    );

    if (allTestsComplete) {
      setCurrentStage('delivery');
      setSelectedStage('delivery');
    }
  }, [tests, currentStage, isBlocked]);

  // Check if all deliveries are completed and move to Accounting stage
  useEffect(() => {
    // Don't auto-progress stages when order is blocked
    if (isBlocked) return;

    // Only progress if we're currently in delivery stage
    if (currentStage !== 'delivery') return;

    // Filter out delivery lines that have been added to individual deliveries
    const availableDeliveryLines = deliveryLines.filter(line => {
      // Check if this line corresponds to a stock item that has been added to delivery
      const orderLine = orderLines.find(ol => ol.id === line.id || `delivery-stock-${ol.id}` === line.id);
      if (orderLine && orderLine.deliveryStatus) {
        return false; // Filter out - already added to delivery
      }

      // Check if this line corresponds to a test group that has been added to delivery
      const testGroup = tests.find(tg => tg.id === line.testGroupId);
      if (testGroup && testGroup.deliveryStatus) {
        return false; // Filter out - already added to delivery
      }

      return true; // Include in available lines
    });

    // Check if there are no more items available for delivery
    const noItemsAvailable = availableDeliveryLines.length === 0;

    // Check if all deliveries in completedDeliveries have been moved to accounting (status 'completed')
    const allDeliveriesCompleted = completedDeliveries.length === 0 ||
      completedDeliveries.every(d => d.status === 'completed');

    // Check if there's at least something in accounting to move forward
    const hasAccountingItems = accountingDeliveries.length > 0;

    if (noItemsAvailable && allDeliveriesCompleted && hasAccountingItems) {
      setCurrentStage('accounting');
      setSelectedStage('accounting');
    }
  }, [deliveryLines, completedDeliveries, accountingDeliveries, orderLines, tests, currentStage, isBlocked]);

  // Check if all invoices are sent and move to Closed stage
  useEffect(() => {
    // Don't auto-progress stages when order is blocked
    if (isBlocked) return;

    // Only progress if we're currently in accounting stage
    if (currentStage !== 'accounting') return;

    // Check if there are any accounting deliveries (invoices to process)
    if (accountingDeliveries.length === 0) return;

    // Check if all invoices have been sent (invoiceStatus is 'sent')
    const allInvoicesSent = accountingDeliveries.every(delivery =>
      delivery.invoiceStatus === 'sent'
    );

    if (allInvoicesSent) {
      setCurrentStage('closed');
      setSelectedStage('closed');
    }
  }, [accountingDeliveries, currentStage, isBlocked]);

  // Render Awaiting Commitment Stage
  const renderAwaitingProduction = () => {
    if (!isSyncedToSAP) {
      return (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="warning" size="large" colorVariant="warning" />
          <p className="slds-text-heading_small slds-m-top_medium">No Order Lines Available</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            You cannot create production orders or commit inventory until the opportunity is synced to SAP. Please sync to SAP from the Open stage first.
          </p>
        </div>
      );
    }

    if (orderLines.length === 0) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f3f3f3', borderRadius: '4px', border: '1px solid #dddbda' }}>
          <Icon category="utility" name="info" size="large" style={{ fill: '#706e6b', marginBottom: '12px' }} />
          <p className="slds-text-heading_small" style={{ color: '#706e6b', margin: '0 0 8px 0' }}>
            No Order Lines Available
          </p>
          <p className="slds-text-body_small" style={{ color: '#706e6b', margin: 0 }}>
            Order lines will appear here after syncing to SAP.
          </p>
        </div>
      );
    }

    // Separate open lines from committed lines
    const openLines = orderLines.filter(line =>
      line.status === 'pending' || line.status === 'blocked'
    );
    const committedLines = orderLines.filter(line =>
      line.status === 'production-order-created' ||
      line.status === 'using-stock' ||
      line.status === 'cm-po-created'
    );

    return (
      <div>
        {/* Pending Lines Section */}
        {openLines.length > 0 && (
          <>
            <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #dddbda' }}>
              <h3 className="slds-text-heading_small" style={{ margin: 0 }}>Pending ({openLines.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: committedLines.length > 0 ? '24px' : '0' }}>
              {[...openLines]
                .sort((a, b) => {
                  // Calculate total kg for comparison
                  const aTotalKg = a.orderedQuantity * a.packSize;
                  const bTotalKg = b.orderedQuantity * b.packSize;
                  const aHasSufficientStock = a.currentStock >= aTotalKg;
                  const bHasSufficientStock = b.currentStock >= bTotalKg;

                  // Sort order: Available to Ship, Available to Produce, Short, On Order, Blocked
                  const getOrder = (line, hasSufficientStock) => {
                    if (line.status === 'blocked') return 5; // Blocked last
                    if (hasSufficientStock) return 1; // Available to Ship first
                    if (line.rawMaterialsStatus === 'available') return 2; // Available to Produce second
                    if (line.rawMaterialsStatus === 'short') return 3; // Short third
                    if (line.rawMaterialsStatus === 'on-order') return 4; // On Order fourth
                    return 6; // Other statuses
                  };

                  return getOrder(a, aHasSufficientStock) - getOrder(b, bHasSufficientStock);
                })
                .map((line) => {
            const isExpanded = expandedItem === line.id;
            const isEditing = editingNote === line.id;
            const totalKg = line.orderedQuantity * line.packSize;
            const stockColor = getStockStatusColor(line.currentStock, totalKg);
            const hasSufficientStock = line.currentStock >= totalKg;

            let statusColor = '#fe9339'; // Default orange for pending
            if (line.status === 'pending') {
              // Check raw materials status for pending lines
              if (line.rawMaterialsStatus === 'available' && !hasSufficientStock) {
                statusColor = '#2e844a'; // Green for available to produce
              } else if (line.rawMaterialsStatus === 'short') {
                statusColor = '#c23934'; // Red for short
              } else if (line.rawMaterialsStatus === 'on-order') {
                statusColor = '#0176d3'; // Blue for on order
              } else if (hasSufficientStock) {
                statusColor = '#2e844a'; // Green for available to ship
              }
            }
            if (line.status === 'production-order-created') statusColor = '#0176d3'; // Blue
            if (line.status === 'using-stock') statusColor = '#2e844a'; // Green
            if (line.status === 'cm-po-created') statusColor = '#706c96'; // Purple for CM
            if (line.status === 'blocked') statusColor = '#c23934'; // Red for blocked

            return (
              <div key={line.id} style={{
                border: '1px solid #dddbda',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                {/* Collapsed Header */}
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderLeft: `4px solid ${statusColor}`,
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => toggleExpand(line.id)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  {/* Name */}
                  <div style={{ flex: 1 }}>
                    <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                      Line {line.lineNumber}: {line.productName}
                    </h5>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                      Ordered: {line.orderedQuantity} x {line.packSize} kg ({totalKg} kg) • Stock: <span style={{ color: stockColor, fontWeight: '600' }}>{line.currentStock} kg</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {line.status === 'production-order-created' && (
                    <Badge color="default" content={`PO: ${line.productionOrderNumber}`} />
                  )}
                  {line.status === 'using-stock' && (
                    <Badge color="success" content="Existing Committed" />
                  )}
                  {line.status === 'cm-po-created' && (
                    <Badge color="default" content={`CM-PO: ${line.productionOrderNumber}`} />
                  )}
                  {line.status === 'pending' && (
                    <>
                      {line.rawMaterialsStatus === 'available' && !hasSufficientStock ? (
                        <Badge color="success" content="Available to Produce" />
                      ) : line.rawMaterialsStatus === 'short' ? (
                        <Badge color="error" content="Short" />
                      ) : line.rawMaterialsStatus === 'on-order' ? (
                        <Badge color="success" content="On Order" className="custom-blue-badge" />
                      ) : hasSufficientStock ? (
                        <Badge color="success" content="Available to Ship" />
                      ) : (
                        <Badge color="warning" content="Pending" />
                      )}
                    </>
                  )}
                  {line.status === 'blocked' && (
                    <Badge color="error" content="Blocked" />
                  )}

                  {/* Expand/Collapse Icon */}
                  <Icon
                    category="utility"
                    name={isExpanded ? "chevrondown" : "chevronright"}
                    size="x-small"
                  />
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ padding: '16px', backgroundColor: '#fafaf9', borderTop: '1px solid #dddbda' }}>
                    {/* Details Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Item Code
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {line.itemCode}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Warehouse
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {line.warehouse}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Due Date
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {line.dueDate}
                        </div>
                      </div>
                    </div>

                    {/* Inventory Summary - Above the box */}
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
                        <div className="slds-text-title" style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase' }}>
                          Ordered Quantity
                        </div>
                        <div className="slds-text-heading_small" style={{ fontWeight: '600' }}>
                          {line.orderedQuantity} x {line.packSize} kg
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-title" style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase' }}>
                          Current Stock
                        </div>
                        <div className="slds-text-heading_small" style={{ fontWeight: '600', color: stockColor }}>
                          {line.currentStock} kg
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-title" style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase' }}>
                          {hasSufficientStock ? 'Surplus' : 'Shortage'}
                        </div>
                        <div className="slds-text-heading_small" style={{ fontWeight: '600', color: stockColor }}>
                          {Math.abs(line.currentStock - totalKg)} kg
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-title" style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase' }}>
                          Total On Hand
                        </div>
                        <div className="slds-text-heading_small" style={{ fontWeight: '600' }}>
                          {line.currentStock + Math.floor(Math.random() * 100)} kg
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-title" style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase' }}>
                          Ordered by Customers
                        </div>
                        <div className="slds-text-heading_small" style={{ fontWeight: '600' }}>
                          {Math.floor(Math.random() * 50)} kg
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-title" style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase' }}>
                          Ordered from Vendors
                        </div>
                        <div className="slds-text-heading_small" style={{ fontWeight: '600' }}>
                          {Math.floor(Math.random() * 30)} kg
                        </div>
                      </div>
                    </div>

                    {/* Batch & Expiration Details */}
                    <div style={{
                      marginBottom: '16px',
                      padding: '16px',
                      backgroundColor: '#fef8e8',
                      borderRadius: '4px',
                      border: '1px solid #ddaa00'
                    }}>
                      <h4 className="slds-text-heading_small" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Icon category="utility" name="date_input" size="x-small" />
                        Batch & Expiration Details
                      </h4>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', marginBottom: '12px', fontStyle: 'italic' }}>
                        Review batch information for available inventory
                      </div>
                      {line.currentStock > 0 ? (
                        <table className="slds-table slds-table_bordered slds-table_cell-buffer" style={{ backgroundColor: 'white' }}>
                          <thead>
                            <tr className="slds-line-height_reset">
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Batch Number</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Bin Location</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Expiration Date</div>
                              </th>
                              <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                                <div className="slds-truncate">Quantity</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Shelf Life Status</div>
                              </th>
                              <th scope="col" style={{ padding: '8px', width: '140px' }}>
                                <div className="slds-truncate">Actions</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              // Generate sample batch data based on current stock
                              const numBatches = Math.min(3, Math.ceil(line.currentStock / 50));
                              const batches = [];
                              let remainingStock = line.currentStock;

                              for (let i = 0; i < numBatches; i++) {
                                const batchQty = i === numBatches - 1 ? remainingStock : Math.floor(remainingStock / (numBatches - i));
                                remainingStock -= batchQty;

                                const today = new Date();
                                const expirationDate = new Date(today);
                                expirationDate.setMonth(today.getMonth() + (6 + Math.floor(Math.random() * 18)));
                                const monthsRemaining = Math.floor((expirationDate - today) / (1000 * 60 * 60 * 24 * 30));

                                batches.push({
                                  number: `BATCH-${line.lineNumber}${String(i + 1).padStart(3, '0')}`,
                                  binLocation: `${line.warehouse.split(' - ')[0]}-${String.fromCharCode(65 + i)}${Math.floor(Math.random() * 20) + 1}`,
                                  expiration: expirationDate.toISOString().split('T')[0],
                                  quantity: batchQty,
                                  monthsRemaining: monthsRemaining
                                });
                              }

                              return batches.map((batch, idx) => {
                                const isExpiringSoon = batch.monthsRemaining < 6;
                                return (
                                  <tr key={idx} style={{ backgroundColor: isExpiringSoon ? '#fef5f5' : 'transparent' }}>
                                    <td style={{ padding: '8px' }}>
                                      <code style={{ fontSize: '13px' }}>{batch.number}</code>
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <code style={{ fontSize: '12px', backgroundColor: '#f3f3f3', padding: '2px 6px', borderRadius: '3px' }}>
                                        {batch.binLocation}
                                      </code>
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      {batch.expiration}
                                    </td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}>
                                      {batch.quantity} kg
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Badge
                                          color={isExpiringSoon ? 'error' : 'success'}
                                          content={`${batch.monthsRemaining} months remaining`}
                                        />
                                        {isExpiringSoon && (
                                          <Icon
                                            category="utility"
                                            name="warning"
                                            size="x-small"
                                            style={{ fill: '#ea001e' }}
                                          />
                                        )}
                                      </div>
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      {line.status === 'pending' && (
                                        <Button
                                          label="Commit"
                                          variant="brand"
                                          iconCategory="utility"
                                          iconName="package"
                                          iconPosition="left"
                                          onClick={() => handleUseExistingStock(line.id)}
                                          disabled={!hasSufficientStock}
                                        />
                                      )}
                                    </td>
                                  </tr>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      ) : (
                        <p className="slds-text-body_small" style={{ color: '#706e6b' }}>
                          No batch information available. Current stock is 0.
                        </p>
                      )}
                    </div>

                    {/* Materials Inventory Status & Availability - For Available to Produce */}
                    {line.rawMaterialsStatus === 'available' && !hasSufficientStock && (
                      <div style={{
                        marginBottom: '16px',
                        padding: '16px',
                        backgroundColor: '#e6f7e6',
                        borderRadius: '4px',
                        border: '1px solid #2e844a'
                      }}>
                        <h4 className="slds-text-heading_small" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon category="utility" name="success" size="x-small" style={{ fill: '#2e844a' }} />
                          Materials Inventory Status & Availability
                        </h4>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', marginBottom: '12px', fontStyle: 'italic' }}>
                          All raw materials are available for production
                        </div>
                        <table className="slds-table slds-table_bordered slds-table_cell-buffer" style={{ backgroundColor: 'white' }}>
                          <thead>
                            <tr className="slds-line-height_reset">
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Material</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Batch Number</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Bin Location</div>
                              </th>
                              <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                                <div className="slds-truncate">Required</div>
                              </th>
                              <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                                <div className="slds-truncate">Available</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Status</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              // Generate sample raw materials data
                              const materials = [
                                { name: 'Base Oil (Mineral)', itemCode: 'RM-001', required: totalKg * 0.6 },
                                { name: 'Emulsifier Blend', itemCode: 'RM-045', required: totalKg * 0.15 },
                                { name: 'Fragrance Compound', itemCode: 'RM-127', required: totalKg * 0.05 },
                                { name: 'Preservative System', itemCode: 'RM-089', required: totalKg * 0.02 }
                              ];

                              return materials.map((material, idx) => {
                                const available = material.required + Math.floor(Math.random() * 50) + 10;
                                const batchNumber = `RM-BATCH-${line.lineNumber}${String(idx + 1).padStart(2, '0')}`;
                                const binLocation = `${line.warehouse.split(' - ')[0]}-RM-${String.fromCharCode(65 + idx)}${Math.floor(Math.random() * 15) + 1}`;

                                return (
                                  <tr key={idx}>
                                    <td style={{ padding: '8px' }}>
                                      <div style={{ fontWeight: '600' }}>{material.name}</div>
                                      <div style={{ fontSize: '11px', color: '#706e6b' }}>{material.itemCode}</div>
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <code style={{ fontSize: '13px' }}>{batchNumber}</code>
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <code style={{ fontSize: '12px', backgroundColor: '#f3f3f3', padding: '2px 6px', borderRadius: '3px' }}>
                                        {binLocation}
                                      </code>
                                    </td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}>
                                      {material.required.toFixed(2)} kg
                                    </td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}>
                                      {available.toFixed(2)} kg
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <Badge color="success" content="Available" />
                                    </td>
                                  </tr>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Materials Inventory Status & Availability - For Short */}
                    {line.rawMaterialsStatus === 'short' && (
                      <div style={{
                        marginBottom: '16px',
                        padding: '16px',
                        backgroundColor: '#fef5f5',
                        borderRadius: '4px',
                        border: '1px solid #c23934'
                      }}>
                        <h4 className="slds-text-heading_small" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon category="utility" name="warning" size="x-small" style={{ fill: '#c23934' }} />
                          Materials Inventory Status & Availability
                        </h4>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', marginBottom: '12px', fontStyle: 'italic' }}>
                          One or more raw materials are short - purchase order required
                        </div>
                        <table className="slds-table slds-table_bordered slds-table_cell-buffer" style={{ backgroundColor: 'white' }}>
                          <thead>
                            <tr className="slds-line-height_reset">
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Material</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Batch Number</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Bin Location</div>
                              </th>
                              <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                                <div className="slds-truncate">Required</div>
                              </th>
                              <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                                <div className="slds-truncate">Available</div>
                              </th>
                              <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                                <div className="slds-truncate">Shortage</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Status</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              // Generate sample raw materials data with at least one short
                              const materials = [
                                { name: 'Base Oil (Mineral)', itemCode: 'RM-001', required: totalKg * 0.6, isShort: false },
                                { name: 'Emulsifier Blend', itemCode: 'RM-045', required: totalKg * 0.15, isShort: true },
                                { name: 'Fragrance Compound', itemCode: 'RM-127', required: totalKg * 0.05, isShort: false },
                                { name: 'Preservative System', itemCode: 'RM-089', required: totalKg * 0.02, isShort: false }
                              ];

                              return materials.map((material, idx) => {
                                const available = material.isShort
                                  ? material.required - (Math.floor(Math.random() * 20) + 10)
                                  : material.required + Math.floor(Math.random() * 30) + 5;
                                const shortage = material.isShort ? material.required - available : 0;
                                const batchNumber = available > 0 ? `RM-BATCH-${line.lineNumber}${String(idx + 1).padStart(2, '0')}` : 'N/A';
                                const binLocation = available > 0 ? `${line.warehouse.split(' - ')[0]}-RM-${String.fromCharCode(65 + idx)}${Math.floor(Math.random() * 15) + 1}` : 'N/A';

                                return (
                                  <tr key={idx} style={{ backgroundColor: material.isShort ? '#fef5f5' : 'transparent' }}>
                                    <td style={{ padding: '8px' }}>
                                      <div style={{ fontWeight: '600' }}>{material.name}</div>
                                      <div style={{ fontSize: '11px', color: '#706e6b' }}>{material.itemCode}</div>
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <code style={{ fontSize: '13px' }}>{batchNumber}</code>
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <code style={{ fontSize: '12px', backgroundColor: '#f3f3f3', padding: '2px 6px', borderRadius: '3px' }}>
                                        {binLocation}
                                      </code>
                                    </td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}>
                                      {material.required.toFixed(2)} kg
                                    </td>
                                    <td style={{ padding: '8px', textAlign: 'right', color: material.isShort ? '#c23934' : '#080707' }}>
                                      {Math.max(0, available).toFixed(2)} kg
                                    </td>
                                    <td style={{ padding: '8px', textAlign: 'right', color: material.isShort ? '#c23934' : '#706e6b', fontWeight: material.isShort ? '700' : '400' }}>
                                      {material.isShort ? `${shortage.toFixed(2)} kg` : '-'}
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Badge
                                          color={material.isShort ? 'error' : 'success'}
                                          content={material.isShort ? 'Short' : 'Available'}
                                        />
                                        {material.isShort && (
                                          <Icon
                                            category="utility"
                                            name="warning"
                                            size="x-small"
                                            style={{ fill: '#ea001e' }}
                                          />
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Materials Purchase Orders - For On Order */}
                    {line.rawMaterialsStatus === 'on-order' && (
                      <div style={{
                        marginBottom: '16px',
                        padding: '16px',
                        backgroundColor: '#f0f8ff',
                        borderRadius: '4px',
                        border: '1px solid #0176d3'
                      }}>
                        <h4 className="slds-text-heading_small" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon category="utility" name="clock" size="x-small" style={{ fill: '#0176d3' }} />
                          Materials Purchase Orders - On Order from Vendors
                        </h4>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', marginBottom: '12px', fontStyle: 'italic' }}>
                          Raw materials have been ordered and are in transit
                        </div>
                        <table className="slds-table slds-table_bordered slds-table_cell-buffer" style={{ backgroundColor: 'white' }}>
                          <thead>
                            <tr className="slds-line-height_reset">
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">PO Number</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Material</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Vendor</div>
                              </th>
                              <th scope="col" style={{ padding: '8px', textAlign: 'right' }}>
                                <div className="slds-truncate">Quantity</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Order Date</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Expected Arrival</div>
                              </th>
                              <th scope="col" style={{ padding: '8px', textAlign: 'center' }}>
                                <div className="slds-truncate">Lead Time</div>
                              </th>
                              <th scope="col" style={{ padding: '8px' }}>
                                <div className="slds-truncate">Status</div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              // Generate sample purchase orders for raw materials
                              const vendors = ['Brenntag North America', 'IMCD US', 'Univar Solutions', 'Azelis Americas'];
                              const materials = [
                                { name: 'Base Oil (Mineral)', itemCode: 'RM-001', required: totalKg * 0.6 },
                                { name: 'Emulsifier Blend', itemCode: 'RM-045', required: totalKg * 0.15 }
                              ];

                              return materials.map((material, idx) => {
                                const vendor = vendors[idx % vendors.length];
                                const leadTimeDays = 5 + Math.floor(Math.random() * 10);
                                const orderDate = new Date();
                                orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 3));
                                const expectedArrival = new Date(orderDate);
                                expectedArrival.setDate(orderDate.getDate() + leadTimeDays);
                                const poNumber = `PO-${new Date().getFullYear()}-${String(10000 + idx + line.lineNumber * 10).padStart(5, '0')}`;

                                // Calculate days until arrival
                                const today = new Date();
                                const daysUntilArrival = Math.ceil((expectedArrival - today) / (1000 * 60 * 60 * 24));
                                const isArriving = daysUntilArrival <= 2;

                                return (
                                  <tr key={idx} style={{ backgroundColor: isArriving ? '#e6f7e6' : 'transparent' }}>
                                    <td style={{ padding: '8px' }}>
                                      <code style={{ fontSize: '13px', fontWeight: '600' }}>{poNumber}</code>
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <div style={{ fontWeight: '600' }}>{material.name}</div>
                                      <div style={{ fontSize: '11px', color: '#706e6b' }}>{material.itemCode}</div>
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <div style={{ fontWeight: '500' }}>{vendor}</div>
                                    </td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}>
                                      {material.required.toFixed(2)} kg
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      {orderDate.toISOString().split('T')[0]}
                                    </td>
                                    <td style={{ padding: '8px', fontWeight: '600', color: isArriving ? '#2e844a' : '#080707' }}>
                                      {expectedArrival.toISOString().split('T')[0]}
                                      {isArriving && <div style={{ fontSize: '11px', color: '#2e844a', fontStyle: 'italic' }}>Arriving soon!</div>}
                                    </td>
                                    <td style={{ padding: '8px', textAlign: 'center' }}>
                                      <Badge color="light" content={`${leadTimeDays} days`} />
                                    </td>
                                    <td style={{ padding: '8px' }}>
                                      <Badge
                                        color={isArriving ? 'success' : 'default'}
                                        content={isArriving ? 'In Transit' : 'Ordered'}
                                      />
                                    </td>
                                  </tr>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Notes Section */}
                    {line.notes && !isEditing && (
                      <div style={{
                        marginBottom: '16px',
                        padding: '12px',
                        backgroundColor: '#f3f3f3',
                        borderRadius: '4px',
                        border: '1px solid #dddbda'
                      }}>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                          Notes
                        </div>
                        <div className="slds-text-body_small" style={{ fontStyle: 'italic' }}>
                          {line.notes}
                        </div>
                      </div>
                    )}

                    {/* Note Editor */}
                    {isEditing && (
                      <div style={{ marginBottom: '16px' }}>
                        <Input
                          id={`note-${line.id}`}
                          label="Notes"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Add details about this line..."
                        />
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                          <Button
                            label="Save"
                            variant="brand"
                            onClick={() => {
                              setOrderLines(prev => prev.map(l =>
                                l.id === line.id ? { ...l, notes: tempNote } : l
                              ));
                              setEditingNote(null);
                              setTempNote('');
                            }}
                          />
                          <Button
                            label="Cancel"
                            variant="neutral"
                            onClick={handleNoteCancel}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {line.status === 'pending' && (
                        <>
                          <Button
                            label="Create Production Order"
                            variant="brand"
                            iconCategory="utility"
                            iconName="add"
                            iconPosition="left"
                            onClick={() => handleCreateProductionOrder(line.id)}
                          />
                          <Button
                            label="Create CM"
                            variant="brand"
                            iconCategory="utility"
                            iconName="forward"
                            iconPosition="left"
                            onClick={() => handleCreateCMPurchaseOrder(line.id)}
                          />
                        </>
                      )}
                      {line.status !== 'pending' && (
                        <Button
                          label="Reset to Pending"
                          variant="neutral"
                          iconCategory="utility"
                          iconName="undo"
                          iconPosition="left"
                          onClick={() => setOrderLines(prev => prev.map(l =>
                            l.id === line.id ? { ...l, status: 'pending', productionOrderNumber: null } : l
                          ))}
                        />
                      )}
                      {!isEditing && (
                        <Button
                          label={line.notes ? "Edit Note" : "Add Note"}
                          variant="neutral"
                          iconCategory="utility"
                          iconName="edit"
                          iconPosition="left"
                          onClick={() => handleNoteEdit(line.id, line.notes)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
            </div>
          </>
        )}

        {/* Committed Lines Section */}
        {committedLines.length > 0 && (
          <>
            <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #dddbda' }}>
              <h3 className="slds-text-heading_small" style={{ margin: 0 }}>Committed ({committedLines.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {committedLines.map((line) => {
                const isExpanded = expandedItem === line.id;
                const isEditing = editingNote === line.id;
                const totalKg = line.orderedQuantity * line.packSize;
                const stockColor = getStockStatusColor(line.currentStock, totalKg);
                const hasSufficientStock = line.currentStock >= totalKg;

                let statusColor = '#fe9339'; // Default orange for pending
                if (line.status === 'production-order-created') statusColor = '#0176d3'; // Blue
                if (line.status === 'using-stock') statusColor = '#2e844a'; // Green
                if (line.status === 'cm-po-created') statusColor = '#706c96'; // Purple for CM
                if (line.status === 'blocked') statusColor = '#c23934'; // Red for blocked

                return (
                  <div key={line.id} style={{
                    border: '1px solid #dddbda',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    {/* Collapsed Header */}
                    <div
                      style={{
                        padding: '12px 16px',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderLeft: `4px solid ${statusColor}`,
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => toggleExpand(line.id)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      {/* Name */}
                      <div style={{ flex: 1 }}>
                        <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                          Line {line.lineNumber}: {line.productName}
                        </h5>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                          {line.itemCode} • {line.orderedQuantity} x {line.packSize} kg ({totalKg} kg)
                          {line.currentStock !== undefined && (
                            <span style={{ color: stockColor, marginLeft: '8px' }}>
                              • Stock: {line.currentStock} kg
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status Badges */}
                      {line.status === 'production-order-created' && (
                        <Badge color="success" content={`PO: ${line.productionOrderNumber}`} />
                      )}
                      {line.status === 'using-stock' && (
                        <Badge color="success" content="Existing Committed" />
                      )}
                      {line.status === 'cm-po-created' && (
                        <Badge color="success" content={`CM-PO: ${line.productionOrderNumber}`} />
                      )}

                      {/* Expand/Collapse Icon */}
                      <Icon
                        category="utility"
                        name={isExpanded ? "chevrondown" : "chevronright"}
                        size="x-small"
                      />
                    </div>

                    {/* Expanded Details - Show minimal info for committed lines */}
                    {isExpanded && (
                      <div style={{ padding: '16px', backgroundColor: '#fafaf9', borderTop: '1px solid #dddbda' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Due Date
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {line.dueDate}
                            </div>
                          </div>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Warehouse
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {line.warehouse}
                            </div>
                          </div>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Status
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {line.status === 'production-order-created' && 'Production Order Created'}
                              {line.status === 'using-stock' && 'Committed from Stock'}
                              {line.status === 'cm-po-created' && 'Contract Manufacturing PO Created'}
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        {line.notes && (
                          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fff8e5', borderRadius: '4px', border: '1px solid #fe9339' }}>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Notes
                            </div>
                            <div className="slds-text-body_small" style={{ whiteSpace: 'pre-wrap' }}>
                              {line.notes}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Show message if no lines at all */}
        {openLines.length === 0 && committedLines.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f3f3f3', borderRadius: '4px', border: '1px solid #dddbda' }}>
            <Icon category="utility" name="info" size="large" style={{ fill: '#706e6b', marginBottom: '12px' }} />
            <p className="slds-text-heading_small" style={{ color: '#706e6b', margin: '0 0 8px 0' }}>
              No Order Lines Available
            </p>
            <p className="slds-text-body_small" style={{ color: '#706e6b', margin: 0 }}>
              Order lines will appear here after syncing to SAP.
            </p>
          </div>
        )}
      </div>
    );
  };

  // Render In Production Stage
  const renderInProduction = () => {
    if (!isSyncedToSAP) {
      return (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="warning" size="large" colorVariant="warning" />
          <p className="slds-text-heading_small slds-m-top_medium">No Order Lines Available</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            You cannot create production orders or commit inventory until the opportunity is synced to SAP. Please sync to SAP from the Open stage first.
          </p>
        </div>
      );
    }

    const hasInHouse = productionLines.length > 0;
    const hasCM = cmPurchaseOrders.length > 0;

    if (!hasInHouse && !hasCM) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f3f3f3', borderRadius: '4px', border: '1px solid #dddbda' }}>
          <Icon category="utility" name="info" size="large" style={{ fill: '#706e6b', marginBottom: '12px' }} />
          <p className="slds-text-heading_small" style={{ color: '#706e6b', margin: '0 0 8px 0' }}>
            No Production or Purchase Orders Found
          </p>
          <p className="slds-text-body_small" style={{ color: '#706e6b', margin: 0 }}>
            In-house production orders and contract manufacturing purchase orders will appear here once they are created from the Awaiting Commitment stage.
          </p>
        </div>
      );
    }

    return (
      <div>
        {/* In House Production Section */}
        {hasInHouse && (
          <>
            <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #dddbda' }}>
              <h3 className="slds-text-heading_small" style={{ margin: 0 }}>In House ({productionLines.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: hasCM ? '24px' : '0' }}>
          {[...productionLines]
            .sort((a, b) => {
              // Sort order: blocked first, then delayed, then not-started, then in-progress, then completed last
              const statusOrder = {
                'blocked': 1,
                'delayed': 2,
                'not-started': 3,
                'in-progress': 4,
                'completed': 5
              };
              return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
            })
            .map((pl) => {
            const statusInfo = getStatusBadge(pl.status);
            const isExpanded = expandedItem === pl.id;
            const isEditing = editingNote === pl.id;
            const statusColor = getStatusColor(pl.status);
            const progress = calculateProductionProgress(pl.producedQty, pl.orderedQuantity);

            // Calculate days until scheduled date
            let daysUntilScheduled = null;
            if (pl.scheduledDate) {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const scheduled = new Date(pl.scheduledDate);
              scheduled.setHours(0, 0, 0, 0);
              const diffTime = scheduled - today;
              daysUntilScheduled = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }

            return (
              <div key={pl.id} style={{
                border: '1px solid #dddbda',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                {/* Collapsed Header */}
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderLeft: `4px solid ${statusColor}`,
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => toggleExpand(pl.id)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  {/* Name */}
                  <div style={{ flex: 1 }}>
                    <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                      Line {pl.lineNumber}: {pl.productName}
                    </h5>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                      Produced: {pl.producedQty} / {pl.orderedQuantity} {pl.uom} ({progress}%)
                    </div>
                  </div>

                  {/* Status and Schedule Badges */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Badge color={statusInfo.color} content={statusInfo.label} />
                    {pl.scheduledDate && daysUntilScheduled !== null && pl.status !== 'completed' && (
                      <Badge
                        color={daysUntilScheduled === 0 ? 'success' : daysUntilScheduled < 0 ? 'error' : 'light'}
                        content={
                          daysUntilScheduled === 0 ? 'Scheduled Today' :
                          daysUntilScheduled === 1 ? 'Scheduled in 1 Day' :
                          daysUntilScheduled > 1 ? `Scheduled in ${daysUntilScheduled} Days` :
                          daysUntilScheduled === -1 ? 'Scheduled 1 Day Ago' :
                          `Scheduled ${Math.abs(daysUntilScheduled)} Days Ago`
                        }
                      />
                    )}
                  </div>

                  {/* Expand/Collapse Icon */}
                  <Icon
                    category="utility"
                    name={isExpanded ? "chevrondown" : "chevronright"}
                    size="x-small"
                  />
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ padding: '16px', backgroundColor: '#fafaf9', borderTop: '1px solid #dddbda' }}>
                    {/* Progress Bar */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span className="slds-text-body_small" style={{ fontWeight: '600' }}>Production Progress</span>
                        <span className="slds-text-body_small" style={{ color: '#706e6b' }}>{progress}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e5e5', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${progress}%`,
                          height: '100%',
                          backgroundColor: progress === 100 ? '#2e844a' : '#0176d3',
                          transition: 'width 0.3s'
                        }} />
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Production Order
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {pl.productionOrderNumber}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Item Code
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {pl.itemCode}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Warehouse
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {pl.warehouse}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Operator
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {pl.operator}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Start Date
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {pl.startDate}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Est. Completion
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {pl.estimatedCompletion}
                        </div>
                      </div>
                    </div>

                    {/* Notes Section */}
                    {pl.notes && !isEditing && (
                      <div style={{
                        marginBottom: '16px',
                        padding: '12px',
                        backgroundColor: '#e6f7e6',
                        borderRadius: '4px',
                        border: '1px solid #2e844a'
                      }}>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                          Notes
                        </div>
                        <div className="slds-text-body_small" style={{ fontStyle: 'italic' }}>
                          {pl.notes}
                        </div>
                      </div>
                    )}

                    {/* Note Editor */}
                    {isEditing && (
                      <div style={{ marginBottom: '16px' }}>
                        <Input
                          id={`note-${pl.id}`}
                          label="Notes"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Add details about this production line..."
                        />
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                          <Button
                            label="Save"
                            variant="brand"
                            onClick={() => handleNoteSave(pl.id, 'productionLine')}
                          />
                          <Button
                            label="Cancel"
                            variant="neutral"
                            onClick={handleNoteCancel}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {pl.status === 'not-started' && (
                        <Button
                          label="Issue for Production"
                          variant="brand"
                          iconCategory="utility"
                          iconName="right"
                          iconPosition="left"
                          onClick={() => handleStatusChange(pl.id, 'in-progress', 'productionLine')}
                        />
                      )}
                      {pl.status === 'in-progress' && (
                        <>
                          <Button
                            label="Receive from Production"
                            variant="success"
                            iconCategory="utility"
                            iconName="check"
                            iconPosition="left"
                            onClick={() => handleStatusChange(pl.id, 'completed', 'productionLine')}
                          />
                          <Button
                            label="Mark as Delayed"
                            variant="destructive"
                            iconCategory="utility"
                            iconName="warning"
                            iconPosition="left"
                            onClick={() => handleStatusChange(pl.id, 'delayed', 'productionLine')}
                          />
                        </>
                      )}
                      {pl.status === 'delayed' && (
                        <Button
                          label="Resume Production"
                          variant="brand"
                          iconCategory="utility"
                          iconName="refresh"
                          iconPosition="left"
                          onClick={() => handleStatusChange(pl.id, 'in-progress', 'productionLine')}
                        />
                      )}
                      {pl.status === 'completed' && (
                        <Button
                          label="Reset to In Progress"
                          variant="neutral"
                          iconCategory="utility"
                          iconName="undo"
                          iconPosition="left"
                          onClick={() => handleStatusChange(pl.id, 'in-progress', 'productionLine')}
                        />
                      )}
                      {!isEditing && (
                        <Button
                          label={pl.notes ? "Edit Note" : "Add Note"}
                          variant="neutral"
                          iconCategory="utility"
                          iconName="edit"
                          iconPosition="left"
                          onClick={() => handleNoteEdit(pl.id, pl.notes)}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
            </div>
          </>
        )}

        {/* Contract Manufacturing Section */}
        {hasCM && (
          <>
            <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #dddbda' }}>
              <h3 className="slds-text-heading_small" style={{ margin: 0 }}>Contract Manufacturing ({cmPurchaseOrders.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[...cmPurchaseOrders]
                .sort((a, b) => {
                  // Sort order: not-received first, then received
                  const statusOrder = {
                    'not-received': 1,
                    'received': 2
                  };
                  return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
                })
                .map((po) => {
                const isExpanded = expandedItem === po.id;
                const isReceived = po.status === 'received';
                const statusColor = isReceived ? '#2e844a' : '#fe9339'; // Green for received, orange for not received

                return (
                  <div key={po.id} style={{
                    border: '1px solid #dddbda',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    {/* Collapsed Header */}
                    <div
                      style={{
                        padding: '12px 16px',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderLeft: `4px solid ${statusColor}`,
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => toggleExpand(po.id)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      {/* Name */}
                      <div style={{ flex: 1 }}>
                        <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                          Line {po.lineNumber}: {po.productName}
                        </h5>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                          {po.poNumber} • Vendor: {po.vendor} • Quantity: {po.orderedQuantity} {po.uom}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <Badge
                        color={isReceived ? 'success' : 'warning'}
                        content={isReceived ? 'Received' : 'Not Received'}
                      />

                      {/* Expand/Collapse Icon */}
                      <Icon
                        category="utility"
                        name={isExpanded ? "chevrondown" : "chevronright"}
                        size="x-small"
                      />
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div style={{ padding: '16px', backgroundColor: '#fafaf9', borderTop: '1px solid #dddbda' }}>
                        {/* Details Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Purchase Order
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {po.poNumber}
                            </div>
                          </div>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Item Code
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {po.itemCode}
                            </div>
                          </div>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Warehouse
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {po.warehouse}
                            </div>
                          </div>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Vendor
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {po.vendor}
                            </div>
                          </div>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Order Date
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {po.orderDate}
                            </div>
                          </div>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Expected Delivery
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {po.expectedDelivery}
                            </div>
                          </div>
                          <div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                              Ordered Quantity
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                              {po.orderedQuantity} {po.uom}
                            </div>
                          </div>
                          {isReceived && (
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                                Received Quantity
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: '600', color: '#2e844a' }}>
                                {po.receivedQuantity} {po.uom}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Pre-Receive Steps */}
                        {!isReceived && (
                          <>
                            <div style={{ marginBottom: '16px', paddingTop: '16px', borderTop: '1px solid #dddbda' }}>
                              <h4 className="slds-text-heading_small" style={{ marginBottom: '12px' }}>Pre-Receive Steps</h4>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {/* Batch Report Received */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: '#fafaf9', borderRadius: '4px' }}>
                                  <div style={{ flex: 1 }}>
                                    <span className="slds-text-body_small" style={{ fontWeight: '600' }}>Batch Report Received</span>
                                    {po.batchReportReceived === 'completed' && <Badge color="success" content="Completed" style={{ marginLeft: '8px' }} />}
                                    {po.batchReportReceived === 'skipped' && <Badge color="light" content="Skipped" style={{ marginLeft: '8px' }} />}
                                  </div>
                                  {po.batchReportReceived === 'pending' && (
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                      <Button
                                        label="Complete"
                                        variant="brand"
                                        onClick={() => handleCMStepAction(po.id, 'batchReportReceived', 'completed')}
                                      />
                                      <Button
                                        label="Skip"
                                        variant="neutral"
                                        onClick={() => handleCMStepAction(po.id, 'batchReportReceived', 'skipped')}
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* Sample Sent to Hazlet */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: '#fafaf9', borderRadius: '4px' }}>
                                  <div style={{ flex: 1 }}>
                                    <span className="slds-text-body_small" style={{ fontWeight: '600' }}>Sample Sent to Hazlet</span>
                                    {po.sampleSentToHazlet === 'completed' && <Badge color="success" content="Completed" style={{ marginLeft: '8px' }} />}
                                    {po.sampleSentToHazlet === 'skipped' && <Badge color="light" content="Skipped" style={{ marginLeft: '8px' }} />}
                                  </div>
                                  {po.sampleSentToHazlet === 'pending' && (
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                      <Button
                                        label="Complete"
                                        variant="brand"
                                        onClick={() => handleCMStepAction(po.id, 'sampleSentToHazlet', 'completed')}
                                      />
                                      <Button
                                        label="Skip"
                                        variant="neutral"
                                        onClick={() => handleCMStepAction(po.id, 'sampleSentToHazlet', 'skipped')}
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* COA Sent Electronically */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: '#fafaf9', borderRadius: '4px' }}>
                                  <div style={{ flex: 1 }}>
                                    <span className="slds-text-body_small" style={{ fontWeight: '600' }}>COA Sent Electronically</span>
                                    {po.coaSentElectronically === 'completed' && <Badge color="success" content="Completed" style={{ marginLeft: '8px' }} />}
                                    {po.coaSentElectronically === 'skipped' && <Badge color="light" content="Skipped" style={{ marginLeft: '8px' }} />}
                                  </div>
                                  {po.coaSentElectronically === 'pending' && (
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                      <Button
                                        label="Complete"
                                        variant="brand"
                                        onClick={() => handleCMStepAction(po.id, 'coaSentElectronically', 'completed')}
                                      />
                                      <Button
                                        label="Skip"
                                        variant="neutral"
                                        onClick={() => handleCMStepAction(po.id, 'coaSentElectronically', 'skipped')}
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* Label Approval */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: '#fafaf9', borderRadius: '4px' }}>
                                  <div style={{ flex: 1 }}>
                                    <span className="slds-text-body_small" style={{ fontWeight: '600' }}>Label Approval</span>
                                    {po.labelApproval === 'completed' && <Badge color="success" content="Completed" style={{ marginLeft: '8px' }} />}
                                    {po.labelApproval === 'skipped' && <Badge color="light" content="Skipped" style={{ marginLeft: '8px' }} />}
                                  </div>
                                  {po.labelApproval === 'pending' && (
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                      <Button
                                        label="Complete"
                                        variant="brand"
                                        onClick={() => handleCMStepAction(po.id, 'labelApproval', 'completed')}
                                      />
                                      <Button
                                        label="Skip"
                                        variant="neutral"
                                        onClick={() => handleCMStepAction(po.id, 'labelApproval', 'skipped')}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Receive from Vendor Button */}
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              <Button
                                label="Receive from Vendor"
                                variant="brand"
                                iconCategory="utility"
                                iconName="check"
                                iconPosition="left"
                                onClick={() => handleReceiveCMPO(po.id)}
                                disabled={
                                  po.batchReportReceived === 'pending' ||
                                  po.sampleSentToHazlet === 'pending' ||
                                  po.coaSentElectronically === 'pending' ||
                                  po.labelApproval === 'pending'
                                }
                              />
                            </div>
                          </>
                        )}

                        {isReceived && (
                          <div style={{
                            padding: '12px',
                            backgroundColor: '#e6f7e6',
                            borderRadius: '4px',
                            border: '1px solid #2e844a',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <Icon category="utility" name="success" size="small" colorVariant="success" />
                            <div>
                              <div className="slds-text-heading_small">Purchase Order Received</div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                                This order has been received and is now available for testing.
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };

  // Render In Testing Stage
  const renderInTesting = () => {
    if (!isSyncedToSAP) {
      return (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="warning" size="large" colorVariant="warning" />
          <p className="slds-text-heading_small slds-m-top_medium">No Order Lines Available</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            You cannot create production orders or commit inventory until the opportunity is synced to SAP. Please sync to SAP from the Open stage first.
          </p>
        </div>
      );
    }

    if (tests.length === 0) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f3f3f3', borderRadius: '4px', border: '1px solid #dddbda' }}>
          <Icon category="utility" name="info" size="large" style={{ fill: '#706e6b', marginBottom: '12px' }} />
          <p className="slds-text-heading_small" style={{ color: '#706e6b', margin: '0 0 8px 0' }}>
            No Tests Available
          </p>
          <p className="slds-text-body_small" style={{ color: '#706e6b', margin: 0 }}>
            Tests will appear here once production orders are completed and received from production.
          </p>
        </div>
      );
    }

    return (
      <div>
        {/* Production Order Tests List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[...tests]
            .sort((a, b) => {
              // Sort order: Failed first, then has failures, then in progress, then not started, then all passed last
              const getStatusPriority = (testGroup) => {
                const allPassed = testGroup.individualTests.every(t => t.status === 'passed');
                const hasFailed = testGroup.individualTests.some(t => t.status === 'failed');
                const allNotStarted = testGroup.individualTests.every(t => t.status === 'not-started');
                const isOverallFailed = testGroup.overallStatus === 'failed';

                if (isOverallFailed) return 1; // Failed - Rework Created (highest priority)
                if (hasFailed) return 2; // Has Failures
                if (!allNotStarted && !allPassed) return 3; // In Progress
                if (allNotStarted) return 4; // Not Started
                if (allPassed) return 5; // All Tests Passed (lowest priority - bottom)
                return 6;
              };

              return getStatusPriority(a) - getStatusPriority(b);
            })
            .map((testGroup) => {
            const isExpanded = expandedItem === testGroup.id;
            const allPassed = testGroup.individualTests.every(t => t.status === 'passed');
            const hasFailed = testGroup.individualTests.some(t => t.status === 'failed');
            const allNotStarted = testGroup.individualTests.every(t => t.status === 'not-started');
            const isOverallFailed = testGroup.overallStatus === 'failed';

            let statusColor = '#706e6b'; // Gray for not started
            let statusBadge = { color: 'light', label: 'Not Started' };

            if (isOverallFailed) {
              statusColor = '#c23934'; // Red
              statusBadge = { color: 'error', label: 'Failed - Rework Created' };
            } else if (allPassed) {
              statusColor = '#2e844a'; // Green
              statusBadge = { color: 'success', label: 'All Tests Passed' };
            } else if (hasFailed) {
              statusColor = '#c23934'; // Red
              statusBadge = { color: 'error', label: 'Has Failures' };
            } else if (!allNotStarted) {
              statusColor = '#0176d3'; // Blue for in-progress
              statusBadge = { color: 'default', label: 'In Progress' };
            }

            return (
              <div key={testGroup.id} style={{
                border: '1px solid #dddbda',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                {/* Collapsed Header - Production Order */}
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderLeft: `4px solid ${statusColor}`,
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => toggleExpand(testGroup.id)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  {/* Name */}
                  <div style={{ flex: 1 }}>
                    <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                      Line {testGroup.lineNumber}: {testGroup.productName}
                    </h5>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                      {testGroup.productionOrderNumber} • {testGroup.individualTests.length} Tests • Received: {testGroup.receivedDate}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge color={statusBadge.color} content={statusBadge.label} />

                  {/* Expand/Collapse Icon */}
                  <Icon
                    category="utility"
                    name={isExpanded ? "chevrondown" : "chevronright"}
                    size="x-small"
                  />
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ padding: '16px', backgroundColor: '#fafaf9', borderTop: '1px solid #dddbda' }}>
                    {/* Production Order Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Item Code
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {testGroup.itemCode}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Quantity
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {testGroup.quantity} {testGroup.uom}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Received Date
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {testGroup.receivedDate}
                        </div>
                      </div>
                    </div>

                    {/* Individual Tests */}
                    <div style={{ marginBottom: '16px' }}>
                      <h4 className="slds-text-heading_small" style={{ marginBottom: '12px' }}>Individual Tests</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {testGroup.individualTests.map((test) => {
                          const testStatusInfo = getStatusBadge(test.status);
                          const testStatusColor = getStatusColor(test.status);

                          return (
                            <div key={test.id} style={{
                              border: '1px solid #dddbda',
                              borderRadius: '4px',
                              padding: '12px',
                              backgroundColor: 'white',
                              borderLeft: `3px solid ${testStatusColor}`
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                                  {test.testName}
                                </h5>
                                <Badge color={testStatusInfo.color} content={testStatusInfo.label} />
                              </div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', marginBottom: '8px' }}>
                                {test.testType} • Tested by: {test.testedBy}
                              </div>
                              <div style={{
                                padding: '8px',
                                backgroundColor: test.status === 'passed' ? '#e6f7e6' : test.status === 'failed' ? '#feded8' : test.status === 'not-started' ? '#f3f3f3' : '#e5f3ff',
                                borderRadius: '4px',
                                marginBottom: '8px'
                              }}>
                                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                                  {test.result}
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {!isOverallFailed && (test.status === 'not-started' || test.status === 'in-progress') && (
                                  <>
                                    <Button
                                      label="Pass"
                                      variant="success"
                                      iconCategory="utility"
                                      iconName="success"
                                      iconPosition="left"
                                      onClick={() => {
                                        handlePassTest(testGroup.id, test.id);
                                        // Collapse the card if all tests passed
                                        const updatedGroup = tests.find(tg => tg.id === testGroup.id);
                                        const willBeAllPassed = updatedGroup?.individualTests.filter(t => t.id !== test.id).every(t => t.status === 'passed');
                                        if (willBeAllPassed) {
                                          setExpandedItem(null);
                                        }
                                      }}
                                    />
                                    <Button
                                      label="Fail"
                                      variant="destructive"
                                      iconCategory="utility"
                                      iconName="error"
                                      iconPosition="left"
                                      onClick={() => handleFailTest(testGroup.id, test.id)}
                                    />
                                  </>
                                )}
                                {!isOverallFailed && test.status === 'failed' && (
                                  <Button
                                    label="Rework"
                                    variant="brand"
                                    iconCategory="utility"
                                    iconName="settings"
                                    iconPosition="left"
                                    onClick={() => handleRework(testGroup.id, test.id)}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Handle creating a delivery from selected lines
  const handleCreateDelivery = () => {
    if (selectedDeliveryLines.length === 0) return;

    const deliveryNumber = `DEL-2026-${String(completedDeliveries.length + accountingDeliveries.length + 1).padStart(3, '0')}`;
    const selectedLines = deliveryLines.filter(line => selectedDeliveryLines.includes(line.id));

    const newDelivery = {
      id: `delivery-${Date.now()}`,
      deliveryNumber: deliveryNumber,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'pending', // Starts as pending in Delivery stage
      lines: selectedLines,
      totalLines: selectedLines.length,
      notes: null,
      invoiceNumber: null,
      invoiceDate: null,
    };

    // Add to completed deliveries (in Delivery stage)
    setCompletedDeliveries(prev => [...prev, newDelivery]);

    // Remove delivered lines from available delivery lines
    setDeliveryLines(prev => prev.filter(line => !selectedDeliveryLines.includes(line.id)));

    // Clear selection
    setSelectedDeliveryLines([]);
  };

  // Handle marking delivery as completed (moves to Accounting)
  const handleCompleteDelivery = (deliveryId) => {
    const delivery = completedDeliveries.find(d => d.id === deliveryId);
    if (!delivery) return;

    // Update deliveryStatus to 'completed' for all lines in this delivery
    delivery.lines.forEach(line => {
      // Check if this line is from stock (orderLines)
      if (line.testGroupId === null) {
        setOrderLines(prev => prev.map(ol =>
          ol.id === line.id ? { ...ol, deliveryStatus: 'completed' } : ol
        ));
      } else {
        // This line is from production (tests)
        setTests(prev => prev.map(tg =>
          tg.id === line.testGroupId ? { ...tg, deliveryStatus: 'completed' } : tg
        ));
      }
    });

    // Update status in completed deliveries to 'completed'
    setCompletedDeliveries(prev => prev.map(d =>
      d.id === deliveryId ? { ...d, status: 'completed' } : d
    ));

    // Add to accounting deliveries
    setAccountingDeliveries(prev => [...prev, { ...delivery, status: 'delivered' }]);
  };

  // Handle adding individual line to delivery (from SalesOrderLinesReadyToShip)
  const handleAddLineToDelivery = (lineId, source) => {
    let lineData = null;

    if (source === 'stock') {
      // Find the order line
      const orderLine = orderLines.find(line => line.id === lineId);
      if (!orderLine) return;

      lineData = {
        id: orderLine.id,
        testGroupId: null,
        productionOrderNumber: 'STOCK',
        productName: orderLine.productName,
        itemCode: orderLine.itemCode,
        lineNumber: orderLine.lineNumber,
        quantity: orderLine.orderedQuantity,
        uom: orderLine.uom,
        status: isBlocked ? 'blocked' : 'ready-for-delivery',
        testsPassedDate: new Date().toISOString().split('T')[0],
        warehouse: orderLine.warehouse,
        notes: 'Shipped from existing inventory',
      };

      // Update orderLines deliveryStatus
      setOrderLines(prev => prev.map(line =>
        line.id === lineId ? { ...line, deliveryStatus: 'in-delivery' } : line
      ));
    } else if (source === 'production') {
      // Find the test group
      const testGroup = tests.find(test => test.id === lineId);
      if (!testGroup) return;

      lineData = {
        id: testGroup.id,
        testGroupId: testGroup.id,
        productionOrderNumber: testGroup.productionOrderNumber,
        productName: testGroup.productName,
        itemCode: testGroup.itemCode,
        lineNumber: testGroup.lineNumber,
        quantity: testGroup.quantity,
        uom: testGroup.uom,
        status: isBlocked ? 'blocked' : 'ready-for-delivery',
        testsPassedDate: new Date().toISOString().split('T')[0],
        warehouse: '01 - Hazlet',
        notes: 'Shipped after passing all tests',
      };

      // Update testingLines deliveryStatus
      setTests(prev => prev.map(test =>
        test.id === lineId ? { ...test, deliveryStatus: 'in-delivery' } : test
      ));
    }

    if (!lineData) return;

    // Create a delivery record
    const deliveryNumber = `DEL-2026-${String(completedDeliveries.length + accountingDeliveries.length + 1).padStart(3, '0')}`;
    const newDelivery = {
      id: `delivery-${lineId}-${Date.now()}`,
      deliveryNumber: deliveryNumber,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      lines: [lineData],
      totalLines: 1,
      notes: null,
      invoiceNumber: null,
      invoiceDate: null,
    };

    // Add to completed deliveries (in Delivery stage)
    setCompletedDeliveries(prev => [...prev, newDelivery]);
  };

  // Handle completing individual line delivery (from SalesOrderLinesReadyToShip)
  const handleCompleteLineDelivery = (lineId, source) => {
    // Find the delivery that contains this line
    const delivery = completedDeliveries.find(d =>
      d.lines && d.lines.some(line => line.id === lineId)
    );

    if (!delivery) return;

    if (source === 'stock') {
      // Update orderLines deliveryStatus and move to completed
      setOrderLines(prev => prev.map(line =>
        line.id === lineId ? { ...line, deliveryStatus: 'completed', status: 'delivered' } : line
      ));
    } else if (source === 'production') {
      // Update testingLines deliveryStatus and move to completed
      setTests(prev => prev.map(test =>
        test.id === lineId ? { ...test, deliveryStatus: 'completed', status: 'delivered' } : test
      ));
    }

    // Update the delivery status to completed
    setCompletedDeliveries(prev => prev.map(d =>
      d.id === delivery.id ? { ...d, status: 'completed' } : d
    ));

    // Move delivery to accounting
    setAccountingDeliveries(prev => [...prev, { ...delivery, status: 'delivered' }]);

    // Move current stage to accounting if all items are delivered
    const allOrderLinesDelivered = orderLines.every(line =>
      line.status !== 'pending' || line.deliveryStatus === 'completed'
    );
    const allTestsDelivered = tests.every(test =>
      test.status !== 'passed' || test.deliveryStatus === 'completed'
    );

    if (allOrderLinesDelivered && allTestsDelivered && deliveryLines.length === 0) {
      setCurrentStage('accounting');
    }
  };

  // Toggle invoice selection for bulk invoice creation
  const toggleInvoiceSelection = (deliveryId) => {
    setSelectedInvoices(prev => {
      if (prev.includes(deliveryId)) {
        return prev.filter(id => id !== deliveryId);
      } else {
        return [...prev, deliveryId];
      }
    });
  };

  // Handle creating invoices for selected deliveries (bulk operation)
  const handleCreateInvoices = () => {
    if (selectedInvoices.length === 0) return;

    setAccountingDeliveries(prev => prev.map(delivery => {
      if (selectedInvoices.includes(delivery.id)) {
        const invoiceNumber = `INV-2026-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
        const invoiceDate = new Date().toISOString().split('T')[0];

        return {
          ...delivery,
          status: 'completed',
          invoiceNumber: invoiceNumber,
          invoiceDate: invoiceDate,
          invoiceStatus: 'sent'
        };
      }
      return delivery;
    }));

    // Clear selection
    setSelectedInvoices([]);

    // Close expanded state
    setExpandedItem(null);
  };

  // Handle creating an invoice for a delivery (in Accounting stage)
  const handleCreateInvoice = (deliveryId) => {
    const invoiceNumber = `INV-2026-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    const invoiceDate = new Date().toISOString().split('T')[0];

    setAccountingDeliveries(prev => prev.map(delivery =>
      delivery.id === deliveryId ? {
        ...delivery,
        status: 'completed',
        invoiceNumber: invoiceNumber,
        invoiceDate: invoiceDate,
        invoiceStatus: 'sent'
      } : delivery
    ));

    // Collapse the card when invoice is completed
    setExpandedItem(null);
  };

  // Handle blocking the order
  const handleBlockOrder = () => {
    // Save current statuses before blocking
    const statusSnapshot = {
      orderLines: orderLines.map(line => ({ id: line.id, status: line.status })),
      productionLines: productionLines.map(line => ({ id: line.id, status: line.status })),
      cmPurchaseOrders: cmPurchaseOrders.map(po => ({ id: po.id, status: po.status })),
      tests: tests.map(test => ({ id: test.id, status: test.status })),
      deliveryLines: deliveryLines.map(line => ({ id: line.id, status: line.status })),
      completedDeliveries: completedDeliveries.map(del => ({ id: del.id, status: del.status })),
      accountingDeliveries: accountingDeliveries.map(del => ({
        id: del.id,
        status: del.status,
        // Don't save invoice-related fields as we won't block those
      }))
    };
    setPreviousStatuses(statusSnapshot);

    // Set all non-completed items to 'blocked' (only block 'pending' lines, not committed ones)
    setOrderLines(prev => prev.map(line =>
      line.status === 'pending' ? { ...line, status: 'blocked' } : line
    ));
    setProductionLines(prev => prev.map(line =>
      line.status !== 'completed' ? { ...line, status: 'blocked' } : line
    ));
    setCmPurchaseOrders(prev => prev.map(po =>
      po.status !== 'received' && po.status !== 'in-testing' ? { ...po, status: 'blocked' } : po
    ));
    // Don't block tests in In Testing stage - tests should continue
    // setTests is not called here
    setDeliveryLines(prev => prev.map(line =>
      line.status !== 'completed' ? { ...line, status: 'blocked' } : line
    ));
    setCompletedDeliveries(prev => prev.map(del =>
      del.status !== 'completed' ? { ...del, status: 'blocked' } : del
    ));
    // Don't block accounting deliveries - invoices can still be sent when order is blocked
    // setAccountingDeliveries is not called here

    setIsBlocked(true);
  };

  // Handle unblocking the order
  const handleUnblockOrder = () => {
    if (!previousStatuses) {
      setIsBlocked(false);
      return;
    }

    // Restore previous statuses
    setOrderLines(prev => prev.map(line => {
      const savedStatus = previousStatuses.orderLines.find(s => s.id === line.id);
      return savedStatus && line.status === 'blocked' ? { ...line, status: savedStatus.status } : line;
    }));
    setProductionLines(prev => prev.map(line => {
      const savedStatus = previousStatuses.productionLines.find(s => s.id === line.id);
      return savedStatus && line.status === 'blocked' ? { ...line, status: savedStatus.status } : line;
    }));
    setCmPurchaseOrders(prev => prev.map(po => {
      const savedStatus = previousStatuses.cmPurchaseOrders.find(s => s.id === po.id);
      return savedStatus && po.status === 'blocked' ? { ...po, status: savedStatus.status } : po;
    }));
    // Tests are not blocked, so no need to restore them
    // setTests is not called here
    setDeliveryLines(prev => prev.map(line => {
      const savedStatus = previousStatuses.deliveryLines.find(s => s.id === line.id);
      // If line was in previous statuses, restore it
      // If line is blocked but NOT in previous statuses, it was created while blocked - set to ready-for-delivery
      if (savedStatus && line.status === 'blocked') {
        return { ...line, status: savedStatus.status };
      } else if (!savedStatus && line.status === 'blocked') {
        return { ...line, status: 'ready-for-delivery' };
      }
      return line;
    }));
    setCompletedDeliveries(prev => prev.map(del => {
      const savedStatus = previousStatuses.completedDeliveries.find(s => s.id === del.id);
      return savedStatus && del.status === 'blocked' ? { ...del, status: savedStatus.status } : del;
    }));
    setAccountingDeliveries(prev => prev.map(del => {
      const savedStatus = previousStatuses.accountingDeliveries.find(s => s.id === del.id);
      return savedStatus && del.status === 'blocked' ? { ...del, status: savedStatus.status } : del;
    }));

    setPreviousStatuses(null);
    setIsBlocked(false);
  };

  // Toggle checkbox selection
  const toggleDeliveryLineSelection = (lineId) => {
    setSelectedDeliveryLines(prev => {
      if (prev.includes(lineId)) {
        return prev.filter(id => id !== lineId);
      } else {
        return [...prev, lineId];
      }
    });
  };

  // Render Delivery Stage
  const renderDelivery = () => {
    if (!isSyncedToSAP) {
      return (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="warning" size="large" colorVariant="warning" />
          <p className="slds-text-heading_small slds-m-top_medium">No Order Lines Available</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            You cannot create production orders or commit inventory until the opportunity is synced to SAP. Please sync to SAP from the Open stage first.
          </p>
        </div>
      );
    }

    // Filter out delivery lines that have been added to individual deliveries
    // Check if the corresponding orderLine or testGroup has deliveryStatus set
    const availableDeliveryLines = deliveryLines.filter(line => {
      // Check if this line corresponds to a stock item that has been added to delivery
      const orderLine = orderLines.find(ol => ol.id === line.id || `delivery-stock-${ol.id}` === line.id);
      if (orderLine && orderLine.deliveryStatus) {
        return false; // Filter out - already added to delivery
      }

      // Check if this line corresponds to a test group that has been added to delivery
      const testGroup = tests.find(tg => tg.id === line.testGroupId);
      if (testGroup && testGroup.deliveryStatus) {
        return false; // Filter out - already added to delivery
      }

      return true; // Include in available lines
    });

    const hasAvailableLines = availableDeliveryLines.length > 0;
    const hasCompletedDeliveries = completedDeliveries.length > 0;

    if (!hasAvailableLines && !hasCompletedDeliveries) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f3f3f3', borderRadius: '4px', border: '1px solid #dddbda' }}>
          <Icon category="utility" name="info" size="large" style={{ fill: '#706e6b', marginBottom: '12px' }} />
          <p className="slds-text-heading_small" style={{ color: '#706e6b', margin: '0 0 8px 0' }}>
            No Lines Available for Delivery
          </p>
          <p className="slds-text-body_small" style={{ color: '#706e6b', margin: 0 }}>
            Lines will appear here once all tests have passed for a production order.
          </p>
        </div>
      );
    }

    return (
      <div>
        {/* Available for Delivery Section */}
        {hasAvailableLines && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 className="slds-text-heading_small">Available for Delivery ({availableDeliveryLines.length})</h3>
              <Button
                label="Add to Delivery"
                variant="brand"
                iconCategory="utility"
                iconName="add"
                iconPosition="left"
                disabled={selectedDeliveryLines.length === 0}
                onClick={handleCreateDelivery}
              />
            </div>

            {/* Delivery Lines List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {availableDeliveryLines.map((line) => {
                const isExpanded = expandedItem === line.id;
                const isSelected = selectedDeliveryLines.includes(line.id);
                const isBlocked = line.status === 'blocked';
                const statusColor = isBlocked ? '#c23934' : '#fe9339'; // Red for blocked, Yellow for ready

                return (
                  <div key={line.id} style={{
                    border: '1px solid #dddbda',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    {/* Collapsed Header */}
                    <div
                      style={{
                        padding: '12px 16px',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        borderLeft: `4px solid ${statusColor}`,
                      }}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleDeliveryLineSelection(line.id)}
                        onClick={(e) => e.stopPropagation()}
                        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                      />

                      {/* Name - clickable area */}
                      <div
                        style={{ flex: 1, cursor: 'pointer' }}
                        onClick={() => toggleExpand(line.id)}
                      >
                        <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                          Line {line.lineNumber}: {line.productName}
                        </h5>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                          {line.productionOrderNumber} • {line.quantity} {line.uom} • Tests Passed: {line.testsPassedDate}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <Badge
                        color={isBlocked ? "error" : "warning"}
                        content={isBlocked ? "Blocked" : "Ready for Delivery"}
                      />

                      {/* Expand/Collapse Icon */}
                      <Icon
                        category="utility"
                        name={isExpanded ? "chevrondown" : "chevronright"}
                        size="x-small"
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleExpand(line.id)}
                      />
                    </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ padding: '16px', backgroundColor: '#fafaf9', borderTop: '1px solid #dddbda' }}>
                    {/* Details Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Item Code
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {line.itemCode}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Quantity
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {line.quantity} {line.uom}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Warehouse
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {line.warehouse}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Tests Passed Date
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                          {line.testsPassedDate}
                        </div>
                      </div>
                      <div>
                        <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                          Status
                        </div>
                        <Badge color={isBlocked ? "error" : "warning"} content={isBlocked ? "Blocked" : "Ready for Delivery"} />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <Button
                        label="View Test Results"
                        variant="neutral"
                        iconCategory="utility"
                        iconName="preview"
                        iconPosition="left"
                        onClick={() => {
                          setSelectedStage('in-testing');
                          setExpandedItem(line.testGroupId);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    )}

    {/* Deliveries Section */}
    {hasCompletedDeliveries && (
      <>
        <div style={{ marginTop: hasAvailableLines ? '24px' : '0', marginBottom: '12px' }}>
          <h3 className="slds-text-heading_small">Deliveries ({completedDeliveries.length})</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[...completedDeliveries]
            .sort((a, b) => {
              // Sort order: pending first, then completed at bottom
              if (a.status === 'pending' && b.status === 'completed') return -1;
              if (a.status === 'completed' && b.status === 'pending') return 1;
              return 0;
            })
            .map((delivery) => {
            const isExpanded = expandedItem === delivery.id;
            const isPending = delivery.status === 'pending';
            const isCompleted = delivery.status === 'completed';
            const isBlocked = delivery.status === 'blocked';
            const statusColor = isCompleted ? '#2e844a' : isBlocked ? '#c23934' : '#fe9339'; // Green for completed, Red for blocked, Orange for pending

            return (
              <div key={delivery.id} style={{
                border: '1px solid #dddbda',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                {/* Collapsed Header */}
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderLeft: `4px solid ${statusColor}`,
                    transition: 'background-color 0.2s'
                  }}
                  onClick={() => toggleExpand(delivery.id)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  {/* Name */}
                  <div style={{ flex: 1 }}>
                    <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                      {delivery.deliveryNumber}
                    </h5>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                      {delivery.totalLines} {delivery.totalLines === 1 ? 'Line' : 'Lines'} • Created: {delivery.createdDate}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge
                    color={isCompleted ? 'success' : isBlocked ? 'error' : 'warning'}
                    content={isCompleted ? 'Completed' : isBlocked ? 'Blocked' : 'Pending'}
                  />

                  {/* Expand/Collapse Icon */}
                  <Icon
                    category="utility"
                    name={isExpanded ? "chevrondown" : "chevronright"}
                    size="x-small"
                  />
                </div>

                {/* Expanded Details - Show Delivery Lines */}
                {isExpanded && (
                  <div style={{ padding: '16px', backgroundColor: '#fafaf9', borderTop: '1px solid #dddbda' }}>
                    {/* Mark as Completed Button - only show for pending deliveries */}
                    {isPending && (
                      <div style={{ marginBottom: '16px' }}>
                        <Button
                          label="Mark as Completed"
                          variant="brand"
                          iconCategory="utility"
                          iconName="check"
                          iconPosition="left"
                          onClick={() => handleCompleteDelivery(delivery.id)}
                        />
                      </div>
                    )}

                    {/* Completed Status */}
                    {isCompleted && (
                      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#e6f7e6', borderRadius: '4px', border: '1px solid #2e844a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Icon category="utility" name="success" size="small" colorVariant="success" />
                          <div>
                            <div className="slds-text-heading_small">Delivery Completed</div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                              This delivery has been completed and sent to Accounting.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px' }}>Delivery Lines</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {delivery.lines.map((line) => (
                        <div key={line.id} style={{
                          border: '1px solid #dddbda',
                          borderRadius: '4px',
                          padding: '12px',
                          backgroundColor: 'white'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                            <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                              Line {line.lineNumber}: {line.productName}
                            </h5>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                                Item Code
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                                {line.itemCode}
                              </div>
                            </div>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                                Quantity
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                                {line.quantity} {line.uom}
                              </div>
                            </div>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                                Production Order
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                                {line.productionOrderNumber}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    )}
      </div>
    );
  };

  // Render Closed Stage
  const renderClosed = () => {
    if (!isSyncedToSAP) {
      return (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="warning" size="large" colorVariant="warning" />
          <p className="slds-text-heading_small slds-m-top_medium">No Order Lines Available</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            You cannot create production orders or commit inventory until the opportunity is synced to SAP. Please sync to SAP from the Open stage first.
          </p>
        </div>
      );
    }

    return (
      <div>
        {/* Summary */}
        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#e6f7e6', borderRadius: '4px', border: '1px solid #2e844a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon category="utility" name="success" size="medium" colorVariant="success" />
            <div>
              <div className="slds-text-heading_small">Opportunity Closed Won</div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                Order fulfilled and invoiced
              </div>
            </div>
          </div>
        </div>

        {/* Shipment Information */}
        <div style={{ marginBottom: '24px' }}>
          <h3 className="slds-text-heading_small" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon category="utility" name="truck" size="small" />
            Shipment Information
          </h3>
          <div style={{ border: '1px solid #dddbda', borderRadius: '4px', padding: '16px', backgroundColor: 'white' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Shipment Number
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.shipment.shipmentNumber}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Carrier
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.shipment.carrier}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Tracking Number
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600', color: '#0176d3', cursor: 'pointer' }}>
                  {closedData.shipment.trackingNumber}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Ship Date
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.shipment.shipDate}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Delivery Date
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.shipment.actualDelivery}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Status
                </div>
                <Badge color="success" content="Delivered" />
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Recipient
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                {closedData.shipment.recipient}
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Delivery Address
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                {closedData.shipment.address}
              </div>
            </div>
            {closedData.shipment.notes && (
              <div style={{ padding: '12px', backgroundColor: '#e6f7e6', borderRadius: '4px', border: '1px solid #2e844a' }}>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Notes
                </div>
                <div className="slds-text-body_small" style={{ fontStyle: 'italic' }}>
                  {closedData.shipment.notes}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Confirmation */}
        <div style={{ marginBottom: '24px' }}>
          <h3 className="slds-text-heading_small" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon category="utility" name="check" size="small" />
            Delivery Confirmation
          </h3>
          <div style={{ border: '1px solid #dddbda', borderRadius: '4px', padding: '16px', backgroundColor: 'white' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Delivery Number
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.delivery.deliveryNumber}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Delivery Date
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.delivery.deliveryDate}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Received By
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.delivery.receivedBy}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Condition
                </div>
                <Badge color="success" content={closedData.delivery.condition.charAt(0).toUpperCase() + closedData.delivery.condition.slice(1)} />
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Pallets
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.delivery.pallets}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Weight
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.delivery.weight} {closedData.delivery.weightUom}
                </div>
              </div>
            </div>
            {closedData.delivery.notes && (
              <div style={{ padding: '12px', backgroundColor: '#e6f7e6', borderRadius: '4px', border: '1px solid #2e844a' }}>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Notes
                </div>
                <div className="slds-text-body_small" style={{ fontStyle: 'italic' }}>
                  {closedData.delivery.notes}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Invoice Information */}
        <div>
          <h3 className="slds-text-heading_small" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon category="utility" name="file" size="small" />
            Invoice Information
          </h3>
          <div style={{ border: '1px solid #dddbda', borderRadius: '4px', padding: '16px', backgroundColor: 'white' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Invoice Number
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.invoice.invoiceNumber}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Invoice Date
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.invoice.invoiceDate}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Amount
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600', fontSize: '16px', color: '#2e844a' }}>
                  ${closedData.invoice.amount.toLocaleString()} {closedData.invoice.currency}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Due Date
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.invoice.dueDate}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Paid Date
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.invoice.paidDate}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Status
                </div>
                <Badge color="success" content="Paid" />
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Payment Method
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                  {closedData.invoice.paymentMethod}
                </div>
              </div>
            </div>
            {closedData.invoice.notes && (
              <div style={{ padding: '12px', backgroundColor: '#e6f7e6', borderRadius: '4px', border: '1px solid #2e844a' }}>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Notes
                </div>
                <div className="slds-text-body_small" style={{ fontStyle: 'italic' }}>
                  {closedData.invoice.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Open Stage
  const renderOpen = () => {
    // Custom cells for the order lines table
    const LineNumberCell = ({ item }) => (
      <DataTableCell>
        <span style={{ fontWeight: '500' }}>{item.lineNumber}</span>
      </DataTableCell>
    );
    LineNumberCell.displayName = DataTableCell.displayName;

    const ProductCell = ({ item }) => (
      <DataTableCell>
        <div>
          <div style={{ fontWeight: '500' }}>{item.productName}</div>
          <div style={{ fontSize: '0.875rem', color: '#706e6b' }}>{item.itemCode}</div>
        </div>
      </DataTableCell>
    );
    ProductCell.displayName = DataTableCell.displayName;

    const QuantityCell = ({ item }) => (
      <DataTableCell>
        <div>
          <span style={{ fontWeight: '500' }}>{item.orderedQuantity}</span>
        </div>
      </DataTableCell>
    );
    QuantityCell.displayName = DataTableCell.displayName;

    const PackSizeCell = ({ item }) => (
      <DataTableCell>
        <span style={{ fontWeight: '500' }}>{item.packSize} kg</span>
      </DataTableCell>
    );
    PackSizeCell.displayName = DataTableCell.displayName;

    const UnitPriceCell = ({ item }) => (
      <DataTableCell>
        <span style={{ fontWeight: '500' }}>${item.unitPrice.toFixed(2)}</span>
      </DataTableCell>
    );
    UnitPriceCell.displayName = DataTableCell.displayName;

    const TotalQtyCell = ({ item }) => {
      const totalKg = item.orderedQuantity * item.packSize;
      return (
        <DataTableCell>
          <span style={{ fontWeight: '600', color: '#0176d3' }}>{totalKg.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg</span>
        </DataTableCell>
      );
    };
    TotalQtyCell.displayName = DataTableCell.displayName;

    const TotalCell = ({ item }) => {
      const totalKg = item.orderedQuantity * item.packSize;
      const total = totalKg * item.unitPrice;
      return (
        <DataTableCell>
          <span style={{ fontWeight: '600', color: '#2e844a' }}>${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </DataTableCell>
      );
    };
    TotalCell.displayName = DataTableCell.displayName;

    if (!isSyncedToSAP) {
      // Calculate totals (quantity is number of packs, packSize is kg per pack)
      const totalKg = initialOrderLinesData.reduce((sum, line) => sum + (line.orderedQuantity * line.packSize), 0);
      const totalDollars = initialOrderLinesData.reduce((sum, line) => sum + (line.orderedQuantity * line.packSize * line.unitPrice), 0);

      // Show order lines table when not synced yet
      return (
        <div style={{ overflowX: 'auto' }}>
          <DataTable items={initialOrderLinesData} id="open-order-lines-table">
            <DataTableColumn label="Line" property="lineNumber" width="5rem">
              <LineNumberCell />
            </DataTableColumn>
            <DataTableColumn label="Item Code" property="itemCode" width="10rem" />
            <DataTableColumn label="Product" property="product" width="15rem">
              <ProductCell />
            </DataTableColumn>
            <DataTableColumn label="Qty" property="orderedQuantity" width="5rem">
              <QuantityCell />
            </DataTableColumn>
            <DataTableColumn label="Pack Size" property="packSize" width="8rem">
              <PackSizeCell />
            </DataTableColumn>
            <DataTableColumn label="Unit Price" property="unitPrice" width="9rem">
              <UnitPriceCell />
            </DataTableColumn>
            <DataTableColumn label="Total Qty" property="totalQty" width="9rem">
              <TotalQtyCell />
            </DataTableColumn>
            <DataTableColumn label="Total" property="total" width="10rem">
              <TotalCell />
            </DataTableColumn>
            <DataTableColumn label="Warehouse" property="warehouse" width="12rem" />
            <DataTableColumn label="Due Date" property="dueDate" width="8rem" />
            <DataTableColumn label="BP Item Code" property="bpItemNumber" width="10rem" />
          </DataTable>
        </div>
      );
    }

    // Synced to SAP
    // Calculate total kg for synced view (quantity is number of packs, packSize is kg per pack)
    const totalKg = initialOrderLinesData.reduce((sum, line) => sum + (line.orderedQuantity * line.packSize), 0);

    return (
      <div>
        <div style={{ padding: '20px', backgroundColor: '#e6f7e6', borderRadius: '4px', border: '1px solid #2e844a', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon category="utility" name="success" size="medium" colorVariant="success" />
            <div>
              <div className="slds-text-heading_small">Successfully Synced to SAP</div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                Sales order created on {sapSyncData.syncDate} at {sapSyncData.syncTime}
              </div>
            </div>
          </div>
        </div>

        <div style={{ border: '1px solid #dddbda', borderRadius: '4px', padding: '16px', backgroundColor: 'white' }}>
          <h3 className="slds-text-heading_small" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon category="utility" name="database" size="small" />
            SAP Sales Order Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Sales Order Number
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600', fontSize: '14px', color: '#0176d3' }}>
                {sapSyncData.salesOrderNumber}
              </div>
            </div>
            <div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Sync Date
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                {sapSyncData.syncDate}
              </div>
            </div>
            <div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Sync Time
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                {sapSyncData.syncTime}
              </div>
            </div>
            <div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Total Weight
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600', fontSize: '14px', color: '#0176d3' }}>
                {totalKg.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg
              </div>
            </div>
            <div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Total Value
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600', fontSize: '14px', color: '#2e844a' }}>
                ${sapSyncData.totalValue.toLocaleString()} {sapSyncData.currency}
              </div>
            </div>
            <div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Payment Terms
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                {sapSyncData.paymentTerms}
              </div>
            </div>
            <div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Delivery Date
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                {sapSyncData.deliveryDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Accounting Stage
  const renderAccounting = () => {
    if (!isSyncedToSAP) {
      return (
        <div className="slds-p-around_large slds-text-align_center">
          <Icon category="utility" name="warning" size="large" colorVariant="warning" />
          <p className="slds-text-heading_small slds-m-top_medium">No Order Lines Available</p>
          <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
            You cannot create production orders or commit inventory until the opportunity is synced to SAP. Please sync to SAP from the Open stage first.
          </p>
        </div>
      );
    }

    if (accountingDeliveries.length === 0) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f3f3f3', borderRadius: '4px', border: '1px solid #dddbda' }}>
          <Icon category="utility" name="info" size="large" style={{ fill: '#706e6b', marginBottom: '12px' }} />
          <p className="slds-text-heading_small" style={{ color: '#706e6b', margin: '0 0 8px 0' }}>
            No Deliveries in Accounting
          </p>
          <p className="slds-text-body_small" style={{ color: '#706e6b', margin: 0 }}>
            Completed deliveries will appear here for invoicing.
          </p>
        </div>
      );
    }

    // Filter deliveries that need invoices
    const deliveriesNeedingInvoice = accountingDeliveries.filter(d => d.status === 'delivered');

    return (
      <div>
        {/* Send Invoices Button */}
        {deliveriesNeedingInvoice.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 className="slds-text-heading_small">Invoices to Send ({deliveriesNeedingInvoice.length})</h3>
            <Button
              label="Send Invoices"
              variant="brand"
              iconCategory="utility"
              iconName="email"
              iconPosition="left"
              disabled={selectedInvoices.length === 0}
              onClick={handleCreateInvoices}
            />
          </div>
        )}

        {/* Accounting Deliveries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[...accountingDeliveries]
            .sort((a, b) => {
              // Sort order: delivered first (needs invoice), then completed at bottom
              if (a.status === 'delivered' && b.status === 'completed') return -1;
              if (a.status === 'completed' && b.status === 'delivered') return 1;
              return 0;
            })
            .map((delivery) => {
            const isExpanded = expandedItem === delivery.id;
            const isDelivered = delivery.status === 'delivered';
            const isCompleted = delivery.status === 'completed';
            const isSelected = selectedInvoices.includes(delivery.id);
            const statusColor = isCompleted ? '#2e844a' : '#0176d3'; // Green for completed, blue for delivered

            return (
              <div key={delivery.id} style={{
                border: '1px solid #dddbda',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                {/* Collapsed Header */}
                <div
                  style={{
                    padding: '12px 16px',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    borderLeft: `4px solid ${statusColor}`,
                  }}
                >
                  {/* Checkbox - only for delivered status */}
                  {isDelivered && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleInvoiceSelection(delivery.id)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                    />
                  )}

                  {/* Name - clickable area */}
                  <div
                    style={{ flex: 1, cursor: 'pointer' }}
                    onClick={() => toggleExpand(delivery.id)}
                  >
                    <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                      {delivery.deliveryNumber}
                    </h5>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '2px' }}>
                      {delivery.totalLines} {delivery.totalLines === 1 ? 'Line' : 'Lines'} • Created: {delivery.createdDate}
                      {isCompleted && delivery.invoiceNumber && ` • Invoice: ${delivery.invoiceNumber}`}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Badge color={isCompleted ? 'success' : 'default'} content={isCompleted ? 'Completed' : 'Delivered'} />
                    {isDelivered && <Badge color="warning" content="Needs Invoice" />}
                  </div>

                  {/* Expand/Collapse Icon */}
                  <Icon
                    category="utility"
                    name={isExpanded ? "chevrondown" : "chevronright"}
                    size="x-small"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleExpand(delivery.id)}
                  />
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div style={{ padding: '16px', backgroundColor: '#fafaf9', borderTop: '1px solid #dddbda' }}>
                    {/* Invoice Information */}
                    {isCompleted && delivery.invoiceNumber && (
                      <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#e6f7e6', borderRadius: '4px', border: '1px solid #2e844a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Icon category="utility" name="success" size="small" colorVariant="success" />
                          <div>
                            <div className="slds-text-heading_small">Invoice Sent</div>
                            <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                              {delivery.invoiceNumber} • Sent: {delivery.invoiceDate} • To: billing@acmecorp.com
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Create Invoice Button */}
                    {isDelivered && (
                      <div style={{ marginBottom: '16px' }}>
                        <Button
                          label="Create Invoice"
                          variant="brand"
                          iconCategory="utility"
                          iconName="file"
                          iconPosition="left"
                          onClick={() => handleCreateInvoice(delivery.id)}
                        />
                      </div>
                    )}

                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px' }}>Delivery Lines</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {delivery.lines.map((line) => (
                        <div key={line.id} style={{
                          border: '1px solid #dddbda',
                          borderRadius: '4px',
                          padding: '12px',
                          backgroundColor: 'white'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                            <h5 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '600' }}>
                              Line {line.lineNumber}: {line.productName}
                            </h5>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                                Item Code
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                                {line.itemCode}
                              </div>
                            </div>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                                Quantity
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                                {line.quantity} {line.uom}
                              </div>
                            </div>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                                Production Order
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                                {line.productionOrderNumber}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Blocked Stage
  const renderBlocked = () => {
    if (!isBlocked) {
      // Not Blocked - show green status
      return (
        <div>
          <div style={{ padding: '20px', backgroundColor: '#e6f7e6', borderRadius: '4px', border: '1px solid #2e844a', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon category="utility" name="success" size="medium" colorVariant="success" />
                <div>
                  <div className="slds-text-heading_small">Opportunity Not Blocked</div>
                  <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                    This opportunity is proceeding normally
                  </div>
                </div>
              </div>
              {currentStage !== 'closed' && (
                <Button
                  label="Block Order"
                  variant="destructive"
                  iconCategory="utility"
                  iconName="ban"
                  iconPosition="left"
                  onClick={handleBlockOrder}
                />
              )}
            </div>
          </div>
        </div>
      );
    } else {
      // Blocked - show red status
      return (
        <div>
          <div style={{ padding: '20px', backgroundColor: '#feded8', borderRadius: '4px', border: '1px solid #c23934', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icon category="utility" name="ban" size="medium" colorVariant="error" />
                <div>
                  <div className="slds-text-heading_small">Opportunity Blocked</div>
                  <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                    This opportunity is currently on hold
                  </div>
                </div>
              </div>
              <Button
                label="Unblock Order"
                variant="success"
                iconCategory="utility"
                iconName="check"
                iconPosition="left"
                onClick={handleUnblockOrder}
              />
            </div>
          </div>
          <div style={{ border: '1px solid #dddbda', borderRadius: '4px', padding: '16px', backgroundColor: 'white' }}>
            <div style={{ marginBottom: '16px' }}>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Reason
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                Awaiting customer approval on formula changes
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Blocked Since
              </div>
              <div className="slds-text-body_small" style={{ fontWeight: '600' }}>
                2026-01-10
              </div>
            </div>
            <div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Notes
              </div>
              <div className="slds-text-body_small" style={{ padding: '12px', backgroundColor: '#fafaf9', borderRadius: '4px', fontStyle: 'italic' }}>
                Customer requested modifications to the polymer blend formula. Waiting for written approval before proceeding with production. Follow-up call scheduled for 2026-01-25.
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  // Calculate pending items for each stage
  const getPendingItemsCount = (stageId) => {
    switch (stageId) {
      case 'awaiting-production':
        // For Awaiting Commitment, we show specific material statuses instead
        return 0;
      case 'in-production':
        // In Production doesn't show pending (shows scheduled/unscheduled/in-progress separately)
        return 0;
      case 'in-testing':
        // Count individual tests that are not-started or in-progress
        return tests.reduce((count, testGroup) => {
          const pendingTests = testGroup.individualTests.filter(test =>
            test.status === 'not-started' || test.status === 'in-progress'
          ).length;
          return count + pendingTests;
        }, 0);
      case 'delivery':
        // Only count pending items in completedDeliveries, not ready items (deliveryLines)
        return completedDeliveries.filter(d => d.status === 'pending').length;
      case 'accounting':
        return accountingDeliveries.filter(d => d.status === 'delivered').length;
      default:
        return 0;
    }
  };

  // Calculate blocked items for each stage
  const getBlockedItemsCount = (stageId) => {
    switch (stageId) {
      case 'awaiting-production':
        return orderLines.filter(line => line.status === 'blocked').length;
      case 'in-production':
        return productionLines.filter(pl => pl.status === 'blocked').length +
               cmPurchaseOrders.filter(po => po.status === 'blocked').length;
      case 'in-testing':
        return tests.filter(t => t.status === 'blocked').length;
      case 'delivery':
        return deliveryLines.filter(d => d.status === 'blocked').length +
               completedDeliveries.filter(d => d.status === 'blocked').length;
      case 'accounting':
        return accountingDeliveries.filter(d => d.status === 'blocked').length;
      default:
        return 0;
    }
  };

  // Calculate delayed items for In Production stage
  const getDelayedItemsCount = (stageId) => {
    if (stageId === 'in-production') {
      return productionLines.filter(pl => pl.status === 'delayed').length;
    }
    return 0;
  };

  // Calculate passed tests for In Testing stage
  const getPassedTestsCount = (stageId) => {
    if (stageId === 'in-testing') {
      // Count individual tests that have passed
      return tests.reduce((count, testGroup) => {
        const passedTests = testGroup.individualTests.filter(test =>
          test.status === 'passed'
        ).length;
        return count + passedTests;
      }, 0);
    }
    return 0;
  };

  // Calculate completed deliveries for Delivery stage
  const getCompletedDeliveriesCount = (stageId) => {
    if (stageId === 'delivery') {
      return completedDeliveries.filter(d => d.status === 'completed').length;
    }
    return 0;
  };

  // Calculate ready for delivery items for Delivery stage
  const getReadyForDeliveryCount = (stageId) => {
    if (stageId === 'delivery') {
      // Filter out delivery lines that have been added to individual deliveries
      const availableLines = deliveryLines.filter(line => {
        // Check if this line corresponds to a stock item that has been added to delivery
        const orderLine = orderLines.find(ol => ol.id === line.id || `delivery-stock-${ol.id}` === line.id);
        if (orderLine && orderLine.deliveryStatus) {
          return false; // Filter out - already added to delivery
        }

        // Check if this line corresponds to a test group that has been added to delivery
        const testGroup = tests.find(tg => tg.id === line.testGroupId);
        if (testGroup && testGroup.deliveryStatus) {
          return false; // Filter out - already added to delivery
        }

        return true; // Include in available lines
      });

      return availableLines.filter(d => d.status !== 'blocked').length;
    }
    return 0;
  };

  // Calculate completed invoices for Accounting stage
  const getCompletedInvoicesCount = (stageId) => {
    if (stageId === 'accounting') {
      return accountingDeliveries.filter(d => d.invoiceNumber && d.status === 'completed').length;
    }
    return 0;
  };

  // Calculate scheduled items for In Production stage (not started but has scheduled date)
  const getScheduledItemsCount = (stageId) => {
    if (stageId === 'in-production') {
      return productionLines.filter(pl => pl.status === 'not-started' && pl.scheduledDate).length;
    }
    return 0;
  };

  // Calculate unscheduled items for In Production stage (not started and no scheduled date)
  const getUnscheduledItemsCount = (stageId) => {
    if (stageId === 'in-production') {
      return productionLines.filter(pl => pl.status === 'not-started' && !pl.scheduledDate).length +
             cmPurchaseOrders.filter(po => po.status === 'not-received').length;
    }
    return 0;
  };

  // Calculate available items for Awaiting Commitment stage (pending with raw materials available and not enough stock)
  const getAvailableItemsCount = (stageId) => {
    if (stageId === 'awaiting-production') {
      return orderLines.filter(line => {
        const totalKg = line.orderedQuantity * line.packSize;
        return line.status === 'pending' &&
          line.rawMaterialsStatus === 'available' &&
          line.currentStock < totalKg;
      }).length;
    }
    return 0;
  };

  // Calculate available to ship items for Awaiting Commitment stage (pending with sufficient stock)
  const getAvailableToShipCount = (stageId) => {
    if (stageId === 'awaiting-production') {
      return orderLines.filter(line => {
        const totalKg = line.orderedQuantity * line.packSize;
        return line.status === 'pending' &&
          line.currentStock >= totalKg;
      }).length;
    }
    return 0;
  };

  // Calculate short items for Awaiting Commitment stage (raw materials short)
  const getShortItemsCount = (stageId) => {
    if (stageId === 'awaiting-production') {
      return orderLines.filter(line =>
        line.status === 'pending' &&
        line.rawMaterialsStatus === 'short'
      ).length;
    }
    return 0;
  };

  // Calculate on order items for Awaiting Commitment stage (raw materials on order)
  const getOnOrderItemsCount = (stageId) => {
    if (stageId === 'awaiting-production') {
      return orderLines.filter(line =>
        line.status === 'pending' &&
        line.rawMaterialsStatus === 'on-order'
      ).length;
    }
    return 0;
  };

  // Calculate committed items for Awaiting Commitment stage
  const getCommittedItemsCount = (stageId) => {
    if (stageId === 'awaiting-production') {
      return orderLines.filter(line =>
        line.status === 'production-order-created' ||
        line.status === 'using-stock' ||
        line.status === 'cm-po-created'
      ).length;
    }
    return 0;
  };

  // Calculate in-progress items for In Production stage
  const getInProgressItemsCount = (stageId) => {
    if (stageId === 'in-production') {
      return productionLines.filter(pl => pl.status === 'in-progress').length;
    }
    return 0;
  };

  // Calculate completed items for In Production stage
  const getCompletedProductionItemsCount = (stageId) => {
    if (stageId === 'in-production') {
      return productionLines.filter(pl => pl.status === 'completed').length;
    }
    return 0;
  };

  // Helper to determine if a stage is completed (comes before current stage)
  const getStageOrder = (stageId) => {
    const order = {
      'open': 0,
      'awaiting-production': 1,
      'in-production': 2,
      'in-testing': 3,
      'delivery': 4,
      'accounting': 5,
      'closed': 6
    };
    return order[stageId] || 99;
  };

  const isStageCompleted = (stageId) => {
    // Special case: Open stage is completed if we've synced to SAP
    if (stageId === 'open') {
      return isSyncedToSAP;
    }

    // A stage is only completed if it comes before the current stage AND we've actually progressed past 'open'
    // If we're still in 'open', no stages should be marked as completed
    if (currentStage === 'open') {
      return false;
    }
    return getStageOrder(stageId) < getStageOrder(currentStage);
  };

  return (
    <div className="slds-p-around_large" style={{ backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <style>{`
        .custom-blue-badge.slds-badge {
          background-color: #0176d3 !important;
          color: white !important;
          border-color: #0176d3 !important;
        }
      `}</style>

      {/* SAP Sync Status Component - 1/2 width */}
      <div style={{ maxWidth: '50%', marginBottom: '24px' }}>
        <div
          style={{
            backgroundColor: sapStatusExpanded ? '#d4edda' : '#f8d7da',
            border: `2px solid ${sapStatusExpanded ? '#28a745' : '#dc3545'}`,
            borderRadius: '4px',
            padding: '16px',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '16px',
            backgroundColor: sapStatusExpanded ? '#28a745' : '#dc3545',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            SAP SYNC STATUS
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: sapStatusExpanded ? '12px' : '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon
                category="utility"
                name={sapStatusExpanded ? 'success' : 'error'}
                size="small"
                style={{ fill: sapStatusExpanded ? '#28a745' : '#dc3545' }}
              />
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: sapStatusExpanded ? '#155724' : '#721c24'
                }}>
                  {sapStatusExpanded ? 'Synced to SAP B1' : 'Not Synced to SAP'}
                </div>
                {!sapStatusExpanded && (
                  <div style={{ fontSize: '12px', color: '#721c24', marginTop: '4px' }}>
                    Sync required to proceed
                  </div>
                )}
              </div>
            </div>

            {!sapStatusExpanded && (
              <Button
                label="Sync to SAP"
                variant="brand"
                iconCategory="utility"
                iconName="sync"
                iconPosition="left"
                onClick={() => setSapStatusExpanded(true)}
              />
            )}
          </div>

          {sapStatusExpanded && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #c3e6cb'
            }}>
              <div>
                <div style={{ fontSize: '10px', color: '#155724', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>
                  SAP Doc Number
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#155724' }}>
                  {sapSyncData.salesOrderNumber}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#155724', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>
                  Sync Date
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#155724' }}>
                  {sapSyncData.syncDate}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#155724', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>
                  Customer Code
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#155724' }}>
                  {sapSyncData.sapCustomerCode}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: '#155724', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>
                  Order Value
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#155724' }}>
                  ${sapSyncData.totalValue.toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ComponentCard label="Opportunity Orchestrator Component">
        {/* Two-column layout: Stages on left 1/3, Details on right 2/3 */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          {/* Left Column: Stages */}
          <div style={{ width: '33.33%', minWidth: '250px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {stages.map(stage => {
                const isCurrentStage = currentStage === stage.id;
                const isSelected = selectedStage === stage.id;
                const isCompleted = isStageCompleted(stage.id);
                const pendingCount = getPendingItemsCount(stage.id);
                const blockedCount = getBlockedItemsCount(stage.id);
                const delayedCount = getDelayedItemsCount(stage.id);
                const passedCount = getPassedTestsCount(stage.id);
                const completedDeliveriesCount = getCompletedDeliveriesCount(stage.id);
                const readyCount = getReadyForDeliveryCount(stage.id);
                const completedInvoicesCount = getCompletedInvoicesCount(stage.id);
                const scheduledCount = getScheduledItemsCount(stage.id);
                const unscheduledCount = getUnscheduledItemsCount(stage.id);
                const availableCount = getAvailableItemsCount(stage.id);
                const availableToShipCount = getAvailableToShipCount(stage.id);
                const shortCount = getShortItemsCount(stage.id);
                const onOrderCount = getOnOrderItemsCount(stage.id);
                const committedCount = getCommittedItemsCount(stage.id);
                const inProgressCount = getInProgressItemsCount(stage.id);
                const completedProductionCount = getCompletedProductionItemsCount(stage.id);

                // Determine background color
                let bgColor = 'white';
                if (isCurrentStage) {
                  bgColor = '#e6f7e6'; // Light green for current stage
                } else if (isCompleted) {
                  bgColor = '#c9edd4'; // Darker green for completed stages
                }

                // Determine border left color
                let borderLeftColor = '#e5e5e5';
                if (isSelected) {
                  borderLeftColor = '#0176d3'; // Blue for selected
                }

                return (
                  <div
                    key={stage.id}
                    style={{
                      padding: '14px 16px',
                      backgroundColor: bgColor,
                      color: '#080707',
                      border: '1px solid #e5e5e5',
                      borderLeft: `4px solid ${borderLeftColor}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      minHeight: '70px',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    }}
                    onClick={() => {
                      setSelectedStage(stage.id);
                      setExpandedItem(null);
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = isCurrentStage ? '#d4f2d4' : isCompleted ? '#b8e6c1' : '#f9f9f9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = bgColor;
                      }
                    }}
                  >
                    <span style={{ fontWeight: isSelected ? '600' : isCurrentStage ? '600' : '400', textAlign: 'left' }}>
                      {stage.label}
                    </span>

                    {/* Show badges */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {/* Show "Ready to Sync" badge for Open stage when not synced and not blocked */}
                      {stage.id === 'open' && !isSyncedToSAP && currentStage === 'open' && !isBlocked && (
                        <Badge
                          color="success"
                          content="Ready to Sync"
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show "Sync Blocked" badge for Open stage when blocked */}
                      {stage.id === 'open' && isBlocked && currentStage === 'open' && (
                        <Badge
                          color="error"
                          content="Sync Blocked"
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show "Synced to SAP" badge for Open stage when synced */}
                      {stage.id === 'open' && isSyncedToSAP && (
                        <Badge
                          color="success"
                          content="Synced to SAP"
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show passed tests count for In Testing stage */}
                      {passedCount > 0 && (
                        <Badge
                          color="success"
                          content={`${passedCount} Passed`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show not started tests count for In Testing stage */}
                      {pendingCount > 0 && stage.id === 'in-testing' && (
                        <Badge
                          color="light"
                          content={`${pendingCount} Not Started`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show completed deliveries count for Delivery stage */}
                      {completedDeliveriesCount > 0 && (
                        <Badge
                          color="success"
                          content={`${completedDeliveriesCount} Completed`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show ready for delivery count for Delivery stage */}
                      {readyCount > 0 && (
                        <Badge
                          color="warning"
                          content={`${readyCount} Ready`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show completed invoices count for Accounting stage */}
                      {completedInvoicesCount > 0 && (
                        <Badge
                          color="success"
                          content={`${completedInvoicesCount} Completed`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show available to produce count for Awaiting Commitment stage */}
                      {availableCount > 0 && stage.id === 'awaiting-production' && (
                        <Badge
                          color="success"
                          content={`${availableCount} Available to Produce`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show available to ship count for Awaiting Commitment stage */}
                      {availableToShipCount > 0 && stage.id === 'awaiting-production' && (
                        <Badge
                          color="success"
                          content={`${availableToShipCount} Available to Ship`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show short items count for Awaiting Commitment stage */}
                      {shortCount > 0 && stage.id === 'awaiting-production' && (
                        <Badge
                          color="error"
                          content={`${shortCount} Short`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show on order items count for Awaiting Commitment stage */}
                      {onOrderCount > 0 && stage.id === 'awaiting-production' && (
                        <Badge
                          color="success"
                          content={`${onOrderCount} On Order`}
                          style={{ fontSize: '10px' }}
                          className="custom-blue-badge"
                        />
                      )}

                      {/* Show committed items count for Awaiting Commitment stage */}
                      {committedCount > 0 && (
                        <Badge
                          color="success"
                          content={`${committedCount} Committed`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show pending items count - only for non-Awaiting Commitment and non-Testing stages */}
                      {pendingCount > 0 && stage.id !== 'awaiting-production' && stage.id !== 'in-testing' && !isCurrentStage && (
                        <Badge
                          color="warning"
                          content={`${pendingCount} Pending`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show scheduled items count for In Production stage */}
                      {scheduledCount > 0 && (
                        <Badge
                          color="default"
                          content={`${scheduledCount} Scheduled`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show unscheduled items count for In Production stage */}
                      {unscheduledCount > 0 && (
                        <Badge
                          color="light"
                          content={`${unscheduledCount} Unscheduled`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show in-progress items count for In Production stage */}
                      {inProgressCount > 0 && (
                        <Badge
                          color="default"
                          content={`${inProgressCount} In Progress`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show completed items count for In Production stage */}
                      {completedProductionCount > 0 && (
                        <Badge
                          color="success"
                          content={`${completedProductionCount} Completed`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show delayed items count for In Production stage */}
                      {delayedCount > 0 && (
                        <Badge
                          color="error"
                          content={`${delayedCount} Delayed`}
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show "Fully Fulfilled" for Closed stage when it's the current stage */}
                      {stage.id === 'closed' && currentStage === 'closed' && (
                        <Badge
                          color="success"
                          content="Fully Fulfilled"
                          style={{ fontSize: '10px' }}
                        />
                      )}

                      {/* Show blocked items count when any items are blocked */}
                      {blockedCount > 0 && (
                        <Badge
                          color="error"
                          content={`${blockedCount} Blocked`}
                          style={{ fontSize: '10px' }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Status Banners and Action Buttons + Stage Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Status Banners and Action Buttons - Top Right */}
            {isBlocked ? (
              // Red banner when blocked
              <div style={{ padding: '20px', backgroundColor: '#feddde', borderRadius: '4px', border: '1px solid #c23934', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon category="utility" name="ban" size="medium" colorVariant="error" />
                    <div>
                      <div className="slds-text-heading_small">Opportunity Blocked</div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                        This opportunity is currently on hold
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {isSyncedToSAP && (
                      <>
                        <Button
                          label="View in SAP B1"
                          variant="brand"
                          iconCategory="utility"
                          iconName="new_window"
                          iconPosition="left"
                        />
                        {currentStage !== 'closed' && (
                          <Button
                            label="Close Short"
                            variant="brand"
                            iconCategory="utility"
                            iconName="close"
                            iconPosition="left"
                            style={{ backgroundColor: '#0176d3', borderColor: '#0176d3' }}
                          />
                        )}
                      </>
                    )}
                    <Button
                      label="Unblock Order"
                      variant="success"
                      iconCategory="utility"
                      iconName="success"
                      iconPosition="left"
                      onClick={handleUnblockOrder}
                    />
                  </div>
                </div>
              </div>
            ) : !isSyncedToSAP ? (
              // Yellow banner when not synced to SAP
              <div style={{ padding: '20px', backgroundColor: '#fff8e5', borderRadius: '4px', border: '1px solid #fe9339', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon category="utility" name="warning" size="medium" colorVariant="warning" />
                    <div>
                      <div className="slds-text-heading_small">Pending Sync to SAP</div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                        This opportunity has not been synced to SAP Business One yet
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      label="Edit"
                      variant="neutral"
                      iconCategory="utility"
                      iconName="edit"
                      iconPosition="left"
                    />
                    <Button
                      label="Sync to SAP"
                      variant="brand"
                      iconCategory="utility"
                      iconName="sync"
                      iconPosition="left"
                      onClick={() => {
                        setIsSyncedToSAP(true);
                        setCurrentStage('awaiting-production');
                        setSelectedStage('awaiting-production');

                        // Populate order lines from SAP
                        setOrderLines(initialOrderLinesData);

                        // Show toast notification
                        setShowToast(true);
                      }}
                    />
                    {currentStage !== 'closed' && (
                      <Button
                        label="Block Order"
                        variant="destructive"
                        iconCategory="utility"
                        iconName="ban"
                        iconPosition="left"
                        onClick={handleBlockOrder}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Just buttons when synced and not blocked
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', gap: '8px' }}>
                <Button
                  label="View in SAP B1"
                  variant="brand"
                  iconCategory="utility"
                  iconName="new_window"
                  iconPosition="left"
                />
                {currentStage !== 'closed' && (
                  <>
                    <Button
                      label="Close Short"
                      variant="brand"
                      iconCategory="utility"
                      iconName="close"
                      iconPosition="left"
                      style={{ backgroundColor: '#0176d3', borderColor: '#0176d3' }}
                    />
                    <Button
                      label="Block Order"
                      variant="destructive"
                      iconCategory="utility"
                      iconName="ban"
                      iconPosition="left"
                      onClick={handleBlockOrder}
                    />
                  </>
                )}
              </div>
            )}

            {/* Stage Content - Scrollable */}
            <div style={{
              height: '600px',
              overflowY: 'auto',
              overflowX: 'auto',
              border: '1px solid #e5e5e5',
              borderRadius: '4px',
              padding: '16px',
              backgroundColor: 'white'
            }}>
              {selectedStage === 'open' && renderOpen()}
              {selectedStage === 'awaiting-production' && renderAwaitingProduction()}
              {selectedStage === 'in-production' && renderInProduction()}
              {selectedStage === 'in-testing' && renderInTesting()}
              {selectedStage === 'delivery' && renderDelivery()}
              {selectedStage === 'accounting' && renderAccounting()}
              {selectedStage === 'closed' && renderClosed()}
            </div>

            {/* Order Totals and Customer Info - Only for Open Stage */}
            {selectedStage === 'open' && !isSyncedToSAP && (
              <div style={{
                marginTop: '12px',
                padding: '16px',
                backgroundColor: '#f3f3f3',
                borderRadius: '4px',
                border: '1px solid #dddbda',
                overflowX: 'auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '32px', minWidth: 'fit-content' }}>
                  {/* Left side: Customer fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 16px', flex: '1' }}>
                    <div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Customer Reference Number
                      </div>
                      <div className="slds-text-body_regular" style={{ fontWeight: '500', fontSize: '13px' }}>
                        GLB-2026-001
                      </div>
                    </div>
                    <div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Close Date
                      </div>
                      <div className="slds-text-body_regular" style={{ fontWeight: '500', fontSize: '13px' }}>
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                      </div>
                    </div>
                    <div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Payment Terms
                      </div>
                      <div className="slds-text-body_regular" style={{ fontWeight: '500', fontSize: '13px' }}>
                        Net 30
                      </div>
                    </div>
                    <div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Price Book
                      </div>
                      <div className="slds-text-body_regular" style={{ fontWeight: '500', fontSize: '13px' }}>
                        Distributor Price Book
                      </div>
                    </div>
                  </div>

                  {/* Right side: Totals */}
                  <div style={{ display: 'flex', gap: '48px' }}>
                    <div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Total Weight
                      </div>
                      <div className="slds-text-heading_medium" style={{ fontWeight: '700', color: '#0176d3' }}>
                        {initialOrderLinesData.reduce((sum, line) => sum + (line.orderedQuantity * line.packSize), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg
                      </div>
                    </div>
                    <div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Total Order Value
                      </div>
                      <div className="slds-text-heading_medium" style={{ fontWeight: '700', color: '#2e844a' }}>
                        ${initialOrderLinesData.reduce((sum, line) => sum + (line.orderedQuantity * line.packSize * line.unitPrice), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ComponentCard>

      {/* Sales Order Lines Ready to Ship Component */}
      <ComponentCard label="Sales Order Lines Ready to Ship Component">
        <SalesOrderLinesReadyToShip
          orderLines={orderLines}
          testingLines={tests}
          onAddToDelivery={handleAddLineToDelivery}
          onCompleteDelivery={handleCompleteLineDelivery}
        />
      </ComponentCard>

      {/* Sales Order Lines Needing Production */}
      <ComponentCard label="Sales Order Lines In Need of Production Order Component">
        <SalesOrderLinesNeedingProduction
          orderLines={orderLines}
          onCreateProductionOrder={handleCreateProductionOrder}
          onOrderMaterials={handleOrderMaterials}
          onReceiveMaterials={handleReceiveMaterials}
        />
      </ComponentCard>

      {/* Production Orders Component */}
      <ComponentCard label="Production Order Overview Component">
        <ProductionOrdersMockup
          productionLines={productionLines}
          onIssueForProduction={handleIssueForProduction}
          onReceiveFromProduction={handleReceiveFromProduction}
          onDelayProduction={handleDelayProduction}
          onUndelayProduction={handleUndelayProduction}
        />
      </ComponentCard>

      {/* Contract Manufacturer Production Orders Component */}
      <ComponentCard label="Contract Manufacturer Production Order Overview Component">
        <CMProductionOrdersMockup cmPurchaseOrders={cmPurchaseOrders} />
      </ComponentCard>

      {/* Production Workload */}
      <ComponentCard label="Production Workload Component">
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
          {/* Unscheduled Orders Column */}
          <div style={{ minWidth: '220px', flex: '0 0 220px' }}>
            <div style={{
              backgroundColor: '#f9f9f9',
              border: '2px solid #dddbda',
              borderRadius: '4px',
              padding: '12px',
              height: '600px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #dddbda' }}>
                <h3 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '700' }}>
                  Unscheduled Orders
                </h3>
                <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                  {getOrdersForColumn('unscheduled').length} orders
                </div>
                <div className="slds-text-body_small" style={{ fontSize: '11px', marginTop: '6px' }}>
                  <div style={{ color: '#0176d3', fontWeight: '600' }}>
                    {getTotalHoursForColumn('unscheduled')} hrs total
                  </div>
                  <div style={{ color: '#fe9339', fontWeight: '500' }}>
                    {getStillOpenHoursForColumn('unscheduled')} hrs open
                  </div>
                </div>
              </div>
              <div
                style={{ flex: 1, overflowY: 'auto' }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'unscheduled')}
              >
                {(() => {
                  const orders = getOrdersForColumn('unscheduled');
                  // Group orders by operator
                  const groupedByOperator = orders.reduce((acc, order) => {
                    const operator = order.operator || 'Unassigned';
                    if (!acc[operator]) acc[operator] = [];
                    acc[operator].push(order);
                    return acc;
                  }, {});

                  return Object.entries(groupedByOperator).map(([operator, operatorOrders]) => (
                    <div key={operator} style={{ marginBottom: '12px' }}>
                      {/* Operator Header with Initials */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid #e5e5e5' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#0176d3',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            fontWeight: '700',
                            flexShrink: 0
                          }}
                        >
                          {operator.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div className="slds-text-body_small" style={{ fontWeight: '600', fontSize: '11px', color: '#080707' }}>
                          {operator} ({operatorOrders.length})
                        </div>
                      </div>
                      {/* Orders for this operator */}
                      {operatorOrders.map(order => renderOrderCard(order, 'unscheduled'))}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Date Columns */}
          {dates.map((dateInfo, index) => {
            const isToday = index === 0;
            const ordersForDay = getOrdersForColumn(dateInfo.id);
            const activeOrders = ordersForDay.filter(o => o.status !== 'completed');
            const completedOrders = ordersForDay.filter(o => o.status === 'completed');

            return (
              <div key={dateInfo.id} style={{ minWidth: '220px', flex: '0 0 220px' }}>
                <div style={{
                  backgroundColor: isToday ? '#e6f7e6' : 'white',
                  border: `2px solid ${isToday ? '#2e844a' : '#dddbda'}`,
                  borderRadius: '4px',
                  padding: '12px',
                  height: '600px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #dddbda' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 className="slds-text-heading_small" style={{ margin: 0, fontWeight: '700' }}>
                        {dateInfo.dayName}
                      </h3>
                      {isToday && <Badge color="success" content="Today" />}
                    </div>
                    <div className="slds-text-body_small" style={{ color: '#706e6b' }}>
                      {dateInfo.monthName} {dateInfo.dayNumber}
                    </div>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginTop: '4px' }}>
                      {activeOrders.length} active • {completedOrders.length} completed
                    </div>
                    <div className="slds-text-body_small" style={{ fontSize: '11px', marginTop: '6px' }}>
                      <div style={{ color: '#0176d3', fontWeight: '600' }}>
                        {getTotalHoursForColumn(dateInfo.id)} hrs total
                      </div>
                      <div style={{ color: '#fe9339', fontWeight: '500' }}>
                        {getStillOpenHoursForColumn(dateInfo.id)} hrs open
                      </div>
                      {getDelayedHoursForColumn(dateInfo.id) > 0 && (
                        <div style={{ color: '#c23934', fontWeight: '500' }}>
                          {getDelayedHoursForColumn(dateInfo.id)} hrs delayed
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{ flex: 1, overflowY: 'auto' }}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, dateInfo.id)}
                  >
                    {/* Active Orders - Grouped by Operator */}
                    {(() => {
                      // Group active orders by operator
                      const groupedByOperator = activeOrders.reduce((acc, order) => {
                        const operator = order.operator || 'Unassigned';
                        if (!acc[operator]) acc[operator] = [];
                        acc[operator].push(order);
                        return acc;
                      }, {});

                      return Object.entries(groupedByOperator).map(([operator, operatorOrders]) => (
                        <div key={operator} style={{ marginBottom: '12px' }}>
                          {/* Operator Header with Initials */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid #e5e5e5' }}>
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#0176d3',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: '700',
                                flexShrink: 0
                              }}
                            >
                              {operator.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600', fontSize: '11px', color: '#080707' }}>
                              {operator} ({operatorOrders.length})
                            </div>
                          </div>
                          {/* Orders for this operator */}
                          {operatorOrders.map(order => renderOrderCard(order, dateInfo.id, false))}
                        </div>
                      ));
                    })()}

                    {/* Separator if there are both active and completed orders */}
                    {activeOrders.length > 0 && completedOrders.length > 0 && (
                      <div style={{
                        margin: '16px 0',
                        borderTop: '2px solid #2e844a',
                        paddingTop: '8px',
                      }}>
                        <div className="slds-text-body_small" style={{ color: '#2e844a', fontWeight: '600', fontSize: '11px', textAlign: 'center' }}>
                          COMPLETED
                        </div>
                      </div>
                    )}

                    {/* Completed Orders - Grouped by Operator */}
                    {(() => {
                      // Group completed orders by operator
                      const groupedByOperator = completedOrders.reduce((acc, order) => {
                        const operator = order.operator || 'Unassigned';
                        if (!acc[operator]) acc[operator] = [];
                        acc[operator].push(order);
                        return acc;
                      }, {});

                      return Object.entries(groupedByOperator).map(([operator, operatorOrders]) => (
                        <div key={operator} style={{ marginBottom: '12px' }}>
                          {/* Operator Header with Initials */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid #e5e5e5' }}>
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#0176d3',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: '700',
                                flexShrink: 0
                              }}
                            >
                              {operator.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <div className="slds-text-body_small" style={{ fontWeight: '600', fontSize: '11px', color: '#080707' }}>
                              {operator} ({operatorOrders.length})
                            </div>
                          </div>
                          {/* Orders for this operator */}
                          {operatorOrders.map(order => renderOrderCard(order, dateInfo.id, true))}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ComponentCard>

      {/* Open Tests Component */}
      <ComponentCard label="Open Tests Overview Component">
        <OpenTestsComponent
          testGroups={tests}
          onPassTest={handlePassTest}
          onFailTest={handleFailTest}
        />
      </ComponentCard>

      {/* Toast notification for successful SAP sync */}
      <ToastContainer>
        {showToast && (
          <Toast
            labels={{
              heading: `Successfully synced to SAP B1 with DocNum. ${sapSyncData.salesOrderNumber}`
            }}
            variant="success"
            onRequestClose={() => setShowToast(false)}
            duration={5000}
          />
        )}
      </ToastContainer>
    </div>
  );
};

export default OpportunitySAPComponents;
