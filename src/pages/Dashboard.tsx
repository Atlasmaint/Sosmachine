import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { formatCurrency, formatNumber } from '@/utils';

// Données de démonstration
const stats = [
  {
    title: 'Pièces en stock',
    value: '2,847',
    change: '+12%',
    changeType: 'positive' as const,
    icon: Package,
  },
  {
    title: 'Commandes en cours',
    value: '23',
    change: '-5%',
    changeType: 'negative' as const,
    icon: ShoppingCart,
  },
  {
    title: 'Alertes stock',
    value: '8',
    change: '+2',
    changeType: 'warning' as const,
    icon: AlertTriangle,
  },
  {
    title: 'Valeur totale',
    value: '€847,392',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
];

const recentOrders = [
  {
    id: 'CMD-001',
    supplier: 'TechParts SA',
    amount: 15420,
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: 'CMD-002',
    supplier: 'Industrial Supply',
    amount: 8750,
    status: 'pending',
    date: '2024-01-14',
  },
  {
    id: 'CMD-003',
    supplier: 'MechaComponents',
    amount: 23100,
    status: 'shipped',
    date: '2024-01-13',
  },
];

const lowStockItems = [
  {
    id: 'P001',
    name: 'Roulement SKF 6205',
    currentStock: 2,
    minStock: 10,
    criticality: 'high' as const,
  },
  {
    id: 'P002',
    name: 'Joint torique NBR 50x3',
    currentStock: 5,
    minStock: 20,
    criticality: 'medium' as const,
  },
  {
    id: 'P003',
    name: 'Courroie HTD 8M-1600',
    currentStock: 1,
    minStock: 5,
    criticality: 'critical' as const,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-success-500" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-warning-500" />;
    case 'shipped':
      return <Package className="h-4 w-4 text-primary-500" />;
    default:
      return <XCircle className="h-4 w-4 text-error-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge variant="success">Terminée</Badge>;
    case 'pending':
      return <Badge variant="warning">En attente</Badge>;
    case 'shipped':
      return <Badge variant="info">Expédiée</Badge>;
    default:
      return <Badge variant="error">Annulée</Badge>;
  }
};

const getCriticalityBadge = (criticality: string) => {
  switch (criticality) {
    case 'critical':
      return <Badge variant="error" dot>Critique</Badge>;
    case 'high':
      return <Badge variant="warning" dot>Élevée</Badge>;
    case 'medium':
      return <Badge variant="info" dot>Moyenne</Badge>;
    default:
      return <Badge variant="default" dot>Faible</Badge>;
  }
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
          Tableau de bord
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Vue d'ensemble de votre système d'approvisionnement
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm ${
                        stat.changeType === 'positive'
                          ? 'text-success-600'
                          : stat.changeType === 'negative'
                          ? 'text-error-600'
                          : 'text-warning-600'
                      }`}
                    >
                      {stat.change} vs mois dernier
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary-100 p-3 dark:bg-primary-900">
                    <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-secondary-200 p-4 dark:border-secondary-700"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(order.status)}
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">
                        {order.id}
                      </p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {order.supplier}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-secondary-900 dark:text-white">
                      {formatCurrency(order.amount)}
                    </p>
                    <div className="mt-1">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning-500" />
              <span>Alertes stock faible</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-secondary-200 p-4 dark:border-secondary-700"
                >
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-secondary-600 dark:text-secondary-400">
                      Stock: {item.currentStock} / Min: {item.minStock}
                    </p>
                  </div>
                  <div className="text-right">
                    {getCriticalityBadge(item.criticality)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center space-x-3 rounded-lg border border-secondary-200 p-4 text-left transition-colors hover:bg-secondary-50 dark:border-secondary-700 dark:hover:bg-secondary-800">
              <Package className="h-8 w-8 text-primary-600" />
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">
                  Ajouter une pièce
                </p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Nouvelle pièce détachée
                </p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 rounded-lg border border-secondary-200 p-4 text-left transition-colors hover:bg-secondary-50 dark:border-secondary-700 dark:hover:bg-secondary-800">
              <ShoppingCart className="h-8 w-8 text-success-600" />
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">
                  Nouvelle commande
                </p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Créer une commande
                </p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 rounded-lg border border-secondary-200 p-4 text-left transition-colors hover:bg-secondary-50 dark:border-secondary-700 dark:hover:bg-secondary-800">
              <Users className="h-8 w-8 text-warning-600" />
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">
                  Gérer fournisseurs
                </p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Ajouter/modifier
                </p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 rounded-lg border border-secondary-200 p-4 text-left transition-colors hover:bg-secondary-50 dark:border-secondary-700 dark:hover:bg-secondary-800">
              <TrendingUp className="h-8 w-8 text-info-600" />
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">
                  Rapports
                </p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  Analyses et stats
                </p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { Dashboard };

