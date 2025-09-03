import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/db/supabase'
import { sanitizeString } from '@/lib/utils'

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmailSchema = z.object({
  type: z.enum(['assessment_report', 'contact_form', 'welcome']),
  recipient: z.string().email(),
  data: z.record(z.any()),
  assessmentId: z.string().optional(),
  leadId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, recipient, data, assessmentId, leadId } = sendEmailSchema.parse(body)

    let emailContent: { subject: string; html: string; text: string }

    switch (type) {
      case 'assessment_report':
        emailContent = generateAssessmentReportEmail(data)
        break
      case 'contact_form':
        emailContent = generateContactFormEmail(data)
        break
      case 'welcome':
        emailContent = generateWelcomeEmail(data)
        break
      default:
        throw new Error('Unknown email type')
    }

    // Send email using Resend
    const from = process.env.RESEND_FROM || 'Cloudwijk <noreply@cloudwijk.eu>'
    
    const { data: emailData, error: emailError } = await resend.emails.send({
      from,
      to: [recipient],
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    })

    if (emailError) {
      console.error('Resend error:', emailError)
      throw new Error('Failed to send email')
    }

    // Log email event
    await supabaseAdmin
      .from('email_events')
      .insert({
        lead_id: leadId || null,
        assessment_id: assessmentId || null,
        event_type: 'sent',
        email_type: type,
        recipient: recipient,
        subject: emailContent.subject,
        metadata: { 
          resend_id: emailData?.id,
          data: data 
        },
        status: 'sent',
        external_id: emailData?.id,
      })

    // Track analytics
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    const sessionId = request.headers.get('x-session-id') || 'unknown'

    await supabaseAdmin
      .from('analytics_events')
      .insert({
        session_id: sessionId,
        event_name: 'email_sent',
        properties: {
          email_type: type,
          recipient_domain: recipient.split('@')[1],
          assessment_id: assessmentId,
          lead_id: leadId,
        },
        page_url: request.url,
        referrer: request.headers.get('referer'),
        ip_address: clientIP,
        user_agent: request.headers.get('user-agent') || 'unknown',
      })

    return NextResponse.json({
      success: true,
      emailId: emailData?.id,
      message: 'Email sent successfully',
    })

  } catch (error) {
    console.error('Email sending error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

function generateAssessmentReportEmail(data: any): { subject: string; html: string; text: string } {
  const { name, riskCategory, complianceScore, reportUrl, assessmentId } = data
  
  const riskLevelText: Record<string, string> = {
    'PROHIBITED': 'Verboden Systeem',
    'HIGH_RISK': 'Hoog-risico Systeem',
    'LIMITED_RISK': 'Beperkt Risico',
    'MINIMAL_RISK': 'Minimaal Risico'
  }
  const riskText = riskLevelText[riskCategory] || riskCategory

  const subject = 'Uw AI Act Compliance Rapport is klaar'
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #6b7280; }
        .button { display: inline-block; background: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        .risk-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
        .risk-prohibited { background: #fee2e2; color: #dc2626; }
        .risk-high { background: #fed7aa; color: #ea580c; }
        .risk-limited { background: #fef3c7; color: #d97706; }
        .risk-minimal { background: #dcfce7; color: #16a34a; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛡️ Cloudwijk</h1>
          <h2>Uw AI Act Compliance Rapport</h2>
        </div>
        
        <div class="content">
          <p>Hallo ${name ? sanitizeString(name) : 'daar'},</p>
          
          <p>Bedankt voor het uitvoeren van onze AI Act compliance assessment. Uw persoonlijke rapport is nu beschikbaar!</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div class="risk-badge risk-${riskCategory.toLowerCase().replace('_', '-')}">
              Classificatie: ${riskText}
            </div>
            <div style="font-size: 24px; font-weight: bold; color: #1e3a8a; margin: 10px 0;">
              Compliance Score: ${complianceScore}/100
            </div>
          </div>
          
          <h3>Wat kunt u nu doen?</h3>
          <ul>
            <li><strong>Bekijk uw rapport online</strong> - Volledige analyse met concrete acties</li>
            <li><strong>Download het PDF</strong> - Voor delen met uw team of management</li>
            <li><strong>Plan implementatie</strong> - Wij helpen graag met de volgende stappen</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${reportUrl}" class="button">📊 Bekijk Rapport Online</a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/report/generate?id=${assessmentId}" class="button">📄 Download PDF</a>
          </div>
          
          <p><strong>Hebt u vragen?</strong><br>
          Neem gerust contact op voor een persoonlijk gesprek over uw AI Act compliance strategy.</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="mailto:hallo@cloudwijk.eu" class="button">✉️ Neem Contact Op</a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Disclaimer:</strong> Dit rapport dient als educatief hulpmiddel en vervangt geen juridisch advies. Voor definitieve compliance-beslissingen adviseren wij een AI Act specialist te raadplegen.</p>
          
          <p>© 2024 Cloudwijk - EU Sovereign AI Platform<br>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy">Privacy</a> | 
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/terms">Voorwaarden</a> | 
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/gdpr">GDPR</a></p>
        </div>
      </div>
    </body>
    </html>
  `
  
  const text = `
Hallo ${name ? sanitizeString(name) : 'daar'},

Bedankt voor het uitvoeren van onze AI Act compliance assessment!

Uw resultaat:
- Classificatie: ${riskText}  
- Compliance Score: ${complianceScore}/100

Bekijk uw volledige rapport: ${reportUrl}
Download PDF: ${process.env.NEXT_PUBLIC_APP_URL}/api/report/generate?id=${assessmentId}

Hebt u vragen? Mail ons op hallo@cloudwijk.eu

Met vriendelijke groet,
Het Cloudwijk team

---
Dit rapport dient als educatief hulpmiddel en vervangt geen juridisch advies.
© 2024 Cloudwijk - EU Sovereign AI Platform
  `

  return { subject, html, text }
}

function generateContactFormEmail(data: any): { subject: string; html: string; text: string } {
  const { name, email, company, message } = data
  
  const subject = `Nieuwe contactaanvraag van ${sanitizeString(name)}`
  
  const html = `
    <h2>Nieuwe contactaanvraag</h2>
    <p><strong>Naam:</strong> ${sanitizeString(name)}</p>
    <p><strong>E-mail:</strong> ${sanitizeString(email)}</p>
    ${company ? `<p><strong>Bedrijf:</strong> ${sanitizeString(company)}</p>` : ''}
    <p><strong>Bericht:</strong></p>
    <p>${sanitizeString(message).replace(/\n/g, '<br>')}</p>
  `
  
  const text = `
Nieuwe contactaanvraag

Naam: ${sanitizeString(name)}
E-mail: ${sanitizeString(email)}
${company ? `Bedrijf: ${sanitizeString(company)}` : ''}

Bericht:
${sanitizeString(message)}
  `

  return { subject, html, text }
}

function generateWelcomeEmail(data: any): { subject: string; html: string; text: string } {
  const { name } = data
  
  const subject = 'Welkom bij Cloudwijk - Uw AI Act journey start hier'
  
  const html = `
    <h1>Welkom bij Cloudwijk! 🎉</h1>
    <p>Hallo ${name ? sanitizeString(name) : 'daar'},</p>
    <p>Welkom bij de Cloudwijk community! U hebt de eerste stap gezet naar EU AI Act compliance.</p>
    <p>In de komende dagen ontvangt u waardevole tips en updates over AI governance in Europa.</p>
  `
  
  const text = `
Welkom bij Cloudwijk!

Hallo ${name ? sanitizeString(name) : 'daar'},

Welkom bij de Cloudwijk community! U hebt de eerste stap gezet naar EU AI Act compliance.

In de komende dagen ontvangt u waardevole tips en updates over AI governance in Europa.

Met vriendelijke groet,
Het Cloudwijk team
  `

  return { subject, html, text }
}