-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types/enums
CREATE TYPE risk_category AS ENUM ('PROHIBITED', 'HIGH_RISK', 'LIMITED_RISK', 'MINIMAL_RISK');
CREATE TYPE email_status AS ENUM ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed');

-- Create leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  company TEXT,
  role TEXT,
  industry TEXT,
  company_size TEXT,
  timeline TEXT,
  interests TEXT[],
  marketing_consent BOOLEAN DEFAULT false,
  lead_score INTEGER DEFAULT 0,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create assessments table
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  risk_category risk_category NOT NULL,
  compliance_score INTEGER NOT NULL CHECK (compliance_score >= 0 AND compliance_score <= 100),
  answers JSONB NOT NULL,
  report_url TEXT,
  report_data JSONB,
  ip_address INET,
  user_agent TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create email_events table
CREATE TABLE email_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  email_type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  subject TEXT,
  metadata JSONB,
  status email_status DEFAULT 'pending',
  error_message TEXT,
  external_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create analytics_events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  properties JSONB,
  page_url TEXT,
  referrer TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit_logs table for admin actions
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  user_email TEXT,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_marketing_consent ON leads(marketing_consent);

CREATE INDEX idx_assessments_lead_id ON assessments(lead_id);
CREATE INDEX idx_assessments_session_id ON assessments(session_id);
CREATE INDEX idx_assessments_risk_category ON assessments(risk_category);
CREATE INDEX idx_assessments_created_at ON assessments(created_at DESC);

CREATE INDEX idx_email_events_lead_id ON email_events(lead_id);
CREATE INDEX idx_email_events_assessment_id ON email_events(assessment_id);
CREATE INDEX idx_email_events_status ON email_events(status);
CREATE INDEX idx_email_events_created_at ON email_events(created_at DESC);

CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);

CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_user_email ON audit_logs(user_email);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- GDPR compliance functions
CREATE OR REPLACE FUNCTION anonymize_lead_data(lead_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE leads SET
    email = 'anonymized_' || id || '@gdpr.local',
    name = 'Anonymized User',
    company = NULL,
    role = NULL,
    industry = NULL,
    company_size = NULL,
    timeline = NULL,
    interests = NULL,
    source = NULL,
    utm_source = NULL,
    utm_medium = NULL,
    utm_campaign = NULL
  WHERE email = lead_email;
  
  -- Also anonymize related email events
  UPDATE email_events SET
    recipient = 'anonymized_' || id || '@gdpr.local'
  WHERE lead_id IN (SELECT id FROM leads WHERE email = lead_email);
END;
$$ LANGUAGE plpgsql;

-- Data retention cleanup function (to be run by cron)
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS VOID AS $$
BEGIN
  -- Delete analytics events older than 90 days
  DELETE FROM analytics_events WHERE created_at < NOW() - INTERVAL '90 days';
  
  -- Delete audit logs older than 1 year
  DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL '1 year';
  
  -- Anonymize leads without marketing consent after 90 days
  UPDATE leads SET
    name = 'Anonymized User',
    company = NULL,
    role = NULL,
    industry = NULL,
    company_size = NULL,
    timeline = NULL,
    interests = NULL,
    source = NULL,
    utm_source = NULL,
    utm_medium = NULL,
    utm_campaign = NULL
  WHERE marketing_consent = false
    AND created_at < NOW() - INTERVAL '90 days'
    AND name != 'Anonymized User';
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for assessments by session_id (for report viewing)
CREATE POLICY "Public read assessments by session" ON assessments
  FOR SELECT USING (true);

-- Service role access for all operations
CREATE POLICY "Service role access leads" ON leads
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role access assessments" ON assessments
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role access email_events" ON email_events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role access analytics_events" ON analytics_events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role access audit_logs" ON audit_logs
  FOR ALL USING (auth.role() = 'service_role');