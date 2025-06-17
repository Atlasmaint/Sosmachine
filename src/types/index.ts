// Types de base pour l'application SOSMachine.pro

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'manager' | 'technician' | 'viewer';

export interface Company {
  id: string;
  name: string;
  industry: string;
  address: Address;
  contactEmail: string;
  contactPhone: string;
  logo?: string;
  settings: CompanySettings;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  region?: string;
}

export interface CompanySettings {
  currency: string;
  timezone: string;
  language: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  criticalAlerts: boolean;
}

export interface SparePart {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  category: PartCategory;
  manufacturer: string;
  specifications: Record<string, any>;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unitPrice: number;
  currency: string;
  suppliers: Supplier[];
  location: string;
  criticality: CriticalityLevel;
  lastOrderDate?: string;
  nextMaintenanceDate?: string;
  images: string[];
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface PartCategory {
  id: string;
  name: string;
  parentId?: string;
  description?: string;
}

export type CriticalityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Supplier {
  id: string;
  name: string;
  contactEmail: string;
  contactPhone: string;
  address: Address;
  rating: number;
  leadTime: number; // en jours
  minimumOrderValue: number;
  currency: string;
  paymentTerms: string;
  isPreferred: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplier: Supplier;
  items: PurchaseOrderItem[];
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  requestedBy: string;
  approvedBy?: string;
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrderItem {
  id: string;
  sparePartId: string;
  sparePart: SparePart;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity?: number;
  receivedDate?: string;
}

export type OrderStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'approved' 
  | 'sent_to_supplier' 
  | 'partially_received' 
  | 'completed' 
  | 'cancelled';

export interface MaintenanceRequest {
  id: string;
  equipmentId: string;
  equipment: Equipment;
  requestedParts: RequestedPart[];
  priority: Priority;
  description: string;
  requestedBy: string;
  assignedTo?: string;
  status: MaintenanceStatus;
  scheduledDate?: string;
  completedDate?: string;
  estimatedDuration: number; // en heures
  actualDuration?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RequestedPart {
  sparePartId: string;
  sparePart: SparePart;
  quantity: number;
  isAvailable: boolean;
  alternativeParts?: SparePart[];
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type MaintenanceStatus = 
  | 'pending' 
  | 'approved' 
  | 'parts_ordered' 
  | 'parts_available' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled';

export interface Equipment {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  location: string;
  installationDate: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  status: EquipmentStatus;
  criticality: CriticalityLevel;
  specifications: Record<string, any>;
  manuals: Document[];
  spareParts: SparePart[];
  maintenanceHistory: MaintenanceRecord[];
  createdAt: string;
  updatedAt: string;
}

export type EquipmentStatus = 'operational' | 'maintenance' | 'breakdown' | 'retired';

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  type: MaintenanceType;
  description: string;
  performedBy: string;
  date: string;
  duration: number;
  partsUsed: UsedPart[];
  cost: number;
  currency: string;
  notes?: string;
  nextMaintenanceDate?: string;
}

export type MaintenanceType = 'preventive' | 'corrective' | 'predictive' | 'emergency';

export interface UsedPart {
  sparePartId: string;
  sparePart: SparePart;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
}

export type DocumentType = 'manual' | 'specification' | 'certificate' | 'invoice' | 'other';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export type NotificationType = 
  | 'stock_low' 
  | 'stock_critical' 
  | 'order_approved' 
  | 'order_delivered' 
  | 'maintenance_due' 
  | 'equipment_breakdown' 
  | 'system_update';

// Types pour les API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Types pour les formulaires
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  company: string;
}

export interface SparePartForm {
  partNumber: string;
  name: string;
  description: string;
  categoryId: string;
  manufacturer: string;
  specifications: Record<string, any>;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  unitPrice: number;
  currency: string;
  location: string;
  criticality: CriticalityLevel;
}

// Types pour les filtres et recherches
export interface SparePartFilters {
  category?: string;
  manufacturer?: string;
  criticality?: CriticalityLevel;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
  search?: string;
}

export interface OrderFilters {
  status?: OrderStatus;
  supplier?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

// Types pour les statistiques et tableaux de bord
export interface DashboardStats {
  totalParts: number;
  lowStockParts: number;
  criticalStockParts: number;
  pendingOrders: number;
  totalOrderValue: number;
  averageLeadTime: number;
  maintenanceRequests: number;
  equipmentDowntime: number;
}

export interface StockAlert {
  sparePartId: string;
  sparePart: SparePart;
  currentStock: number;
  minimumStock: number;
  alertLevel: 'low' | 'critical';
  suggestedOrderQuantity: number;
  estimatedCost: number;
}

// Types pour l'intégration GMAO/CMMS
export interface GMAOIntegration {
  id: string;
  name: string;
  type: 'sap' | 'maximo' | 'infor' | 'oracle' | 'other';
  apiEndpoint: string;
  isActive: boolean;
  lastSyncDate?: string;
  syncFrequency: number; // en minutes
  mappingConfig: Record<string, any>;
}

export interface SyncLog {
  id: string;
  integrationId: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'completed' | 'failed';
  recordsProcessed: number;
  recordsSuccessful: number;
  recordsFailed: number;
  errorMessage?: string;
}

