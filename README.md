# SOSMachine.pro - Plateforme B2B d'Approvisionnement Automatisé

Une plateforme moderne et complète pour l'automatisation de l'approvisionnement en pièces de rechange critiques avec intégration GMAO/CMMS, recommandations intelligentes et échanges inter-usines.

## 🚀 Fonctionnalités

### ✨ Fonctionnalités principales
- **Gestion intelligente des stocks** - Suivi en temps réel avec alertes automatiques
- **Approvisionnement automatisé** - Commandes automatiques basées sur des seuils intelligents
- **Intégration GMAO/CMMS** - Synchronisation avec vos systèmes existants
- **Recommandations IA** - Suggestions d'optimisation basées sur l'historique
- **Échanges inter-usines** - Partage de pièces entre sites
- **Tableau de bord analytique** - Métriques et KPIs en temps réel

### 🛠️ Technologies modernes
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS avec thème sombre/clair
- **État global**: Zustand pour la gestion d'état
- **Base de données**: Supabase (PostgreSQL)
- **Tests**: Vitest + Testing Library
- **Qualité code**: ESLint + Prettier + Husky
- **PWA**: Support hors ligne et installation

## 📋 Prérequis

- Node.js 18+ 
- npm 9+
- Compte Supabase (pour la base de données)

## 🔧 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd sosmachine-pro
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env
```

Remplir les variables d'environnement dans `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Initialiser Husky (hooks Git)**
```bash
npm run prepare
```

## 🚀 Développement

### Commandes disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Linting et formatage
npm run lint          # Corriger automatiquement
npm run lint:check    # Vérifier seulement
npm run format        # Formater le code
npm run format:check  # Vérifier le formatage

# Tests
npm run test          # Tests unitaires
npm run test:ui       # Interface de test
npm run test:coverage # Couverture de code

# Vérification TypeScript
npm run type-check

# Analyse du bundle
npm run analyze
```

### Structure du projet

```
src/
├── api/           # Configuration API et Supabase
├── components/    # Composants React réutilisables
│   ├── ui/        # Composants UI de base
│   ├── layout/    # Composants de mise en page
│   └── forms/     # Composants de formulaires
├── hooks/         # Hooks React personnalisés
├── pages/         # Pages de l'application
├── store/         # Gestion d'état Zustand
├── types/         # Types TypeScript
├── utils/         # Fonctions utilitaires
├── test/          # Configuration des tests
└── assets/        # Ressources statiques
```

## 🎨 Système de design

### Couleurs
- **Primary**: Bleu (branding principal)
- **Secondary**: Gris (textes et éléments neutres)
- **Success**: Vert (succès, validation)
- **Warning**: Orange (avertissements)
- **Error**: Rouge (erreurs, alertes critiques)

### Composants UI
- **Button**: Boutons avec variantes et états
- **Input**: Champs de saisie avec validation
- **Card**: Cartes de contenu
- **Badge**: Étiquettes de statut
- **Layout**: Mise en page avec sidebar responsive

### Thèmes
- Mode clair/sombre automatique
- Respect des préférences système
- Transition fluide entre thèmes

## 📱 PWA (Progressive Web App)

L'application supporte:
- Installation sur mobile et desktop
- Fonctionnement hors ligne
- Notifications push
- Mise à jour automatique

## 🧪 Tests

### Tests unitaires
```bash
npm run test
```

### Tests avec interface
```bash
npm run test:ui
```

### Couverture de code
```bash
npm run test:coverage
```

## 🔍 Qualité du code

### Linting automatique
- ESLint avec règles TypeScript et React
- Correction automatique au commit
- Vérification des hooks React

### Formatage
- Prettier avec configuration Tailwind
- Formatage automatique à la sauvegarde
- Cohérence du style de code

### Hooks Git
- Pre-commit: lint + format + type-check
- Prévention des commits avec erreurs

## 📊 Performance

### Optimisations incluses
- Code splitting automatique
- Lazy loading des composants
- Optimisation des images
- Bundle analysis
- Service Worker pour cache

### Métriques cibles
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

## 🔒 Sécurité

### Authentification
- Supabase Auth avec JWT
- Gestion des rôles utilisateurs
- Sessions persistantes sécurisées

### Validation
- Validation côté client avec Zod
- Sanitisation des entrées
- Protection CSRF

## 🌐 Déploiement

### Build de production
```bash
npm run build
```

### Variables d'environnement production
```env
VITE_SUPABASE_URL=production_url
VITE_SUPABASE_ANON_KEY=production_key
```

### Plateformes supportées
- Vercel (recommandé)
- Netlify
- AWS S3 + CloudFront
- Docker

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Standards de code
- Suivre les règles ESLint/Prettier
- Tests pour les nouvelles fonctionnalités
- Documentation des composants complexes
- Messages de commit conventionnels

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- Documentation: [docs.sosmachine.pro](https://docs.sosmachine.pro)
- Issues: [GitHub Issues](https://github.com/sosmachine/issues)
- Email: support@sosmachine.pro

## 🗺️ Roadmap

### Version 1.1
- [ ] Module de maintenance prédictive
- [ ] API REST complète
- [ ] Application mobile native
- [ ] Intégrations ERP étendues

### Version 1.2
- [ ] Intelligence artificielle avancée
- [ ] Blockchain pour traçabilité
- [ ] Marketplace de pièces
- [ ] Analytics avancés

---

**SOSMachine.pro** - Révolutionnez votre approvisionnement industriel 🏭

