# Lendsqr Frontend Test

This project is a React-based admin dashboard built as a technical assessment for Lendsqr. It features a responsive UI, mock data integration, and unit testing.

## Tech Stack

- **React** with **TypeScript**
- **Vite** (Build system)
- **SCSS** (Styling with BEM-like structure)
- **React Router** (Navigation)
- **Axios** (API requests)
- **Lucide React** (Icons)
- **Faker.js** (Mock data generation)
- **Vitest** & **React Testing Library** (Unit testing)

## Features

1. **Login Page**: A pixel-perfect implementation of the login screen.
2. **Dashboard**: Overview of key statistics.
3. **Users Page**: 
   - Displays 500 user records fetched from a mock API.
   - Client-side pagination (10 records per page).
   - Responsive table with horizontal scrolling on mobile.
   - Status badges for different user states.
4. **User Details Page**:
   - Detailed view of a specific user.
   - Tier system with stars.
   - Tabbed navigation (General Details, Documents, etc.).
   - Persistent storage simulation.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd lendsqr-fe-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm run test
   ```

## Project Structure

- `src/components`: Reusable UI components and layout wrappers.
- `src/pages`: Main page components (Login, Dashboard, Users, UserDetails).
- `src/services`: Mock data generation and API client logic.
- `src/styles`: SCSS variables, mixins, and global styles.
- `src/types`: TypeScript definitions.
- `src/utils`: Helper functions and storage utilities.
- `src/tests`: Unit tests for components and services.

## Design Decisions

- **Vite**: Chosen over CRA for its superior performance and modern HMR.
- **SCSS**: Used for modular styling and to leverage variables/mixins for a consistent design system.
- **Mock Data**: Generated 500 records using Faker.js to satisfy the "500 records" requirement reliably.
- **Responsiveness**: Implemented using custom mixins and media queries to ensure a seamless experience across all devices.

## Testing Strategy

- **Positive Scenario Testing**: Verified that components render correctly and services fetch data as expected.
- **Negative Scenario Testing**: Verified that the application handles non-existent data gracefully (e.g., non-existent user ID).
