import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/db/supabase'

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'ok' as 'ok' | 'error',
    version: process.env.npm_package_version || '1.0.0',
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'unknown',
    environment: process.env.NODE_ENV || 'unknown',
    checks: {
      database: { status: 'unknown' as 'ok' | 'error', message: '', responseTime: 0 },
      email: { status: 'unknown' as 'ok' | 'error', message: '', responseTime: 0 },
      storage: { status: 'unknown' as 'ok' | 'error', message: '', responseTime: 0 },
    }
  }

  // Database check
  try {
    const startTime = Date.now()
    const { data, error } = await supabaseAdmin
      .from('leads')
      .select('count(*)', { count: 'exact', head: true })
      .limit(1)
    
    checks.checks.database.responseTime = Date.now() - startTime
    
    if (error) {
      checks.checks.database.status = 'error'
      checks.checks.database.message = error.message
    } else {
      checks.checks.database.status = 'ok'
      checks.checks.database.message = 'Connected'
    }
  } catch (error) {
    checks.checks.database.status = 'error'
    checks.checks.database.message = error instanceof Error ? error.message : 'Unknown error'
  }

  // Email service check
  try {
    if (process.env.RESEND_API_KEY) {
      checks.checks.email.status = 'ok'
      checks.checks.email.message = 'Resend configured'
    } else {
      checks.checks.email.status = 'error'
      checks.checks.email.message = 'Resend API key not configured'
    }
  } catch (error) {
    checks.checks.email.status = 'error'
    checks.checks.email.message = error instanceof Error ? error.message : 'Unknown error'
  }

  // Storage check (basic environment check)
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      checks.checks.storage.status = 'ok'
      checks.checks.storage.message = 'Supabase configured'
    } else {
      checks.checks.storage.status = 'error'
      checks.checks.storage.message = 'Supabase not properly configured'
    }
  } catch (error) {
    checks.checks.storage.status = 'error'
    checks.checks.storage.message = error instanceof Error ? error.message : 'Unknown error'
  }

  // Overall status
  const hasErrors = Object.values(checks.checks).some(check => check.status === 'error')
  if (hasErrors) {
    checks.status = 'error'
  }

  const statusCode = checks.status === 'ok' ? 200 : 503

  return NextResponse.json(checks, { 
    status: statusCode,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  })
}

// Also support POST for webhook health checks
export async function POST() {
  return GET()
}