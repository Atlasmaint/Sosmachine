import React from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Phone,
  Mail,
  MapPin,
  Star,
  Edit,
  Trash2,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '@/components/ui';
import { formatCurrency } from '@/utils';

// Données de démonstration
const suppliers = [
  {
    id: 'SUP-001',
    name: 'TechParts SA',
    contactEmail: 'contact@techparts.fr',
    contactPhone: '+33 1 23 45 67 89',
    address: {
      street: '123 Rue de l\'Industrie',
      city: 'Lyon',
      postalCode: '69000',
      country: 'France'
    },
    rating: 4.8,
    leadTime: 3,
    minimumOrderValue: 500,
    currency: 'EUR',
    paymentTerms: '30 jours',
    isPreferred: true,
    totalOrders: 45,
    totalValue: 125000,
    lastOrderDate: '2024-01-15',
    categories: ['Roulements', 'Joints', 'Filtres'],
    status: 'active'
  },
  {
    id: 'SUP-002',
    name: 'Industrial Supply',
    contactEmail: 'orders@industrial-supply.com',
    contactPhone: '+33 4 56 78 90 12',
    address: {
      street: '456 Avenue des Machines',
      city: 'Marseille',
      postalCode: '13000',
      country: 'France'
    },
    rating: 4.2,
    leadTime: 5,
    minimumOrderValue: 300,
    currency: 'EUR',
    paymentTerms: '45 jours',
    isPreferred: false,
    totalOrders: 28,
    totalValue: 87500,
    lastOrderDate: '2024-01-12',
    categories: ['Courroies', 'Moteurs', 'Variateurs'],
    status: 'active'
  },
  {
    id: 'SUP-003',
    name: 'MechaComponents',
    contactEmail: 'sales@mechacomponents.fr',
    contactPhone: '+33 2 34 56 78 90',
    address: {
      street: '789 Boulevard Technique',
      city: 'Nantes',
      postalCode: '44000',
      country: 'France'
    },
    rating: 4.6,
    leadTime: 4,
    minimumOrderValue: 750,
    currency: 'EUR',
    paymentTerms: '30 jours',
    isPreferred: true,
    totalOrders: 32,
    totalValue: 156000,
    lastOrderDate: '2024-01-10',
    categories: ['Hydraulique', 'Pneumatique', 'Automatisme'],
    status: 'active'
  },
  {
    id: 'SUP-004',
    name: 'Hydraulic Pro',
    contactEmail: 'commandes@hydraulicpro.fr',
    contactPhone: '+33 5 67 89 01 23',
    address: {
      street: '321 Rue Hydraulique',
      city: 'Toulouse',
      postalCode: '31000',
      country: 'France'
    },
    rating: 3.9,
    leadTime: 7,
    minimumOrderValue: 400,
    currency: 'EUR',
    paymentTerms: '60 jours',
    isPreferred: false,
    totalOrders: 15,
    totalValue: 45000,
    lastOrderDate: '2024-01-08',
    categories: ['Hydraulique', 'Joints'],
    status: 'inactive'
  }
];

const getRatingStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 text-secondary-300" />
      ))}
      <span className="ml-1 text-sm text-secondary-600 dark:text-secondary-400">
        ({rating})
      </span>
    </div>
  );
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge variant="success">Actif</Badge>;
    case 'inactive':
      return <Badge variant="error">Inactif</Badge>;
    case 'pending':
      return <Badge variant="warning">En attente</Badge>;
    default:
      return <Badge variant="default">{status}</Badge>;
  }
};

const Suppliers: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [showPreferredOnly, setShowPreferredOnly] = React.useState(false);

  const statuses = ['all', ...new Set(suppliers.map(supplier => supplier.status))];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || supplier.status === selectedStatus;
    const matchesPreferred = !showPreferredOnly || supplier.isPreferred;
    return matchesSearch && matchesStatus && matchesPreferred;
  });

  const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
  const preferredSuppliers = suppliers.filter(s => s.isPreferred).length;
  const totalValue = suppliers.reduce((sum, supplier) => sum + supplier.totalValue, 0);
  const avgRating = suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliers.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Fournisseurs
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Gestion des fournisseurs et partenaires
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          Nouveau fournisseur
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Fournisseurs actifs
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {activeSuppliers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-warning-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Fournisseurs préférés
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {preferredSuppliers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-success-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Note moyenne
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {avgRating.toFixed(1)}/5
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-info-600" />
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
                  placeholder="Rechercher par nom ou email..."
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
                    {status === 'active' ? 'Actif' :
                     status === 'inactive' ? 'Inactif' :
                     status === 'pending' ? 'En attente' : status}
                  </option>
                ))}
              </select>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showPreferredOnly}
                  onChange={(e) => setShowPreferredOnly(e.target.checked)}
                  className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-secondary-700 dark:text-secondary-300">
                  Préférés uniquement
                </span>
              </label>
            </div>
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filtres avancés
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} hover>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>{supplier.name}</span>
                    {supplier.isPreferred && (
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    )}
                  </CardTitle>
                  <div className="mt-2">
                    {getRatingStars(supplier.rating)}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(supplier.status)}
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-secondary-400" />
                    <span className="text-secondary-700 dark:text-secondary-300">
                      {supplier.contactEmail}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-secondary-400" />
                    <span className="text-secondary-700 dark:text-secondary-300">
                      {supplier.contactPhone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-secondary-400" />
                    <span className="text-secondary-700 dark:text-secondary-300">
                      {supplier.address.city}, {supplier.address.country}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      Délai livraison
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400 flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{supplier.leadTime} jours</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      Commande min.
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {formatCurrency(supplier.minimumOrderValue)}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      Total commandes
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {supplier.totalOrders}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      Valeur totale
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {formatCurrency(supplier.totalValue)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-secondary-900 dark:text-white mb-2">
                    Catégories
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.categories.map((category, index) => (
                      <Badge key={index} variant="outline" size="sm">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-secondary-500 dark:text-secondary-400">
                  Dernière commande: {new Date(supplier.lastOrderDate).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { Suppliers };

