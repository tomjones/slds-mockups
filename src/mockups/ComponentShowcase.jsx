import React, { useState, useMemo } from 'react';

// Core Components
import Button from '@salesforce/design-system-react/components/button';
import ButtonGroup from '@salesforce/design-system-react/components/button-group';
import ButtonStateful from '@salesforce/design-system-react/components/button-stateful';
import Card from '@salesforce/design-system-react/components/card';
import Icon from '@salesforce/design-system-react/components/icon';
import Badge from '@salesforce/design-system-react/components/badge';

// Form Components
import Input from '@salesforce/design-system-react/components/input';
import Textarea from '@salesforce/design-system-react/components/textarea';
import Checkbox from '@salesforce/design-system-react/components/checkbox';
import Radio from '@salesforce/design-system-react/components/radio';
import RadioGroup from '@salesforce/design-system-react/components/radio-group';
import Combobox from '@salesforce/design-system-react/components/combobox';
import Datepicker from '@salesforce/design-system-react/components/date-picker';
import Timepicker from '@salesforce/design-system-react/components/time-picker';
import Slider from '@salesforce/design-system-react/components/slider';

// Navigation & Layout
import Tabs from '@salesforce/design-system-react/components/tabs';
import TabsPanel from '@salesforce/design-system-react/components/tabs/panel';
import Accordion from '@salesforce/design-system-react/components/accordion';
import AccordionPanel from '@salesforce/design-system-react/components/accordion/panel';
import VerticalNavigation from '@salesforce/design-system-react/components/vertical-navigation';
import ProgressIndicator from '@salesforce/design-system-react/components/progress-indicator';
import ProgressBar from '@salesforce/design-system-react/components/progress-bar';
import Breadcrumb from '@salesforce/design-system-react/components/breadcrumb';

// Data Display
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import DataTableRowActions from '@salesforce/design-system-react/components/data-table/row-actions';
import Pill from '@salesforce/design-system-react/components/pill';
import Avatar from '@salesforce/design-system-react/components/avatar';
import Tooltip from '@salesforce/design-system-react/components/tooltip';
import Popover from '@salesforce/design-system-react/components/popover';

// Feedback & Alerts
import Alert from '@salesforce/design-system-react/components/alert';
import AlertContainer from '@salesforce/design-system-react/components/alert/container';
import Toast from '@salesforce/design-system-react/components/toast';
import ToastContainer from '@salesforce/design-system-react/components/toast/container';
import Spinner from '@salesforce/design-system-react/components/spinner';
import ScopedNotification from '@salesforce/design-system-react/components/scoped-notification';

// Modals & Overlays
import Modal from '@salesforce/design-system-react/components/modal';

// New High-Priority Components
import Lookup from '@salesforce/design-system-react/components/lookup';
import MenuDropdown from '@salesforce/design-system-react/components/menu-dropdown';
import MenuPicklist from '@salesforce/design-system-react/components/menu-picklist';
import Tree from '@salesforce/design-system-react/components/tree';
import PageHeader from '@salesforce/design-system-react/components/page-header';
import Panel from '@salesforce/design-system-react/components/panel';
import ExpandableSection from '@salesforce/design-system-react/components/expandable-section';
import Notification from '@salesforce/design-system-react/components/notification';

// Section Component for organizing the showcase
const Section = ({ title, description, children, id }) => (
  <div className="slds-m-bottom_large" id={id}>
    <div className="slds-p-bottom_small slds-border_bottom slds-m-bottom_medium">
      <h2 className="slds-text-heading_medium">{title}</h2>
      {description && (
        <p className="slds-text-body_regular slds-text-color_weak slds-m-top_xx-small">
          {description}
        </p>
      )}
    </div>
    {children}
  </div>
);

// Sub-section for component variants
const SubSection = ({ title, children }) => (
  <div className="slds-m-bottom_medium">
    <h3 className="slds-text-title_caps slds-text-color_weak slds-m-bottom_x-small">{title}</h3>
    {children}
  </div>
);

// ComponentSection wrapper with full documentation support
const ComponentSection = ({
  name,
  description,
  keyProps = [],
  bestPractices = [],
  relatedComponents = [],
  sldsUrl,
  children
}) => (
  <div className="slds-m-bottom_x-large" id={name.toLowerCase().replace(/\s+/g, '-')}>
    <Card
      heading={name}
      icon={<Icon category="standard" name="all" size="small" />}
      headerActions={
        sldsUrl && (
          <Button
            label="View Docs"
            variant="neutral"
            iconCategory="utility"
            iconName="new_window"
            iconSize="small"
            onClick={() => window.open(sldsUrl, '_blank')}
          />
        )
      }
    >
      <div className="slds-p-around_medium">
        <p className="slds-text-body_regular slds-m-bottom_medium">{description}</p>

        {keyProps.length > 0 && (
          <div className="slds-m-bottom_medium">
            <h3 className="slds-text-title_caps slds-text-color_weak slds-m-bottom_x-small">Key Props</h3>
            <div className="slds-grid slds-wrap" style={{gap: '8px'}}>
              {keyProps.map(prop => <Badge key={prop} content={prop} color="light" />)}
            </div>
          </div>
        )}

        {bestPractices.length > 0 && (
          <div className="slds-m-bottom_medium">
            <h3 className="slds-text-title_caps slds-text-color_weak slds-m-bottom_x-small">Best Practices</h3>
            <ul className="slds-list_dotted">
              {bestPractices.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        )}

        {relatedComponents.length > 0 && (
          <div className="slds-m-bottom_medium">
            <h3 className="slds-text-title_caps slds-text-color_weak slds-m-bottom_x-small">Related Components</h3>
            <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              {relatedComponents.map(c => (
                <a
                  key={c}
                  href={`#${c.toLowerCase().replace(/\s+/g, '-')}`}
                  className="slds-badge"
                  style={{cursor: 'pointer'}}
                >
                  {c}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="slds-border_top slds-p-top_medium">
          {children}
        </div>
      </div>
    </Card>
  </div>
);

const ComponentShowcase = () => {
  // Main navigation state
  const [mainActiveTab, setMainActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCodeFor, setShowCodeFor] = useState({});
  const [copiedCode, setCopiedCode] = useState(null);

  // State for interactive components
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [comboboxSelection, setComboboxSelection] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [activeTab, setActiveTab] = useState(0);
  const [expandedPanels, setExpandedPanels] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  // Sample data for components
  const comboboxOptions = [
    { id: '1', label: 'Option 1', value: 'opt1' },
    { id: '2', label: 'Option 2', value: 'opt2' },
    { id: '3', label: 'Option 3', value: 'opt3' },
    { id: '4', label: 'Option 4', value: 'opt4' },
  ];

  const tableItems = [
    { id: '1', name: 'Acme Corp', industry: 'Technology', employees: 500, status: 'Active' },
    { id: '2', name: 'Global Industries', industry: 'Manufacturing', employees: 2500, status: 'Active' },
    { id: '3', name: 'Tech Solutions', industry: 'Technology', employees: 150, status: 'Inactive' },
    { id: '4', name: 'Design Co', industry: 'Creative', employees: 75, status: 'Active' },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'accounts', label: 'Accounts' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'opportunities', label: 'Opportunities' },
  ];

  const progressSteps = [
    { id: 0, label: 'Step 1' },
    { id: 1, label: 'Step 2' },
    { id: 2, label: 'Step 3' },
    { id: 3, label: 'Step 4' },
  ];

  const rowActions = [
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' },
    { id: 'clone', label: 'Clone' },
  ];

  // Custom cell for status badge
  const StatusCell = ({ item }) => (
    <Badge
      content={item.status}
      color={item.status === 'Active' ? 'success' : 'light'}
    />
  );
  StatusCell.displayName = DataTableCell.displayName;

  // Example wrapper with code toggle functionality
  const Example = ({ title, code, children }) => {
    const exampleId = `${title.replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="slds-m-bottom_large">
        <div className="slds-grid slds-grid_align-spread slds-m-bottom_small">
          <h4 className="slds-text-heading_small">{title}</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              label={showCodeFor[exampleId] ? 'Hide Code' : 'Show Code'}
              variant="neutral"
              iconCategory="utility"
              iconName="code"
              iconSize="small"
              onClick={() => setShowCodeFor(prev => ({
                ...prev,
                [exampleId]: !prev[exampleId]
              }))}
            />
            {showCodeFor[exampleId] && (
              <Button
                label={copiedCode === exampleId ? 'Copied!' : 'Copy'}
                variant={copiedCode === exampleId ? 'success' : 'neutral'}
                iconCategory="utility"
                iconName="copy"
                iconSize="small"
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopiedCode(exampleId);
                  setTimeout(() => setCopiedCode(null), 2000);
                }}
              />
            )}
          </div>
        </div>

        <div className="slds-box slds-box_small slds-theme_shade slds-m-bottom_x-small">
          {children}
        </div>

        {showCodeFor[exampleId] && (
          <div className="slds-box" style={{backgroundColor: '#f4f6f9', overflowX: 'auto'}}>
            <pre style={{margin: 0, fontSize: '12px', fontFamily: 'Consolas, Monaco, monospace'}}>
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    );
  };

  // Component search index
  const componentSearchIndex = useMemo(() => [
    { name: 'Button', description: 'Triggers an action or event', category: 'Basic', tab: 0, keywords: ['action', 'click', 'trigger'], id: 'button' },
    { name: 'Icon', description: 'Visual symbols and graphics', category: 'Basic', tab: 0, keywords: ['symbol', 'graphic'], id: 'icon' },
    { name: 'Badge', description: 'Status indicators and labels', category: 'Basic', tab: 0, keywords: ['status', 'label', 'tag'], id: 'badge' },
    { name: 'Avatar', description: 'User and entity profile images', category: 'Basic', tab: 0, keywords: ['profile', 'picture', 'user'], id: 'avatar' },
    { name: 'Pill', description: 'Removable tags and filters', category: 'Basic', tab: 0, keywords: ['tag', 'filter', 'chip'], id: 'pill' },
    { name: 'Input', description: 'Text input field for forms', category: 'Forms', tab: 1, keywords: ['text', 'field', 'form'], id: 'input' },
    { name: 'Textarea', description: 'Multi-line text input', category: 'Forms', tab: 1, keywords: ['text', 'multiline'], id: 'textarea' },
    { name: 'Checkbox', description: 'Binary selection control', category: 'Forms', tab: 1, keywords: ['select', 'toggle'], id: 'checkbox' },
    { name: 'Radio', description: 'Single selection from options', category: 'Forms', tab: 1, keywords: ['select', 'option'], id: 'radio' },
    { name: 'Combobox', description: 'Searchable dropdown selection', category: 'Forms', tab: 1, keywords: ['dropdown', 'select', 'search'], id: 'combobox' },
    { name: 'Datepicker', description: 'Date selection calendar', category: 'Forms', tab: 1, keywords: ['date', 'calendar'], id: 'datepicker' },
    { name: 'Timepicker', description: 'Time selection input', category: 'Forms', tab: 1, keywords: ['time', 'clock'], id: 'timepicker' },
    { name: 'Slider', description: 'Range input control', category: 'Forms', tab: 1, keywords: ['range', 'value'], id: 'slider' },
    { name: 'DataTable', description: 'Tabular data display', category: 'Data', tab: 2, keywords: ['table', 'grid', 'data'], id: 'data-table' },
    { name: 'Card', description: 'Content container with header', category: 'Data', tab: 2, keywords: ['container', 'panel'], id: 'card' },
    { name: 'Accordion', description: 'Expandable content sections', category: 'Data', tab: 2, keywords: ['expand', 'collapse'], id: 'accordion' },
    { name: 'Tabs', description: 'Tabbed navigation', category: 'Data', tab: 2, keywords: ['navigation', 'switch'], id: 'tabs' },
    { name: 'Vertical Navigation', description: 'Sidebar navigation menu', category: 'Data', tab: 2, keywords: ['menu', 'sidebar'], id: 'vertical-navigation' },
    { name: 'Breadcrumbs', description: 'Navigation trail', category: 'Data', tab: 2, keywords: ['navigation', 'path'], id: 'breadcrumbs' },
    { name: 'Progress Indicator', description: 'Multi-step process', category: 'Data', tab: 2, keywords: ['steps', 'wizard'], id: 'progress-indicator' },
    { name: 'Alert', description: 'Banner notifications', category: 'Feedback', tab: 3, keywords: ['notification', 'message'], id: 'alert' },
    { name: 'Toast', description: 'Temporary notifications', category: 'Feedback', tab: 3, keywords: ['notification', 'message'], id: 'toast' },
    { name: 'Modal', description: 'Overlay dialog windows', category: 'Feedback', tab: 3, keywords: ['dialog', 'popup'], id: 'modal' },
    { name: 'Spinner', description: 'Loading indicators', category: 'Feedback', tab: 3, keywords: ['loading', 'progress'], id: 'spinner' },
    { name: 'Progress Bar', description: 'Linear progress indicator', category: 'Feedback', tab: 3, keywords: ['loading', 'progress'], id: 'progress-bar' },
    { name: 'Tooltip', description: 'Contextual help text', category: 'Feedback', tab: 3, keywords: ['help', 'hint'], id: 'tooltip' },
    { name: 'Popover', description: 'Contextual information overlay', category: 'Feedback', tab: 3, keywords: ['overlay', 'info'], id: 'popover' },
    { name: 'Scoped Notification', description: 'Inline alerts', category: 'Feedback', tab: 3, keywords: ['alert', 'message'], id: 'scoped-notification' },
    { name: 'MenuDropdown', description: 'Action menu dropdown', category: 'Advanced', tab: 4, keywords: ['menu', 'dropdown', 'actions'], id: 'menudropdown' },
    { name: 'Lookup', description: 'Record search and selection', category: 'Advanced', tab: 4, keywords: ['search', 'select', 'record'], id: 'lookup' },
    { name: 'Tree', description: 'Hierarchical data display', category: 'Advanced', tab: 4, keywords: ['hierarchy', 'tree', 'nested'], id: 'tree' },
    { name: 'PageHeader', description: 'Page title and actions', category: 'Advanced', tab: 4, keywords: ['header', 'title'], id: 'pageheader' },
    { name: 'Panel', description: 'Sliding panel overlay', category: 'Advanced', tab: 4, keywords: ['drawer', 'sidebar'], id: 'panel' },
    { name: 'ExpandableSection', description: 'Collapsible content area', category: 'Advanced', tab: 4, keywords: ['collapse', 'expand'], id: 'expandablesection' },
    { name: 'Notification', description: 'Global notification banner', category: 'Advanced', tab: 4, keywords: ['alert', 'banner'], id: 'notification' },
  ], []);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    return componentSearchIndex.filter(comp =>
      comp.name.toLowerCase().includes(query) ||
      comp.description.toLowerCase().includes(query) ||
      comp.keywords.some(kw => kw.toLowerCase().includes(query))
    );
  }, [searchQuery, componentSearchIndex]);

  return (
    <div className="slds-p-around_large" style={{ backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Page Header */}
        <div className="slds-box slds-theme_default slds-m-bottom_large">
          <div className="slds-grid slds-grid_vertical-align-center slds-p-around_medium">
            <div className="slds-col slds-size_2-of-3">
              <div className="slds-media slds-media_center">
                <div className="slds-media__figure">
                  <Icon category="standard" name="all" size="large" />
                </div>
                <div className="slds-media__body">
                  <h1 className="slds-text-heading_large">SLDS Component Showcase</h1>
                  <p className="slds-text-body_regular slds-text-color_weak">
                    Comprehensive, interactive examples for developers building mockups and production code
                  </p>
                </div>
              </div>
            </div>
            <div className="slds-col slds-size_1-of-3">
              <div className="slds-form-element">
                <div className="slds-form-element__control">
                  <div className="slds-input-has-icon slds-input-has-icon_left">
                    <Icon
                      assistiveText={{ label: 'Search' }}
                      category="utility"
                      name="search"
                      size="x-small"
                      className="slds-icon slds-input__icon slds-input__icon_left"
                    />
                    <input
                      type="text"
                      className="slds-input"
                      placeholder="Search components..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Container */}
        {showToast && (
          <ToastContainer style={{ top: '60px' }}>
            <Toast
              labels={{ heading: 'Success!', details: 'Record has been saved successfully.' }}
              variant="success"
              onRequestClose={() => setShowToast(false)}
            />
          </ToastContainer>
        )}

        {/* Alert Banners */}
        {showAlert && (
          <div className="slds-m-bottom_medium">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Alert
                labels={{ heading: 'This is an informational alert banner', headingLink: 'Learn More' }}
                variant="info"
                icon={<Icon category="utility" name="info" />}
                onClickHeadingLink={() => console.log('Link clicked')}
              />
              <Alert
                labels={{ heading: 'This is a success alert banner', details: 'Your changes have been saved successfully.' }}
                variant="success"
                icon={<Icon category="utility" name="success" />}
              />
              <Alert
                labels={{ heading: 'This is a warning alert banner', details: 'Please review the following items before proceeding.' }}
                variant="warning"
                icon={<Icon category="utility" name="warning" />}
              />
              <Alert
                labels={{ heading: 'This is an error alert banner', details: 'An error occurred while processing your request.' }}
                variant="error"
                icon={<Icon category="utility" name="error" />}
              />
              <Alert
                labels={{ heading: 'This is an offline alert banner', details: 'You are currently offline. Changes will sync when connection is restored.' }}
                variant="offline"
                icon={<Icon category="utility" name="offline" />}
              />
            </div>
            <div style={{ marginTop: '12px', textAlign: 'right' }}>
              <Button
                label="Close All Alerts"
                variant="neutral"
                onClick={() => setShowAlert(false)}
              />
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults && searchResults.length > 0 && (
          <Card heading={`Search Results (${searchResults.length})`} className="slds-m-bottom_medium">
            <div className="slds-p-around_medium">
              <div className="slds-grid slds-wrap slds-gutters_small">
                {searchResults.map(result => (
                  <div key={result.id} className="slds-col slds-size_1-of-3">
                    <div
                      className="slds-box slds-box_small"
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        setMainActiveTab(result.tab);
                        setSearchQuery('');
                        setTimeout(() => {
                          document.getElementById(result.id)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }, 100);
                      }}
                    >
                      <h3 className="slds-text-heading_small">{result.name}</h3>
                      <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_x-small">{result.description}</p>
                      <Badge content={result.category} color="light" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        <div className="slds-grid slds-wrap slds-gutters">
          {/* Main Content */}
          <div className="slds-col slds-size_1-of-1">
            <div className="slds-box slds-theme_default">
              <div className="slds-p-around_medium">

                <Tabs
                  id="component-showcase-main-tabs"
                  onSelect={(index) => setMainActiveTab(index)}
                  selectedIndex={mainActiveTab}
                  variant="scoped"
                >
                  <TabsPanel label="Basic Components">
                    {/* ==================== BUTTONS ==================== */}
                <Section title="Buttons" description="Various button styles, variants, and states" id="button">
                  <SubSection title="Button Variants">
                    <div className="slds-grid slds-grid_vertical-align-center slds-wrap" style={{ gap: '8px' }}>
                      <Button label="Base" />
                      <Button label="Neutral" variant="neutral" />
                      <Button label="Brand" variant="brand" />
                      <Button label="Destructive" variant="destructive" />
                      <Button label="Success" variant="success" />
                      <Button label="Outline Brand" variant="outline-brand" />
                      <Button label="Text Destructive" variant="text-destructive" />
                    </div>
                  </SubSection>

                  <SubSection title="Buttons with Icons">
                    <div className="slds-grid slds-grid_vertical-align-center slds-wrap" style={{ gap: '8px' }}>
                      <Button
                        label="Download"
                        iconCategory="utility"
                        iconName="download"
                        iconPosition="left"
                        variant="neutral"
                      />
                      <Button
                        label="Next"
                        iconCategory="utility"
                        iconName="chevronright"
                        iconPosition="right"
                        variant="brand"
                      />
                      <Button
                        iconCategory="utility"
                        iconName="settings"
                        variant="icon"
                        iconSize="medium"
                        assistiveText={{ icon: 'Settings' }}
                      />
                      <Button
                        iconCategory="utility"
                        iconName="add"
                        variant="icon"
                        iconVariant="border-filled"
                        assistiveText={{ icon: 'Add' }}
                      />
                    </div>
                  </SubSection>

                  <SubSection title="Button Group">
                    <ButtonGroup>
                      <Button label="Refresh" variant="neutral" />
                      <Button label="Edit" variant="neutral" />
                      <Button label="Save" variant="neutral" />
                    </ButtonGroup>
                  </SubSection>

                  <SubSection title="Stateful Button">
                    <ButtonStateful
                      assistiveText={{ icon: 'Follow' }}
                      iconName="add"
                      iconSize="medium"
                      stateOne={{ iconName: 'add', label: 'Follow' }}
                      stateTwo={{ iconName: 'check', label: 'Following' }}
                      stateThree={{ iconName: 'close', label: 'Unfollow' }}
                    />
                  </SubSection>

                  <SubSection title="Disabled States">
                    <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: '8px' }}>
                      <Button label="Disabled Neutral" variant="neutral" disabled />
                      <Button label="Disabled Brand" variant="brand" disabled />
                    </div>
                  </SubSection>
                </Section>

                {/* ==================== ICONS ==================== */}
                <Section title="Icons" description="Icon categories and sizes" id="icon">
                  <SubSection title="Standard Icons">
                    <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: '16px' }}>
                      <Icon category="standard" name="account" size="small" title="Account" />
                      <Icon category="standard" name="contact" size="small" title="Contact" />
                      <Icon category="standard" name="opportunity" size="small" title="Opportunity" />
                      <Icon category="standard" name="lead" size="small" title="Lead" />
                      <Icon category="standard" name="campaign" size="small" title="Campaign" />
                      <Icon category="standard" name="case" size="small" title="Case" />
                      <Icon category="standard" name="task" size="small" title="Task" />
                      <Icon category="standard" name="event" size="small" title="Event" />
                    </div>
                  </SubSection>

                  <SubSection title="Utility Icons">
                    <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: '16px' }}>
                      <Icon category="utility" name="search" size="small" />
                      <Icon category="utility" name="settings" size="small" />
                      <Icon category="utility" name="add" size="small" />
                      <Icon category="utility" name="edit" size="small" />
                      <Icon category="utility" name="delete" size="small" />
                      <Icon category="utility" name="check" size="small" colorVariant="success" />
                      <Icon category="utility" name="warning" size="small" colorVariant="warning" />
                      <Icon category="utility" name="error" size="small" colorVariant="error" />
                    </div>
                  </SubSection>

                  <SubSection title="Icon Sizes">
                    <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: '16px' }}>
                      <Icon category="standard" name="account" size="x-small" title="X-Small" />
                      <Icon category="standard" name="account" size="small" title="Small" />
                      <Icon category="standard" name="account" size="medium" title="Medium" />
                      <Icon category="standard" name="account" size="large" title="Large" />
                    </div>
                  </SubSection>

                  <SubSection title="Action Icons">
                    <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: '16px' }}>
                      <Icon category="action" name="new" size="small" />
                      <Icon category="action" name="edit" size="small" />
                      <Icon category="action" name="share" size="small" />
                      <Icon category="action" name="email" size="small" />
                      <Icon category="action" name="call" size="small" />
                    </div>
                  </SubSection>
                </Section>

                {/* ==================== BADGES ==================== */}
                <Section title="Badges" description="Status indicators and labels" id="badge">
                  <div className="slds-grid slds-grid_vertical-align-center slds-wrap" style={{ gap: '8px' }}>
                    <Badge content="Default" />
                    <Badge content="Success" color="success" />
                    <Badge content="Warning" color="warning" />
                    <Badge content="Error" color="error" />
                    <Badge content="Light" color="light" />
                    <Badge content="Inverse" color="inverse" />
                  </div>
                </Section>

                {/* ==================== AVATARS ==================== */}
                <Section title="Avatars" description="User and entity profile images" id="avatar">
                  <SubSection title="Avatar Sizes">
                    <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: '16px' }}>
                      <Avatar variant="user" size="x-small" label="XS" />
                      <Avatar variant="user" size="small" label="SM" />
                      <Avatar variant="user" size="medium" label="MD" />
                      <Avatar variant="user" size="large" label="LG" />
                    </div>
                  </SubSection>

                  <SubSection title="Avatar Variants">
                    <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: '16px' }}>
                      <Avatar variant="user" size="medium" label="User" />
                      <Avatar variant="entity" size="medium" label="Entity" />
                    </div>
                  </SubSection>
                </Section>

                {/* ==================== PILLS ==================== */}
                <Section title="Pills" description="Removable tags and filters" id="pill">
                  <div className="slds-grid slds-grid_vertical-align-center slds-wrap" style={{ gap: '8px' }}>
                    <Pill labels={{ label: 'Basic Pill' }} />
                    <Pill
                      labels={{ label: 'With Icon' }}
                      icon={<Icon category="standard" name="account" />}
                    />
                    <Pill
                      labels={{ label: 'Removable' }}
                      onRemove={() => console.log('Removed')}
                    />
                    <Pill labels={{ label: 'Error' }} hasError />
                  </div>
                </Section>
                  </TabsPanel>

                  <TabsPanel label="Form Components">
                {/* ==================== FORM INPUTS ==================== */}
                <Section title="Form Inputs" description="Text inputs, textareas, and other form fields" id="input">
                  <div className="slds-grid slds-wrap slds-gutters">
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Input
                        label="Standard Input"
                        placeholder="Enter text..."
                        value={inputValue}
                        onChange={(e, { value }) => setInputValue(value)}
                      />
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Input
                        label="Required Input"
                        placeholder="This field is required"
                        required
                      />
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Input
                        label="Input with Error"
                        placeholder="Invalid value"
                        errorText="This field has an error"
                      />
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Input
                        label="Disabled Input"
                        placeholder="Cannot edit"
                        disabled
                      />
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Input
                        label="Read Only Input"
                        value="Read only value"
                        readOnly
                      />
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Input
                        label="Input with Icon"
                        placeholder="Search..."
                        iconLeft={<Icon category="utility" name="search" size="x-small" />}
                      />
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-m-bottom_small" id="textarea">
                      <Textarea
                        label="Textarea"
                        placeholder="Enter longer text here..."
                        value={textareaValue}
                        onChange={(e, { value }) => setTextareaValue(value)}
                      />
                    </div>
                  </div>
                </Section>

                {/* ==================== CHECKBOXES & RADIOS ==================== */}
                <Section title="Checkboxes & Radio Buttons" description="Selection controls" id="checkbox">
                  <div className="slds-grid slds-wrap slds-gutters">
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2">
                      <SubSection title="Checkboxes">
                        <Checkbox
                          labels={{ label: 'Basic Checkbox' }}
                          checked={checkboxChecked}
                          onChange={() => setCheckboxChecked(!checkboxChecked)}
                        />
                        <Checkbox
                          labels={{ label: 'Checked by Default' }}
                          checked
                          onChange={() => {}}
                        />
                        <Checkbox
                          labels={{ label: 'Disabled Checkbox' }}
                          disabled
                        />
                        <Checkbox
                          labels={{ label: 'Indeterminate' }}
                          indeterminate
                        />
                      </SubSection>
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2" id="radio">
                      <SubSection title="Radio Group">
                        <RadioGroup
                          labels={{ label: 'Select an option' }}
                          onChange={(e) => setRadioValue(e.target.value)}
                        >
                          <Radio
                            label="Option 1"
                            value="option1"
                            checked={radioValue === 'option1'}
                          />
                          <Radio
                            label="Option 2"
                            value="option2"
                            checked={radioValue === 'option2'}
                          />
                          <Radio
                            label="Option 3"
                            value="option3"
                            checked={radioValue === 'option3'}
                          />
                        </RadioGroup>
                      </SubSection>
                    </div>
                  </div>
                </Section>

                {/* ==================== COMBOBOX ==================== */}
                <Section title="Combobox / Dropdown" description="Searchable dropdown selections" id="combobox">
                  <div className="slds-grid slds-wrap slds-gutters">
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Combobox
                        labels={{ label: 'Single Select Combobox' }}
                        options={comboboxOptions}
                        selection={comboboxSelection}
                        onSelect={(event, data) => {
                          setComboboxSelection(data.selection);
                        }}
                        events={{
                          onSelect: (event, data) => setComboboxSelection(data.selection),
                        }}
                        variant="readonly"
                      />
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Combobox
                        labels={{ label: 'Searchable Combobox' }}
                        options={comboboxOptions}
                        events={{
                          onSelect: (event, data) => console.log('Selected:', data),
                        }}
                        variant="base"
                      />
                    </div>
                  </div>
                </Section>

                {/* ==================== DATE & TIME PICKERS ==================== */}
                <Section title="Date & Time Pickers" description="Date and time selection components" id="datepicker">
                  <div className="slds-grid slds-wrap slds-gutters">
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Datepicker
                        labels={{ label: 'Date Picker' }}
                        onChange={(event, data) => setSelectedDate(data.date)}
                        value={selectedDate}
                      />
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small" id="timepicker">
                      <Timepicker
                        label="Time Picker"
                        onDateChange={(date, inputStr) => setSelectedTime(inputStr)}
                        value={selectedTime}
                      />
                    </div>
                  </div>
                </Section>

                {/* ==================== SLIDER ==================== */}
                <Section title="Slider" description="Range input control" id="slider">
                  <div style={{ maxWidth: '400px' }}>
                    <Slider
                      label={`Slider Value: ${sliderValue}`}
                      value={sliderValue}
                      onChange={(e, { value }) => setSliderValue(value)}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>
                </Section>
                  </TabsPanel>

                  <TabsPanel label="Data & Layout">
                {/* ==================== CARDS ==================== */}
                <Section title="Cards" description="Content containers with optional headers and actions" id="card">
                  <div className="slds-grid slds-wrap slds-gutters">
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Card
                        heading="Basic Card"
                        icon={<Icon category="standard" name="document" size="small" />}
                      >
                        <div className="slds-p-around_medium">
                          <p>This is the card body content. Cards are used to contain related information.</p>
                        </div>
                      </Card>
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_small">
                      <Card
                        heading="Card with Actions"
                        icon={<Icon category="standard" name="account" size="small" />}
                        headerActions={
                          <Button label="New" variant="neutral" />
                        }
                      >
                        <div className="slds-p-around_medium">
                          <p>This card has a header action button.</p>
                        </div>
                      </Card>
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-m-bottom_small">
                      <Card
                        heading="Card with Footer"
                        footer={
                          <a href="#view-all" onClick={(e) => e.preventDefault()}>
                            View All
                          </a>
                        }
                      >
                        <div className="slds-p-around_medium">
                          <p>This card has a footer link.</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Section>

                {/* ==================== DATA TABLE ==================== */}
                <Section title="Data Table" description="Tabular data display with sorting and actions" id="data-table">
                  <Card heading="Accounts">
                    <DataTable
                      items={tableItems}
                      id="showcase-table"
                      fixedLayout
                    >
                      <DataTableColumn label="Name" property="name" />
                      <DataTableColumn label="Industry" property="industry" />
                      <DataTableColumn label="Employees" property="employees" />
                      <DataTableColumn label="Status" property="status">
                        <StatusCell />
                      </DataTableColumn>
                      <DataTableRowActions
                        options={rowActions}
                        onAction={(item, action) => console.log(item, action)}
                        dropdown={{ length: 3 }}
                      />
                    </DataTable>
                  </Card>
                </Section>

                {/* ==================== TABS ==================== */}
                <Section title="Tabs" description="Tabbed navigation for content organization" id="tabs">
                  <Tabs
                    id="showcase-tabs"
                    onSelect={(index) => setActiveTab(index)}
                    selectedIndex={activeTab}
                  >
                    <TabsPanel label="Tab 1">
                      <div className="slds-p-around_medium">
                        <p>Content for Tab 1. Tabs allow users to switch between related content sections.</p>
                      </div>
                    </TabsPanel>
                    <TabsPanel label="Tab 2">
                      <div className="slds-p-around_medium">
                        <p>Content for Tab 2. Each tab panel can contain different content.</p>
                      </div>
                    </TabsPanel>
                    <TabsPanel label="Tab 3">
                      <div className="slds-p-around_medium">
                        <p>Content for Tab 3. Use tabs to reduce clutter and organize information.</p>
                      </div>
                    </TabsPanel>
                  </Tabs>
                </Section>

                {/* ==================== ACCORDION ==================== */}
                <Section title="Accordion" description="Expandable content sections" id="accordion">
                  <Accordion id="showcase-accordion">
                    <AccordionPanel
                      expanded={expandedPanels['panel1']}
                      onTogglePanel={() => setExpandedPanels(prev => ({ ...prev, panel1: !prev.panel1 }))}
                      summary="Accordion Panel 1"
                      id="panel1"
                    >
                      <p className="slds-p-around_medium">
                        This is the content of the first accordion panel. Accordions are useful for hiding detailed information until needed.
                      </p>
                    </AccordionPanel>
                    <AccordionPanel
                      expanded={expandedPanels['panel2']}
                      onTogglePanel={() => setExpandedPanels(prev => ({ ...prev, panel2: !prev.panel2 }))}
                      summary="Accordion Panel 2"
                      id="panel2"
                    >
                      <p className="slds-p-around_medium">
                        This is the content of the second accordion panel.
                      </p>
                    </AccordionPanel>
                    <AccordionPanel
                      expanded={expandedPanels['panel3']}
                      onTogglePanel={() => setExpandedPanels(prev => ({ ...prev, panel3: !prev.panel3 }))}
                      summary="Accordion Panel 3"
                      id="panel3"
                    >
                      <p className="slds-p-around_medium">
                        This is the content of the third accordion panel.
                      </p>
                    </AccordionPanel>
                  </Accordion>
                </Section>

                {/* ==================== BREADCRUMBS ==================== */}
                <Section title="Breadcrumbs" description="Navigation trail showing current location" id="breadcrumbs">
                  <nav role="navigation" aria-label="Breadcrumbs">
                    <ol className="slds-breadcrumb slds-list_horizontal slds-wrap">
                      <li className="slds-breadcrumb__item">
                        <a href="#home" onClick={(e) => e.preventDefault()}>Home</a>
                      </li>
                      <li className="slds-breadcrumb__item">
                        <a href="#accounts" onClick={(e) => e.preventDefault()}>Accounts</a>
                      </li>
                      <li className="slds-breadcrumb__item">
                        <a href="#acme" onClick={(e) => e.preventDefault()}>Acme Corp</a>
                      </li>
                    </ol>
                  </nav>
                </Section>

                {/* ==================== VERTICAL NAVIGATION ==================== */}
                <Section title="Vertical Navigation" description="Sidebar navigation menu" id="vertical-navigation">
                  <div style={{ maxWidth: '300px' }}>
                    <VerticalNavigation
                      categories={[
                        {
                          id: 'main',
                          label: 'Main Navigation',
                          items: navItems,
                        },
                      ]}
                      selectedId="accounts"
                      onSelect={(event, data) => console.log('Selected:', data)}
                    />
                  </div>
                </Section>

                {/* ==================== PROGRESS INDICATOR ==================== */}
                <Section title="Progress Indicator" description="Multi-step process indicator" id="progress-indicator">
                  <SubSection title="Step Progress">
                    <ProgressIndicator
                      steps={progressSteps}
                      completedSteps={progressSteps.slice(0, currentStep)}
                      currentStep={progressSteps[currentStep]}
                      onStepClick={(event, data) => setCurrentStep(data.step)}
                    />
                    <div className="slds-m-top_medium">
                      <ButtonGroup>
                        <Button
                          label="Previous"
                          variant="neutral"
                          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                          disabled={currentStep === 0}
                        />
                        <Button
                          label="Next"
                          variant="brand"
                          onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                          disabled={currentStep === 3}
                        />
                      </ButtonGroup>
                    </div>
                  </SubSection>

                  <SubSection title="Progress Bar">
                    <div style={{ maxWidth: '400px' }} id="progress-bar">
                      <ProgressBar value={65} />
                      <p className="slds-text-body_small slds-text-color_weak slds-m-top_xx-small">65% Complete</p>
                    </div>
                  </SubSection>
                </Section>
                  </TabsPanel>

                  <TabsPanel label="Feedback & Overlays">

                {/* ==================== ALERT ==================== */}
                <Section title="Alert" description="Banner notifications for important messages" id="alert">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Alert
                      labels={{ heading: 'Informational alert banner', headingLink: 'Learn More' }}
                      variant="info"
                      icon={<Icon category="utility" name="info" />}
                      onClickHeadingLink={() => console.log('Link clicked')}
                    />
                    <Alert
                      labels={{ heading: 'Success alert banner', details: 'Your changes have been saved successfully.' }}
                      variant="success"
                      icon={<Icon category="utility" name="success" />}
                    />
                    <Alert
                      labels={{ heading: 'Warning alert banner', details: 'Please review the following items before proceeding.' }}
                      variant="warning"
                      icon={<Icon category="utility" name="warning" />}
                    />
                    <Alert
                      labels={{ heading: 'Error alert banner', details: 'An error occurred while processing your request.' }}
                      variant="error"
                      icon={<Icon category="utility" name="error" />}
                    />
                  </div>
                </Section>

                {/* ==================== TOOLTIPS & POPOVERS ==================== */}
                <Section title="Tooltips & Popovers" description="Contextual information overlays" id="tooltip">
                  <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: '32px' }}>
                    <Tooltip
                      content="This is a helpful tooltip"
                      align="top"
                    >
                      <Button label="Hover for Tooltip" variant="neutral" />
                    </Tooltip>

                    <div id="popover">
                      <Popover
                        body="This is popover content that appears on click. It can contain more detailed information."
                        heading="Popover Title"
                        align="top"
                      >
                        <Button label="Click for Popover" variant="neutral" />
                      </Popover>
                    </div>
                  </div>
                </Section>

                {/* ==================== SPINNERS ==================== */}
                <Section title="Spinners" description="Loading indicators" id="spinner">
                  <div className="slds-grid slds-grid_vertical-align-center" style={{ gap: '32px' }}>
                    <div className="slds-is-relative" style={{ height: '40px', width: '40px' }}>
                      <Spinner size="x-small" variant="base" assistiveText={{ label: 'X-Small Loading' }} />
                    </div>
                    <div className="slds-is-relative" style={{ height: '50px', width: '50px' }}>
                      <Spinner size="small" variant="base" assistiveText={{ label: 'Small Loading' }} />
                    </div>
                    <div className="slds-is-relative" style={{ height: '60px', width: '60px' }}>
                      <Spinner size="medium" variant="base" assistiveText={{ label: 'Medium Loading' }} />
                    </div>
                    <div className="slds-is-relative" style={{ height: '80px', width: '80px' }}>
                      <Spinner size="large" variant="brand" assistiveText={{ label: 'Large Loading' }} />
                    </div>
                  </div>
                </Section>

                {/* ==================== SCOPED NOTIFICATIONS ==================== */}
                <Section title="Scoped Notifications" description="Inline alerts and messages" id="scoped-notification">
                  <div className="slds-grid slds-grid_vertical" style={{ gap: '12px' }}>
                    <ScopedNotification theme="light">
                      <p>This is a light scoped notification for general information.</p>
                    </ScopedNotification>
                    <ScopedNotification theme="dark">
                      <p>This is a dark scoped notification for important messages.</p>
                    </ScopedNotification>
                    <ScopedNotification theme="info">
                      <p>This is an info scoped notification.</p>
                    </ScopedNotification>
                    <ScopedNotification theme="success">
                      <p>This is a success scoped notification.</p>
                    </ScopedNotification>
                    <ScopedNotification theme="warning">
                      <p>This is a warning scoped notification.</p>
                    </ScopedNotification>
                    <ScopedNotification theme="error">
                      <p>This is an error scoped notification.</p>
                    </ScopedNotification>
                  </div>
                </Section>

                {/* ==================== MODAL ==================== */}
                <Section title="Modal" description="Overlay dialog windows" id="modal">
                  <Button
                    label="Open Modal"
                    variant="brand"
                    onClick={() => setIsModalOpen(true)}
                  />
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    heading="Modal Title"
                    footer={[
                      <Button key="cancel" label="Cancel" onClick={() => setIsModalOpen(false)} />,
                      <Button key="save" label="Save" variant="brand" onClick={() => setIsModalOpen(false)} />,
                    ]}
                  >
                    <section className="slds-p-around_medium">
                      <p>This is the modal body content. Modals are used for focused interactions that require user attention.</p>
                      <Input label="Sample Input" className="slds-m-top_medium" />
                    </section>
                  </Modal>
                </Section>

                {/* ==================== TOAST ==================== */}
                <Section title="Toast" description="Temporary notification messages" id="toast">
                  <Button
                    label="Show Toast"
                    variant="success"
                    onClick={() => setShowToast(true)}
                  />
                </Section>
                  </TabsPanel>

                  <TabsPanel label="Advanced & Specialized">

                {/* ==================== MENUDROPDOWN ==================== */}
                <ComponentSection
                  name="MenuDropdown"
                  description="Displays actions or options in a dropdown menu. Essential for overflow actions and contextual menus."
                  keyProps={['options', 'onSelect', 'assistiveText', 'align', 'buttonVariant']}
                  bestPractices={[
                    "Use for overflow actions that don't fit in the main UI",
                    "Keep menu items to 7 or fewer for optimal usability",
                    "Provide clear, action-oriented labels",
                    "Group related actions using dividers"
                  ]}
                  relatedComponents={['Button', 'MenuPicklist']}
                  sldsUrl="https://react.lightningdesignsystem.com/components/menu-dropdowns/"
                >
                  <Example
                    title="Basic Actions Menu"
                    code={`<MenuDropdown
  assistiveText={{ icon: 'More Actions' }}
  iconCategory="utility"
  iconName="down"
  iconVariant="border-filled"
  onSelect={(option) => console.log('Selected:', option.value)}
  options={[
    { label: 'Edit', value: 'edit' },
    { label: 'Delete', value: 'delete' },
    { label: 'Clone', value: 'clone' }
  ]}
/>`}
                  >
                    <MenuDropdown
                      assistiveText={{ icon: 'More Actions' }}
                      iconCategory="utility"
                      iconName="down"
                      iconVariant="border-filled"
                      onSelect={(option) => console.log('Selected:', option.value)}
                      options={[
                        { label: 'Edit', value: 'edit' },
                        { label: 'Delete', value: 'delete' },
                        { label: 'Clone', value: 'clone' }
                      ]}
                    />
                  </Example>

                  <Example
                    title="Menu with Icons"
                    code={`<MenuDropdown
  assistiveText={{ icon: 'Actions' }}
  buttonVariant="icon"
  iconCategory="utility"
  iconName="settings"
  iconSize="medium"
  onSelect={(option) => console.log('Selected:', option.value)}
  options={[
    { label: 'Refresh', value: 'refresh', leftIcon: { category: 'utility', name: 'refresh' } },
    { label: 'Edit', value: 'edit', leftIcon: { category: 'utility', name: 'edit' } },
    { label: 'Settings', value: 'settings', leftIcon: { category: 'utility', name: 'settings' } }
  ]}
/>`}
                  >
                    <MenuDropdown
                      assistiveText={{ icon: 'Actions' }}
                      buttonVariant="icon"
                      iconCategory="utility"
                      iconName="settings"
                      iconSize="medium"
                      onSelect={(option) => console.log('Selected:', option.value)}
                      options={[
                        { label: 'Refresh', value: 'refresh', leftIcon: { category: 'utility', name: 'refresh' } },
                        { label: 'Edit', value: 'edit', leftIcon: { category: 'utility', name: 'edit' } },
                        { label: 'Settings', value: 'settings', leftIcon: { category: 'utility', name: 'settings' } }
                      ]}
                    />
                  </Example>
                </ComponentSection>

                {/* ==================== LOOKUP ==================== */}
                <ComponentSection
                  name="Lookup"
                  description="Searchable dropdown for selecting records from a dataset. Essential for Salesforce-style record selection."
                  keyProps={['options', 'selection', 'onSearch', 'label', 'placeholder']}
                  bestPractices={[
                    "Use for selecting records from a large dataset",
                    "Provide async search for performance with large datasets",
                    "Show recently used items first when applicable",
                    "Allow multi-select when users need to choose multiple records"
                  ]}
                  relatedComponents={['Combobox', 'MenuPicklist']}
                  sldsUrl="https://react.lightningdesignsystem.com/components/lookups/"
                >
                  <Example
                    title="Basic Lookup"
                    code={`<Lookup
  label="Search Accounts"
  placeholder="Search accounts..."
  options={[
    { id: '1', label: 'Acme Corp', icon: { category: 'standard', name: 'account' } },
    { id: '2', label: 'Global Industries', icon: { category: 'standard', name: 'account' } }
  ]}
  onSearch={(event, { value }) => console.log('Search:', value)}
  onChange={(event, { selection }) => console.log('Selected:', selection)}
/>`}
                  >
                    <Lookup
                      label="Search Accounts"
                      placeholder="Search accounts..."
                      options={[
                        { id: '1', label: 'Acme Corp', icon: { category: 'standard', name: 'account' } },
                        { id: '2', label: 'Global Industries', icon: { category: 'standard', name: 'account' } },
                        { id: '3', label: 'Tech Solutions', icon: { category: 'standard', name: 'account' } }
                      ]}
                      onSearch={(event, { value }) => console.log('Search:', value)}
                      onChange={(event, { selection }) => console.log('Selected:', selection)}
                    />
                  </Example>
                </ComponentSection>

                {/* ==================== EXPANDABLESECTION ==================== */}
                <ComponentSection
                  name="ExpandableSection"
                  description="Collapsible content area that can be expanded or collapsed. Perfect for organizing detailed information."
                  keyProps={['title', 'isOpen', 'onToggleOpen']}
                  bestPractices={[
                    "Use for grouping related content that doesn't need to be immediately visible",
                    "Provide clear section titles that indicate content",
                    "Start in collapsed state for lengthy content",
                    "Limit nesting to avoid confusion"
                  ]}
                  relatedComponents={['Accordion', 'Panel']}
                  sldsUrl="https://react.lightningdesignsystem.com/components/expandable-section/"
                >
                  <Example
                    title="Basic Expandable Section"
                    code={`const [isOpen, setIsOpen] = useState(false);

<ExpandableSection
  title="Account Details"
  isOpen={isOpen}
  onToggleOpen={() => setIsOpen(!isOpen)}
>
  <div className="slds-p-around_medium">
    <p>Hidden content that shows when expanded...</p>
  </div>
</ExpandableSection>`}
                  >
                    <ExpandableSection
                      title="Account Details"
                    >
                      <div className="slds-p-around_medium">
                        <p>This content is revealed when the section is expanded. Use this pattern for detailed information that doesn't need to be immediately visible.</p>
                      </div>
                    </ExpandableSection>
                  </Example>
                </ComponentSection>

                {/* ==================== PAGEHEADER ==================== */}
                <ComponentSection
                  name="PageHeader"
                  description="Standard page header with title, icon, and action buttons. Provides consistent page-level navigation."
                  keyProps={['title', 'icon', 'onRenderActions', 'info', 'details']}
                  bestPractices={[
                    "Use at the top of every page for consistency",
                    "Include relevant actions in the header actions area",
                    "Show key record information in the details section",
                    "Use appropriate icons for record types"
                  ]}
                  relatedComponents={['Icon', 'Button']}
                  sldsUrl="https://react.lightningdesignsystem.com/components/page-headers/"
                >
                  <Example
                    title="Record Home Header"
                    code={`<PageHeader
  icon={<Icon category="standard" name="account" />}
  title="Acme Corporation"
  info="Account • New York"
  onRenderActions={() => (
    <ButtonGroup>
      <Button label="Edit" variant="neutral" />
      <Button label="Delete" variant="destructive" />
    </ButtonGroup>
  )}
/>`}
                  >
                    <PageHeader
                      icon={<Icon category="standard" name="account" />}
                      title="Acme Corporation"
                      info="Account"
                      onRenderActions={() => (
                        <ButtonGroup>
                          <Button label="Edit" variant="neutral" />
                          <Button label="Delete" variant="destructive" />
                        </ButtonGroup>
                      )}
                    />
                  </Example>
                </ComponentSection>

                {/* ==================== UTILITY CLASSES ==================== */}
                <Section title="Utility Classes Reference" description="Common SLDS utility classes for styling">
                  <div className="slds-grid slds-wrap slds-gutters">
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_medium">
                      <Card heading="Spacing">
                        <div className="slds-p-around_medium">
                          <code className="slds-text-body_small">
                            <p>slds-m-{'{side}'}_{'{size}'} - Margin</p>
                            <p>slds-p-{'{side}'}_{'{size}'} - Padding</p>
                            <p className="slds-m-top_x-small slds-text-color_weak">
                              Sides: top, bottom, left, right, around, vertical, horizontal
                            </p>
                            <p className="slds-text-color_weak">
                              Sizes: xxx-small, xx-small, x-small, small, medium, large, x-large, xx-large
                            </p>
                          </code>
                        </div>
                      </Card>
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_medium">
                      <Card heading="Grid">
                        <div className="slds-p-around_medium">
                          <code className="slds-text-body_small">
                            <p>slds-grid - Flex container</p>
                            <p>slds-col - Flex child</p>
                            <p>slds-size_1-of-{'{n}'} - Column width</p>
                            <p>slds-wrap - Allow wrapping</p>
                            <p>slds-gutters - Add gutters</p>
                          </code>
                        </div>
                      </Card>
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_medium">
                      <Card heading="Typography">
                        <div className="slds-p-around_medium">
                          <p className="slds-text-heading_large">Heading Large</p>
                          <p className="slds-text-heading_medium">Heading Medium</p>
                          <p className="slds-text-heading_small">Heading Small</p>
                          <p className="slds-text-body_regular">Body Regular</p>
                          <p className="slds-text-body_small">Body Small</p>
                          <p className="slds-text-title_caps">TITLE CAPS</p>
                        </div>
                      </Card>
                    </div>
                    <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-m-bottom_medium">
                      <Card heading="Colors">
                        <div className="slds-p-around_medium">
                          <p className="slds-text-color_default">Default text color</p>
                          <p className="slds-text-color_weak">Weak text color</p>
                          <p className="slds-text-color_success">Success text color</p>
                          <p className="slds-text-color_error">Error text color</p>
                          <div className="slds-box slds-theme_default slds-m-top_x-small slds-p-around_x-small">theme_default</div>
                          <div className="slds-box slds-theme_shade slds-m-top_x-small slds-p-around_x-small">theme_shade</div>
                          <div className="slds-box slds-theme_inverse slds-m-top_x-small slds-p-around_x-small">theme_inverse</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Section>
                  </TabsPanel>
                </Tabs>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;
