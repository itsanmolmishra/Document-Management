import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Login } from './components/auth/Login';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { DocumentRepo } from './components/documents/DocumentRepo';
import { AuditLogs } from './components/admin/AuditLogs';
import { UserManagement } from './components/admin/UserManagement';
import { PermissionMatrix } from './components/admin/PermissionMatrix';
import { Workflows } from './components/workflows/Workflows';
import { Archive } from './components/archive/Archive';
import { Reports } from './components/reports/Reports';
import { Settings } from './components/settings/Settings';
import { Search } from './components/search/Search';
import { Integrations } from './components/integrations/Integrations';

const DemoNotice = () => (
  <div className="w-full bg-amber-50 border-b border-amber-200 text-amber-900 text-xs sm:text-sm px-4 py-2 text-center">
    This website is for demonstration only. No real services, authentication, or payments are provided.
  </div>
);

const AppContent = () => {
  const { user } = useApp();
  const [currentView, setCurrentView] = useState('dashboard');

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <DemoNotice />
        <Login />
      </div>
    );
  }

  const renderView = () => {
      switch (currentView) {
          case 'dashboard': return <Dashboard onViewChange={setCurrentView} />;
          case 'documents': return <DocumentRepo />;
          case 'search': return <Search />;
          case 'workflows': return <Workflows />;
          case 'archive': return <Archive />;
          case 'compliance': return <AuditLogs />;
          case 'users': return <UserManagement />;
          case 'permissions': return <PermissionMatrix />;
          case 'reports': return <Reports />;
          case 'integrations': return <Integrations />;
          case 'settings': return <Settings />;
          default: return <Dashboard onViewChange={setCurrentView} />;
      }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DemoNotice />
      <MainLayout currentView={currentView} onViewChange={setCurrentView}>
        {renderView()}
      </MainLayout>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}