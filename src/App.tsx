import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { 
  Dashboard, 
  SpareParts, 
  Orders, 
  Maintenance, 
  Suppliers, 
  SettingsPage 
} from '@/pages';
import '@/index.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'spare-parts':
        return <SpareParts />;
      case 'orders':
        return <Orders />;
      case 'maintenance':
        return <Maintenance />;
      case 'suppliers':
        return <Suppliers />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;

