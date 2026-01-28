import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Card from '@salesforce/design-system-react/components/card';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import Badge from '@salesforce/design-system-react/components/badge';
import Alert from '@salesforce/design-system-react/components/alert';
import Icon from '@salesforce/design-system-react/components/icon';
import Combobox from '@salesforce/design-system-react/components/combobox';
import Tabs from '@salesforce/design-system-react/components/tabs';
import TabsPanel from '@salesforce/design-system-react/components/tabs/panel';
import ProgressBar from '@salesforce/design-system-react/components/progress-bar';
import Input from '@salesforce/design-system-react/components/input';

const ProductionOrdersMockup = ({ productionLines = [], onIssueForProduction, onReceiveFromProduction, onDelayProduction, onUndelayProduction }) => {
  // State management
  const [currentView, setCurrentView] = useState('overview');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [expandedRows, setExpandedRows] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [expandedComponent, setExpandedComponent] = useState(null);

  // CM Requirements state
  const [requirements, setRequirements] = useState([
    {
      id: 'req-1',
      type: 'batch_report',
      name: 'Batch Report Emailed',
      description: 'Email batch production report for this batch',
      status: 'completed',
      completedDate: '2025-01-15',
      completedBy: 'Kelly Skochil',
      notes: 'Batch report sent via email on 1/15/2025'
    },
    {
      id: 'req-2',
      type: 'sample',
      name: 'Pre-ship Sample Sent to Hazlet',
      description: 'Send pre-production sample to Hazlet facility for QA approval',
      status: 'completed',
      completedDate: '2025-01-12',
      completedBy: 'Kelly Skochil',
      notes: 'Sample shipped via FedEx tracking #789456123'
    },
    {
      id: 'req-3',
      type: 'coa',
      name: 'COA Sent Electronically',
      description: 'Certificate of Analysis sent via email in PDF format',
      status: 'pending',
      completedDate: null,
      completedBy: null,
      notes: null
    },
    {
      id: 'req-4',
      type: 'label_approval',
      name: 'Label Approval',
      description: 'Final label design approved before printing',
      status: 'completed',
      completedDate: '2025-01-08',
      completedBy: 'John Smith (Internal)',
      notes: 'Approved label design v3 - meets FDA requirements'
    }
  ]);

  const [expandedReq, setExpandedReq] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [tempNote, setTempNote] = useState('');

  const cmProductionOrder = {
    contractManufacturer: 'Koster Keunen',
    quantity: 500,
    uom: 'KG'
  };

  // CM Helper functions
  const getStatusColor = (status) => {
    const colorMap = {
      completed: '#2e844a',
      pending: '#fe9339',
      skipped: '#706e6b',
      'n/a': '#706e6b'
    };
    return colorMap[status] || colorMap.pending;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'success', label: 'Completed', icon: 'success' },
      pending: { color: 'warning', label: 'Pending', icon: 'clock' },
      skipped: { color: 'light', label: 'Skipped', icon: 'skip' },
      'n/a': { color: 'light', label: 'N/A', icon: 'ban' }
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const getRequirementIcon = (type) => {
    const iconMap = {
      'batch_report': 'page',
      'sample': 'product',
      'coa': 'approval',
      'label_approval': 'record_create'
    };
    return iconMap[type] || 'task';
  };

  const calculateProgress = () => {
    const total = requirements.length;
    const completed = requirements.filter(r => r.status === 'completed').length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const handleStatusChange = (reqId, newStatus) => {
    setRequirements(prev => prev.map(req => {
      if (req.id === reqId) {
        return {
          ...req,
          status: newStatus,
          completedDate: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null,
          completedBy: newStatus === 'completed' ? 'Current User' : null
        };
      }
      return req;
    }));
  };

  const handleNoteEdit = (reqId) => {
    const req = requirements.find(r => r.id === reqId);
    setTempNote(req.notes || '');
    setEditingNote(reqId);
  };

  const handleNoteSave = (reqId) => {
    setRequirements(prev => prev.map(req => {
      if (req.id === reqId) {
        return { ...req, notes: tempNote };
      }
      return req;
    }));
    setEditingNote(null);
    setTempNote('');
  };

  const handleNoteCancel = () => {
    setEditingNote(null);
    setTempNote('');
  };

  const toggleExpand = (reqId) => {
    setExpandedReq(expandedReq === reqId ? null : reqId);
  };

  const progress = calculateProgress();
  const allCompleted = progress === 100;

  // Component Card wrapper
  const ComponentCard = ({ title, children, icon, iconCategory = 'standard', actions }) => (
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
          {icon && <Icon category={iconCategory} name={icon} size="small" />}
          <h3 className="slds-text-heading_small" style={{ margin: 0 }}>{title}</h3>
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );

  // Sample customer and opportunity data
  const customerAccount = {
    name: 'Luxe Beauty Corporation',
    businessPartnerNumber: '10234',
    accountBalance: 24567.89,
    daysOverdue: 15
  };

  const opportunity = {
    name: 'Q1 2025 Industrial Equipment Deal',
    opportunityNumber: 'OPP-2025-0042',
    closeDate: '2025-03-31',
    amount: 125000.00,
    stage: 'Negotiation'
  };

  // Transform productionLines prop to match expected format
  const productionOrders = productionLines.map((pl, index) => ({
    id: pl.id,
    orderNumber: pl.productionOrderNumber,
    status: pl.status === 'not-started' ? 'Not Started' :
            pl.status === 'in-progress' ? 'In Progress' :
            pl.status === 'completed' ? 'Completed' :
            pl.status === 'delayed' ? 'Delayed' :
            pl.status === 'blocked' ? 'Blocked' : 'Not Started',
    product: {
      code: pl.itemCode,
      name: pl.productName,
      description: ''
    },
    plannedQty: pl.orderedQuantity,
    actualQty: pl.producedQty || 0,
    uom: pl.uom,
    startDate: pl.scheduledDate || null,
    dueDate: pl.estimatedCompletion,
    priority: pl.priority,
    warehouse: pl.warehouse,
    materialStatus: 'available',
    owner: pl.operator,
    notes: pl.notes || '',
    components: []
  }));

  // Keep the old mock data structure for reference but use empty array
  const _oldProductionOrders = [
    // Scenario 1: Ready to Start
    {
      id: '1',
      orderNumber: 'PO-2024-0015',
      status: 'Released',
      product: {
        code: 'GLB-2335.5D',
        name: 'GLB Custom Witch Hazel 2335 5X GL',
        description: 'Custom formulated witch hazel extract with enhanced potency'
      },
      plannedQty: 500,
      actualQty: 0,
      uom: 'KG',
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
          ],
          batches: [
            { number: '01-120524-10143-001', expiration: '2026-12-05', quantity: 50, binLocation: '01-105-C' },
            { number: '01-111824-10087-002', expiration: '2026-11-18', quantity: 80, binLocation: '01-105-A' }
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
          ],
          batches: [
            { number: '01-121225-10201-001', expiration: '2026-12-12', quantity: 25, binLocation: '01-210-B' }
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
          ],
          batches: [
            { number: '01-110824-PKG100-001', expiration: 'N/A', quantity: 2000, binLocation: '01-PKG-02' }
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
        code: 'GLE-10069',
        name: 'GreenGard PA3',
        description: 'Broad spectrum preservative for personal care applications'
      },
      plannedQty: 300,
      actualQty: 180,
      uom: 'KG',
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
          reserved: 15,
          warehouses: [
            { name: '01 - Hazlet', available: 65, allocated: 15, leadTime: '0 days' }
          ],
          batches: [
            { number: '01-113024-10122-001', expiration: '2026-11-30', quantity: 80, binLocation: '01-302-A' }
          ]
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
          reserved: 1,
          warehouses: [
            { name: '01 - Hazlet', available: 4, allocated: 1, leadTime: '0 days' }
          ],
          batches: [
            { number: '01-121024-10155-002', expiration: '2026-12-10', quantity: 5, binLocation: '01-408-C' }
          ]
        }
      ]
    },
    // Scenario 3: Material Shortage
    {
      id: '3',
      orderNumber: 'PO-2024-0018',
      status: 'Planned',
      product: {
        code: 'GLE-10095',
        name: 'GreenSens P30 MB',
        description: 'Emollient ester with excellent sensory properties'
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
          reserved: 3,
          warehouses: [
            { name: '02 - Crown', available: 12, allocated: 3, leadTime: '0 days' }
          ],
          batches: [
            { number: '02-120224-10095-001', expiration: '2026-12-02', quantity: 15, binLocation: '02-301-A' }
          ]
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
          supplier: 'Premium Ingredients Inc.',
          warehouses: [
            { name: '02 - Crown', available: 0, allocated: 0, leadTime: '5 days' }
          ],
          batches: []
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
          reserved: 0.5,
          warehouses: [
            { name: '02 - Crown', available: 1.5, allocated: 0.5, leadTime: '0 days' }
          ],
          batches: [
            { number: '02-121524-10178-001', expiration: '2026-12-15', quantity: 2, binLocation: '02-405-B' }
          ]
        }
      ]
    },
    // Scenario 4: Partial Materials
    {
      id: '4',
      orderNumber: 'PO-2024-0016',
      status: 'Released',
      product: {
        code: 'GLA-11005',
        name: 'ElderMax BF',
        description: 'Elder berry fruit extract with antioxidant benefits'
      },
      plannedQty: 400,
      actualQty: 0,
      uom: 'KG',
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
          reserved: 10,
          warehouses: [
            { name: '01 - Hazlet', available: 30, allocated: 10, leadTime: '0 days' },
            { name: '02 - Crown', available: 0, allocated: 0, leadTime: '3 days' }
          ],
          batches: [
            { number: '01-111224-10145-001', expiration: '2026-11-12', quantity: 40, binLocation: '01-205-A' }
          ]
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
          reserved: 8,
          warehouses: [
            { name: '01 - Hazlet', available: 42, allocated: 8, leadTime: '0 days' }
          ],
          batches: [
            { number: '01-120124-10138-002', expiration: '2026-12-01', quantity: 50, binLocation: '01-206-B' }
          ]
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
          reserved: 200,
          warehouses: [
            { name: '01 - Hazlet', available: 1300, allocated: 200, leadTime: '0 days' }
          ],
          batches: [
            { number: '01-111024-10099-001', expiration: 'N/A', quantity: 1500, binLocation: '01-PKG-01' }
          ]
        }
      ]
    },
    // Scenario 5: Delayed (Past Due)
    {
      id: '5',
      orderNumber: 'PO-2024-0010',
      status: 'In Production',
      product: {
        code: 'BH6300',
        name: 'GLB Royal Jelly 10GLY',
        description: 'Royal jelly extract in glycerin for skin nourishment'
      },
      plannedQty: 150,
      actualQty: 85,
      uom: 'KG',
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
          reserved: 5,
          warehouses: [
            { name: '02 - Crown', available: 20, allocated: 5, leadTime: '0 days' }
          ],
          batches: [
            { number: '02-110524-10092-001', expiration: '2027-11-05', quantity: 25, binLocation: '02-501-C' }
          ]
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
          reserved: 0.5,
          warehouses: [
            { name: '02 - Crown', available: 0.7, allocated: 0.5, leadTime: '0 days' }
          ],
          batches: [
            { number: '02-112024-10105-002', expiration: '2027-11-20', quantity: 1.2, binLocation: '02-502-A' }
          ]
        }
      ]
    },
    // Scenario 6: Completed
    {
      id: '6',
      orderNumber: 'PO-2024-0008',
      status: 'Closed',
      product: {
        code: 'GLE-10081',
        name: 'GreenSolv Clear',
        description: 'Natural solvent for cosmetic formulations'
      },
      plannedQty: 250,
      actualQty: 250,
      uom: 'KG',
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
          availabilityStatus: 'Available',
          warehouses: [
            { name: '01 - Hazlet', available: 0, allocated: 0, leadTime: '0 days' }
          ],
          batches: [
            { number: '01-120224-10088-001', expiration: '2026-12-02', quantity: 0, binLocation: '01-307-B' }
          ]
        }
      ]
    },
    // Scenario 7: Cancelled
    {
      id: '7',
      orderNumber: 'PO-2024-0014',
      status: 'Cancelled',
      product: {
        code: 'GLE-10054-020',
        name: 'GreenWax GL',
        description: 'Plant-based wax for texture and stability'
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
        code: 'GLE-10050',
        name: 'GreenSoft PG5O',
        description: 'Plant-based emollient for soft skin feel'
      },
      plannedQty: 350,
      actualQty: 0,
      uom: 'KG',
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
          reserved: 10,
          warehouses: [
            { name: '01 - Hazlet', available: 40, allocated: 10, leadTime: '0 days' }
          ],
          batches: [
            { number: '01-121024-10220-001', expiration: '2027-12-10', quantity: 30, binLocation: '01-601-A' },
            { number: '01-110524-10220-002', expiration: '2027-11-05', quantity: 20, binLocation: '01-601-B' }
          ]
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
          reserved: 5,
          warehouses: [
            { name: '01 - Hazlet', available: 25, allocated: 5, leadTime: '0 days' }
          ],
          batches: [
            { number: '01-112024-10225-001', expiration: '2027-11-20', quantity: 30, binLocation: '01-602-C' }
          ]
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
      'Not Started': 'light',
      'In Progress': 'light',
      'Completed': 'success',
      'Delayed': 'error',
      'Blocked': 'error',
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
  }).sort((a, b) => {
    // Sort by Start Date, most recent first
    const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
    const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
    return dateB - dateA; // Most recent first (descending)
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

  const DueDateCell = ({ item }) => {
    const overdue = isOverdue(item);
    return (
      <DataTableCell>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{
            color: overdue ? '#c23934' : undefined,
            fontWeight: overdue ? '500' : undefined
          }}>
            {item.dueDate}
          </span>
          {overdue && (
            <Icon category="utility" name="warning" size="x-small" colorVariant="error" />
          )}
        </div>
      </DataTableCell>
    );
  };
  DueDateCell.displayName = DataTableCell.displayName;

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

  const ActionsCell = ({ item }) => {
    const handleIssue = () => {
      if (onIssueForProduction) {
        onIssueForProduction(item);
      }
    };

    const handleReceive = () => {
      if (onReceiveFromProduction) {
        onReceiveFromProduction(item);
      }
    };

    const handleDelay = () => {
      if (onDelayProduction) {
        onDelayProduction(item);
      }
    };

    const handleUndelay = () => {
      if (onUndelayProduction) {
        onUndelayProduction(item);
      }
    };

    return (
      <DataTableCell>
        <div style={{ display: 'flex', gap: '4px' }}>
          {item.status === 'Not Started' && (
            <div style={{
              display: 'inline-block',
              '--sds-c-button-brand-color-background': '#fe9339',
              '--sds-c-button-brand-color-background-hover': '#dd7a00',
              '--sds-c-button-brand-color-border': '#fe9339'
            }}>
              <Button
                label="Issue"
                variant="brand"
                iconCategory="utility"
                iconName="right"
                iconPosition="left"
                onClick={handleIssue}
              />
            </div>
          )}
          {item.status === 'In Progress' && (
            <>
              <Button
                label="Receive"
                variant="success"
                iconCategory="utility"
                iconName="left"
                iconPosition="left"
                onClick={handleReceive}
              />
              <Button
                label="Delay"
                variant="destructive"
                iconCategory="utility"
                iconName="clock"
                iconPosition="left"
                onClick={handleDelay}
              />
            </>
          )}
          {item.status === 'Delayed' && (
            <Button
              label="Undelay"
              variant="brand"
              iconCategory="utility"
              iconName="forward"
              iconPosition="left"
              onClick={handleUndelay}
            />
          )}
        </div>
      </DataTableCell>
    );
  };
  ActionsCell.displayName = DataTableCell.displayName;

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
                    placeholder="Search orders or products..."
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
                  { id: 'Not Started', label: 'Not Started' },
                  { id: 'In Progress', label: 'In Progress' },
                  { id: 'Completed', label: 'Completed' },
                  { id: 'Delayed', label: 'Delayed' },
                  { id: 'Blocked', label: 'Blocked' }
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
                  { id: '03 - FMI', label: '03 - FMI' }
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

        {/* Production Orders DataTable */}
        <div style={{ overflowX: 'auto' }}>
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
          <DataTableColumn label="Due Date" property="dueDate" width="8rem">
            <DueDateCell />
          </DataTableColumn>
          <DataTableColumn label="Priority" property="priority" width="7rem">
            <PriorityCell />
          </DataTableColumn>
          <DataTableColumn label="Warehouse" property="warehouse" width="10rem" />
          <DataTableColumn label="Material Status" property="materialStatus" width="10rem">
            <MaterialStatusCell />
          </DataTableColumn>
          <DataTableColumn label="Actions" property="actions" width="13rem">
            <ActionsCell />
          </DataTableColumn>
        </DataTable>
        </div>

        {filteredOrders.length === 0 && (
          <div className="slds-p-around_large slds-text-align_center">
            <Icon category="utility" name="search" size="large" colorVariant="light" />
            <p className="slds-text-heading_small slds-m-top_medium">No production orders found</p>
            <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
    </div>
  );

  // Render Detail View
  const renderDetailView = () => {
    if (!selectedOrder) return null;

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

        {/* Header Section */}
        <div style={{ border: '1px solid #dddbda', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ padding: '16px', backgroundColor: '#f0f3f5', borderLeft: '4px solid #706e6b' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button
                  iconCategory="utility"
                  iconName="back"
                  iconSize="large"
                  variant="icon"
                  assistiveText={{ icon: 'Back to Overview' }}
                  onClick={handleBackToOverview}
                />
                <Icon category="standard" name="orders" size="small" />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  Production Order: {selectedOrder.orderNumber}
                </h3>
              </div>
              <div className="slds-button-group">
                <Button label="Issue Materials" variant="brand" disabled />
                <Button label="Complete Order" variant="success" disabled />
                <Button label="Cancel" variant="destructive" disabled />
              </div>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            {/* Product Information */}
            <div style={{ marginBottom: '16px' }}>
              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                Product
              </div>
              <div className="slds-text-heading_medium" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {selectedOrder.product.name}
              </div>
              <div className="slds-text-body_small" style={{ color: '#706e6b' }}>
                {selectedOrder.product.code}
              </div>
              <div className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                {selectedOrder.product.description}
              </div>
            </div>

            {/* Status and Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Status
                </div>
                <Badge
                  color={getStatusBadgeColor(selectedOrder.status)}
                  content={selectedOrder.status}
                />
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Priority
                </div>
                <Badge color={getPriorityBadgeColor(selectedOrder.priority)} content={selectedOrder.priority} />
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Warehouse
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                  {selectedOrder.warehouse}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Owner
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                  {selectedOrder.owner}
                </div>
              </div>
            </div>

            {/* Dates Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Start Date
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                  {selectedOrder.startDate}
                </div>
              </div>
              <div>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Due Date
                </div>
                <div className="slds-text-body_small" style={{ fontWeight: 'bold', color: isOverdue(selectedOrder) ? '#c23934' : undefined }}>
                  {selectedOrder.dueDate}
                  {isOverdue(selectedOrder) && (
                    <Icon category="utility" name="warning" size="x-small" colorVariant="error" style={{ marginLeft: '4px' }} />
                  )}
                </div>
              </div>
              {selectedOrder.completionDate && (
                <div>
                  <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                    Completed
                  </div>
                  <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                    {selectedOrder.completionDate}
                  </div>
                </div>
              )}
            </div>

            {/* Production Progress */}
            {selectedOrder.status !== 'Cancelled' && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                    Production Progress
                  </div>
                  <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                    {selectedOrder.actualQty} / {selectedOrder.plannedQty} {selectedOrder.uom} ({progressPercentage}%)
                  </div>
                </div>
                <ProgressBar value={progressPercentage} color={progressPercentage === 100 ? 'success' : undefined} />
              </div>
            )}

            {/* Notes */}
            {selectedOrder.notes && (
              <div style={{ marginTop: '16px' }}>
                <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                  Notes
                </div>
                <div style={{ padding: '8px 12px', backgroundColor: '#f3f3f3', borderRadius: '4px', fontSize: '13px' }}>
                  {selectedOrder.notes}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Account Panel */}
        <div className="slds-m-top_medium">
          <div style={{ border: '1px solid #dddbda', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ padding: '16px', backgroundColor: '#e8f4f8', borderLeft: '4px solid #0176d3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Icon category="standard" name="account" size="small" />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  Customer Account: {customerAccount.name}
                </h3>
              </div>
              <div style={{ marginLeft: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                      Business Partner #
                    </div>
                    <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                      {customerAccount.businessPartnerNumber}
                    </div>
                  </div>
                  <div>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                      Account Balance
                    </div>
                    <div className="slds-text-body_small" style={{ fontWeight: 'bold', color: customerAccount.daysOverdue > 0 ? '#c23934' : '#080707' }}>
                      ${customerAccount.accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  {customerAccount.daysOverdue > 0 && (
                    <div>
                      <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                        Days Overdue
                      </div>
                      <div className="slds-text-body_small" style={{ color: '#c23934', fontWeight: 'bold' }}>
                        {customerAccount.daysOverdue} days
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity Panel */}
        <div className="slds-m-top_medium">
          <div style={{ border: '1px solid #dddbda', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ padding: '16px', backgroundColor: '#f0f3f5', borderLeft: '4px solid #706e6b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Icon category="standard" name="opportunity" size="small" />
                <h3 className="slds-text-heading_small" style={{ margin: 0 }}>
                  Opportunity: {opportunity.name}
                </h3>
              </div>
              <div style={{ marginLeft: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  <div>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                      Opportunity #
                    </div>
                    <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                      {opportunity.opportunityNumber}
                    </div>
                  </div>
                  <div>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                      Close Date
                    </div>
                    <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                      {new Date(opportunity.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                      Amount
                    </div>
                    <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                      ${opportunity.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div>
                    <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px' }}>
                      Stage
                    </div>
                    <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                      {opportunity.stage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="slds-m-top_medium">
          <Tabs
            id="production-order-tabs"
            selectedIndex={activeTab}
            onSelect={(index) => setActiveTab(index)}
          >
            <TabsPanel label="Components">
              <div className="slds-p-around_medium">
                {selectedOrder.components.length > 0 ? (
                  selectedOrder.components.map((component) => {
                    const isExpanded = expandedComponent === component.id;
                    const remainingQty = calculateRemainingQty(component);

                    return (
                      <Card key={component.id} heading="" style={{ marginBottom: '16px' }}>
                        <div style={{ padding: '16px' }}>
                          {/* Component Header */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                <h3 className="slds-text-heading_small">{component.name}</h3>
                                <Badge color={getAvailabilityBadgeColor(component.availabilityStatus)} content={component.availabilityStatus} />
                              </div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b' }}>
                                {component.itemCode}
                              </div>
                            </div>
                            <Button
                              label={isExpanded ? "Hide Details" : "View Details"}
                              variant="neutral"
                              onClick={() => setExpandedComponent(isExpanded ? null : component.id)}
                            />
                          </div>

                          {/* Component Summary Grid */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', padding: '12px', backgroundColor: '#f3f3f3', borderRadius: '4px' }}>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                                Planned Qty
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                                {component.plannedQty} {component.uom}
                              </div>
                            </div>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                                Issued Qty
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                                {component.issuedQty} {component.uom}
                              </div>
                            </div>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                                Remaining
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                                {remainingQty} {component.uom}
                              </div>
                            </div>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                                Warehouse
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                                {component.warehouse}
                              </div>
                            </div>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                                On Hand
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                                {component.onHand !== undefined ? `${component.onHand} ${component.uom}` : '-'}
                              </div>
                            </div>
                            <div>
                              <div className="slds-text-body_small" style={{ color: '#706e6b', fontSize: '11px', marginBottom: '4px' }}>
                                Reserved
                              </div>
                              <div className="slds-text-body_small" style={{ fontWeight: 'bold' }}>
                                {component.reserved !== undefined ? `${component.reserved} ${component.uom}` : '-'}
                              </div>
                            </div>
                          </div>

                          {/* Expandable Batch Details */}
                          {isExpanded && (
                            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#fef8e8', borderRadius: '4px', border: '1px solid #ddaa00' }}>
                              <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Icon category="utility" name="date_input" size="x-small" />
                                Batch & Expiration Details
                              </h4>
                              {component.batches && component.batches.length > 0 ? (
                                <table className="slds-table slds-table_bordered slds-table_cell-buffer">
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
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {component.batches.map((batch, idx) => (
                                      <tr key={idx}>
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
                                          {batch.quantity}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <p className="slds-text-body_small" style={{ color: '#706e6b', fontStyle: 'italic' }}>
                                  No batch information available - material not in stock
                                </p>
                              )}
                            </div>
                          )}

                          {/* Warehouse Breakdown */}
                          {isExpanded && component.warehouses && component.warehouses.length >= 1 && (
                            <div style={{ marginTop: '16px' }}>
                              <h4 className="slds-text-heading_small" style={{ marginBottom: '12px' }}>
                                Warehouse Breakdown
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
                                  {component.warehouses.map((wh, idx) => (
                                    <tr key={idx}>
                                      <td style={{ padding: '8px', fontWeight: '500' }}>
                                        {wh.name}
                                      </td>
                                      <td style={{ padding: '8px', textAlign: 'right' }}>
                                        {wh.available}
                                      </td>
                                      <td style={{ padding: '8px', textAlign: 'right' }}>
                                        {wh.allocated}
                                      </td>
                                      <td style={{ padding: '8px' }}>
                                        {wh.leadTime}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <div className="slds-p-around_large slds-text-align_center">
                    <p className="slds-text-body_regular slds-text-color_weak">
                      No components defined for this production order
                    </p>
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
                      {getActivityTimeline(selectedOrder).map((activity) => (
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
