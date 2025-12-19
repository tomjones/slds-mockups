import React, { useState } from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Card from '@salesforce/design-system-react/components/card';
import Checkbox from '@salesforce/design-system-react/components/checkbox';
import Icon from '@salesforce/design-system-react/components/icon';
import Input from '@salesforce/design-system-react/components/input';
import ProgressIndicator from '@salesforce/design-system-react/components/progress-indicator';
import Textarea from '@salesforce/design-system-react/components/textarea';
import Badge from '@salesforce/design-system-react/components/badge';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';

const CampaignBuilderMockup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [campaignName, setCampaignName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [instructions, setInstructions] = useState('');

  const packages = [
    {
      id: 'starter',
      name: 'Starter Package',
      price: '$2,500',
      description: 'Perfect for brand awareness campaigns',
      includes: [
        '1-day homepage banner',
        '2,500 impressions',
        '1 sponsored social post',
        'Basic analytics report'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Package',
      price: '$5,000',
      description: 'Our most popular advertising solution',
      includes: [
        '3-day homepage takeover',
        '10,000 impressions',
        '3 sponsored social posts',
        '1 email newsletter feature',
        'Advanced analytics dashboard'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      price: '$12,000',
      description: 'Maximum exposure and engagement',
      includes: [
        '7-day homepage takeover',
        '50,000 impressions',
        '10 sponsored social posts',
        '4 email newsletter features',
        'Dedicated account manager',
        'Real-time analytics + weekly reports',
        'A/B testing included'
      ],
      popular: false
    }
  ];

  const addons = [
    { id: 'extra-impressions', name: 'Additional 5,000 Impressions', price: '$500', description: 'Extend your reach' },
    { id: 'video-ad', name: 'Video Ad Placement', price: '$1,500', description: '30-second video spot on homepage' },
    { id: 'retargeting', name: 'Retargeting Campaign', price: '$800', description: '30-day retargeting pixel' },
    { id: 'premium-placement', name: 'Premium Ad Placement', price: '$1,000', description: 'Above-the-fold guaranteed' },
    { id: 'social-boost', name: 'Social Media Boost', price: '$600', description: 'Paid promotion on sponsored posts' },
  ];

  const steps = [
    { id: 0, label: 'Select Package' },
    { id: 1, label: 'Options & Add-ons' },
    { id: 2, label: 'Campaign Details' },
    { id: 3, label: 'Review' },
  ];

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleStepClick = (event, data) => {
    if (data.step < currentStep || (data.step === 1 && selectedPackage)) {
      setCurrentStep(data.step);
    }
  };

  // Package Selection Screen using Visual Picker style
  const PackageSelectionScreen = () => (
    <div>
      <div className="slds-m-bottom_medium">
        <h2 className="slds-text-heading_small slds-m-bottom_xx-small">
          Select an Advertising Package
        </h2>
        <p className="slds-text-body_regular slds-text-color_weak">
          Choose the package that best fits your campaign goals
        </p>
      </div>

      <div className="slds-grid slds-wrap slds-gutters">
        {packages.map((pkg) => (
          <div key={pkg.id} className="slds-col slds-size_1-of-1 slds-medium-size_1-of-3 slds-p-around_x-small">
            <div
              onClick={() => setSelectedPackage(pkg.id)}
              className={`slds-box slds-box_link ${
                selectedPackage === pkg.id ? 'slds-is-selected' : ''
              }`}
              style={{
                cursor: 'pointer',
                borderColor: selectedPackage === pkg.id ? '#0176d3' : undefined,
                borderWidth: selectedPackage === pkg.id ? '2px' : undefined,
                position: 'relative',
                height: '100%'
              }}
            >
              {pkg.popular && (
                <Badge
                  content="MOST POPULAR"
                  color="brand"
                  style={{ position: 'absolute', top: '-10px', left: '16px' }}
                />
              )}

              <div className="slds-p-around_medium">
                <div className="slds-grid slds-grid_align-spread slds-m-bottom_small">
                  <div>
                    <h3 className="slds-text-heading_small">{pkg.name}</h3>
                    <p className="slds-text-body_small slds-text-color_weak">{pkg.description}</p>
                  </div>
                  {selectedPackage === pkg.id && (
                    <Icon
                      category="utility"
                      name="check"
                      size="small"
                      colorVariant="success"
                    />
                  )}
                </div>

                <p className="slds-text-heading_medium slds-text-color_brand slds-m-bottom_small">
                  {pkg.price}
                </p>

                <div className="slds-border_top slds-p-top_small">
                  <p className="slds-text-title_caps slds-text-color_weak slds-m-bottom_x-small">
                    What's Included
                  </p>
                  <ul className="slds-list_dotted">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="slds-item slds-text-body_small">
                        <Icon
                          category="utility"
                          name="check"
                          size="x-small"
                          colorVariant="success"
                          className="slds-m-right_x-small"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Add-ons Screen
  const AddonsScreen = () => {
    const selectedPkg = packages.find(p => p.id === selectedPackage);

    return (
      <div>
        <div className="slds-badge slds-m-bottom_medium" style={{ backgroundColor: '#eef4ff' }}>
          <Icon category="utility" name="check" size="x-small" className="slds-m-right_xx-small" />
          Selected: <strong className="slds-m-left_xx-small">{selectedPkg?.name}</strong> ({selectedPkg?.price})
        </div>

        <div className="slds-m-bottom_medium">
          <h2 className="slds-text-heading_small slds-m-bottom_xx-small">
            Enhance Your Campaign
          </h2>
          <p className="slds-text-body_regular slds-text-color_weak">
            Add optional upgrades to maximize your results
          </p>
        </div>

        <div className="slds-form-element">
          {addons.map((addon) => (
            <div
              key={addon.id}
              className={`slds-box slds-m-bottom_x-small slds-grid slds-grid_vertical-align-center ${
                selectedAddons.includes(addon.id) ? 'slds-theme_shade' : ''
              }`}
              style={{
                cursor: 'pointer',
                borderColor: selectedAddons.includes(addon.id) ? '#0176d3' : undefined,
              }}
              onClick={() => toggleAddon(addon.id)}
            >
              <Checkbox
                checked={selectedAddons.includes(addon.id)}
                onChange={() => toggleAddon(addon.id)}
                className="slds-m-right_small"
              />
              <div className="slds-grow">
                <p className="slds-text-body_regular">{addon.name}</p>
                <p className="slds-text-body_small slds-text-color_weak">{addon.description}</p>
              </div>
              <p className="slds-text-body_regular slds-text-align_right" style={{ fontWeight: 'bold' }}>
                {addon.price}
              </p>
            </div>
          ))}
        </div>

        {selectedAddons.length > 0 && (
          <div className="slds-box slds-theme_shade slds-m-top_medium slds-grid slds-grid_align-spread">
            <span className="slds-text-color_weak">
              {selectedAddons.length} add-on{selectedAddons.length > 1 ? 's' : ''} selected
            </span>
            <span style={{ fontWeight: 'bold' }}>
              +${selectedAddons.reduce((sum, id) => {
                const addon = addons.find(a => a.id === id);
                return sum + parseInt(addon.price.replace(/[$,]/g, ''));
              }, 0).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    );
  };

  // Details Screen
  const DetailsScreen = () => (
    <div>
      <div className="slds-m-bottom_medium">
        <h2 className="slds-text-heading_small slds-m-bottom_xx-small">
          Campaign Details
        </h2>
        <p className="slds-text-body_regular slds-text-color_weak">
          Specify the timing and fulfillment details for your campaign
        </p>
      </div>

      <div className="slds-form">
        <div className="slds-grid slds-gutters slds-m-bottom_medium">
          <div className="slds-col slds-size_1-of-2">
            <Input
              label="Campaign Start Date"
              required
              type="date"
              value={startDate}
              onChange={(e, { value }) => setStartDate(value)}
            />
          </div>
          <div className="slds-col slds-size_1-of-2">
            <Input
              label="Campaign End Date"
              required
              type="date"
              value={endDate}
              onChange={(e, { value }) => setEndDate(value)}
            />
          </div>
        </div>

        <div className="slds-m-bottom_medium">
          <Input
            label="Campaign Name"
            placeholder="e.g., Q1 2025 Brand Awareness Campaign"
            value={campaignName}
            onChange={(e, { value }) => setCampaignName(value)}
          />
          <p className="slds-text-body_small slds-text-color_weak slds-m-top_xx-small">
            This will be appended to the Opportunity name
          </p>
        </div>

        <Textarea
          label="Special Instructions"
          placeholder="Any specific requirements or notes for the fulfillment team..."
          value={instructions}
          onChange={(e, { value }) => setInstructions(value)}
        />
      </div>
    </div>
  );

  // Custom cell for the source badge
  const SourceCell = ({ item }) => (
    <Badge
      content={item.source}
      color={item.source === 'Package' ? 'light' : 'success'}
    />
  );
  SourceCell.displayName = DataTableCell.displayName;

  // Review Screen
  const ReviewScreen = () => {
    const selectedPkg = packages.find(p => p.id === selectedPackage);
    const selectedAddonItems = addons.filter(a => selectedAddons.includes(a.id));

    const tableItems = [
      ...(selectedPkg?.includes.map((item, idx) => ({
        id: `pkg-${idx}`,
        product: item,
        source: 'Package'
      })) || []),
      ...selectedAddonItems.map(addon => ({
        id: addon.id,
        product: addon.name,
        source: 'Add-on'
      }))
    ];

    const totalPrice = (
      parseInt(selectedPkg?.price.replace(/[$,]/g, '') || 0) +
      selectedAddonItems.reduce((sum, a) => sum + parseInt(a.price.replace(/[$,]/g, '')), 0)
    );

    return (
      <div>
        <div className="slds-m-bottom_medium">
          <h2 className="slds-text-heading_small slds-m-bottom_xx-small">
            Review Your Campaign
          </h2>
          <p className="slds-text-body_regular slds-text-color_weak">
            Please review the details before creating the campaign
          </p>
        </div>

        <div className="slds-grid slds-wrap slds-gutters">
          {/* Selected Package Card */}
          <div className="slds-col slds-size_1-of-1 slds-m-bottom_medium">
            <Card
              heading="Selected Package"
              headerActions={
                <span className="slds-text-heading_small">{selectedPkg?.price}</span>
              }
            >
              <div className="slds-p-around_medium">
                <p className="slds-text-body_regular" style={{ fontWeight: 'bold' }}>{selectedPkg?.name}</p>
                <ul className="slds-list_dotted slds-m-top_small">
                  {selectedPkg?.includes.map((item, idx) => (
                    <li key={idx} className="slds-item slds-text-body_small slds-text-color_weak">
                      <Icon
                        category="utility"
                        name="check"
                        size="x-small"
                        colorVariant="success"
                        className="slds-m-right_x-small"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          {/* Add-ons Card */}
          {selectedAddonItems.length > 0 && (
            <div className="slds-col slds-size_1-of-1 slds-m-bottom_medium">
              <Card heading="Add-ons">
                <div className="slds-p-around_medium">
                  {selectedAddonItems.map(addon => (
                    <div key={addon.id} className="slds-grid slds-grid_align-spread slds-m-bottom_x-small">
                      <span>{addon.name}</span>
                      <span style={{ fontWeight: '500' }}>{addon.price}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Line Items Card */}
          <div className="slds-col slds-size_1-of-1 slds-m-bottom_medium">
            <Card heading="Opportunity Products to be Created">
              <DataTable items={tableItems} id="review-table">
                <DataTableColumn label="Product" property="product" />
                <DataTableColumn label="Source" property="source">
                  <SourceCell />
                </DataTableColumn>
              </DataTable>
            </Card>
          </div>

          {/* Total */}
          <div className="slds-col slds-size_1-of-1">
            <div className="slds-box slds-theme_shade slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
              <span className="slds-text-heading_small">Total Campaign Value</span>
              <span className="slds-text-heading_medium slds-text-color_brand">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="slds-p-around_large" style={{ backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      {/* Modal Container */}
      <div className="slds-modal__container" style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div className="slds-box slds-theme_default" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
          {/* Header */}
          <div className="slds-p-around_medium slds-border_bottom slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
            <div className="slds-media slds-media_center">
              <div className="slds-media__figure">
                <Icon
                  category="standard"
                  name="campaign"
                  size="medium"
                />
              </div>
              <div className="slds-media__body">
                <h1 className="slds-text-heading_small">Campaign Builder</h1>
                <p className="slds-text-body_small slds-text-color_weak">
                  Acme Corp - Q1 Advertising Campaign
                </p>
              </div>
            </div>
            <Button
              iconCategory="utility"
              iconName="close"
              iconSize="large"
              variant="icon"
              assistiveText={{ icon: 'Close' }}
            />
          </div>

          {/* Progress Indicator */}
          <div className="slds-p-around_medium slds-border_bottom">
            <ProgressIndicator
              completedSteps={steps.slice(0, currentStep)}
              currentStep={steps[currentStep]}
              steps={steps}
              onStepClick={handleStepClick}
              variant="base"
            />
          </div>

          {/* Body */}
          <div className="slds-p-around_medium" style={{ minHeight: '400px' }}>
            {currentStep === 0 && <PackageSelectionScreen />}
            {currentStep === 1 && <AddonsScreen />}
            {currentStep === 2 && <DetailsScreen />}
            {currentStep === 3 && <ReviewScreen />}
          </div>

          {/* Footer */}
          <div className="slds-modal__footer slds-grid slds-grid_align-spread">
            <Button
              label="Previous"
              variant="neutral"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              iconCategory="utility"
              iconName="chevronleft"
              iconPosition="left"
            />

            <div className="slds-button-group">
              <Button
                label="Cancel"
                variant="neutral"
              />
              <Button
                label={currentStep === 3 ? 'Create Campaign' : 'Next'}
                variant="brand"
                onClick={() => {
                  if (currentStep < 3) setCurrentStep(currentStep + 1);
                }}
                disabled={currentStep === 0 && !selectedPackage}
                iconCategory="utility"
                iconName={currentStep === 3 ? 'check' : 'chevronright'}
                iconPosition="right"
              />
            </div>
          </div>
        </div>

        {/* Implementation Note */}
        <div className="slds-scoped-notification slds-media slds-media_center slds-theme_warning slds-m-top_medium" role="status">
          <div className="slds-media__figure">
            <Icon category="utility" name="warning" size="small" />
          </div>
          <div className="slds-media__body">
            <p className="slds-text-body_small">
              <strong>Implementation Note:</strong> This mockup uses SLDS React components.
              The package selection cards would require a <strong>custom LWC flow screen component</strong> to achieve this layout.
              Standard flow components (radio buttons, picklists) cannot display rich card layouts with included items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilderMockup;
