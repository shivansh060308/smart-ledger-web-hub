export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      amazon_accounts: {
        Row: {
          access_token: string | null
          access_token_expires_at: string | null
          created_at: string
          id: string
          is_active: boolean
          marketplace_ids: string[]
          refresh_token: string
          region: string
          seller_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token?: string | null
          access_token_expires_at?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          marketplace_ids?: string[]
          refresh_token: string
          region?: string
          seller_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string | null
          access_token_expires_at?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          marketplace_ids?: string[]
          refresh_token?: string
          region?: string
          seller_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      amazon_orders: {
        Row: {
          amazon_account_id: string
          amazon_order_id: string
          buyer_email: string | null
          created_at: string
          earliest_ship_date: string | null
          fulfillment_channel: string | null
          id: string
          last_update_date: string | null
          latest_ship_date: string | null
          marketplace_id: string
          number_of_items_shipped: number | null
          number_of_items_unshipped: number | null
          order_status: string
          order_total_amount: number | null
          order_total_currency: string | null
          order_type: string | null
          purchase_date: string
          ship_service_level: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amazon_account_id: string
          amazon_order_id: string
          buyer_email?: string | null
          created_at?: string
          earliest_ship_date?: string | null
          fulfillment_channel?: string | null
          id?: string
          last_update_date?: string | null
          latest_ship_date?: string | null
          marketplace_id: string
          number_of_items_shipped?: number | null
          number_of_items_unshipped?: number | null
          order_status: string
          order_total_amount?: number | null
          order_total_currency?: string | null
          order_type?: string | null
          purchase_date: string
          ship_service_level?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amazon_account_id?: string
          amazon_order_id?: string
          buyer_email?: string | null
          created_at?: string
          earliest_ship_date?: string | null
          fulfillment_channel?: string | null
          id?: string
          last_update_date?: string | null
          latest_ship_date?: string | null
          marketplace_id?: string
          number_of_items_shipped?: number | null
          number_of_items_unshipped?: number | null
          order_status?: string
          order_total_amount?: number | null
          order_total_currency?: string | null
          order_type?: string | null
          purchase_date?: string
          ship_service_level?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amazon_orders_amazon_account_id_fkey"
            columns: ["amazon_account_id"]
            isOneToOne: false
            referencedRelation: "amazon_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      amazon_products: {
        Row: {
          amazon_account_id: string
          asin: string
          brand: string | null
          category: string | null
          created_at: string
          currency: string | null
          id: string
          inventory_quantity: number | null
          is_active: boolean
          marketplace_id: string
          price: number | null
          sku: string | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amazon_account_id: string
          asin: string
          brand?: string | null
          category?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          inventory_quantity?: number | null
          is_active?: boolean
          marketplace_id: string
          price?: number | null
          sku?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amazon_account_id?: string
          asin?: string
          brand?: string | null
          category?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          inventory_quantity?: number | null
          is_active?: boolean
          marketplace_id?: string
          price?: number | null
          sku?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amazon_products_amazon_account_id_fkey"
            columns: ["amazon_account_id"]
            isOneToOne: false
            referencedRelation: "amazon_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      amazon_settlements: {
        Row: {
          amazon_account_id: string
          created_at: string
          currency: string | null
          deposit_date: string | null
          id: string
          marketplace_id: string | null
          settlement_end_date: string | null
          settlement_id: string
          settlement_start_date: string | null
          total_amount: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amazon_account_id: string
          created_at?: string
          currency?: string | null
          deposit_date?: string | null
          id?: string
          marketplace_id?: string | null
          settlement_end_date?: string | null
          settlement_id: string
          settlement_start_date?: string | null
          total_amount?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amazon_account_id?: string
          created_at?: string
          currency?: string | null
          deposit_date?: string | null
          id?: string
          marketplace_id?: string | null
          settlement_end_date?: string | null
          settlement_id?: string
          settlement_start_date?: string | null
          total_amount?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "amazon_settlements_amazon_account_id_fkey"
            columns: ["amazon_account_id"]
            isOneToOne: false
            referencedRelation: "amazon_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_balance: {
        Row: {
          amount: number
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          category: string | null
          created_at: string
          description: string | null
          id: string
          period: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          period?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          period?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          completed: number
          created_at: string
          id: string
          pending: number
          total_orders: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: number
          created_at?: string
          id?: string
          pending?: number
          total_orders?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: number
          created_at?: string
          id?: string
          pending?: number
          total_orders?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profit_loss: {
        Row: {
          amount: number
          created_at: string
          id: string
          period: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          period?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          period?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          completed: boolean
          created_at: string
          due_date: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          due_date: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          due_date?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sales: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          period: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          period?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          period?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
