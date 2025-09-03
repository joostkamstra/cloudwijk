import { 
  AssessmentAnswers, 
  RiskCategory, 
  LegalOutput, 
  ComplianceGaps, 
  ActionPlan, 
  AssessmentResult,
  ConformityPath,
  GapItem,
  ActionItem
} from './types'
import { articles } from './articles'

export class RiskCalculator {
  private answers: AssessmentAnswers

  constructor(answers: AssessmentAnswers) {
    this.answers = answers
  }

  public calculateRisk(): AssessmentResult {
    // Step 1: Check scope
    if (!this.isInScope()) {
      return this.createMinimalRiskResult('Buiten scope van EU AI Act')
    }

    // Step 2: Check prohibited practices
    const prohibitedCheck = this.checkProhibited()
    if (prohibitedCheck.isProhibited) {
      return this.createProhibitedResult(prohibitedCheck.reasons)
    }

    // Step 3: Check high-risk
    const highRiskCheck = this.checkHighRisk()
    if (highRiskCheck.isHighRisk) {
      return this.createHighRiskResult(highRiskCheck.category, highRiskCheck.exemptions)
    }

    // Step 4: Check limited risk
    const limitedRiskCheck = this.checkLimitedRisk()
    if (limitedRiskCheck.isLimitedRisk) {
      return this.createLimitedRiskResult(limitedRiskCheck.obligations)
    }

    // Step 5: Default to minimal risk
    return this.createMinimalRiskResult('Geen specifieke AI Act verplichtingen geïdentificeerd')
  }

  private isInScope(): boolean {
    const { isAISystem, usedInEU } = this.answers.scope
    return (isAISystem === 'yes' || isAISystem === 'unsure') && 
           (usedInEU === 'yes' || usedInEU === 'planned')
  }

  private checkProhibited(): { isProhibited: boolean; reasons: string[] } {
    const prohibited = this.answers.prohibited
    const reasons: string[] = []

    if (prohibited.subliminalTechniques) {
      reasons.push('Subliminale technieken (Art. 5.1.a)')
    }
    if (prohibited.exploitingVulnerabilities) {
      reasons.push('Exploiteren kwetsbaarheden (Art. 5.1.b)')
    }
    if (prohibited.socialScoring) {
      reasons.push('Social scoring door overheid (Art. 5.1.c)')
    }
    if (prohibited.biometricIdentification) {
      reasons.push('Realtime biometrische identificatie in publieke ruimtes (Art. 5.1.d)')
    }
    if (prohibited.facialRecognitionDatabase) {
      reasons.push('Ongerichte scraping gezichtsbeelden (Art. 5.1.f)')
    }
    if (prohibited.emotionRecognition) {
      reasons.push('Emotieherkenning op werkplek/onderwijs (Art. 5.1.g)')
    }
    if (prohibited.predictivePolicing) {
      reasons.push('Predictive policing van individuen (Art. 5.1.h)')
    }
    if (prohibited.biometricCategorisation) {
      reasons.push('Biometrische categorisatie gevoelige attributen (Art. 5.1.i)')
    }

    return { isProhibited: reasons.length > 0, reasons }
  }

  private checkHighRisk(): { isHighRisk: boolean; category?: string; exemptions: string[] } {
    const { category, context } = this.answers.highRisk
    const exemptions: string[] = []

    // Not in high-risk category
    if (category === 'none') {
      return { isHighRisk: false, exemptions }
    }

    // Check for Art. 6.3 exemptions
    const exceptions = this.answers.exceptions
    if (exceptions.narrowProcedural) {
      exemptions.push('Enge procedurele taken (Art. 6.3.a)')
    }
    if (exceptions.humanActivity) {
      exemptions.push('Verbetering menselijke activiteit (Art. 6.3.b)')
    }
    if (exceptions.patternDetection) {
      exemptions.push('Patroondetectie zonder beoordeling (Art. 6.3.c)')
    }
    if (exceptions.preparatoryTask) {
      exemptions.push('Voorbereidende taken (Art. 6.3.d)')
    }

    // Critical: if profiling is involved, exemptions don't apply
    if (exceptions.profiling && exemptions.length > 0) {
      exemptions.length = 0 // Clear exemptions
      exemptions.push('UITZONDERING NIET VAN TOEPASSING: Systeem doet aan profiling')
    }

    // If we have valid exemptions and no profiling, not high-risk
    if (exemptions.length > 0 && !exceptions.profiling) {
      return { isHighRisk: false, exemptions }
    }

    return { 
      isHighRisk: true, 
      category: this.getCategoryName(category),
      exemptions 
    }
  }

  private checkLimitedRisk(): { isLimitedRisk: boolean; obligations: string[] } {
    const limited = this.answers.limitedRisk
    const obligations: string[] = []

    if (limited.humanInteraction) {
      obligations.push('Transparantie bij menselijke interactie (Art. 50.1)')
    }
    if (limited.syntheticContent || limited.deepfakes) {
      obligations.push('Disclosure synthetische content (Art. 50.2)')
    }
    if (limited.emotionRecognition) {
      obligations.push('Transparantie emotieherkenning (Art. 50.3)')
    }
    if (limited.biometricCategorisation) {
      obligations.push('Transparantie biometrische categorisatie (Art. 50.3)')
    }

    return { isLimitedRisk: obligations.length > 0, obligations }
  }

  private createProhibitedResult(reasons: string[]): AssessmentResult {
    const legalOutput: LegalOutput = {
      riskCategory: RiskCategory.PROHIBITED,
      rationale: [
        'Dit AI-systeem valt onder verboden praktijken volgens Artikel 5 van de EU AI Act.',
        ...reasons,
        'Het in de handel brengen, in gebruik stellen of gebruik van dit systeem is verboden in de EU.'
      ],
      applicableArticles: ['Art. 5'],
      obligations: [
        'STOP gebruik van het systeem',
        'Geen in de handel brengen in EU',
        'Heroverweeg systeemontwerp',
      ],
      ceMarkingRequired: false,
      euDeclarationRequired: false,
      registrationSteps: [],
      friaRequired: false,
      gpaiDuties: [],
      postMarketDuties: [],
      timeline: 'Onmiddellijk',
      recommendations: [
        'Raadpleeg onmiddellijk een AI Act specialist',
        'Stop alle activiteiten gerelateerd aan dit systeem',
        'Evalueer alternatieve systeemontwerpen die compliant zijn',
      ]
    }

    return {
      riskCategory: RiskCategory.PROHIBITED,
      complianceScore: 0,
      legalOutput,
      gaps: this.generateProhibitedGaps(),
      actionPlan: this.generateProhibitedActionPlan(),
      estimatedCost: 'N/A - Systeem mag niet gebruikt worden',
      estimatedTimeline: 'Onmiddellijk stopzetten',
      cloudwijkSupport: [
        'Juridisch advies over alternatieve systemen',
        'AI Act compliance training',
        'Systeemherontwerp consulting',
      ]
    }
  }

  private createHighRiskResult(category?: string, exemptions: string[] = []): AssessmentResult {
    const conformityPath = this.determineConformityPath(category)
    const roleSpecificObligations = this.getRoleSpecificObligations()
    const gpaiObligations = this.getGPAIObligations()
    
    const legalOutput: LegalOutput = {
      riskCategory: RiskCategory.HIGH_RISK,
      rationale: [
        `AI-systeem classificatie: Hoog-risico (Annex III - ${category})`,
        exemptions.length > 0 ? `Onderzochte uitzonderingen: ${exemptions.join(', ')}` : '',
        'Volledige compliance met Hoofdstuk 2 (Art. 8-15) vereist',
      ].filter(Boolean),
      applicableArticles: [
        'Art. 6 (High-risk AI systems)',
        'Art. 8-15 (Obligations for providers)',
        'Art. 16 (Obligations for importers)', 
        'Art. 23-24 (Distributor obligations)',
        'Art. 25-27 (Deployer obligations)',
        'Art. 43 (Conformity assessment)',
        'Art. 47-49 (CE marking and registration)',
      ],
      obligations: [
        'Risk management systeem (Art. 9)',
        'Data governance procedures (Art. 10)',
        'Technische documentatie (Art. 11 + Annex IV)',
        'Record keeping (Art. 12)',
        'Transparantie voor users (Art. 13)',
        'Human oversight maatregelen (Art. 14)',
        'Accuracy, robustness, cybersecurity (Art. 15)',
        'Quality management systeem (Art. 17)',
        ...roleSpecificObligations,
        ...gpaiObligations,
      ],
      conformityPath,
      ceMarkingRequired: true,
      euDeclarationRequired: true,
      registrationSteps: [
        'Registratie in EU database (Art. 49)',
        'Notificatie van significante wijzigingen',
        'Jaarlijkse updates van informatie',
      ],
      friaRequired: this.answers.roles.actor === 'deployer' && this.answers.roles.publicAuthority,
      gpaiDuties: gpaiObligations,
      postMarketDuties: [
        'Post-market monitoring plan (Art. 72)',
        'Serious incident reporting (Art. 73)',
        'Market surveillance coöperatie',
      ],
      timeline: '12-18 maanden voor volledige compliance',
      exemptions: exemptions.length > 0 ? exemptions : undefined,
      recommendations: [
        'Begin met risk assessment en gap analyse',
        'Implementeer quality management systeem',
        'Ontwikkel technische documentatie',
        'Plan conformity assessment procedure',
      ]
    }

    const complianceScore = this.calculateComplianceScore()

    return {
      riskCategory: RiskCategory.HIGH_RISK,
      complianceScore,
      legalOutput,
      gaps: this.generateHighRiskGaps(),
      actionPlan: this.generateHighRiskActionPlan(),
      estimatedCost: '€50.000 - €200.000 (afhankelijk van systeemcomplexiteit)',
      estimatedTimeline: '12-18 maanden voor volledige compliance',
      cloudwijkSupport: [
        'AI Governance Suite implementatie',
        'Compliance project management',
        'Conformity assessment voorbereiding',
        'Technische documentatie ondersteuning',
      ]
    }
  }

  private createLimitedRiskResult(obligations: string[]): AssessmentResult {
    const legalOutput: LegalOutput = {
      riskCategory: RiskCategory.LIMITED_RISK,
      rationale: [
        'AI-systeem heeft transparantieverplichtingen (Art. 50)',
        ...obligations,
        'Beperkte compliance-eisen gericht op transparantie'
      ],
      applicableArticles: ['Art. 50'],
      obligations,
      ceMarkingRequired: false,
      euDeclarationRequired: false,
      registrationSteps: [],
      friaRequired: false,
      gpaiDuties: this.getGPAIObligations(),
      postMarketDuties: [],
      timeline: '1-3 maanden voor implementatie',
      recommendations: [
        'Implementeer transparantie-eisen',
        'Update gebruikersinterface met disclosures',
        'Documenteer transparantiemaatregelen',
      ]
    }

    return {
      riskCategory: RiskCategory.LIMITED_RISK,
      complianceScore: this.calculateComplianceScore(),
      legalOutput,
      gaps: this.generateLimitedRiskGaps(),
      actionPlan: this.generateLimitedRiskActionPlan(),
      estimatedCost: '€5.000 - €15.000',
      estimatedTimeline: '1-3 maanden',
      cloudwijkSupport: [
        'Transparantie-eisen implementatie',
        'UI/UX review voor compliance',
        'Documentatie ondersteuning',
      ]
    }
  }

  private createMinimalRiskResult(reason: string): AssessmentResult {
    const legalOutput: LegalOutput = {
      riskCategory: RiskCategory.MINIMAL_RISK,
      rationale: [reason, 'Geen specifieke AI Act verplichtingen'],
      applicableArticles: [],
      obligations: ['Vrijwillige toepassing van AI ethics guidelines'],
      ceMarkingRequired: false,
      euDeclarationRequired: false,
      registrationSteps: [],
      friaRequired: false,
      gpaiDuties: this.getGPAIObligations(),
      postMarketDuties: [],
      timeline: 'N/A',
      recommendations: [
        'Overweeg vrijwillige AI ethics guidelines',
        'Monitor voor toekomstige regulatory wijzigingen',
        'Documenteer AI governance praktijken',
      ]
    }

    return {
      riskCategory: RiskCategory.MINIMAL_RISK,
      complianceScore: 95, // High score as no compliance required
      legalOutput,
      gaps: { critical: [], high: [], medium: [] },
      actionPlan: [],
      estimatedCost: 'Geen compliance kosten',
      estimatedTimeline: 'Geen actie vereist',
      cloudwijkSupport: [
        'AI ethics guidelines implementatie',
        'Future-proofing advies',
        'Voluntary compliance ondersteuning',
      ]
    }
  }

  private determineConformityPath(category?: string): ConformityPath {
    // Annex VII (third-party) for specific categories
    const annexVIICategories = ['biometrics', 'lawEnforcement', 'justice']
    if (category && annexVIICategories.includes(category)) {
      return ConformityPath.ANNEX_VII
    }
    // Default to Annex VI (internal assessment)
    return ConformityPath.ANNEX_VI
  }

  private getRoleSpecificObligations(): string[] {
    const role = this.answers.roles.actor
    const obligations: string[] = []

    switch (role) {
      case 'provider':
        obligations.push(
          'Volledige compliance met Art. 8-15',
          'Conformity assessment (Art. 43)',
          'CE marking en EU DoC (Art. 47-48)',
          'Post-market monitoring (Art. 72-73)'
        )
        break
      case 'importer':
        obligations.push(
          'Verificatie provider compliance (Art. 16)',
          'EU DoC en CE marking controle',
          'Registratie en labeling (Art. 16)'
        )
        break
      case 'distributor':
        obligations.push(
          'Due diligence verificatie (Art. 24)',
          'Coöperatie market surveillance',
          'Informatie aan downstream actors'
        )
        break
      case 'deployer':
        obligations.push(
          'Implementatie input data controls (Art. 25)',
          'Human oversight implementatie (Art. 26)',
          'Monitoring voor bias en discriminatie'
        )
        if (this.answers.roles.publicAuthority) {
          obligations.push('FRIA uitvoering (Art. 27)')
        }
        break
    }

    return obligations
  }

  private getGPAIObligations(): string[] {
    if (!this.answers.roles.gpaiProvider || !this.answers.gpai) {
      return []
    }

    const obligations = [
      'GPAI model documentatie (Art. 53)',
      'Informatie aan downstream providers',
      'Copyright compliance (Art. 53.1.c)',
    ]

    if (this.answers.gpai.computeThreshold) {
      obligations.push(
        'Model evaluation (Art. 55.1.a)',
        'Adversarial testing (Art. 55.1.b)',
        'Systemic risk assessment (Art. 55.1.c)',
        'Incident tracking en reporting (Art. 55.1.d)',
        'Cybersecurity safeguards (Art. 55.1.e)'
      )
    }

    return obligations
  }

  private calculateComplianceScore(): number {
    const compliance = this.answers.compliance
    const totalQuestions = 9
    let implementedCount = 0

    if (compliance.riskManagement) implementedCount++
    if (compliance.dataGovernance) implementedCount++
    if (compliance.documentation) implementedCount++
    if (compliance.humanOversight) implementedCount++
    if (compliance.accuracyRobustness) implementedCount++
    if (compliance.qualityManagement) implementedCount++
    if (compliance.conformityAssessment) implementedCount++
    if (compliance.ceMarking) implementedCount++
    if (compliance.registration) implementedCount++

    return Math.round((implementedCount / totalQuestions) * 100)
  }

  private generateProhibitedGaps(): ComplianceGaps {
    return {
      critical: [
        {
          id: 'prohibited-usage',
          title: 'Gebruik van verboden AI-systeem',
          description: 'Het systeem valt onder verboden praktijken volgens Art. 5',
          article: 'Art. 5',
          priority: 'critical',
          effort: 'System redesign',
          timeline: 'Onmiddellijk',
          resources: ['Legal counsel', 'AI system architects'],
          solutions: ['Stop usage', 'System redesign', 'Alternative approach']
        }
      ],
      high: [],
      medium: []
    }
  }

  private generateHighRiskGaps(): ComplianceGaps {
    const gaps: ComplianceGaps = { critical: [], high: [], medium: [] }
    const compliance = this.answers.compliance

    if (!compliance.riskManagement) {
      gaps.critical.push({
        id: 'risk-management',
        title: 'Risk Management Systeem',
        description: 'Implementeer systematisch risk management conform Art. 9',
        article: 'Art. 9',
        priority: 'critical',
        effort: '3-6 maanden',
        timeline: 'Pre-market',
        resources: ['Risk manager', 'Technical team', 'Legal counsel'],
        solutions: ['Risk framework implementatie', 'Cloudwijk Governance Suite']
      })
    }

    if (!compliance.qualityManagement) {
      gaps.critical.push({
        id: 'quality-management',
        title: 'Quality Management Systeem',
        description: 'Implementeer QMS conform Art. 17',
        article: 'Art. 17',
        priority: 'critical',
        effort: '4-8 maanden',
        timeline: 'Pre-market',
        resources: ['QA team', 'Process manager'],
        solutions: ['ISO 13485 based QMS', 'Cloudwijk compliance platform']
      })
    }

    if (!compliance.documentation) {
      gaps.high.push({
        id: 'technical-documentation',
        title: 'Technische Documentatie',
        description: 'Volledige documentatie conform Annex IV',
        article: 'Art. 11 + Annex IV',
        priority: 'high',
        effort: '2-4 maanden',
        timeline: 'Pre-market',
        resources: ['Technical writers', 'Engineering team'],
        solutions: ['Documentation templates', 'Automated documentation tools']
      })
    }

    return gaps
  }

  private generateLimitedRiskGaps(): ComplianceGaps {
    return {
      critical: [],
      high: [
        {
          id: 'transparency',
          title: 'Transparantie-eisen',
          description: 'Implementeer transparantie conform Art. 50',
          article: 'Art. 50',
          priority: 'high',
          effort: '2-4 weken',
          timeline: '1-3 maanden',
          resources: ['UX designer', 'Developer'],
          solutions: ['UI updates', 'Disclosure implementation']
        }
      ],
      medium: []
    }
  }

  private generateProhibitedActionPlan(): ActionPlan[] {
    return [
      {
        phase: 'Immediate Action',
        timeline: '0-30 days',
        actions: [
          {
            id: 'stop-system',
            title: 'Stop systeem gebruik',
            description: 'Onmiddellijk stoppen van alle activiteiten',
            owner: 'Management',
            effort: '1 day',
            dependencies: [],
            deliverables: ['Stop confirmation', 'Impact assessment']
          }
        ]
      }
    ]
  }

  private generateHighRiskActionPlan(): ActionPlan[] {
    return [
      {
        phase: 'Foundation (Maanden 1-3)',
        timeline: '0-3 months',
        actions: [
          {
            id: 'gap-analysis',
            title: 'Compliance gap analyse',
            description: 'Volledige assessment van huidige staat vs AI Act eisen',
            owner: 'Compliance Officer',
            effort: '2-4 weken',
            dependencies: [],
            deliverables: ['Gap analysis report', 'Implementation roadmap']
          },
          {
            id: 'qms-setup',
            title: 'Quality Management Systeem opzet',
            description: 'Implementatie van QMS conform Art. 17',
            owner: 'Quality Manager',
            effort: '6-8 weken',
            dependencies: ['gap-analysis'],
            deliverables: ['QMS procedures', 'Process documentation']
          }
        ]
      },
      {
        phase: 'Implementation (Maanden 4-12)',
        timeline: '3-12 months',
        actions: [
          {
            id: 'risk-management',
            title: 'Risk Management implementatie',
            description: 'Systematisch risk management conform Art. 9',
            owner: 'Risk Manager',
            effort: '3-4 maanden',
            dependencies: ['qms-setup'],
            deliverables: ['Risk management procedures', 'Risk register']
          },
          {
            id: 'technical-docs',
            title: 'Technische documentatie',
            description: 'Volledige documentatie conform Annex IV',
            owner: 'Technical Lead',
            effort: '2-3 maanden',
            dependencies: ['risk-management'],
            deliverables: ['Technical documentation package', 'Annex IV compliance']
          }
        ]
      }
    ]
  }

  private generateLimitedRiskActionPlan(): ActionPlan[] {
    return [
      {
        phase: 'Implementation',
        timeline: '1-3 months',
        actions: [
          {
            id: 'transparency-implementation',
            title: 'Transparantie-eisen implementeren',
            description: 'UI updates en disclosure implementatie',
            owner: 'Product Owner',
            effort: '4-6 weken',
            dependencies: [],
            deliverables: ['Updated UI', 'Disclosure documentation']
          }
        ]
      }
    ]
  }

  private getCategoryName(category: string): string {
    const names: Record<string, string> = {
      biometrics: 'Biometrische identificatie',
      criticalInfrastructure: 'Kritieke infrastructuur',
      education: 'Onderwijs en training',
      employment: 'Werkgelegenheid en HR',
      essentialServices: 'Essentiële diensten',
      lawEnforcement: 'Rechtshandhaving',
      migration: 'Migratie en grenzen',
      justice: 'Rechtspraak',
    }
    return names[category] || category
  }
}