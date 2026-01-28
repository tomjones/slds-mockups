import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Icon from '@salesforce/design-system-react/components/icon';
import Badge from '@salesforce/design-system-react/components/badge';
import Avatar from '@salesforce/design-system-react/components/avatar';
import Input from '@salesforce/design-system-react/components/input';

// Component Card wrapper
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

const AccountContactCards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  // Mock activities data
  const activities = [
    // James Wilson activities
    {
      id: 'a1',
      subject: 'Initial discovery call',
      type: 'Call',
      date: '2026-01-18',
      status: 'Completed',
      relatedTo: 'James Wilson',
    },
    {
      id: 'a2',
      subject: 'Follow-up email on proposal',
      type: 'Email',
      date: '2026-01-17',
      status: 'Completed',
      relatedTo: 'James Wilson',
    },
    {
      id: 'a3',
      subject: 'Q4 Strategy Meeting',
      type: 'Meeting',
      date: '2026-01-15',
      status: 'Completed',
      relatedTo: 'James Wilson',
    },
    {
      id: 'a4',
      subject: 'Product demo presentation',
      type: 'Meeting',
      date: '2026-01-12',
      status: 'Completed',
      relatedTo: 'James Wilson',
    },
    {
      id: 'a5',
      subject: 'Contract review call',
      type: 'Call',
      date: '2026-01-10',
      status: 'Completed',
      relatedTo: 'James Wilson',
    },
    // Sarah Chen activities
    {
      id: 'a6',
      subject: 'Quarterly review meeting',
      type: 'Meeting',
      date: '2026-01-19',
      status: 'Completed',
      relatedTo: 'Sarah Chen',
    },
    {
      id: 'a7',
      subject: 'Operations sync call',
      type: 'Call',
      date: '2026-01-17',
      status: 'Completed',
      relatedTo: 'Sarah Chen',
    },
    {
      id: 'a8',
      subject: 'Budget discussion',
      type: 'Email',
      date: '2026-01-15',
      status: 'Completed',
      relatedTo: 'Sarah Chen',
    },
    // Michael Johnson activities
    {
      id: 'a9',
      subject: 'Financial forecast review',
      type: 'Meeting',
      date: '2026-01-15',
      status: 'Completed',
      relatedTo: 'Michael Johnson',
    },
    {
      id: 'a10',
      subject: 'Budget allocation call',
      type: 'Call',
      date: '2026-01-13',
      status: 'Completed',
      relatedTo: 'Michael Johnson',
    },
    {
      id: 'a11',
      subject: 'Q1 planning email',
      type: 'Email',
      date: '2026-01-11',
      status: 'Completed',
      relatedTo: 'Michael Johnson',
    },
    {
      id: 'a12',
      subject: 'Cost reduction strategy meeting',
      type: 'Meeting',
      date: '2026-01-08',
      status: 'Completed',
      relatedTo: 'Michael Johnson',
    },
    // Jennifer Martinez activities
    {
      id: 'a13',
      subject: 'IT infrastructure review',
      type: 'Meeting',
      date: '2026-01-16',
      status: 'Completed',
      relatedTo: 'Jennifer Martinez',
    },
    {
      id: 'a14',
      subject: 'Security update discussion',
      type: 'Call',
      date: '2026-01-14',
      status: 'Completed',
      relatedTo: 'Jennifer Martinez',
    },
    {
      id: 'a15',
      subject: 'System upgrade proposal',
      type: 'Email',
      date: '2026-01-12',
      status: 'Completed',
      relatedTo: 'Jennifer Martinez',
    },
    {
      id: 'a16',
      subject: 'Tech stack evaluation',
      type: 'Meeting',
      date: '2026-01-09',
      status: 'Completed',
      relatedTo: 'Jennifer Martinez',
    },
    // Lisa Thompson activities
    {
      id: 'a17',
      subject: 'Project kickoff meeting',
      type: 'Meeting',
      date: '2026-01-14',
      status: 'Completed',
      relatedTo: 'Lisa Thompson',
    },
    {
      id: 'a18',
      subject: 'Status update call with team',
      type: 'Call',
      date: '2026-01-11',
      status: 'Completed',
      relatedTo: 'Lisa Thompson',
    },
    {
      id: 'a19',
      subject: 'Timeline revision email',
      type: 'Email',
      date: '2026-01-09',
      status: 'Completed',
      relatedTo: 'Lisa Thompson',
    },
    {
      id: 'a20',
      subject: 'Resource allocation meeting',
      type: 'Meeting',
      date: '2026-01-07',
      status: 'Completed',
      relatedTo: 'Lisa Thompson',
    },
    {
      id: 'a21',
      subject: 'Risk assessment call',
      type: 'Call',
      date: '2026-01-05',
      status: 'Completed',
      relatedTo: 'Lisa Thompson',
    },
    // David Park activities
    {
      id: 'a22',
      subject: 'Invoice processing review',
      type: 'Meeting',
      date: '2026-01-12',
      status: 'Completed',
      relatedTo: 'David Park',
    },
    {
      id: 'a23',
      subject: 'Payment terms discussion',
      type: 'Call',
      date: '2026-01-10',
      status: 'Completed',
      relatedTo: 'David Park',
    },
    {
      id: 'a24',
      subject: 'Vendor payment inquiry',
      type: 'Email',
      date: '2026-01-08',
      status: 'Completed',
      relatedTo: 'David Park',
    },
    // Robert Anderson activities
    {
      id: 'a25',
      subject: 'Strategic consulting session',
      type: 'Meeting',
      date: '2026-01-10',
      status: 'Completed',
      relatedTo: 'Robert Anderson',
    },
    {
      id: 'a26',
      subject: 'Market analysis review call',
      type: 'Call',
      date: '2026-01-07',
      status: 'Completed',
      relatedTo: 'Robert Anderson',
    },
    {
      id: 'a27',
      subject: 'Recommendations email',
      type: 'Email',
      date: '2026-01-05',
      status: 'Completed',
      relatedTo: 'Robert Anderson',
    },
    {
      id: 'a28',
      subject: 'Competitive analysis meeting',
      type: 'Meeting',
      date: '2026-01-03',
      status: 'Completed',
      relatedTo: 'Robert Anderson',
    },
    // Emily Rodriguez activities
    {
      id: 'a29',
      subject: 'Contract negotiation meeting',
      type: 'Meeting',
      date: '2026-01-08',
      status: 'Completed',
      relatedTo: 'Emily Rodriguez',
    },
    {
      id: 'a30',
      subject: 'Legal compliance call',
      type: 'Call',
      date: '2026-01-06',
      status: 'Completed',
      relatedTo: 'Emily Rodriguez',
    },
    {
      id: 'a31',
      subject: 'Terms and conditions review',
      type: 'Email',
      date: '2026-01-04',
      status: 'Completed',
      relatedTo: 'Emily Rodriguez',
    },
    // Tom Harris activities
    {
      id: 'a32',
      subject: 'Supply chain coordination',
      type: 'Meeting',
      date: '2026-01-05',
      status: 'Completed',
      relatedTo: 'Tom Harris',
    },
    {
      id: 'a33',
      subject: 'Inventory status call',
      type: 'Call',
      date: '2026-01-03',
      status: 'Completed',
      relatedTo: 'Tom Harris',
    },
    {
      id: 'a34',
      subject: 'Order confirmation email',
      type: 'Email',
      date: '2025-12-30',
      status: 'Completed',
      relatedTo: 'Tom Harris',
    },
    {
      id: 'a35',
      subject: 'Vendor performance review',
      type: 'Meeting',
      date: '2025-12-28',
      status: 'Completed',
      relatedTo: 'Tom Harris',
    },
    // Karen Stevens activities
    {
      id: 'a36',
      subject: 'Campaign planning meeting',
      type: 'Meeting',
      date: '2026-01-19',
      status: 'Completed',
      relatedTo: 'Karen Stevens',
    },
    {
      id: 'a37',
      subject: 'Brand strategy call',
      type: 'Call',
      date: '2026-01-17',
      status: 'Completed',
      relatedTo: 'Karen Stevens',
    },
    {
      id: 'a38',
      subject: 'Content calendar review',
      type: 'Email',
      date: '2026-01-15',
      status: 'Completed',
      relatedTo: 'Karen Stevens',
    },
    {
      id: 'a39',
      subject: 'Marketing analytics meeting',
      type: 'Meeting',
      date: '2026-01-13',
      status: 'Completed',
      relatedTo: 'Karen Stevens',
    },
  ];

  const [tasks, setTasks] = useState([
    {
      id: 't1',
      subject: 'Follow up on proposal with James Wilson',
      dueDate: '2026-01-15',
      priority: 'High',
      status: 'Not Started',
      relatedTo: 'James Wilson',
      owner: 'John Smith',
      completed: false,
    },
    {
      id: 't2',
      subject: 'Schedule quarterly review meeting',
      dueDate: '2026-01-23',
      priority: 'Normal',
      status: 'In Progress',
      relatedTo: 'Sarah Chen',
      owner: 'Jane Doe',
      completed: false,
    },
    {
      id: 't3',
      subject: 'Send contract for review',
      dueDate: '2026-01-24',
      priority: 'High',
      status: 'Not Started',
      relatedTo: 'Michael Johnson',
      owner: 'John Smith',
      completed: false,
    },
    {
      id: 't4',
      subject: 'Update contact information',
      dueDate: '2026-01-25',
      priority: 'Low',
      status: 'Not Started',
      relatedTo: 'Jennifer Martinez',
      owner: 'Jane Doe',
      completed: false,
    },
    {
      id: 't5',
      subject: 'Prepare presentation materials',
      dueDate: '2026-01-26',
      priority: 'Normal',
      status: 'In Progress',
      relatedTo: 'Lisa Thompson',
      owner: 'John Smith',
      completed: false,
    },
    {
      id: 't6',
      subject: 'Review Q4 performance metrics',
      dueDate: '2026-01-17',
      priority: 'High',
      status: 'Not Started',
      relatedTo: 'James Wilson',
      owner: 'Jane Doe',
      completed: false,
    },
    {
      id: 't7',
      subject: 'Finalize budget approval',
      dueDate: '2026-01-12',
      priority: 'High',
      status: 'In Progress',
      relatedTo: 'Sarah Chen',
      owner: 'John Smith',
      completed: false,
    },
  ]);

  const handleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed, status: !task.completed ? 'Completed' : 'Not Started' } : task
    ));
  };

  // Mock contact data with hierarchy
  const contacts = [
    {
      id: '1',
      name: 'James Wilson',
      role: 'Executive Sponsor',
      email: 'james.wilson@acmecorp.com',
      phone: '(555) 456-7890',
      mobile: '(555) 456-7891',
      isPrimary: true,
      company: 'Acme Corporation',
      title: 'CEO',
      mailingStreet: '123 Market Street',
      mailingCity: 'San Francisco',
      mailingState: 'CA',
      mailingZip: '94102',
      mailingCountry: 'USA',
      lastActivity: '2026-01-18',
      owner: 'John Smith',
      reportsTo: null,
      description: 'CEO and founder of Acme Corporation. Primary decision maker for all strategic initiatives and enterprise-level purchases. Prefers email communication for initial outreach.',
      relatedLists: {
        opportunities: 4,
        cases: 2,
        campaigns: 12,
        activities: 28,
        orders: 15,
        quotes: 8,
        contracts: 3,
        files: 22,
        notes: 14,
        tasks: 9,
        events: 6,
        emails: 31,
      },
    },
    {
      id: '2',
      name: 'Sarah Chen',
      role: 'Primary Contact',
      email: 'sarah.chen@acmecorp.com',
      phone: '(555) 234-5678',
      mobile: '(555) 234-5677',
      isPrimary: false,
      company: 'Acme Corporation',
      title: 'VP of Operations',
      mailingStreet: '456 Mission Boulevard',
      mailingCity: 'San Francisco',
      mailingState: 'CA',
      mailingZip: '94103',
      mailingCountry: 'USA',
      lastActivity: '2026-01-17',
      owner: 'John Smith',
      reportsTo: '1',
      description: 'VP of Operations with deep knowledge of supply chain and logistics. Key stakeholder for operational efficiency projects.',
      relatedLists: {
        opportunities: 7,
        cases: 3,
        campaigns: 8,
        activities: 15,
        orders: 12,
        quotes: 5,
        contracts: 2,
        files: 18,
        notes: 11,
        tasks: 7,
        events: 4,
        emails: 24,
      },
    },
    {
      id: '3',
      name: 'Michael Johnson',
      role: 'Decision Maker',
      email: 'michael.johnson@acmecorp.com',
      phone: '(555) 234-5679',
      mobile: '(555) 234-5680',
      isPrimary: false,
      company: 'Acme Corporation',
      title: 'CFO',
      mailingCity: 'San Francisco',
      mailingState: 'CA',
      lastActivity: '2026-01-15',
      owner: 'John Smith',
      reportsTo: '1',
      relatedLists: { opportunities: 3, cases: 1, campaigns: 5, activities: 22 },
    },
    {
      id: '4',
      name: 'Jennifer Martinez',
      role: 'Technical Contact',
      email: 'jennifer.martinez@acmecorp.com',
      phone: '(555) 987-6543',
      mobile: '(555) 987-6544',
      isPrimary: false,
      company: 'Acme Corporation',
      title: 'IT Director',
      mailingCity: 'Oakland',
      mailingState: 'CA',
      lastActivity: '2026-01-16',
      owner: 'Jane Doe',
      reportsTo: '2',
      relatedLists: { opportunities: 2, cases: 5, campaigns: 3, activities: 18 },
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      role: 'Project Manager',
      email: 'lisa.thompson@acmecorp.com',
      phone: '(555) 345-6789',
      mobile: '(555) 345-6790',
      isPrimary: false,
      company: 'Acme Corporation',
      title: 'Senior Project Manager',
      mailingCity: 'Berkeley',
      mailingState: 'CA',
      lastActivity: '2026-01-14',
      owner: 'Jane Doe',
      reportsTo: '2',
      relatedLists: { opportunities: 6, cases: 2, campaigns: 9, activities: 31 },
    },
    {
      id: '6',
      name: 'David Park',
      role: 'Billing Contact',
      email: 'david.park@acmecorp.com',
      phone: '(555) 876-5432',
      mobile: '(555) 876-5433',
      isPrimary: false,
      company: 'Acme Corporation',
      title: 'Accounts Payable Manager',
      mailingCity: 'San Jose',
      mailingState: 'CA',
      lastActivity: '2026-01-12',
      owner: 'John Smith',
      reportsTo: '3',
      relatedLists: { opportunities: 1, cases: 0, campaigns: 2, activities: 8 },
    },
    // Standalone contacts without hierarchy
    {
      id: '7',
      name: 'Robert Anderson',
      role: 'External Consultant',
      email: 'robert.anderson@consultingfirm.com',
      phone: '(555) 123-4567',
      mobile: '(555) 123-4568',
      isPrimary: false,
      company: 'Anderson Consulting',
      title: 'Senior Consultant',
      mailingCity: 'New York',
      mailingState: 'NY',
      lastActivity: '2026-01-10',
      owner: 'Jane Doe',
      reportsTo: null,
      relatedLists: { opportunities: 5, cases: 1, campaigns: 4, activities: 12 },
    },
    {
      id: '8',
      name: 'Emily Rodriguez',
      role: 'Legal Advisor',
      email: 'emily.rodriguez@legalfirm.com',
      phone: '(555) 234-8901',
      mobile: '(555) 234-8902',
      isPrimary: false,
      company: 'Rodriguez & Associates',
      title: 'Partner',
      mailingCity: 'Los Angeles',
      mailingState: 'CA',
      lastActivity: '2026-01-08',
      owner: 'John Smith',
      reportsTo: null,
      relatedLists: { opportunities: 2, cases: 0, campaigns: 1, activities: 6 },
    },
    {
      id: '9',
      name: 'Tom Harris',
      role: 'Vendor Contact',
      email: 'tom.harris@vendorcorp.com',
      phone: '(555) 345-9012',
      mobile: '(555) 345-9013',
      isPrimary: false,
      company: 'Vendor Corporation',
      title: 'Account Manager',
      mailingStreet: '789 Pine Avenue',
      mailingCity: 'Seattle',
      mailingState: 'WA',
      mailingZip: '98101',
      mailingCountry: 'USA',
      lastActivity: '2026-01-05',
      owner: 'Jane Doe',
      reportsTo: null,
      description: 'Key vendor contact for supply chain management. Handles all procurement and logistics coordination.',
      relatedLists: {
        opportunities: 8,
        cases: 4,
        campaigns: 6,
        activities: 19,
        orders: 20,
        quotes: 10,
        contracts: 5,
        files: 15,
        notes: 8,
        tasks: 6,
        events: 3,
        emails: 18,
      },
    },
    {
      id: '10',
      name: 'Karen Stevens',
      role: 'Marketing Contact',
      email: 'karen.stevens@acmecorp.com',
      phone: '(555) 678-1234',
      mobile: '(555) 678-1235',
      isPrimary: false,
      company: 'Acme Corporation',
      title: 'Marketing Director',
      mailingStreet: '321 Oak Street',
      mailingCity: 'San Francisco',
      mailingState: 'CA',
      mailingZip: '94104',
      mailingCountry: 'USA',
      lastActivity: '2026-01-19',
      owner: 'John Smith',
      reportsTo: '1',
      description: 'Marketing Director responsible for brand strategy and campaign execution. Works closely with CEO on strategic initiatives.',
      relatedLists: {
        opportunities: 5,
        cases: 1,
        campaigns: 18,
        activities: 25,
        orders: 3,
        quotes: 2,
        contracts: 1,
        files: 30,
        notes: 20,
        tasks: 12,
        events: 8,
        emails: 45,
      },
    },
  ];

  // Organize contacts with manager information and direct reports count
  const organizeContacts = (contacts) => {
    const contactMap = {};
    const topLevel = [];
    const withManagers = [];

    // Create a map of contacts by ID
    contacts.forEach(contact => {
      contactMap[contact.id] = contact;
    });

    // Count direct reports for each contact
    const directReportsCounts = {};
    contacts.forEach(contact => {
      if (contact.reportsTo) {
        directReportsCounts[contact.reportsTo] = (directReportsCounts[contact.reportsTo] || 0) + 1;
      }
    });

    // Separate top-level (no manager) from those with managers
    contacts.forEach(contact => {
      const directReportsCount = directReportsCounts[contact.id] || 0;

      if (!contact.reportsTo) {
        topLevel.push({
          ...contact,
          directReportsCount,
        });
      } else {
        const manager = contactMap[contact.reportsTo];
        withManagers.push({
          ...contact,
          managerName: manager ? manager.name : null,
          directReportsCount,
        });
      }
    });

    return { topLevel, withManagers };
  };

  const { topLevel, withManagers } = organizeContacts(contacts);

  // Filter contacts based on search query
  const filterContacts = (contactsList) => {
    if (!searchQuery.trim()) return contactsList;

    const query = searchQuery.toLowerCase();
    return contactsList.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.title.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.phone.toLowerCase().includes(query) ||
      (contact.mobile && contact.mobile.toLowerCase().includes(query)) ||
      (contact.mailingCity && contact.mailingCity.toLowerCase().includes(query)) ||
      (contact.mailingState && contact.mailingState.toLowerCase().includes(query)) ||
      (contact.owner && contact.owner.toLowerCase().includes(query)) ||
      (contact.role && contact.role.toLowerCase().includes(query)) ||
      (contact.managerName && contact.managerName.toLowerCase().includes(query))
    );
  };

  const filteredTopLevel = filterContacts(topLevel);
  const filteredWithManagers = filterContacts(withManagers);

  // Contact Detail View
  const ContactDetailView = ({ contact }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState({
      name: contact.name,
      title: contact.title,
      email: contact.email,
      phone: contact.phone,
      mobile: contact.mobile,
      mailingStreet: contact.mailingStreet || '',
      mailingCity: contact.mailingCity,
      mailingState: contact.mailingState,
      mailingZip: contact.mailingZip || '',
      mailingCountry: contact.mailingCountry || '',
      company: contact.company,
      owner: contact.owner,
      description: contact.description || '',
    });

    const handleSave = () => {
      Object.assign(contact, editedContact);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditedContact({
        name: contact.name,
        title: contact.title,
        email: contact.email,
        phone: contact.phone,
        mobile: contact.mobile,
        mailingStreet: contact.mailingStreet || '',
        mailingCity: contact.mailingCity,
        mailingState: contact.mailingState,
        mailingZip: contact.mailingZip || '',
        mailingCountry: contact.mailingCountry || '',
        company: contact.company,
        owner: contact.owner,
        description: contact.description || '',
      });
      setIsEditing(false);
    };

    const contactMap = {};
    contacts.forEach(c => {
      contactMap[c.id] = c;
    });
    const manager = contact.reportsTo ? contactMap[contact.reportsTo] : null;
    const directReports = contacts.filter(c => c.reportsTo === contact.id);

    // Filter tasks related to this contact
    const contactTasks = tasks.filter(task => task.relatedTo === contact.name);

    return (
      <div>
        {/* Back button */}
        <div className="slds-m-bottom_medium">
          <Button
            label="Back to Contacts"
            variant="neutral"
            iconCategory="utility"
            iconName="back"
            iconPosition="left"
            onClick={() => setSelectedContact(null)}
          />
        </div>

        {/* Single bordered box containing everything */}
        <div className="slds-box" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          {/* Header with Avatar and Name */}
          <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-start slds-m-bottom_medium">
            <div className="slds-grid slds-grid_vertical-align-center">
              <Avatar variant="user" size="large" label={contact.name} />
              <div className="slds-m-left_medium">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="slds-input"
                      value={editedContact.name}
                      onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
                      style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}
                    />
                    <input
                      type="text"
                      className="slds-input"
                      value={editedContact.title}
                      onChange={(e) => setEditedContact({ ...editedContact, title: e.target.value })}
                      style={{ fontSize: '14px' }}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="slds-text-heading_large">{contact.name}</h2>
                    <p className="slds-text-body_regular slds-text-color_weak">{contact.title}</p>
                  </>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              {contact.isPrimary && (
                <Badge content="Primary Contact" style={{ backgroundColor: '#0176d3', color: '#fff' }} />
              )}
              {isEditing ? (
                <>
                  <Button
                    label="Save"
                    variant="brand"
                    onClick={handleSave}
                  />
                  <Button
                    label="Cancel"
                    variant="neutral"
                    onClick={handleCancel}
                  />
                </>
              ) : (
                <Button
                  label="Edit"
                  variant="neutral"
                  iconCategory="utility"
                  iconName="edit"
                  iconPosition="left"
                  iconSize="x-small"
                  onClick={() => setIsEditing(true)}
                />
              )}
            </div>
          </div>

          {/* Two column layout: Contact Info + Related Lists */}
          <div className="slds-grid slds-gutters slds-m-bottom_large">
            {/* Left: Contact Information */}
            <div className="slds-col slds-size_1-of-2">
              <h3 className="slds-text-heading_small slds-m-bottom_small" style={{ color: '#080707' }}>
                Contact Information
              </h3>
              <dl className="slds-list_horizontal slds-wrap">
                <dt className="slds-item_label slds-text-color_weak" style={{ width: '30%' }}>Email</dt>
                <dd className="slds-item_detail" style={{ width: '70%' }}>
                  {isEditing ? (
                    <input
                      type="email"
                      className="slds-input"
                      value={editedContact.email}
                      onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })}
                    />
                  ) : (
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  )}
                </dd>
                <dt className="slds-item_label slds-text-color_weak slds-m-top_x-small" style={{ width: '30%' }}>Phone</dt>
                <dd className="slds-item_detail slds-m-top_x-small" style={{ width: '70%' }}>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="slds-input"
                      value={editedContact.phone}
                      onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
                    />
                  ) : (
                    contact.phone
                  )}
                </dd>
                <dt className="slds-item_label slds-text-color_weak slds-m-top_x-small" style={{ width: '30%' }}>Mobile</dt>
                <dd className="slds-item_detail slds-m-top_x-small" style={{ width: '70%' }}>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="slds-input"
                      value={editedContact.mobile}
                      onChange={(e) => setEditedContact({ ...editedContact, mobile: e.target.value })}
                    />
                  ) : (
                    contact.mobile
                  )}
                </dd>
                <dt className="slds-item_label slds-text-color_weak slds-m-top_x-small" style={{ width: '30%' }}>Mailing Address</dt>
                <dd className="slds-item_detail slds-m-top_x-small" style={{ width: '70%' }}>
                  {isEditing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <input
                        type="text"
                        className="slds-input"
                        placeholder="Street"
                        value={editedContact.mailingStreet}
                        onChange={(e) => setEditedContact({ ...editedContact, mailingStreet: e.target.value })}
                      />
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <input
                          type="text"
                          className="slds-input"
                          placeholder="City"
                          value={editedContact.mailingCity}
                          onChange={(e) => setEditedContact({ ...editedContact, mailingCity: e.target.value })}
                          style={{ flex: 2 }}
                        />
                        <input
                          type="text"
                          className="slds-input"
                          placeholder="State"
                          value={editedContact.mailingState}
                          onChange={(e) => setEditedContact({ ...editedContact, mailingState: e.target.value })}
                          style={{ flex: 1 }}
                        />
                        <input
                          type="text"
                          className="slds-input"
                          placeholder="Zip"
                          value={editedContact.mailingZip}
                          onChange={(e) => setEditedContact({ ...editedContact, mailingZip: e.target.value })}
                          style={{ flex: 1 }}
                        />
                      </div>
                      <input
                        type="text"
                        className="slds-input"
                        placeholder="Country"
                        value={editedContact.mailingCountry}
                        onChange={(e) => setEditedContact({ ...editedContact, mailingCountry: e.target.value })}
                      />
                    </div>
                  ) : (
                    <>
                      {contact.mailingStreet && <>{contact.mailingStreet}<br /></>}
                      {contact.mailingCity}, {contact.mailingState} {contact.mailingZip}
                      {contact.mailingCountry && <><br />{contact.mailingCountry}</>}
                    </>
                  )}
                </dd>
                <dt className="slds-item_label slds-text-color_weak slds-m-top_x-small" style={{ width: '30%' }}>Account</dt>
                <dd className="slds-item_detail slds-m-top_x-small" style={{ width: '70%' }}>
                  {isEditing ? (
                    <div className="slds-form-element">
                      <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                        <Icon
                          category="standard"
                          name="account"
                          size="x-small"
                          className="slds-icon slds-input__icon slds-input__icon_left"
                          style={{ fill: '#706e6b' }}
                        />
                        <input
                          type="text"
                          className="slds-input"
                          placeholder="Search Accounts..."
                          value={editedContact.company}
                          onChange={(e) => setEditedContact({ ...editedContact, company: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    contact.company
                  )}
                </dd>
                <dt className="slds-item_label slds-text-color_weak slds-m-top_x-small" style={{ width: '30%' }}>Owner</dt>
                <dd className="slds-item_detail slds-m-top_x-small" style={{ width: '70%' }}>
                  {isEditing ? (
                    <div className="slds-form-element">
                      <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                        <Icon
                          category="standard"
                          name="user"
                          size="x-small"
                          className="slds-icon slds-input__icon slds-input__icon_left"
                          style={{ fill: '#706e6b' }}
                        />
                        <input
                          type="text"
                          className="slds-input"
                          placeholder="Search Users..."
                          value={editedContact.owner}
                          onChange={(e) => setEditedContact({ ...editedContact, owner: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    contact.owner
                  )}
                </dd>
                <dt className="slds-item_label slds-text-color_weak slds-m-top_x-small" style={{ width: '30%' }}>Last Activity</dt>
                <dd className="slds-item_detail slds-m-top_x-small" style={{ width: '70%' }}>
                  {new Date(contact.lastActivity).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  {' '}
                  ({Math.floor((new Date() - new Date(contact.lastActivity)) / (1000 * 60 * 60 * 24))} days ago)
                </dd>
              </dl>
            </div>

            {/* Right: Related Lists */}
            <div className="slds-col slds-size_1-of-2">
              <div className="slds-grid slds-wrap" style={{ margin: '-4px' }}>
                {/* Column 1 */}
                <div className="slds-col slds-size_1-of-2" style={{ padding: '4px' }}>
                  {/* Opportunities */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View opportunities')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="opportunity" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Opportunities</p>
                      </div>
                      <Badge content={contact.relatedLists.opportunities} />
                    </div>
                  </div>

                  {/* Cases */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View cases')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="case" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Cases</p>
                      </div>
                      <Badge content={contact.relatedLists.cases} />
                    </div>
                  </div>

                  {/* Orders */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View orders')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="orders" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Orders</p>
                      </div>
                      <Badge content={contact.relatedLists.orders || 0} />
                    </div>
                  </div>

                  {/* Quotes */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View quotes')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="quotes" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Quotes</p>
                      </div>
                      <Badge content={contact.relatedLists.quotes || 0} />
                    </div>
                  </div>

                  {/* Events */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View events')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="event" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Events</p>
                      </div>
                      <Badge content={contact.relatedLists.events || 0} />
                    </div>
                  </div>

                  {/* Emails */}
                  <div
                    className="slds-box slds-box_x-small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View emails')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="email" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Emails</p>
                      </div>
                      <Badge content={contact.relatedLists.emails || 0} />
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="slds-col slds-size_1-of-2" style={{ padding: '4px' }}>
                  {/* Campaigns */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View campaigns')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="campaign" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Campaigns</p>
                      </div>
                      <Badge content={contact.relatedLists.campaigns} />
                    </div>
                  </div>

                  {/* Activities */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View activities')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="task" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Activities</p>
                      </div>
                      <Badge content={contact.relatedLists.activities} />
                    </div>
                  </div>

                  {/* Contracts */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View contracts')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="contract" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Contracts</p>
                      </div>
                      <Badge content={contact.relatedLists.contracts || 0} />
                    </div>
                  </div>

                  {/* Files */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View files')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="file" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Files</p>
                      </div>
                      <Badge content={contact.relatedLists.files || 0} />
                    </div>
                  </div>

                  {/* Notes */}
                  <div
                    className="slds-box slds-box_x-small slds-m-bottom_small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View notes')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="note" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Notes</p>
                      </div>
                      <Badge content={contact.relatedLists.notes || 0} />
                    </div>
                  </div>

                  {/* Tasks */}
                  <div
                    className="slds-box slds-box_x-small"
                    style={{ cursor: 'pointer', backgroundColor: '#f3f3f3', border: '1px solid #dddbda', transition: 'all 0.2s ease' }}
                    onClick={() => console.log('View tasks')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <div style={{ marginRight: '8px' }}>
                        <Icon category="standard" name="task2" size="small" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>Tasks</p>
                      </div>
                      <Badge content={contact.relatedLists.tasks || 0} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="slds-m-bottom_large">
            <h3 className="slds-text-heading_small slds-m-bottom_small" style={{ color: '#080707' }}>
              Description
            </h3>
            {isEditing ? (
              <textarea
                className="slds-textarea"
                value={editedContact.description}
                onChange={(e) => setEditedContact({ ...editedContact, description: e.target.value })}
                rows="4"
                style={{ width: '100%' }}
              />
            ) : (
              <div className="slds-box slds-box_x-small" style={{ backgroundColor: '#f9f9f9', border: '1px solid #e5e5e5', padding: '12px' }}>
                <p className="slds-text-body_regular" style={{ margin: 0 }}>
                  {contact.description || 'No description provided.'}
                </p>
              </div>
            )}
          </div>

          {/* Activities Section */}
          <div className="slds-m-bottom_large">
            <h3 className="slds-text-heading_small slds-m-bottom_small" style={{ color: '#080707' }}>
              Activities
            </h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
              <table className="slds-table slds-table_cell-buffer slds-table_bordered" style={{ marginBottom: 0 }}>
                <thead>
                  <tr className="slds-line-height_reset">
                    <th scope="col" style={{ width: '40%' }}>
                      <div className="slds-truncate" title="Subject">Subject</div>
                    </th>
                    <th scope="col" style={{ width: '20%' }}>
                      <div className="slds-truncate" title="Type">Type</div>
                    </th>
                    <th scope="col" style={{ width: '25%' }}>
                      <div className="slds-truncate" title="Date">Date</div>
                    </th>
                    <th scope="col" style={{ width: '15%' }}>
                      <div className="slds-truncate" title="Status">Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activities
                    .filter(activity => activity.relatedTo === contact.name)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(activity => (
                      <tr key={activity.id} className="slds-hint-parent">
                        <td data-label="Subject">
                          <div className="slds-truncate" title={activity.subject}>
                            {activity.subject}
                          </div>
                        </td>
                        <td data-label="Type">
                          <div className="slds-truncate" title={activity.type}>
                            <Badge
                              content={activity.type}
                              color={activity.type === 'Call' ? 'light' : activity.type === 'Email' ? 'light' : 'light'}
                            />
                          </div>
                        </td>
                        <td data-label="Date">
                          <div className="slds-truncate" title={activity.date}>
                            {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </td>
                        <td data-label="Status">
                          <div className="slds-truncate" title={activity.status}>
                            {activity.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {activities.filter(activity => activity.relatedTo === contact.name).length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                  <p className="slds-text-body_regular slds-text-color_weak" style={{ margin: 0 }}>
                    No activities recorded
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Tasks Section */}
          <div className="slds-m-bottom_large">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 className="slds-text-heading_small" style={{ color: '#080707', margin: 0 }}>
                Upcoming Tasks
              </h3>
              <Button
                label="New Task"
                variant="neutral"
                iconCategory="utility"
                iconName="add"
                iconPosition="left"
                iconSize="x-small"
              />
            </div>
            {contactTasks.length > 0 ? (
              <div className="slds-grid slds-wrap" style={{ margin: '-4px' }}>
                {contactTasks.map(task => {
                  const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                  const isOverdue = daysUntilDue < 0;
                  const isDueToday = daysUntilDue === 0;

                  return (
                    <div key={task.id} className="slds-col slds-size_1-of-1" style={{ padding: '4px' }}>
                      <div
                        className="slds-box slds-box_x-small"
                        style={{
                          backgroundColor: task.completed ? '#fafaf9' : '#f3f3f3',
                          border: '1px solid #dddbda',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          opacity: task.completed ? 0.6 : 1,
                        }}
                      >
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleTaskComplete(task.id)}
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                            accentColor: '#0176d3'
                          }}
                        />

                        {/* Task Details */}
                        <div style={{ flex: 1 }}>
                          <div className="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                            <div>
                              <p className="slds-text-body_small" style={{
                                margin: 0,
                                fontWeight: '600',
                                textDecoration: task.completed ? 'line-through' : 'none',
                                color: task.completed ? '#706e6b' : '#080707'
                              }}>
                                {task.subject}
                              </p>
                            </div>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                              {/* Owner */}
                              <p className="slds-text-body_small slds-text-color_weak" style={{
                                margin: 0,
                                fontSize: '11px',
                                textDecoration: task.completed ? 'line-through' : 'none'
                              }}>
                                Owner: {task.owner}
                              </p>

                              {/* Due Date */}
                              <p className="slds-text-body_small" style={{
                                margin: 0,
                                color: task.completed ? '#706e6b' : (isOverdue ? '#c23934' : isDueToday ? '#fe9339' : '#080707'),
                                fontWeight: isOverdue || isDueToday ? '600' : '400',
                                fontSize: '12px',
                                textDecoration: task.completed ? 'line-through' : 'none'
                              }}>
                                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                <span style={{ marginLeft: '4px', fontSize: '11px', color: '#706e6b' }}>
                                  ({isOverdue ? `${Math.abs(daysUntilDue)}d overdue` : isDueToday ? 'today' : `${daysUntilDue}d`})
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="slds-box slds-box_x-small" style={{ backgroundColor: '#f9f9f9', border: '1px solid #e5e5e5', padding: '12px', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p className="slds-text-body_small slds-text-color_weak" style={{ textAlign: 'center', margin: 0 }}>No upcoming tasks</p>
              </div>
            )}
          </div>

          {/* Reporting Relationships */}
          <h3 className="slds-text-heading_small slds-m-bottom_small" style={{ color: '#080707' }}>
            Reporting Relationships
          </h3>

          <div className="slds-grid slds-gutters">
            {/* Reports To */}
            <div className="slds-col slds-size_1-of-2">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <p className="slds-text-title" style={{ color: '#706e6b', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', margin: 0 }}>Reports To</p>
                <Button
                  label="Add Reports To"
                  variant="neutral"
                  iconCategory="utility"
                  iconName="add"
                  iconPosition="left"
                  iconSize="x-small"
                />
              </div>
              {manager ? (
                <div
                  className="slds-box slds-box_x-small"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: '#f3f3f3',
                    border: '1px solid #dddbda',
                    padding: '12px',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => setSelectedContact(manager)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e8f4f8';
                    e.currentTarget.style.borderColor = '#0176d3';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f3f3';
                    e.currentTarget.style.borderColor = '#dddbda';
                  }}
                >
                  <div className="slds-grid slds-grid_vertical-align-center">
                    <Avatar variant="user" size="small" label={manager.name} />
                    <div className="slds-m-left_small" style={{ flex: 1 }}>
                      <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>{manager.name}</p>
                      <p className="slds-text-body_small slds-text-color_weak" style={{ margin: 0 }}>{manager.title}</p>
                    </div>
                    <Icon category="utility" name="chevronright" size="x-small" style={{ fill: '#706e6b' }} />
                  </div>
                </div>
              ) : (
                <div className="slds-box slds-box_x-small" style={{ backgroundColor: '#f9f9f9', border: '1px solid #e5e5e5', padding: '12px', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p className="slds-text-body_small slds-text-color_weak" style={{ textAlign: 'center', margin: 0 }}>No manager assigned</p>
                </div>
              )}
            </div>

            {/* Direct Reports */}
            <div className="slds-col slds-size_1-of-2">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <p className="slds-text-title" style={{ color: '#706e6b', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', margin: 0 }}>Direct Reports ({directReports.length})</p>
                <Button
                  label="New"
                  variant="neutral"
                  iconCategory="utility"
                  iconName="add"
                  iconPosition="left"
                  iconSize="x-small"
                />
              </div>
              {directReports.length > 0 ? (
                directReports.map(report => (
                  <div
                    key={report.id}
                    className="slds-box slds-box_x-small slds-m-bottom_x-small"
                    style={{
                      cursor: 'pointer',
                      backgroundColor: '#f3f3f3',
                      border: '1px solid #dddbda',
                      padding: '12px',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => setSelectedContact(report)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#0176d3';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f3f3';
                      e.currentTarget.style.borderColor = '#dddbda';
                    }}
                  >
                    <div className="slds-grid slds-grid_vertical-align-center">
                      <Avatar variant="user" size="small" label={report.name} />
                      <div className="slds-m-left_small" style={{ flex: 1 }}>
                        <p className="slds-text-body_small" style={{ fontWeight: '600', margin: 0 }}>{report.name}</p>
                        <p className="slds-text-body_small slds-text-color_weak" style={{ margin: 0 }}>{report.title}</p>
                      </div>
                      <Icon category="utility" name="chevronright" size="x-small" style={{ fill: '#706e6b' }} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="slds-box slds-box_x-small" style={{ backgroundColor: '#f9f9f9', border: '1px solid #e5e5e5', padding: '12px', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p className="slds-text-body_small slds-text-color_weak" style={{ textAlign: 'center', margin: 0 }}>No direct reports</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render a single contact card
  const ContactCard = ({ contact, showReportsTo, managerName }) => (
    <div
      className="slds-box slds-box_small"
      style={{
        border: contact.isPrimary ? '2px solid #0176d3' : '1px solid #e5e5e5',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '170px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onClick={() => setSelectedContact(contact)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="slds-grid slds-grid_vertical-align-center slds-m-bottom_small">
        <Avatar variant="user" size="medium" label={contact.name} />
        <div className="slds-m-left_small" style={{ flex: 1 }}>
          <p className="slds-text-heading_small">
            <a href="#" onClick={(e) => e.preventDefault()}>
              {contact.name}
            </a>
          </p>
          <p className="slds-text-body_small slds-text-color_weak">{contact.title}</p>
        </div>
        {contact.isPrimary && (
          <Badge content="Primary" style={{ backgroundColor: '#0176d3', color: '#fff' }} />
        )}
      </div>
      <dl className="slds-list_horizontal slds-wrap slds-m-bottom_small">
        <dt className="slds-item_label slds-text-color_weak" style={{ width: '30%' }}>
          Email
        </dt>
        <dd className="slds-item_detail slds-truncate" style={{ width: '70%' }}>
          <a href={`mailto:${contact.email}`} onClick={(e) => e.stopPropagation()}>{contact.email}</a>
        </dd>
        <dt className="slds-item_label slds-text-color_weak slds-m-top_xx-small" style={{ width: '30%' }}>
          Phone
        </dt>
        <dd className="slds-item_detail slds-m-top_xx-small" style={{ width: '70%' }}>
          {contact.phone}
        </dd>
      </dl>
      <div style={{ marginTop: 'auto', minHeight: '24px', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {contact.directReportsCount > 0 && (
          <span
            style={{
              display: 'inline-block',
              padding: '2px 6px',
              backgroundColor: '#f3f3f3',
              border: '1px solid #dddbda',
              borderRadius: '3px',
              fontSize: '11px',
              color: '#706e6b',
              fontWeight: '600',
            }}
          >
            Direct Reports: {contact.directReportsCount}
          </span>
        )}
        {showReportsTo && managerName && (
          <span
            style={{
              display: 'inline-block',
              padding: '2px 6px',
              backgroundColor: '#f3f3f3',
              border: '1px solid #dddbda',
              borderRadius: '3px',
              fontSize: '11px',
              color: '#706e6b',
              fontWeight: '600',
            }}
          >
            Reports to: {managerName}
          </span>
        )}
      </div>
    </div>
  );


  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ComponentCard
          title="Key Contacts"
          icon="user"
          actions={
            !selectedContact && (
              <div style={{ width: '250px' }}>
                <div className="slds-form-element">
                  <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                    <Icon
                      category="utility"
                      name="search"
                      size="x-small"
                      className="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default"
                    />
                    <input
                      type="text"
                      id="contact-search"
                      className="slds-input"
                      placeholder="Search contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )
          }
        >
          {selectedContact ? (
            <ContactDetailView contact={selectedContact} />
          ) : (
            /* All contacts in 3-column grid */
            <div className="slds-grid slds-wrap" style={{ margin: '-10px -8px' }}>
              {/* Top-level contacts (no manager) */}
              {filteredTopLevel.map(contact => (
                <div key={contact.id} className="slds-col slds-size_1-of-3" style={{ padding: '10px 8px' }}>
                  <ContactCard contact={contact} showReportsTo={false} />
                </div>
              ))}

              {/* Contacts with managers */}
              {filteredWithManagers.map(contact => (
                <div key={contact.id} className="slds-col slds-size_1-of-3" style={{ padding: '10px 8px' }}>
                  <ContactCard contact={contact} showReportsTo={true} managerName={contact.managerName} />
                </div>
              ))}

              {/* Add New Contact Card */}
              <div className="slds-col slds-size_1-of-3" style={{ padding: '10px 8px' }}>
                <div
                  className="slds-box slds-box_small"
                  style={{
                    border: '2px dashed #c9c9c9',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    minHeight: '170px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#fafaf9',
                  }}
                  onClick={() => console.log('Add new contact')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0176d3';
                    e.currentTarget.style.backgroundColor = '#f3f3f3';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#c9c9c9';
                    e.currentTarget.style.backgroundColor = '#fafaf9';
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Icon
                      category="utility"
                      name="add"
                      size="medium"
                      style={{ fill: '#706e6b', marginBottom: '8px' }}
                    />
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#706e6b',
                        margin: 0,
                      }}
                    >
                      New Contact
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ComponentCard>
      </div>
    </div>
  );
};

export default AccountContactCards;
