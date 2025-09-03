import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/db/supabase'
import { apiRateLimit } from '@/lib/middleware/rate-limit'
import { LeadSchema, validateAndSanitize } from '@/lib/middleware/input-validation'

const extendedLeadSchema = LeadSchema.extend({
  companySize: z.string().optional(),
  timeline: z.string().optional(),
  interests: z.array(z.string()).optional(),
  marketingConsent: z.boolean().default(false),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})

const updateLeadSchema = extendedLeadSchema.partial().extend({
  id: z.string(),
})

// POST - Create or update lead
export async function POST(request: NextRequest) {
  const rateLimitResponse = apiRateLimit(request)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    const body = await request.json()
    const sanitizedData = validateAndSanitize(extendedLeadSchema, body)

    // Calculate lead score based on provided information
    const leadScore = calculateLeadScore(sanitizedData)

    // Get client information
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Try to update existing lead first
    const { data: existingLead } = await supabaseAdmin
      .from('leads')
      .select('id')
      .eq('email', sanitizedData.email)
      .single()

    let lead
    if (existingLead) {
      // Update existing lead
      const { data, error } = await supabaseAdmin
        .from('leads')
        .update({
          name: sanitizedData.name || undefined,
          company: sanitizedData.company || undefined,
          role: sanitizedData.role || undefined,
          industry: sanitizedData.industry || undefined,
          company_size: sanitizedData.companySize || undefined,
          timeline: sanitizedData.timeline || undefined,
          interests: sanitizedData.interests || [],
          marketing_consent: sanitizedData.marketingConsent,
          lead_score: leadScore,
          utm_source: sanitizedData.utmSource || undefined,
          utm_medium: sanitizedData.utmMedium || undefined,
          utm_campaign: sanitizedData.utmCampaign || undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingLead.id)
        .select()
        .single()

      if (error) throw error
      lead = data
    } else {
      // Create new lead
      const { data, error } = await supabaseAdmin
        .from('leads')
        .insert({
          email: sanitizedData.email,
          name: sanitizedData.name || null,
          company: sanitizedData.company || null,
          role: sanitizedData.role || null,
          industry: sanitizedData.industry || null,
          company_size: sanitizedData.companySize || null,
          timeline: sanitizedData.timeline || null,
          interests: sanitizedData.interests || [],
          marketing_consent: sanitizedData.marketingConsent,
          lead_score: leadScore,
          source: sanitizedData.source || 'website',
          utm_source: sanitizedData.utmSource || null,
          utm_medium: sanitizedData.utmMedium || null,
          utm_campaign: sanitizedData.utmCampaign || null,
        })
        .select()
        .single()

      if (error) throw error
      lead = data
    }

    // Track analytics event
    await supabaseAdmin
      .from('analytics_events')
      .insert({
        session_id: request.headers.get('x-session-id') || 'unknown',
        event_name: existingLead ? 'lead_updated' : 'lead_created',
        properties: {
          lead_id: lead.id,
          lead_score: leadScore,
          marketing_consent: sanitizedData.marketingConsent,
          has_company: !!sanitizedData.company,
        },
        page_url: request.url,
        referrer: request.headers.get('referer'),
        ip_address: clientIP,
        user_agent: userAgent,
      })

    return NextResponse.json({
      leadId: lead.id,
      leadScore: leadScore,
      message: existingLead ? 'Lead updated successfully' : 'Lead created successfully',
    })

  } catch (error) {
    console.error('Lead creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET - Retrieve leads (admin only, would need auth middleware)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const filter = searchParams.get('filter')

    let query = supabaseAdmin
      .from('leads')
      .select(`
        *,
        assessments (
          id,
          risk_category,
          compliance_score,
          created_at
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (filter === 'with_consent') {
      query = query.eq('marketing_consent', true)
    } else if (filter === 'high_score') {
      query = query.gte('lead_score', 70)
    } else if (filter === 'recent') {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      query = query.gte('created_at', oneDayAgo)
    }

    const { data: leads, error } = await query

    if (error) throw error

    // Get total count
    const { count } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      leads: leads || [],
      total: count || 0,
      limit,
      offset,
    })

  } catch (error) {
    console.error('Get leads error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function calculateLeadScore(leadData: any): number {
  let score = 0

  // Base score for valid email
  score += 10

  // Company information
  if (leadData.company) score += 20
  if (leadData.role) score += 15
  if (leadData.industry) score += 10

  // Engagement indicators
  if (leadData.timeline) {
    if (leadData.timeline.includes('0-3')) score += 25
    else if (leadData.timeline.includes('3-6')) score += 20
    else if (leadData.timeline.includes('6-12')) score += 15
    else score += 10
  }

  // Interests indicate specific need
  if (leadData.interests && leadData.interests.length > 0) {
    score += leadData.interests.length * 5
  }

  // Marketing consent shows engagement
  if (leadData.marketingConsent) score += 10

  // Company size (larger companies = higher priority)
  if (leadData.companySize) {
    if (leadData.companySize.includes('500+')) score += 15
    else if (leadData.companySize.includes('100-500')) score += 12
    else if (leadData.companySize.includes('50-100')) score += 8
    else score += 5
  }

  return Math.min(score, 100) // Cap at 100
}