import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/db/supabase'
import { PDFReportGenerator } from '@/lib/reports/pdf-generator'

const generateReportSchema = z.object({
  assessmentId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assessmentId } = generateReportSchema.parse(body)

    // Get assessment data with lead info
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
      .eq('id', assessmentId)
      .single()

    if (error || !assessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      )
    }

    // Generate PDF report
    const generator = new PDFReportGenerator()
    const reportData = {
      assessmentResult: assessment.report_data,
      leadInfo: {
        email: assessment.leads?.email || 'unknown',
        name: assessment.leads?.name,
        company: assessment.leads?.company,
      },
      reportId: assessment.id,
      generatedAt: new Date(),
    }

    const pdfBuffer = generator.generateReport(reportData)

    // Track generation event
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    const sessionId = request.headers.get('x-session-id') || 'unknown'

    await supabaseAdmin
      .from('analytics_events')
      .insert({
        session_id: sessionId,
        event_name: 'report_generated',
        properties: {
          assessment_id: assessmentId,
          format: 'pdf',
          risk_category: assessment.risk_category,
        },
        page_url: request.url,
        referrer: request.headers.get('referer'),
        ip_address: clientIP,
        user_agent: request.headers.get('user-agent') || 'unknown',
      })

    // Set appropriate headers for PDF download
    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    headers.set('Content-Disposition', `attachment; filename="cloudwijk-ai-act-rapport-${assessmentId.slice(0, 8)}.pdf"`)
    headers.set('Cache-Control', 'private, no-cache')

    return new NextResponse(pdfBuffer, {
      headers,
      status: 200,
    })

  } catch (error) {
    console.error('Report generation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    )
  }
}

// GET - Generate and download report by assessment ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const assessmentId = searchParams.get('id')

    if (!assessmentId) {
      return NextResponse.json(
        { error: 'Assessment ID is required' },
        { status: 400 }
      )
    }

    // Reuse the same logic as POST
    const postRequest = new NextRequest(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify({ assessmentId }),
    })

    return this.POST(postRequest)

  } catch (error) {
    console.error('Report GET error:', error)
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    )
  }
}