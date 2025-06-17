import React from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Download,
  Calendar,
  Truck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '@/components/ui';
import { formatCurrency, formatDate } from '@/utils';

// Données de démonstration
const orders = [
  {
    id: 'CMD-001',
    orderNumber: 'PO-2024-001',
    supplier: {
      name: 'TechParts SA',
      contact: 'contact@techparts.fr'
    },
    status: 'completed',
    totalAmount: 15420.50,
    orderDate: '2024-01-15',
    expectedDeliveryDate: '2024-01-22',
    actualDeliveryDate: '2024-01-20',
    items: [
      { partNumber: 'SKF-6205', name: 'Roulement SKF 6205', quantity: 20, unitPrice: 45.50 },
      { partNumber: 'NBR-50x3', name: 'Joint torique NBR 50x3', quantity: 100, unitPrice: 8.75 }
    ]
  },
  {
    id: 'CMD-002',
    orderNumber: 'PO-2024-002',
    supplier: {
      name: 'Industrial Supply',
      contact: 'orders@industrial-supply.com'
    },
    status: 'pending_approval',
    totalAmount: 8750.00,
    orderDate: '2024-01-14',
    expectedDeliveryDate: '2024-01-28',
    actualDeliveryDate: null,
    items: [
      { partNumber: 'HTD-8M-1600', name: 'Courroie HTD 8M-1600', quantity: 10, unitPrice: 125.00 }
    ]
  },
  {
    id: 'CMD-003',
    orderNumber: 'PO-2024-003',
    supplier: {
      name: 'MechaComponents',
      contact: 'sales@mechacomponents.fr'
    },
    status: 'shipped',
    totalAmount: 23100.75,
    orderDate: '2024-01-13',
    expectedDeliveryDate: '2024-01-25',
    actualDeliveryDate: null,
    items: [
      { partNumber: 'FILTER-HF35', name: 'Filtre hydraulique HF35', quantity: 50, unitPrice: 67.20 }
    ]
  },
  {
    id: 'CMD-004',
    orderNumber: 'PO-2024-004',
    supplier: {
      name: 'Hydraulic Pro',
      contact: 'commandes@hydraulicpro.fr'
    },
    status: 'draft',
    totalAmount: 5670.25,
    orderDate: '2024-01-16',
    expectedDeliveryDate: '2024-01-30',
    actualDeliveryDate: null,
    items: [
      { partNumber: 'SEAL-V320', name: 'Joint V-Ring 320', quantity: 25, unitPrice: 15.80 }
    ]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge variant="success">Terminée</Badge>;
    case 'shipped':
      return <Badge variant="info">Expédiée</Badge>;
    case 'pending_approval':
      return <Badge variant="warning">En attente</Badge>;
    case 'approved':
      return <Badge variant="info">Approuvée</Badge>;
    case 'draft':
      return <Badge variant="default">Brouillon</Badge>;
    case 'cancelled':
      return <Badge variant="error">Annulée</Badge>;
    default:
      return <Badge variant="default">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return '✅';
    case 'shipped':
      return '🚚';
    case 'pending_approval':
      return '⏳';
    case 'approved':
      return '👍';
    case 'draft':
      return '📝';
    case 'cancelled':
      return '❌';
    default:
      return '📦';
  }
};

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  const statuses = ['all', ...new Set(orders.map(order => order.status))];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => ['pending_approval', 'approved', 'shipped'].includes(order.status)).length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Commandes
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Gestion des commandes d'approvisionnement
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          Nouvelle commande
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Total commandes
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {orders.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-warning-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  En cours
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {pendingOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-success-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Terminées
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {completedOrders}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-info-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Valeur totale
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <Input
                  placeholder="Rechercher par numéro ou fournisseur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white"
              >
                <option value="all">Tous les statuts</option>
                {statuses.slice(1).map(status => (
                  <option key={status} value={status}>
                    {status === 'completed' ? 'Terminée' :
                     status === 'shipped' ? 'Expédiée' :
                     status === 'pending_approval' ? 'En attente' :
                     status === 'approved' ? 'Approuvée' :
                     status === 'draft' ? 'Brouillon' :
                     status === 'cancelled' ? 'Annulée' : status}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filtres avancés
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200 dark:border-secondary-700">
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Numéro
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Fournisseur
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Date commande
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Livraison prévue
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Montant
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Statut
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                    <td className="py-4 text-sm font-medium text-secondary-900 dark:text-white">
                      <div className="flex items-center space-x-2">
                        <span>{getStatusIcon(order.status)}</span>
                        <span>{order.orderNumber}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm">
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-white">
                          {order.supplier.name}
                        </p>
                        <p className="text-secondary-500 text-xs">
                          {order.supplier.contact}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-secondary-600 dark:text-secondary-400">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="py-4 text-sm text-secondary-600 dark:text-secondary-400">
                      {formatDate(order.expectedDeliveryDate)}
                    </td>
                    <td className="py-4 text-sm font-medium text-secondary-900 dark:text-white">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { Orders };

