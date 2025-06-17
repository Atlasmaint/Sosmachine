import React from 'react';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Wrench, 
  Users, 
  Settings,
  Menu,
  X,
  Bell,
  Search,
  User
} from 'lucide-react';
import { Button } from '@/components/ui';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: Home },
  { id: 'spare-parts', label: 'Pièces détachées', icon: Package },
  { id: 'orders', label: 'Commandes', icon: ShoppingCart },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'suppliers', label: 'Fournisseurs', icon: Users },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-secondary-800 lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-secondary-900 dark:text-white">
                SOSMachine
              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-6 w-6 text-secondary-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-secondary-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-secondary-200 p-4 dark:border-secondary-700">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                  Jean Dupont
                </p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">
                  jean.dupont@sosmachine.pro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-4 shadow-sm dark:bg-secondary-800 lg:px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-secondary-500 hover:text-secondary-700 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Search bar */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 rounded-lg border border-secondary-300 bg-white pl-10 pr-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-700 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-error-500 text-xs"></span>
            </Button>

            {/* User menu */}
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export { Layout };

