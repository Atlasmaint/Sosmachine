import React from 'react';
import { 
  Wrench, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '@/components/ui';
import { formatDate, formatRelativeTime } from '@/utils';

// Données de démonstration
const maintenanceRequests = [
  {
    id: 'MNT-001',
    title: 'Remplacement roulement pompe P-101',
    equipment: {
      name: 'Pompe centrifuge P-101',
      location: 'Atelier A - Zone 1'
    },
    priority: 'urgent',
    status: 'in_progress',
    requestedBy: 'Jean Dupont',
    assignedTo: 'Marie Martin',
    createdAt: '2024-01-15T08:30:00Z',
    scheduledDate: '2024-01-16T14:00:00Z',
    estimatedDuration: 4,
    description: 'Bruit anormal détecté sur la pompe P-101. Remplacement du roulement principal nécessaire.',
    requiredParts: [
      { partNumber: 'SKF-6205', name: 'Roulement SKF 6205', quantity: 2, available: true },
      { partNumber: 'SEAL-V320', name: 'Joint V-Ring 320', quantity: 1, available: false }
    ]
  },
  {
    id: 'MNT-002',
    title: 'Maintenance préventive convoyeur C-205',
    equipment: {
      name: 'Convoyeur à bande C-205',
      location: 'Atelier B - Zone 3'
    },
    priority: 'medium',
    status: 'pending',
    requestedBy: 'Pierre Durand',
    assignedTo: null,
    createdAt: '2024-01-14T10:15:00Z',
    scheduledDate: '2024-01-18T09:00:00Z',
    estimatedDuration: 6,
    description: 'Maintenance préventive trimestrielle du convoyeur C-205.',
    requiredParts: [
      { partNumber: 'HTD-8M-1600', name: 'Courroie HTD 8M-1600', quantity: 1, available: true },
      { partNumber: 'FILTER-HF35', name: 'Filtre hydraulique HF35', quantity: 2, available: true }
    ]
  },
  {
    id: 'MNT-003',
    title: 'Réparation vérin hydraulique V-450',
    equipment: {
      name: 'Vérin hydraulique V-450',
      location: 'Atelier C - Presse 2'
    },
    priority: 'high',
    status: 'parts_ordered',
    requestedBy: 'Sophie Leroy',
    assignedTo: 'Thomas Bernard',
    createdAt: '2024-01-13T16:45:00Z',
    scheduledDate: '2024-01-20T08:00:00Z',
    estimatedDuration: 3,
    description: 'Fuite importante sur le vérin V-450. Remplacement des joints nécessaire.',
    requiredParts: [
      { partNumber: 'NBR-50x3', name: 'Joint torique NBR 50x3', quantity: 4, available: false }
    ]
  },
  {
    id: 'MNT-004',
    title: 'Calibrage capteur température T-102',
    equipment: {
      name: 'Capteur température T-102',
      location: 'Four F-102'
    },
    priority: 'low',
    status: 'completed',
    requestedBy: 'Michel Rousseau',
    assignedTo: 'Marie Martin',
    createdAt: '2024-01-12T11:20:00Z',
    scheduledDate: '2024-01-15T13:30:00Z',
    estimatedDuration: 1,
    description: 'Calibrage annuel du capteur de température T-102.',
    requiredParts: []
  }
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return <Badge variant="error" dot>Urgent</Badge>;
    case 'high':
      return <Badge variant="warning" dot>Élevée</Badge>;
    case 'medium':
      return <Badge variant="info" dot>Moyenne</Badge>;
    case 'low':
      return <Badge variant="default" dot>Faible</Badge>;
    default:
      return <Badge variant="default">{priority}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="warning">En attente</Badge>;
    case 'approved':
      return <Badge variant="info">Approuvée</Badge>;
    case 'parts_ordered':
      return <Badge variant="info">Pièces commandées</Badge>;
    case 'parts_available':
      return <Badge variant="success">Pièces disponibles</Badge>;
    case 'in_progress':
      return <Badge variant="warning">En cours</Badge>;
    case 'completed':
      return <Badge variant="success">Terminée</Badge>;
    case 'cancelled':
      return <Badge variant="error">Annulée</Badge>;
    default:
      return <Badge variant="default">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return '⏳';
    case 'approved':
      return '👍';
    case 'parts_ordered':
      return '📦';
    case 'parts_available':
      return '✅';
    case 'in_progress':
      return '🔧';
    case 'completed':
      return '✅';
    case 'cancelled':
      return '❌';
    default:
      return '📋';
  }
};

const Maintenance: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedPriority, setSelectedPriority] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  const priorities = ['all', ...new Set(maintenanceRequests.map(req => req.priority))];
  const statuses = ['all', ...new Set(maintenanceRequests.map(req => req.status))];

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const urgentRequests = maintenanceRequests.filter(req => req.priority === 'urgent').length;
  const inProgressRequests = maintenanceRequests.filter(req => req.status === 'in_progress').length;
  const completedRequests = maintenanceRequests.filter(req => req.status === 'completed').length;
  const pendingRequests = maintenanceRequests.filter(req => req.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
            Maintenance
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Gestion des demandes de maintenance et réparations
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          Nouvelle demande
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-error-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  Urgent
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {urgentRequests}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  En attente
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {pendingRequests}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-info-600" />
              <div>
                <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                  En cours
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {inProgressRequests}
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
                  Terminées
                </p>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                  {completedRequests}
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
                  placeholder="Rechercher par titre ou équipement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white"
              >
                <option value="all">Toutes priorités</option>
                {priorities.slice(1).map(priority => (
                  <option key={priority} value={priority}>
                    {priority === 'urgent' ? 'Urgent' :
                     priority === 'high' ? 'Élevée' :
                     priority === 'medium' ? 'Moyenne' :
                     priority === 'low' ? 'Faible' : priority}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white"
              >
                <option value="all">Tous statuts</option>
                {statuses.slice(1).map(status => (
                  <option key={status} value={status}>
                    {status === 'pending' ? 'En attente' :
                     status === 'approved' ? 'Approuvée' :
                     status === 'parts_ordered' ? 'Pièces commandées' :
                     status === 'parts_available' ? 'Pièces disponibles' :
                     status === 'in_progress' ? 'En cours' :
                     status === 'completed' ? 'Terminée' :
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

      {/* Maintenance Requests */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredRequests.map((request) => (
          <Card key={request.id} hover>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>{getStatusIcon(request.status)}</span>
                    <span>{request.title}</span>
                  </CardTitle>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                    {request.equipment.name} • {request.equipment.location}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getPriorityBadge(request.priority)}
                  {getStatusBadge(request.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-secondary-700 dark:text-secondary-300">
                  {request.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>Demandeur</span>
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {request.requestedBy}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white flex items-center space-x-1">
                      <Settings className="h-4 w-4" />
                      <span>Assigné à</span>
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {request.assignedTo || 'Non assigné'}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Planifié</span>
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {formatDate(request.scheduledDate)}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Durée estimée</span>
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      {request.estimatedDuration}h
                    </p>
                  </div>
                </div>

                {request.requiredParts.length > 0 && (
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white mb-2">
                      Pièces requises
                    </p>
                    <div className="space-y-1">
                      {request.requiredParts.map((part, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-secondary-700 dark:text-secondary-300">
                            {part.name} (x{part.quantity})
                          </span>
                          <Badge variant={part.available ? 'success' : 'error'} size="sm">
                            {part.available ? 'Disponible' : 'Indisponible'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-secondary-500 dark:text-secondary-400">
                  Créée {formatRelativeTime(request.createdAt)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { Maintenance };

