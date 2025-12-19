# SLDS Studio

A React application for creating and viewing interactive mockups built with the Salesforce Lightning Design System (SLDS). This tool provides a gallery-based interface for showcasing screen flows and UI prototypes using official Salesforce design components.

## About This Application

SLDS Studio is a mockup development platform that allows designers and developers to:

- Create interactive UI prototypes using Salesforce Lightning Design System components
- Browse and navigate between multiple mockups through a clean gallery interface
- View mockups in full-screen mode for presentations and reviews
- Quickly iterate on Salesforce UI designs without backend infrastructure

The application comes with several pre-built mockups including:
- **Campaign Builder** - Screen flow for Opportunity campaign package selection
- **Component Showcase** - Comprehensive examples of all SLDS React components
- **Case Due Date Calendar** - One-click calendar for updating Case Due Date
- **Donor Household** - Household record page for donor management system
- **Opportunity Products** - Add products to opportunities with inventory & ATP visibility

## Technology Stack

- **React** 18.3.1 - UI framework
- **Salesforce Lightning Design System** - Design system and component library
- **Create React App** - Project scaffolding and build tooling
- **CRACO** - Configuration override for custom build settings

## Getting Started

### Prerequisites

- Node.js and npm installed on your system

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

Run the app in development mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### Building for Production

Build the app for production:
```bash
npm run build
```

Builds the app to the `build` folder, optimized for deployment.

### Running Tests

Launch the test runner in interactive watch mode:
```bash
npm test
```

## Adding New Mockups

1. Create your mockup component in `src/mockups/YourMockup.jsx`
2. Import and register it in `src/mockups/index.js`:
```javascript
import YourMockup from './YourMockup';

export const mockups = [
  {
    id: 'your-mockup',
    name: 'Your Mockup Name',
    description: 'Brief description of your mockup',
    component: YourMockup,
  },
  // ... other mockups
];
```
3. Refresh the page to see your mockup in the gallery

## Deployment

The application is configured for Heroku deployment with the `heroku-postbuild` script that automatically runs the build process. The production server uses `serve` to host the static build files.

## Learn More

- [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/)
- [Design System React Components](https://react.lightningdesignsystem.com/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
