export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          plan: string
          scans_remaining: number
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          plan?: string
          scans_remaining?: number
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          plan?: string
          scans_remaining?: number
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      scans: {
        Row: {
          id: string
          user_id: string
          project_name: string
          file_size: number | null
          scan_type: 'upload' | 'github' | 'url'
          status: 'pending' | 'scanning' | 'completed' | 'failed'
          started_at: string
          completed_at: string | null
          vulnerability_count: Json
          report_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          project_name: string
          file_size?: number | null
          scan_type: 'upload' | 'github' | 'url'
          status?: 'pending' | 'scanning' | 'completed' | 'failed'
          started_at?: string
          completed_at?: string | null
          vulnerability_count?: Json
          report_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          project_name?: string
          file_size?: number | null
          scan_type?: 'upload' | 'github' | 'url'
          status?: 'pending' | 'scanning' | 'completed' | 'failed'
          started_at?: string
          completed_at?: string | null
          vulnerability_count?: Json
          report_url?: string | null
          created_at?: string
        }
      }
      vulnerabilities: {
        Row: {
          id: string
          scan_id: string
          severity: 'critical' | 'high' | 'medium' | 'low'
          type: string
          title: string
          description: string
          file_path: string | null
          line_number: number | null
          code_snippet: string | null
          fix_description: string
          ai_fix_prompt: string
          cve_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          scan_id: string
          severity: 'critical' | 'high' | 'medium' | 'low'
          type: string
          title: string
          description: string
          file_path?: string | null
          line_number?: number | null
          code_snippet?: string | null
          fix_description: string
          ai_fix_prompt: string
          cve_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          scan_id?: string
          severity?: 'critical' | 'high' | 'medium' | 'low'
          type?: string
          title?: string
          description?: string
          file_path?: string | null
          line_number?: number | null
          code_snippet?: string | null
          fix_description?: string
          ai_fix_prompt?: string
          cve_id?: string | null
          created_at?: string
        }
      }
      subscription_tiers: {
        Row: {
          id: string
          name: string
          price: number
          scans_per_month: number
          features: Json
          stripe_price_id: string | null
        }
        Insert: {
          id: string
          name: string
          price: number
          scans_per_month: number
          features: Json
          stripe_price_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          price?: number
          scans_per_month?: number
          features?: Json
          stripe_price_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

// Additional types for application use
export type User = Tables<'users'>
export type Scan = Tables<'scans'>
export type Vulnerability = Tables<'vulnerabilities'>
export type SubscriptionTier = Tables<'subscription_tiers'>

export type VulnerabilityCount = {
  critical: number
  high: number
  medium: number
  low: number
}