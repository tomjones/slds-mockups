import React, { useState, useMemo } from 'react';
import Icon from '@salesforce/design-system-react/components/icon';
import Badge from '@salesforce/design-system-react/components/badge';

/**
 * Contact & Address Components Mockup
 *
 * Simplified card components for SAP Business One sync using actual Salesforce metadata fields.
 * Features:
 * 1. Contact Card - Interactive contact information with all standard and custom fields
 * 2. Address Card - SAP-synced address with complete address and tax information
 */

const ContactAddressComponents = () => {
  const [expandedContactCard, setExpandedContactCard] = useState(null);
  const [expandedAddressCard, setExpandedAddressCard] = useState(null);

  // Sample contact data - using only actual fields from metadata
  const contacts = useMemo(() => [
    {
      id: 'CON-001',
      Name: 'Sarah Chen',
      Title: 'Chief Technology Officer',
      TitleType: 'Executive',
      Department: 'Technology',
      DepartmentGroup: 'Engineering',
      AccountId: 'ACC-10234',
      AccountName: 'Luxe Beauty Corporation',
      Email: 'sarah.chen@luxebeauty.com',
      Phone: '+1 (555) 234-5678',
      MobilePhone: '+1 (555) 234-5679',
      HomePhone: '+1 (555) 234-5677',
      OtherPhone: null,
      Fax: '+1 (555) 234-5680',
      AssistantName: 'Michael Torres',
      AssistantPhone: '+1 (555) 234-5681',
      ReportsToId: null,
      ReportsToName: null,
      OwnerId: 'USR-001',
      OwnerName: 'Amanda Foster',
      Birthdate: '1985-06-15',
      GenderIdentity: 'Female',
      Pronouns: 'She/Her',
      Gender__c: 'F',
      IsActive__c: true,
      DoNotCall: false,
      HasOptedOutOfEmail: false,
      HasOptedOutOfFax: true,
      LeadSource: 'Trade Show',
      ContactSource: 'Event - Beauty Expo 2024',
      Description: 'Primary technical decision maker for all IT infrastructure and software purchases. Strong advocate for sustainable and eco-friendly products.',
      CurrencyIsoCode: 'USD',
      MailingAddress: {
        street: '123 Innovation Drive',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'United States'
      },
      OtherAddress: {
        street: '456 Market Street, Suite 300',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94102',
        country: 'United States'
      },
      SAP_Contact_InternalCode__c: 'SAP-CON-000876',
      SAP_Contact_Create_Date__c: '2024-01-15',
      SAP_Contact_Create_Time__c: '09:23:45',
      SAP_Contact_Update_Date__c: '2024-12-18',
      SAP_Contact_Update_Time__c: '14:32:10',
      Remarks_2__c: 'Prefers email communication. Available for calls Tue-Thu 2-4pm PST.',
      LastCURequestDate: '2024-12-15',
      LastCUUpdateDate: '2024-12-18',
      Jigsaw: 'JIG-12345',
      BuyerAttributes: 'Strategic Buyer, Technical Evaluator'
    },
    {
      id: 'CON-002',
      Name: 'Michael Rodriguez',
      Title: 'Procurement Manager',
      TitleType: 'Manager',
      Department: 'Supply Chain',
      DepartmentGroup: 'Operations',
      AccountId: 'ACC-10234',
      AccountName: 'Luxe Beauty Corporation',
      Email: 'michael.rodriguez@luxebeauty.com',
      Phone: '+1 (555) 234-5690',
      MobilePhone: '+1 (555) 234-5691',
      HomePhone: null,
      OtherPhone: null,
      Fax: null,
      AssistantName: null,
      AssistantPhone: null,
      ReportsToId: 'CON-001',
      ReportsToName: 'Sarah Chen',
      OwnerId: 'USR-001',
      OwnerName: 'Amanda Foster',
      Birthdate: '1990-03-22',
      GenderIdentity: 'Male',
      Pronouns: 'He/Him',
      Gender__c: 'M',
      IsActive__c: true,
      DoNotCall: false,
      HasOptedOutOfEmail: false,
      HasOptedOutOfFax: false,
      LeadSource: 'Referral',
      ContactSource: 'Employee Referral',
      Description: 'Manages day-to-day procurement activities. Primary contact for order processing and delivery coordination.',
      CurrencyIsoCode: 'USD',
      MailingAddress: {
        street: '123 Innovation Drive',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'United States'
      },
      OtherAddress: null,
      SAP_Contact_InternalCode__c: 'SAP-CON-000877',
      SAP_Contact_Create_Date__c: '2024-03-20',
      SAP_Contact_Create_Time__c: '11:15:30',
      SAP_Contact_Update_Date__c: '2024-12-17',
      SAP_Contact_Update_Time__c: '16:45:22',
      Remarks_2__c: 'Prefers morning calls. Handles all purchase orders and invoicing.',
      LastCURequestDate: '2024-12-10',
      LastCUUpdateDate: '2024-12-17',
      Jigsaw: null,
      BuyerAttributes: 'Day-to-day Buyer, Order Processor'
    }
  ], []);

  // Sample address data - using only actual fields from metadata
  const addresses = useMemo(() => [
    {
      id: 'ADDR-001',
      Name: 'Luxe Beauty - Headquarters',
      Account__c: 'ACC-10234',
      AccountName: 'Luxe Beauty Corporation',
      Address_Type__c: 'Billing',
      Street__c: '123 Innovation Drive',
      Street_Number__c: '123',
      Block__c: 'Block A',
      Building_Floor_Room__c: 'Floor 5, Suite 501',
      City__c: 'San Francisco',
      County__c: 'San Francisco County',
      State__c: 'CA',
      Zip_Code__c: '94105',
      Country__c: 'United States',
      Nationality__c: 'US',
      Federal_Tax_ID__c: '94-1234567',
      Tax_Code__c: 'TX-CA-001',
      Tax_Office__c: 'San Francisco Tax Office',
      GSTIN__c: null,
      GST_Type__c: null,
      Global_Location_Number__c: 'GLN-1234567890123',
      MYF_Type__c: null,
      Type_of_Address__c: 'Corporate Headquarters',
      Custom_Field_1__c: 'Primary billing location',
      SAP_Create_Date__c: '2024-01-15',
      SAP_Row_Number__c: 1,
      SAPB1_CardCode_RowNum__c: '10234-001'
    },
    {
      id: 'ADDR-002',
      Name: 'Luxe Beauty - Warehouse',
      Account__c: 'ACC-10234',
      AccountName: 'Luxe Beauty Corporation',
      Address_Type__c: 'Shipping',
      Street__c: '789 Industrial Boulevard',
      Street_Number__c: '789',
      Block__c: 'Warehouse District',
      Building_Floor_Room__c: 'Building C',
      City__c: 'Oakland',
      County__c: 'Alameda County',
      State__c: 'CA',
      Zip_Code__c: '94607',
      Country__c: 'United States',
      Nationality__c: 'US',
      Federal_Tax_ID__c: '94-1234567',
      Tax_Code__c: 'TX-CA-002',
      Tax_Office__c: 'Oakland Tax Office',
      GSTIN__c: null,
      GST_Type__c: null,
      Global_Location_Number__c: 'GLN-1234567890124',
      MYF_Type__c: null,
      Type_of_Address__c: 'Warehouse / Distribution Center',
      Custom_Field_1__c: 'Primary shipping location',
      SAP_Create_Date__c: '2024-02-01',
      SAP_Row_Number__c: 2,
      SAPB1_CardCode_RowNum__c: '10234-002'
    }
  ], []);

  // Helper functions
  const formatPhoneNumber = (phone) => {
    if (!phone) return 'Not provided';
    return phone;
  };

  const formatAddress = (address) => {
    if (!address || !address.street) return 'Not provided';
    return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}`;
  };

  // Component wrapper
  const ComponentCard = ({ title, subtitle, children }) => (
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
      <div style={{ marginBottom: '16px' }}>
        <h3 className="slds-text-heading_small" style={{ margin: 0, marginBottom: '4px' }}>{title}</h3>
        {subtitle && (
          <p className="slds-text-body_small" style={{ color: '#706e6b', margin: 0 }}>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );

  // Contact Card Component
  const ContactCard = ({ contact, isExpanded, onToggle }) => {
    return (
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #dddbda',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
      >
        {/* Card Header - Always Visible */}
        <div
          style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #0176d3 0%, #1589ee 100%)',
            color: 'white',
            borderBottom: '3px solid #014486'
          }}
          onClick={() => onToggle(contact.id)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: '700'
                }}>
                  {contact.Name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="slds-text-heading_medium" style={{ margin: 0, color: 'white' }}>
                    {contact.Name}
                  </h3>
                  <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>
                    {contact.Title} • {contact.Department}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '13px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon category="utility" name="company" size="xx-small" style={{ fill: 'white' }} />
                  <span>{contact.AccountName}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon category="utility" name="email" size="xx-small" style={{ fill: 'white' }} />
                  <span>{contact.Email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon category="utility" name="phone_portrait" size="xx-small" style={{ fill: 'white' }} />
                  <span>{formatPhoneNumber(contact.Phone)}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {contact.IsActive__c ? (
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: 'rgba(46, 132, 74, 0.9)',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  ACTIVE
                </div>
              ) : (
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: 'rgba(194, 57, 52, 0.9)',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  INACTIVE
                </div>
              )}
              <Icon
                category="utility"
                name={isExpanded ? 'chevronup' : 'chevrondown'}
                size="small"
                style={{ fill: 'white' }}
              />
            </div>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          backgroundColor: '#f3f3f3',
          borderBottom: '1px solid #dddbda'
        }}>
          <div style={{ padding: '12px', borderRight: '1px solid #dddbda', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              SAP Internal Code
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#080707', fontFamily: 'monospace' }}>
              {contact.SAP_Contact_InternalCode__c}
            </div>
          </div>
          <div style={{ padding: '12px', borderRight: '1px solid #dddbda', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              Last Updated
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#080707' }}>
              {contact.SAP_Contact_Update_Date__c}
            </div>
          </div>
          <div style={{ padding: '12px', borderRight: '1px solid #dddbda', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              Lead Source
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#080707' }}>
              {contact.LeadSource}
            </div>
          </div>
          <div style={{ padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              Currency
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#080707' }}>
              {contact.CurrencyIsoCode}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div style={{ padding: '20px', backgroundColor: '#fafaf9' }}>
                <div style={{ padding: '16px' }}>
                  {/* Personal Information */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: '#0176d3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon category="utility" name="identity" size="x-small" style={{ fill: '#0176d3' }} />
                      Personal Information
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '16px',
                      padding: '16px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      border: '1px solid #dddbda'
                    }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Title Type
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {contact.TitleType}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Department Group
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {contact.DepartmentGroup}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Gender Identity
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {contact.GenderIdentity || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Pronouns
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {contact.Pronouns || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Birthdate
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {contact.Birthdate ? new Date(contact.Birthdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Not provided'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Buyer Attributes
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {contact.BuyerAttributes || 'Not specified'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Lead Source
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {contact.LeadSource}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Contact Source
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {contact.ContactSource}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: '#0176d3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon category="utility" name="call" size="x-small" style={{ fill: '#0176d3' }} />
                      Contact Information
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '16px',
                      padding: '16px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      border: '1px solid #dddbda'
                    }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Phone
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          <a href={`tel:${contact.Phone}`} style={{ color: '#0176d3', textDecoration: 'none' }}>
                            {formatPhoneNumber(contact.Phone)}
                          </a>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Mobile
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          <a href={`tel:${contact.MobilePhone}`} style={{ color: '#0176d3', textDecoration: 'none' }}>
                            {formatPhoneNumber(contact.MobilePhone)}
                          </a>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Home Phone
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {formatPhoneNumber(contact.HomePhone)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Other Phone
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {formatPhoneNumber(contact.OtherPhone)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Email
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          <a href={`mailto:${contact.Email}`} style={{ color: '#0176d3', textDecoration: 'none' }}>
                            {contact.Email}
                          </a>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Fax
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {formatPhoneNumber(contact.Fax)}
                        </div>
                      </div>
                      {contact.AssistantName && (
                        <>
                          <div>
                            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                              Assistant Name
                            </div>
                            <div style={{ fontSize: '13px', color: '#080707' }}>
                              {contact.AssistantName}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                              Assistant Phone
                            </div>
                            <div style={{ fontSize: '13px', color: '#080707' }}>
                              <a href={`tel:${contact.AssistantPhone}`} style={{ color: '#0176d3', textDecoration: 'none' }}>
                                {formatPhoneNumber(contact.AssistantPhone)}
                              </a>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Communication Preferences */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: '#0176d3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon category="utility" name="settings" size="x-small" style={{ fill: '#0176d3' }} />
                      Communication Preferences
                    </h4>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '16px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      border: '1px solid #dddbda'
                    }}>
                      <div style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: contact.DoNotCall ? '#fef5f5' : '#e6f7e6',
                        borderRadius: '4px',
                        border: `1px solid ${contact.DoNotCall ? '#c23934' : '#2e844a'}`,
                        textAlign: 'center'
                      }}>
                        <Icon
                          category="utility"
                          name="call"
                          size="small"
                          style={{ fill: contact.DoNotCall ? '#c23934' : '#2e844a' }}
                        />
                        <div style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600', color: contact.DoNotCall ? '#c23934' : '#2e844a' }}>
                          {contact.DoNotCall ? 'DO NOT CALL' : 'Calls Allowed'}
                        </div>
                      </div>
                      <div style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: contact.HasOptedOutOfEmail ? '#fef5f5' : '#e6f7e6',
                        borderRadius: '4px',
                        border: `1px solid ${contact.HasOptedOutOfEmail ? '#c23934' : '#2e844a'}`,
                        textAlign: 'center'
                      }}>
                        <Icon
                          category="utility"
                          name="email"
                          size="small"
                          style={{ fill: contact.HasOptedOutOfEmail ? '#c23934' : '#2e844a' }}
                        />
                        <div style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600', color: contact.HasOptedOutOfEmail ? '#c23934' : '#2e844a' }}>
                          {contact.HasOptedOutOfEmail ? 'EMAIL OPT-OUT' : 'Email Allowed'}
                        </div>
                      </div>
                      <div style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: contact.HasOptedOutOfFax ? '#fef5f5' : '#e6f7e6',
                        borderRadius: '4px',
                        border: `1px solid ${contact.HasOptedOutOfFax ? '#c23934' : '#2e844a'}`,
                        textAlign: 'center'
                      }}>
                        <Icon
                          category="utility"
                          name="archive"
                          size="small"
                          style={{ fill: contact.HasOptedOutOfFax ? '#c23934' : '#2e844a' }}
                        />
                        <div style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600', color: contact.HasOptedOutOfFax ? '#c23934' : '#2e844a' }}>
                          {contact.HasOptedOutOfFax ? 'FAX OPT-OUT' : 'Fax Allowed'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: '#0176d3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon category="utility" name="location" size="x-small" style={{ fill: '#0176d3' }} />
                      Addresses
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '16px'
                    }}>
                      <div style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        border: '1px solid #dddbda'
                      }}>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '8px', fontWeight: '700', textTransform: 'uppercase' }}>
                          Mailing Address
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707', lineHeight: '1.5' }}>
                          {formatAddress(contact.MailingAddress)}
                        </div>
                      </div>
                      {contact.OtherAddress && (
                        <div style={{
                          padding: '16px',
                          backgroundColor: 'white',
                          borderRadius: '4px',
                          border: '1px solid #dddbda'
                        }}>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '8px', fontWeight: '700', textTransform: 'uppercase' }}>
                            Other Address
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707', lineHeight: '1.5' }}>
                            {formatAddress(contact.OtherAddress)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Reporting Structure */}
                  {(contact.ReportsToName || contact.OwnerName) && (
                    <div style={{ marginBottom: '24px' }}>
                      <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: '#0176d3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Icon category="utility" name="hierarchy" size="x-small" style={{ fill: '#0176d3' }} />
                        Reporting & Ownership
                      </h4>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '16px',
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        border: '1px solid #dddbda'
                      }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            Reports To
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707' }}>
                            {contact.ReportsToName || 'None'}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            Owner
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707' }}>
                            {contact.OwnerName}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {contact.Description && (
                    <div style={{ marginBottom: '24px' }}>
                      <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: '#0176d3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Icon category="utility" name="info" size="x-small" style={{ fill: '#0176d3' }} />
                        Description
                      </h4>
                      <div style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        border: '1px solid #dddbda',
                        fontSize: '13px',
                        color: '#080707',
                        lineHeight: '1.6'
                      }}>
                        {contact.Description}
                      </div>
                    </div>
                  )}

                  {/* SAP Sync Information */}
                  <div>
                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: '#0176d3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon category="utility" name="sync" size="x-small" style={{ fill: '#0176d3' }} />
                      SAP Business One Sync
                    </h4>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#e8f4f8',
                      borderRadius: '4px',
                      border: '1px solid #0176d3'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            SAP Internal Code
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707', fontFamily: 'monospace' }}>
                            {contact.SAP_Contact_InternalCode__c}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            Created in SAP
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707' }}>
                            {contact.SAP_Contact_Create_Date__c} {contact.SAP_Contact_Create_Time__c}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            Last Updated
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707' }}>
                            {contact.SAP_Contact_Update_Date__c} {contact.SAP_Contact_Update_Time__c}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            Sync Status
                          </div>
                          <Badge color="success" content="Synced" />
                        </div>
                      </div>
                      {contact.Remarks_2__c && (
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #0176d3' }}>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            SAP Remarks
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707', fontStyle: 'italic' }}>
                            {contact.Remarks_2__c}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
          </div>
        )}
      </div>
    );
  };

  // Address Card Component
  const AddressCard = ({ address, isExpanded, onToggle }) => {
    return (
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #dddbda',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
      >
        {/* Card Header - Always Visible */}
        <div
          style={{
            padding: '20px',
            background: address.Address_Type__c === 'Billing'
              ? 'linear-gradient(135deg, #2e844a 0%, #4bca81 100%)'
              : 'linear-gradient(135deg, #fe9339 0%, #ffb75d 100%)',
            color: 'white',
            borderBottom: address.Address_Type__c === 'Billing' ? '3px solid #1d5835' : '3px solid #ca6a1f'
          }}
          onClick={() => onToggle(address.id)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon
                    category="utility"
                    name="location"
                    size="medium"
                    style={{ fill: 'white' }}
                  />
                </div>
                <div>
                  <h3 className="slds-text-heading_medium" style={{ margin: 0, color: 'white' }}>
                    {address.Name}
                  </h3>
                  <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '2px' }}>
                    {address.Address_Type__c} Address
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '14px' }}>
                <div>{address.Street__c}</div>
                {address.Building_Floor_Room__c && <div>{address.Building_Floor_Room__c}</div>}
                <div>{address.City__c}, {address.State__c} {address.Zip_Code__c}</div>
                <div>{address.Country__c}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon
                category="utility"
                name={isExpanded ? 'chevronup' : 'chevrondown'}
                size="small"
                style={{ fill: 'white' }}
              />
            </div>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          backgroundColor: '#f3f3f3',
          borderBottom: '1px solid #dddbda'
        }}>
          <div style={{ padding: '12px', borderRight: '1px solid #dddbda', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              Address Type
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#080707' }}>
              {address.Type_of_Address__c}
            </div>
          </div>
          <div style={{ padding: '12px', borderRight: '1px solid #dddbda', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              SAP Created
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#080707' }}>
              {address.SAP_Create_Date__c}
            </div>
          </div>
          <div style={{ padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              SAP Row #
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#080707', fontFamily: 'monospace' }}>
              {address.SAP_Row_Number__c}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div style={{ padding: '20px', backgroundColor: '#fafaf9' }}>
                <div style={{ padding: '16px' }}>
                  {/* Complete Address */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: address.Address_Type__c === 'Billing' ? '#2e844a' : '#fe9339', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon category="utility" name="home" size="x-small" style={{ fill: address.Address_Type__c === 'Billing' ? '#2e844a' : '#fe9339' }} />
                      Complete Address
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '16px',
                      padding: '16px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      border: '1px solid #dddbda'
                    }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Street Number
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.Street_Number__c}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Street
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.Street__c}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Block
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.Block__c || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Building / Floor / Room
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.Building_Floor_Room__c || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          City
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.City__c}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          County
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.County__c || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          State
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.State__c}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Zip Code
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.Zip_Code__c}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Country
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.Country__c}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tax & Regulatory Information */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: address.Address_Type__c === 'Billing' ? '#2e844a' : '#fe9339', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon category="utility" name="shield" size="x-small" style={{ fill: address.Address_Type__c === 'Billing' ? '#2e844a' : '#fe9339' }} />
                      Tax & Regulatory Information
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '16px',
                      padding: '16px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      border: '1px solid #dddbda'
                    }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Federal Tax ID
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707', fontFamily: 'monospace' }}>
                          {address.Federal_Tax_ID__c || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Tax Code
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707', fontFamily: 'monospace' }}>
                          {address.Tax_Code__c}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Tax Office
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.Tax_Office__c}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          Global Location Number
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707', fontFamily: 'monospace' }}>
                          {address.Global_Location_Number__c}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          GSTIN
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707', fontFamily: 'monospace' }}>
                          {address.GSTIN__c || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                          GST Type
                        </div>
                        <div style={{ fontSize: '13px', color: '#080707' }}>
                          {address.GST_Type__c || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SAP Sync Information */}
                  <div>
                    <h4 className="slds-text-heading_small" style={{ marginBottom: '12px', color: address.Address_Type__c === 'Billing' ? '#2e844a' : '#fe9339', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon category="utility" name="sync" size="x-small" style={{ fill: address.Address_Type__c === 'Billing' ? '#2e844a' : '#fe9339' }} />
                      SAP Business One Sync
                    </h4>
                    <div style={{
                      padding: '16px',
                      backgroundColor: '#e8f4f8',
                      borderRadius: '4px',
                      border: '1px solid #0176d3'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            SAP CardCode-RowNum
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707', fontFamily: 'monospace' }}>
                            {address.SAPB1_CardCode_RowNum__c}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            Created in SAP
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707' }}>
                            {address.SAP_Create_Date__c}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            SAP Row Number
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707', fontFamily: 'monospace' }}>
                            {address.SAP_Row_Number__c}
                          </div>
                        </div>
                      </div>
                      {address.Custom_Field_1__c && (
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #0176d3' }}>
                          <div style={{ fontSize: '11px', color: '#706e6b', marginBottom: '4px', fontWeight: '600' }}>
                            Notes
                          </div>
                          <div style={{ fontSize: '13px', color: '#080707', fontStyle: 'italic' }}>
                            {address.Custom_Field_1__c}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3', padding: '24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '32px'
        }}>
          <h1 className="slds-text-heading_large" style={{ marginBottom: '8px' }}>
            Contact & Address Components - SAP Business One Sync
          </h1>
          <p className="slds-text-body_regular" style={{ color: '#706e6b', margin: 0 }}>
            Interactive card components for managing Contacts and Addresses with SAP Business One synchronization.
            Click any card to expand and view all field details including communication preferences, addresses, and SAP sync information.
          </p>
        </div>

        {/* Contact Cards Section */}
        <ComponentCard
          title="Contact Cards"
          subtitle="Interactive contact cards with all standard and custom Salesforce fields and SAP sync information"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                isExpanded={expandedContactCard === contact.id}
                onToggle={(id) => setExpandedContactCard(expandedContactCard === id ? null : id)}
              />
            ))}
          </div>
        </ComponentCard>

        {/* Address Cards Section */}
        <ComponentCard
          title="Address Cards"
          subtitle="SAP-synced address cards with complete address details and tax/regulatory information"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isExpanded={expandedAddressCard === address.id}
                onToggle={(id) => setExpandedAddressCard(expandedAddressCard === id ? null : id)}
              />
            ))}
          </div>
        </ComponentCard>

        {/* Info Footer */}
        <div style={{
          backgroundColor: '#f3f2f2',
          padding: '16px',
          borderRadius: '4px',
          marginTop: '24px'
        }}>
          <p style={{ fontSize: '12px', color: '#706e6b', margin: 0, textAlign: 'center' }}>
            <strong>Component Features:</strong> These interactive cards provide clean interfaces for managing contacts and addresses.
            Each card displays key information at a glance and expands to show all standard and custom Salesforce fields including
            personal information, communication preferences, complete address details, tax/regulatory information, and SAP Business One sync data.
            Designed for drag-and-drop placement on Account record pages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactAddressComponents;
