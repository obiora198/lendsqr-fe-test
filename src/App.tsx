import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import Placeholder from './pages/Placeholder';
import Layout from './components/layout/Layout';
import './index.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          
          {/* Placeholder Routes */}
          <Route path="/guarantors" element={<Placeholder title="Guarantors" />} />
          <Route path="/loans" element={<Placeholder title="Loans" />} />
          <Route path="/decision-models" element={<Placeholder title="Decision Models" />} />
          <Route path="/savings" element={<Placeholder title="Savings" />} />
          <Route path="/loan-requests" element={<Placeholder title="Loan Requests" />} />
          <Route path="/whitelist" element={<Placeholder title="Whitelist" />} />
          <Route path="/karma" element={<Placeholder title="Karma" />} />
          <Route path="/organization" element={<Placeholder title="Organization" />} />
          <Route path="/loan-products" element={<Placeholder title="Loan Products" />} />
          <Route path="/savings-products" element={<Placeholder title="Savings Products" />} />
          <Route path="/fees" element={<Placeholder title="Fees and Charges" />} />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
