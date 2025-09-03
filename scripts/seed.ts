import { supabaseAdmin } from '@/lib/db/supabase'

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // Create a test lead for development
    const { data: testLead, error: leadError } = await supabaseAdmin
      .from('leads')
      .upsert({
        email: 'test@cloudwijk.eu',
        name: 'Test User',
        company: 'Cloudwijk',
        role: 'Developer',
        industry: 'Technology',
        company_size: '1-10',
        timeline: '0-3 months',
        interests: ['AI Act Compliance', 'GDPR'],
        marketing_consent: true,
        lead_score: 85,
        source: 'website'
      }, {
        onConflict: 'email'
      })
      .select()
      .single()

    if (leadError) {
      console.error('❌ Error creating test lead:', leadError)
    } else {
      console.log('✅ Test lead created:', testLead?.email)
    }

    // Create a sample assessment
    if (testLead) {
      const { data: assessment, error: assessmentError } = await supabaseAdmin
        .from('assessments')
        .upsert({
          lead_id: testLead.id,
          session_id: 'demo-session-123',
          risk_category: 'HIGH_RISK',
          compliance_score: 65,
          answers: {
            scope: { isAISystem: true, usedInEU: true },
            prohibited: { socialScoring: false, subliminalManipulation: false },
            highRisk: { category: 'biometric_identification', context: 'law_enforcement' },
            roles: { actor: 'provider', publicDeployer: false }
          },
          report_data: {
            riskLevel: 'HIGH_RISK',
            score: 65,
            obligations: ['CE marking', 'EU Declaration of Conformity', 'Registration'],
            timeline: '12-18 months'
          },
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'session_id'
        })

      if (assessmentError) {
        console.error('❌ Error creating sample assessment:', assessmentError)
      } else {
        console.log('✅ Sample assessment created')
      }
    }

    console.log('🎉 Database seeded successfully!')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  seed()
}