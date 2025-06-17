import React from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Palette,
  Globe,
  Save,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '@/components/ui';
import { useAppStore } from '@/store';

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useAppStore();
  const [activeTab, setActiveTab] = React.useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'integrations', label: 'Intégrations', icon: Database },
    { id: 'general', label: 'Général', icon: Globe },
  ];

  const ProfileSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Prénom" defaultValue="Jean" />
            <Input label="Nom" defaultValue="Dupont" />
          </div>
          <Input label="Email" defaultValue="jean.dupont@sosmachine.pro" />
          <Input label="Entreprise" defaultValue="SOSMachine Industries" />
          <Input label="Poste" defaultValue="Responsable Maintenance" />
          <Input label="Téléphone" defaultValue="+33 1 23 45 67 89" />
          <Button>Sauvegarder les modifications</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Photo de profil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <Button variant="outline" size="sm">
                Changer la photo
              </Button>
              <p className="text-sm text-secondary-500 mt-1">
                JPG, PNG ou GIF. Taille maximale 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications par email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: 'stock_alerts', label: 'Alertes de stock faible', description: 'Recevoir des notifications quand le stock est en dessous du seuil minimum' },
            { id: 'order_updates', label: 'Mises à jour des commandes', description: 'Notifications sur le statut des commandes (approuvées, expédiées, livrées)' },
            { id: 'maintenance_reminders', label: 'Rappels de maintenance', description: 'Notifications pour les maintenances programmées' },
            { id: 'system_updates', label: 'Mises à jour système', description: 'Informations sur les nouvelles fonctionnalités et mises à jour' },
          ].map((notification) => (
            <div key={notification.id} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id={notification.id}
                defaultChecked
                className="mt-1 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              />
              <div className="flex-1">
                <label htmlFor={notification.id} className="font-medium text-secondary-900 dark:text-white cursor-pointer">
                  {notification.label}
                </label>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications push</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-secondary-900 dark:text-white">
                Notifications push activées
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Recevoir des notifications directement dans le navigateur
              </p>
            </div>
            <Button variant="outline" size="sm">
              Activer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AppearanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thème</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              Choisissez l'apparence de l'interface
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { value: 'light', label: 'Clair', icon: Sun },
                { value: 'dark', label: 'Sombre', icon: Moon },
                { value: 'system', label: 'Système', icon: Monitor },
              ].map((themeOption) => {
                const Icon = themeOption.icon;
                return (
                  <button
                    key={themeOption.value}
                    onClick={() => setTheme(themeOption.value as any)}
                    className={`flex items-center space-x-3 rounded-lg border p-4 text-left transition-colors ${
                      theme === themeOption.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-secondary-200 hover:bg-secondary-50 dark:border-secondary-700 dark:hover:bg-secondary-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{themeOption.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Langue et région</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Langue
            </label>
            <select className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white">
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Fuseau horaire
            </label>
            <select className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white">
              <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
              <option value="Europe/London">Europe/London (UTC+0)</option>
              <option value="America/New_York">America/New_York (UTC-5)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Format de date
            </label>
            <select className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white">
              <option value="dd/mm/yyyy">DD/MM/YYYY</option>
              <option value="mm/dd/yyyy">MM/DD/YYYY</option>
              <option value="yyyy-mm-dd">YYYY-MM-DD</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mot de passe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Mot de passe actuel" type="password" />
          <Input label="Nouveau mot de passe" type="password" />
          <Input label="Confirmer le nouveau mot de passe" type="password" />
          <Button>Changer le mot de passe</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Authentification à deux facteurs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-secondary-900 dark:text-white">
                2FA désactivée
              </p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Ajoutez une couche de sécurité supplémentaire à votre compte
              </p>
            </div>
            <Button variant="outline">
              Activer 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessions actives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { device: 'Chrome sur Windows', location: 'Paris, France', current: true },
              { device: 'Safari sur iPhone', location: 'Lyon, France', current: false },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-secondary-200 p-3 dark:border-secondary-700">
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white">
                    {session.device}
                    {session.current && (
                      <Badge variant="success" size="sm" className="ml-2">
                        Actuelle
                      </Badge>
                    )}
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {session.location}
                  </p>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm">
                    Déconnecter
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const IntegrationsSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Intégrations GMAO/CMMS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'SAP PM', status: 'connected', description: 'Synchronisation des équipements et ordres de travail' },
              { name: 'IBM Maximo', status: 'available', description: 'Gestion des actifs et maintenance préventive' },
              { name: 'Infor EAM', status: 'available', description: 'Enterprise Asset Management' },
              { name: 'Oracle EAM', status: 'available', description: 'Gestion des équipements Oracle' },
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-secondary-200 p-4 dark:border-secondary-700">
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white">
                    {integration.name}
                  </p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {integration.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {integration.status === 'connected' ? (
                    <>
                      <Badge variant="success">Connecté</Badge>
                      <Button variant="outline" size="sm">
                        Configurer
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm">
                      Connecter
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API et Webhooks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-secondary-900 dark:text-white mb-2">
                Clé API
              </p>
              <div className="flex items-center space-x-2">
                <Input value="sk_live_..." readOnly className="font-mono text-sm" />
                <Button variant="outline" size="sm">
                  Copier
                </Button>
                <Button variant="outline" size="sm">
                  Régénérer
                </Button>
              </div>
            </div>
            <div>
              <p className="font-medium text-secondary-900 dark:text-white mb-2">
                Webhooks
              </p>
              <Button variant="outline" size="sm">
                Gérer les webhooks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const GeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Préférences générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Devise par défaut
            </label>
            <select className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white">
              <option value="EUR">Euro (EUR)</option>
              <option value="USD">Dollar US (USD)</option>
              <option value="GBP">Livre Sterling (GBP)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Nombre d'éléments par page
            </label>
            <select className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-white">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="auto_save"
              defaultChecked
              className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="auto_save" className="text-sm text-secondary-700 dark:text-secondary-300">
              Sauvegarde automatique des brouillons
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sauvegarde et export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-secondary-900 dark:text-white mb-2">
              Exporter mes données
            </p>
            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
              Téléchargez une copie de toutes vos données
            </p>
            <Button variant="outline">
              Demander un export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'general':
        return <GeneralSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
          Paramètres
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Gérez vos préférences et paramètres de compte
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-64">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                          : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 dark:text-secondary-400 dark:hover:bg-secondary-800 dark:hover:text-secondary-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export { SettingsPage };

