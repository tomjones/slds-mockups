import { useState, useEffect } from 'react';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import { mockups } from './mockups';

function App() {
  const [selectedMockup, setSelectedMockup] = useState(null);
  const [isShareMode, setIsShareMode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Check for share parameter in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareId = params.get('share');

    if (shareId) {
      const sharedMockup = mockups.find(m => m.shareId === shareId);
      if (sharedMockup) {
        setSelectedMockup(sharedMockup);
        setIsShareMode(true);
      }
    }
  }, []);

  // If a mockup is selected, render it full-screen with a back button
  if (selectedMockup) {
    const MockupComponent = selectedMockup.component;

    const handleShare = () => {
      const shareUrl = `${window.location.origin}?share=${selectedMockup.shareId}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    };

    return (
      <IconSettings iconPath="/assets/icons">
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f3f3' }}>
          {/* Floating back button - hidden in share mode */}
          {!isShareMode && (
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
          )}

          {/* Floating share button - shown when not in share mode */}
          {!isShareMode && (
            <button
              onClick={handleShare}
              style={{
                position: 'fixed',
                top: '16px',
                right: '16px',
                zIndex: 9999,
                backgroundColor: copySuccess ? '#2e844a' : '#0176d3',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.2s'
              }}
            >
              {copySuccess ? (
                <>
                  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Link Copied!
                </>
              ) : (
                <>
                  <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </>
              )}
            </button>
          )}

          {/* Wrapper to add consistent top padding for all mockups */}
          <div style={{ paddingTop: '60px' }}>
            <MockupComponent />
          </div>
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
            <h1 className="slds-text-heading_large" style={{ color: '#080707' }}>SLDS Studio</h1>
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
