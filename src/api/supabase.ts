import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Types pour Supabase
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          company: string;
          role: string;
          avatar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name: string;
          last_name: string;
          company: string;
          role?: string;
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          company?: string;
          role?: string;
          avatar?: string | null;
          updated_at?: string;
        };
      };
      spare_parts: {
        Row: {
          id: string;
          part_number: string;
          name: string;
          description: string;
          category_id: string;
          manufacturer: string;
          specifications: any;
          current_stock: number;
          minimum_stock: number;
          maximum_stock: number;
          unit_price: number;
          currency: string;
          location: string;
          criticality: string;
          last_order_date: string | null;
          next_maintenance_date: string | null;
          images: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          part_number: string;
          name: string;
          description: string;
          category_id: string;
          manufacturer: string;
          specifications?: any;
          current_stock: number;
          minimum_stock: number;
          maximum_stock: number;
          unit_price: number;
          currency: string;
          location: string;
          criticality: string;
          last_order_date?: string | null;
          next_maintenance_date?: string | null;
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          part_number?: string;
          name?: string;
          description?: string;
          category_id?: string;
          manufacturer?: string;
          specifications?: any;
          current_stock?: number;
          minimum_stock?: number;
          maximum_stock?: number;
          unit_price?: number;
          currency?: string;
          location?: string;
          criticality?: string;
          last_order_date?: string | null;
          next_maintenance_date?: string | null;
          images?: string[];
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'admin' | 'manager' | 'technician' | 'viewer';
      criticality_level: 'low' | 'medium' | 'high' | 'critical';
      order_status: 'draft' | 'pending_approval' | 'approved' | 'sent_to_supplier' | 'partially_received' | 'completed' | 'cancelled';
    };
  };
};

