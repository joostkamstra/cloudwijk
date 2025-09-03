import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { supabaseAdmin } from '@/lib/db/supabase'
import { RiskCalculator } from '@/lib/ai-act/scoring'
import { AssessmentAnswers } from '@/lib/ai-act/types'

const assessmentSchema = z.object({
  leadId: z.string().optional(),
  sessionId: z.string(),
  answers: z.object({
    scope: z.object({
      isAISystem: z.enum(['yes', 'no', 'unsure']),
      usedInEU: z.enum(['yes', 'no', 'planned']),
    }),
    prohibited: z.object({
      subliminalTechniques: z.boolean(),
      exploitingVulnerabilities: z.boolean(),
      socialScoring: z.boolean(),
      biometricIdentification: z.boolean(),
      facialRecognitionDatabase: z.boolean(),
      emotionRecognition: z.boolean(),
      predictivePolicing: z.boolean(),
      biometricCategorisation: z.boolean(),
    }),
    highRisk: z.object({
      category: z.enum(['none', 'biometrics', 'criticalInfrastructure', 'education', 'employment', 'essentialServices', 'lawEnforcement', 'migration', 'justice']),
      context: z.string().optional(),
    }),
    exceptions: z.object({
      narrowProcedural: z.boolean(),
      humanActivity: z.boolean(),
      patternDetection: z.boolean(),
      preparatoryTask: z.boolean(),
      profiling: z.boolean(),
    }),
    limitedRisk: z.object({
      humanInteraction: z.boolean(),
      syntheticContent: z.boolean(),
      deepfakes: z.boolean(),
      emotionRecognition: z.boolean(),
      biometricCategorisation: z.boolean(),
    }),
    roles: z.object({
      actor: z.enum(['provider', 'importer', 'distributor', 'deployer']),
      publicAuthority: z.boolean(),
      gpaiProvider: z.boolean(),
    }),
    gpai: z.object({
      modelType: z.enum(['foundationModel', 'multimodalModel', 'specializedModel', 'apiService']),
      computeThreshold: z.boolean(),
      capabilities: z.array(z.string()),
    }).optional(),
    compliance: z.object({
      riskManagement: z.boolean(),
      dataGovernance: z.boolean(),
      documentation: z.boolean(),
      humanOversight: z.boolean(),
      accuracyRobustness: z.boolean(),
      qualityManagement: z.boolean(),
      conformityAssessment: z.boolean(),
      ceMarking: z.boolean(),
      registration: z.boolean(),
    }),
  }),
})

// POST - Create new assessment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { leadId, sessionId, answers } = assessmentSchema.parse(body)

    // Calculate risk using our AI Act logic
    const calculator = new RiskCalculator(answers as AssessmentAnswers)
    const result = calculator.calculateRisk()

    // Get client information for audit
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Save assessment to database
    const { data: assessment, error } = await supabaseAdmin
      .from('assessments')
      .insert({
        lead_id: leadId,
        session_id: sessionId,
        risk_category: result.riskCategory,
        compliance_score: result.complianceScore,
        answers: answers,
        report_data: result,
        ip_address: clientIP,
        user_agent: userAgent,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save assessment' },
        { status: 500 }
      )
    }

    // Track analytics event
    await supabaseAdmin
      .from('analytics_events')
      .insert({
        session_id: sessionId,
        event_name: 'assessment_completed',
        properties: {
          risk_category: result.riskCategory,
          compliance_score: result.complianceScore,
          assessment_id: assessment.id,
        },
        page_url: request.url,
        referrer: request.headers.get('referer'),
        ip_address: clientIP,
        user_agent: userAgent,
      })

    return NextResponse.json({
      assessmentId: assessment.id,
      result: result,
      reportUrl: `/ai-act-checker/report/${assessment.id}`,
    })

  } catch (error) {
    console.error('Assessment error:', error)
    
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

// GET - Retrieve assessment by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Assessment ID is required' },
        { status: 400 }
      )
    }

    const { data: assessment, error } = await supabaseAdmin
      .from('assessments')
      .select(`
        *,
        leads (
          email,
          name,
          company
        )
      `)
      .eq('id', id)
      .single()

    if (error || !assessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      )
    }

    // Track view event
    const sessionId = searchParams.get('session') || 'unknown'
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    await supabaseAdmin
      .from('analytics_events')
      .insert({
        session_id: sessionId,
        event_name: 'report_viewed',
        properties: {
          assessment_id: assessment.id,
          risk_category: assessment.risk_category,
        },
        page_url: request.url,
        referrer: request.headers.get('referer'),
        ip_address: clientIP,
        user_agent: userAgent,
      })

    return NextResponse.json({
      assessment: {
        id: assessment.id,
        riskCategory: assessment.risk_category,
        complianceScore: assessment.compliance_score,
        result: assessment.report_data,
        createdAt: assessment.created_at,
        leadInfo: assessment.leads ? {
          email: assessment.leads.email,
          name: assessment.leads.name,
          company: assessment.leads.company,
        } : null,
      }
    })

  } catch (error) {
    console.error('Get assessment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}