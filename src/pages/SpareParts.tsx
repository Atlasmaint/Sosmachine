import React from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '@/components/ui';
import { formatCurrency, getStatusColor } from '@/utils';

// Données de démonstration
const spareParts = [
  {
    id: 'P001',
    partNumber: 'SKF-6205',
    name: 'Roulement SKF 6205',
    category: 'Roulements',
    manufacturer: 'SKF',
    currentStock: 2,
    minStock: 10,
    maxStock: 50,
    unitPrice: 45.50,
    location: 'A-12-03',
    criticality: 'high' as const,
    lastOrderDate: '2024-01-10',
  },
  {
    id: 'P002',
    partNumber: 'NBR-50x3',
    name: 'Joint torique NBR 50x3',
    category: 'Joints',
    manufacturer: 'Parker',
    currentStock: 15,
    minStock: 20,
    maxStock: 100,
    unitPrice: 8.75,
    location: 'B-05-12',
    criticality: 'medium' as const,
    lastOrderDate: '2024-01-08',
  },
  {
    id: 'P003',
    partNumber: 'HTD-8M-1600',
    name: 'Courroie HTD 8M-1600',
    category: 'Courroies',
    manufacturer: 'Gates',
    currentStock: 1,
    minStock: 5,
    maxStock: 20,
    unitPrice: 125.00,
    location: 'C-08-01',
    criticality: 'critical' as const,
    lastOrderDate: '2023-12-15',
  },
  {
    id: 'P004',
    partNumber: 'FILTER-HF35',
    name: 'Filtre hydraulique HF35',
    category: 'Filtres',
    manufacturer: 'Hydac',
    currentStock: 8,
    minStock: 6,
    maxStock: 30,
    unitPrice: 67.20,
    location: 'D-03-07',
    criticality: 'low' as const,
    lastOrderDate: '2024-01-12',
  },
];

const getStockStatus = (current: number, min: number) => {
  if (current === 0) return { status: 'out_of_stock', label: 'Rupture', variant: 'error' as const };
  if (current <= min * 0.5) return { status: 'critical', label: 'Critique', variant: 'error' as const };
  if (current <= min) return { status: 'low', label: 'Faible', variant: 'warning' as const };
  return { status: 'ok', label: 'OK', variant: 'success' as const };
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

const SpareParts: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = ['all', ...new Set(spareParts.map(part => part.category))];

  const filteredParts = spareParts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.partNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Pièces détachées
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Gestion de l'inventaire des pièces de rechange
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          Ajouter une pièce
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <Input
                  placeholder="Rechercher par nom ou référence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white"
              >
                <option value="all">Toutes les catégories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filtres avancés
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Total pièces
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {spareParts.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-warning-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Stock faible
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {spareParts.filter(p => p.currentStock <= p.minStock).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Stock OK
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {spareParts.filter(p => p.currentStock > p.minStock).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-info-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Valeur totale
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {formatCurrency(spareParts.reduce((sum, part) => sum + (part.currentStock * part.unitPrice), 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des pièces détachées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200 dark:border-secondary-700">
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Référence
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Nom
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Catégorie
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Stock
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Prix unitaire
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    Criticité
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
                {filteredParts.map((part) => {
                  const stockStatus = getStockStatus(part.currentStock, part.minStock);
                  return (
                    <tr key={part.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                      <td className="py-4 text-sm font-medium text-secondary-900 dark:text-white">
                        {part.partNumber}
                      </td>
                      <td className="py-4 text-sm text-secondary-900 dark:text-white">
                        {part.name}
                      </td>
                      <td className="py-4 text-sm text-secondary-600 dark:text-secondary-400">
                        {part.category}
                      </td>
                      <td className="py-4 text-sm">
                        <span className="font-medium text-secondary-900 dark:text-white">
                          {part.currentStock}
                        </span>
                        <span className="text-secondary-500"> / {part.minStock}</span>
                      </td>
                      <td className="py-4 text-sm font-medium text-secondary-900 dark:text-white">
                        {formatCurrency(part.unitPrice)}
                      </td>
                      <td className="py-4">
                        {getCriticalityBadge(part.criticality)}
                      </td>
                      <td className="py-4">
                        <Badge variant={stockStatus.variant}>
                          {stockStatus.label}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { SpareParts };

