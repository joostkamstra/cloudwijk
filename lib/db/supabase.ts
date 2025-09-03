import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export function createSupabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          email: string
          name: string | null
          company: string | null
          role: string | null
          industry: string | null
          company_size: string | null
          timeline: string | null
          interests: string[] | null
          marketing_consent: boolean
          lead_score: number
          source: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          company?: string | null
          role?: string | null
          industry?: string | null
          company_size?: string | null
          timeline?: string | null
          interests?: string[] | null
          marketing_consent?: boolean
          lead_score?: number
          source?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          company?: string | null
          role?: string | null
          industry?: string | null
          company_size?: string | null
          timeline?: string | null
          interests?: string[] | null
          marketing_consent?: boolean
          lead_score?: number
          source?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          lead_id: string | null
          session_id: string
          risk_category: string
          compliance_score: number
          answers: any
          report_url: string | null
          report_data: any | null
          ip_address: string | null
          user_agent: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          session_id: string
          risk_category: string
          compliance_score: number
          answers: any
          report_url?: string | null
          report_data?: any | null
          ip_address?: string | null
          user_agent?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          session_id?: string
          risk_category?: string
          compliance_score?: number
          answers?: any
          report_url?: string | null
          report_data?: any | null
          ip_address?: string | null
          user_agent?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      email_events: {
        Row: {
          id: string
          lead_id: string | null
          assessment_id: string | null
          event_type: string
          email_type: string
          recipient: string
          subject: string | null
          metadata: any | null
          status: string
          error_message: string | null
          external_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          assessment_id?: string | null
          event_type: string
          email_type: string
          recipient: string
          subject?: string | null
          metadata?: any | null
          status?: string
          error_message?: string | null
          external_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          assessment_id?: string | null
          event_type?: string
          email_type?: string
          recipient?: string
          subject?: string | null
          metadata?: any | null
          status?: string
          error_message?: string | null
          external_id?: string | null
          created_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          session_id: string
          event_name: string
          properties: any | null
          page_url: string | null
          referrer: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          event_name: string
          properties?: any | null
          page_url?: string | null
          referrer?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          event_name?: string
          properties?: any | null
          page_url?: string | null
          referrer?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          action: string
          resource_type: string | null
          resource_id: string | null
          user_email: string | null
          ip_address: string | null
          user_agent: string | null
          metadata: any | null
          created_at: string
        }
        Insert: {
          id?: string
          action: string
          resource_type?: string | null
          resource_id?: string | null
          user_email?: string | null
          ip_address?: string | null
          user_agent?: string | null
          metadata?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          action?: string
          resource_type?: string | null
          resource_id?: string | null
          user_email?: string | null
          ip_address?: string | null
          user_agent?: string | null
          metadata?: any | null
          created_at?: string
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
      risk_category: 'PROHIBITED' | 'HIGH_RISK' | 'LIMITED_RISK' | 'MINIMAL_RISK'
      email_status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed'
    }
  }
}