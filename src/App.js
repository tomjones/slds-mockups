import { useState } from 'react';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import { mockups } from './mockups';

function App() {
  const [selectedMockup, setSelectedMockup] = useState(null);

  // If a mockup is selected, render it full-screen with a back button
  if (selectedMockup) {
    const MockupComponent = selectedMockup.component;
    return (
      <IconSettings iconPath="/assets/icons">
        <div style={{ minHeight: '100vh' }}>
          {/* Floating back button */}
          <button
            onClick={() => setSelectedMockup(null)}
            style={{
              position: 'fixed',
              top: '16px',
              left: '16px',
              zIndex: 9999,
              backgroundColor: 'white',
              border: '1px solid #d8dde6',
              borderRadius: '4px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#3e3e3c',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Mockups
          </button>
          <MockupComponent />
        </div>
      </IconSettings>
    );
  }

  // Mockup gallery/selection screen
  return (
    <IconSettings iconPath="/assets/icons">
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3', padding: '32px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 className="slds-text-heading_large" style={{ color: '#080707' }}>SLDS Mockups</h1>
            <p className="slds-text-body_regular" style={{ color: '#706e6b', marginTop: '4px' }}>
              Salesforce Lightning Design System screen flow mockups
            </p>
          </div>

          {/* Mockup Cards */}
          {mockups.length === 0 ? (
            <div className="slds-box slds-theme_default" style={{ padding: '32px', textAlign: 'center' }}>
              <p style={{ color: '#706e6b' }}>No mockups available yet.</p>
              <p style={{ fontSize: '12px', color: '#939393', marginTop: '8px' }}>
                Add mockups in <code style={{ backgroundColor: '#f3f3f3', padding: '2px 4px', borderRadius: '2px' }}>src/mockups/</code>
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {mockups.map((mockup) => (
                <button
                  key={mockup.id}
                  onClick={() => setSelectedMockup(mockup)}
                  className="slds-box slds-theme_default"
                  style={{
                    padding: '24px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: '1px solid #d8dde6',
                    borderRadius: '4px',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#0176d3';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#d8dde6';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    <h2 className="slds-text-heading_small" style={{ color: '#080707' }}>
                      {mockup.name}
                    </h2>
                    <p className="slds-text-body_small" style={{ color: '#706e6b', marginTop: '4px' }}>
                      {mockup.description}
                    </p>
                  </div>
                  <svg
                    style={{ width: '20px', height: '20px', color: '#706e6b', marginTop: '4px' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Instructions */}
          <div className="slds-box slds-theme_info" style={{ marginTop: '32px', padding: '16px', backgroundColor: '#eef4ff', border: 'none' }}>
            <p style={{ fontWeight: '500', color: '#0176d3' }}>Adding new mockups:</p>
            <ol style={{ listStyle: 'decimal inside', marginTop: '8px', color: '#014486' }}>
              <li style={{ marginBottom: '4px' }}>Create your component in <code style={{ backgroundColor: '#d8edff', padding: '2px 4px', borderRadius: '2px' }}>src/mockups/YourMockup.jsx</code></li>
              <li style={{ marginBottom: '4px' }}>Import and register it in <code style={{ backgroundColor: '#d8edff', padding: '2px 4px', borderRadius: '2px' }}>src/mockups/index.js</code></li>
              <li>Refresh the page to see it appear here</li>
            </ol>
          </div>
        </div>
      </div>
    </IconSettings>
  );
}

export default App;
