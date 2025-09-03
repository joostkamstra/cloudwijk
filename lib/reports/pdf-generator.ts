import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { AssessmentResult, RiskCategory } from '@/lib/ai-act/types'
import { formatDate } from '@/lib/utils'

interface ReportData {
  assessmentResult: AssessmentResult
  leadInfo: {
    name?: string
    email: string
    company?: string
  }
  reportId: string
  generatedAt: Date
}

export class PDFReportGenerator {
  private doc: jsPDF
  private pageWidth: number
  private pageHeight: number
  private margin: number
  private currentY: number
  private primaryColor: string = '#1e3a8a'
  private secondaryColor: string = '#3b82f6'
  private grayColor: string = '#6b7280'

  constructor() {
    this.doc = new jsPDF()
    this.pageWidth = this.doc.internal.pageSize.getWidth()
    this.pageHeight = this.doc.internal.pageSize.getHeight()
    this.margin = 20
    this.currentY = this.margin
  }

  public generateReport(data: ReportData): Uint8Array {
    this.addHeader(data)
    this.addExecutiveSummary(data)
    this.addRiskAssessment(data)
    this.addComplianceGaps(data)
    this.addActionPlan(data)
    this.addConformityRequirements(data)
    this.addRolesAndResponsibilities(data)
    this.addTimeline(data)
    this.addCloudwijkSupport(data)
    this.addAppendices(data)
    this.addFooterToAllPages(data)

    return this.doc.output('arraybuffer') as Uint8Array
  }

  private addHeader(data: ReportData): void {
    // Logo area (placeholder)
    this.doc.setFillColor(30, 58, 138) // cloudwijk blue
    this.doc.rect(this.margin, this.margin, 40, 15, 'F')
    this.doc.setTextColor(255, 255, 255)
    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('CLOUDWIJK', this.margin + 2, this.margin + 10)

    // Report title
    this.doc.setTextColor(0, 0, 0)
    this.doc.setFontSize(24)
    this.doc.setFont('helvetica', 'bold')
    this.currentY = this.margin + 30
    this.doc.text('EU AI Act Compliance Rapport', this.margin, this.currentY)

    // Report details
    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'normal')
    this.currentY += 15
    this.doc.text(`Rapport ID: ${data.reportId}`, this.margin, this.currentY)
    this.currentY += 8
    this.doc.text(`Gegenereerd: ${formatDate(data.generatedAt)}`, this.margin, this.currentY)
    this.currentY += 8
    
    if (data.leadInfo.name) {
      this.doc.text(`Voor: ${data.leadInfo.name}`, this.margin, this.currentY)
      this.currentY += 8
    }
    
    if (data.leadInfo.company) {
      this.doc.text(`Organisatie: ${data.leadInfo.company}`, this.margin, this.currentY)
      this.currentY += 8
    }

    this.currentY += 10
  }

  private addExecutiveSummary(data: ReportData): void {
    this.addSectionTitle('Executive Summary')
    
    const { assessmentResult } = data
    const riskLevel = this.getRiskLevelText(assessmentResult.riskCategory)
    const riskColor = this.getRiskColor(assessmentResult.riskCategory)
    
    // Risk level box
    this.doc.setFillColor(...this.hexToRgb(riskColor))
    this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 25, 'F')
    
    this.doc.setTextColor(255, 255, 255)
    this.doc.setFontSize(16)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text(`Risico Classificatie: ${riskLevel}`, this.margin + 5, this.currentY + 10)
    
    this.doc.setFontSize(14)
    this.doc.text(`Compliance Score: ${assessmentResult.complianceScore}/100`, this.margin + 5, this.currentY + 20)
    
    this.currentY += 35
    this.doc.setTextColor(0, 0, 0)

    // Key findings
    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Belangrijkste bevindingen:', this.margin, this.currentY)
    this.currentY += 10

    this.doc.setFont('helvetica', 'normal')
    const findings = assessmentResult.legalOutput.rationale
    findings.forEach(finding => {
      this.addBulletPoint(finding)
    })

    this.currentY += 10

    // Top 3 actions
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Top 3 aanbevolen acties:', this.margin, this.currentY)
    this.currentY += 10

    const topActions = [
      ...assessmentResult.gaps.critical.slice(0, 2),
      ...assessmentResult.gaps.high.slice(0, 1)
    ].slice(0, 3)

    this.doc.setFont('helvetica', 'normal')
    topActions.forEach((gap, index) => {
      this.addBulletPoint(`${index + 1}. ${gap.title} (${gap.timeline})`)
    })

    // Estimated timeline and cost
    this.currentY += 10
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Geschatte implementatie:', this.margin, this.currentY)
    this.currentY += 10

    this.doc.setFont('helvetica', 'normal')
    this.addBulletPoint(`Tijdslijn: ${assessmentResult.estimatedTimeline}`)
    this.addBulletPoint(`Kosten: ${assessmentResult.estimatedCost}`)

    this.currentY += 15
  }

  private addRiskAssessment(data: ReportData): void {
    this.checkPageBreak(60)
    this.addSectionTitle('Risk Assessment')
    
    const { legalOutput } = data.assessmentResult

    // Risk category explanation
    this.doc.setFontSize(12)
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Classificatie rationale:', this.margin, this.currentY)
    this.currentY += 10

    this.doc.setFont('helvetica', 'normal')
    legalOutput.rationale.forEach(reason => {
      this.addBulletPoint(reason)
    })

    this.currentY += 10

    // Applicable articles
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Toepasselijke artikelen:', this.margin, this.currentY)
    this.currentY += 10

    this.doc.setFont('helvetica', 'normal')
    legalOutput.applicableArticles.forEach(article => {
      this.addBulletPoint(article)
    })

    // Obligations table
    if (legalOutput.obligations.length > 0) {
      this.currentY += 15
      this.doc.setFont('helvetica', 'bold')
      this.doc.text('Verplichtingen overzicht:', this.margin, this.currentY)
      this.currentY += 10

      const obligations = legalOutput.obligations.map((obligation, index) => [
        (index + 1).toString(),
        obligation,
        'Verplicht'
      ])

      autoTable(this.doc, {
        startY: this.currentY,
        head: [['#', 'Verplichting', 'Status']],
        body: obligations,
        theme: 'striped',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [30, 58, 138] },
        margin: { left: this.margin, right: this.margin },
      })

      this.currentY = (this.doc as any).lastAutoTable.finalY + 15
    }
  }

  private addComplianceGaps(data: ReportData): void {
    this.checkPageBreak(80)
    this.addSectionTitle('Compliance Gap Analyse')

    const { gaps } = data.assessmentResult
    
    // Critical gaps
    if (gaps.critical.length > 0) {
      this.addSubsectionTitle('Kritieke Gaps', '#dc2626')
      this.addGapTable(gaps.critical)
    }

    // High priority gaps  
    if (gaps.high.length > 0) {
      this.addSubsectionTitle('Hoge Prioriteit Gaps', '#ea580c')
      this.addGapTable(gaps.high)
    }

    // Medium priority gaps
    if (gaps.medium.length > 0) {
      this.addSubsectionTitle('Medium Prioriteit Gaps', '#d97706')
      this.addGapTable(gaps.medium)
    }
  }

  private addGapTable(gaps: any[]): void {
    const gapData = gaps.map(gap => [
      gap.title,
      gap.article,
      gap.timeline,
      gap.effort
    ])

    autoTable(this.doc, {
      startY: this.currentY,
      head: [['Gap', 'Artikel', 'Tijdslijn', 'Effort']],
      body: gapData,
      theme: 'striped',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [30, 58, 138] },
      margin: { left: this.margin, right: this.margin },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 30 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 }
      }
    })

    this.currentY = (this.doc as any).lastAutoTable.finalY + 15
  }

  private addActionPlan(data: ReportData): void {
    this.checkPageBreak(80)
    this.addSectionTitle('Implementatie Roadmap')

    data.assessmentResult.actionPlan.forEach(phase => {
      this.checkPageBreak(40)
      
      this.doc.setFontSize(14)
      this.doc.setFont('helvetica', 'bold')
      this.doc.setTextColor(...this.hexToRgb(this.primaryColor))
      this.doc.text(`${phase.phase} (${phase.timeline})`, this.margin, this.currentY)
      this.currentY += 15
      this.doc.setTextColor(0, 0, 0)

      const actionData = phase.actions.map((action, index) => [
        (index + 1).toString(),
        action.title,
        action.owner,
        action.effort,
        action.deliverables.join(', ')
      ])

      autoTable(this.doc, {
        startY: this.currentY,
        head: [['#', 'Actie', 'Eigenaar', 'Effort', 'Deliverables']],
        body: actionData,
        theme: 'striped',
        styles: { fontSize: 9 },
        headStyles: { fillColor: [30, 58, 138] },
        margin: { left: this.margin, right: this.margin },
      })

      this.currentY = (this.doc as any).lastAutoTable.finalY + 15
    })
  }

  private addConformityRequirements(data: ReportData): void {
    this.checkPageBreak(60)
    this.addSectionTitle('Conformiteit & Registratie')

    const { legalOutput } = data.assessmentResult

    if (legalOutput.conformityPath) {
      this.doc.setFontSize(12)
      this.doc.setFont('helvetica', 'bold')
      this.doc.text('Conformity Assessment Procedure:', this.margin, this.currentY)
      this.currentY += 10

      this.doc.setFont('helvetica', 'normal')
      const pathText = legalOutput.conformityPath === 'ANNEX_VI' 
        ? 'Annex VI - Internal assessment' 
        : 'Annex VII - Third-party assessment'
      this.addBulletPoint(pathText)
      this.currentY += 10
    }

    if (legalOutput.ceMarkingRequired) {
      this.doc.setFont('helvetica', 'bold')
      this.doc.text('CE Marking Vereisten:', this.margin, this.currentY)
      this.currentY += 10

      this.doc.setFont('helvetica', 'normal')
      this.addBulletPoint('CE-markering verplicht voor marktintroductie')
      this.addBulletPoint('EU Declaration of Conformity opstellen')
      this.addBulletPoint('Technische documentatie beschikbaar houden')
      this.currentY += 10
    }

    if (legalOutput.registrationSteps.length > 0) {
      this.doc.setFont('helvetica', 'bold')
      this.doc.text('Registratie Stappen:', this.margin, this.currentY)
      this.currentY += 10

      this.doc.setFont('helvetica', 'normal')
      legalOutput.registrationSteps.forEach(step => {
        this.addBulletPoint(step)
      })
    }
  }

  private addRolesAndResponsibilities(data: ReportData): void {
    this.checkPageBreak(40)
    this.addSectionTitle('Rollen & Verantwoordelijkheden')

    // This would be populated based on the role analysis
    this.doc.setFontSize(11)
    this.doc.text('Gebaseerd op uw rol in de AI-waardeketen zijn de volgende', this.margin, this.currentY)
    this.currentY += 6
    this.doc.text('verantwoordelijkheden van toepassing:', this.margin, this.currentY)
    this.currentY += 15

    // Add role-specific obligations
    const roleObligations = [
      'Provider verplichtingen (Art. 16-17)',
      'Deployer verantwoordelijkheden (Art. 25-27)',
      'Post-market monitoring (Art. 72-73)',
    ]

    roleObligations.forEach(obligation => {
      this.addBulletPoint(obligation)
    })
  }

  private addTimeline(data: ReportData): void {
    this.checkPageBreak(60)
    this.addSectionTitle('Implementatie Tijdslijn')

    // Timeline visualization (simplified)
    const milestones = [
      { phase: '0-3 maanden', title: 'Foundation & Gap Analysis' },
      { phase: '3-6 maanden', title: 'Core Implementation' },
      { phase: '6-12 maanden', title: 'Testing & Documentation' },
      { phase: '12-18 maanden', title: 'Certification & Go-live' }
    ]

    milestones.forEach((milestone, index) => {
      this.doc.setFillColor(59, 130, 246)
      this.doc.circle(this.margin + 10, this.currentY + 5, 3, 'F')
      
      this.doc.setFont('helvetica', 'bold')
      this.doc.text(milestone.phase, this.margin + 20, this.currentY + 3)
      
      this.doc.setFont('helvetica', 'normal')
      this.doc.text(milestone.title, this.margin + 20, this.currentY + 10)
      
      if (index < milestones.length - 1) {
        this.doc.setDrawColor(59, 130, 246)
        this.doc.line(this.margin + 10, this.currentY + 8, this.margin + 10, this.currentY + 20)
      }
      
      this.currentY += 25
    })
  }

  private addCloudwijkSupport(data: ReportData): void {
    this.checkPageBreak(60)
    this.addSectionTitle('Hoe Cloudwijk Helpt')

    this.doc.setFontSize(11)
    this.doc.text('Cloudwijk ondersteunt uw AI Act compliance implementatie met:', this.margin, this.currentY)
    this.currentY += 15

    data.assessmentResult.cloudwijkSupport.forEach(support => {
      this.addBulletPoint(support)
    })

    this.currentY += 15

    // Contact information
    this.doc.setFont('helvetica', 'bold')
    this.doc.text('Contact voor ondersteuning:', this.margin, this.currentY)
    this.currentY += 10

    this.doc.setFont('helvetica', 'normal')
    this.addBulletPoint('E-mail: hallo@cloudwijk.eu')
    this.addBulletPoint('Website: https://cloudwijk.eu')
    this.addBulletPoint('Platform: Start gratis op cloudwijk.eu/ai-act-checker')
  }

  private addAppendices(data: ReportData): void {
    this.addPageBreak()
    this.addSectionTitle('Bijlagen')

    // Appendix A: Disclaimer
    this.addSubsectionTitle('Bijlage A: Disclaimer')
    const disclaimer = [
      'Dit rapport is gegenereerd op basis van uw antwoorden op de AI Act Compliance Checker.',
      'Het dient als educatief hulpmiddel en vervangt geen juridisch advies.',
      'Voor definitieve compliance-beslissingen adviseren wij een AI Act specialist te raadplegen.',
      'Cloudwijk accepteert geen aansprakelijkheid voor beslissingen gebaseerd op dit rapport.',
      'Het rapport is gebaseerd op EU AI Act verordening 2024/1689 zoals bekend op de generatiedatum.',
    ]

    disclaimer.forEach(text => {
      this.doc.setFontSize(10)
      const lines = this.doc.splitTextToSize(text, this.pageWidth - 2 * this.margin)
      lines.forEach((line: string) => {
        this.checkPageBreak(10)
        this.doc.text(line, this.margin, this.currentY)
        this.currentY += 6
      })
      this.currentY += 4
    })

    // Appendix B: Methodology
    this.currentY += 10
    this.addSubsectionTitle('Bijlage B: Methodologie')
    this.doc.setFontSize(10)
    const methodology = 'De assessment is gebaseerd op een systematische analyse van EU AI Act verordening 2024/1689, ' +
                       'inclusief alle artikelen, bijlagen en uitzonderingen. De classificatie volgt de officiële ' +
                       'procedures zoals beschreven in de verordening.'
    
    const methodLines = this.doc.splitTextToSize(methodology, this.pageWidth - 2 * this.margin)
    methodLines.forEach((line: string) => {
      this.checkPageBreak(10)
      this.doc.text(line, this.margin, this.currentY)
      this.currentY += 6
    })
  }

  private addFooterToAllPages(data: ReportData): void {
    const pageCount = this.doc.getNumberOfPages()
    
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i)
      
      // Footer line
      this.doc.setDrawColor(200, 200, 200)
      this.doc.line(this.margin, this.pageHeight - 25, this.pageWidth - this.margin, this.pageHeight - 25)
      
      // Footer text
      this.doc.setFontSize(8)
      this.doc.setTextColor(100, 100, 100)
      this.doc.text(
        `Cloudwijk EU AI Act Compliance Rapport - Gegenereerd ${formatDate(data.generatedAt)}`,
        this.margin,
        this.pageHeight - 18
      )
      
      this.doc.text(
        `Pagina ${i} van ${pageCount}`,
        this.pageWidth - this.margin - 20,
        this.pageHeight - 18
      )
      
      // Disclaimer in footer
      this.doc.setFontSize(7)
      this.doc.text(
        'Dit rapport dient als educatief hulpmiddel en vervangt geen juridisch advies.',
        this.margin,
        this.pageHeight - 10
      )
      
      this.doc.setTextColor(0, 0, 0)
    }
  }

  // Helper methods
  private addSectionTitle(title: string): void {
    this.checkPageBreak(30)
    this.doc.setFontSize(16)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(...this.hexToRgb(this.primaryColor))
    this.doc.text(title, this.margin, this.currentY)
    this.currentY += 20
    this.doc.setTextColor(0, 0, 0)
  }

  private addSubsectionTitle(title: string, color: string = this.secondaryColor): void {
    this.checkPageBreak(20)
    this.doc.setFontSize(13)
    this.doc.setFont('helvetica', 'bold')
    this.doc.setTextColor(...this.hexToRgb(color))
    this.doc.text(title, this.margin, this.currentY)
    this.currentY += 15
    this.doc.setTextColor(0, 0, 0)
  }

  private addBulletPoint(text: string): void {
    this.checkPageBreak(15)
    this.doc.text('•', this.margin + 5, this.currentY)
    const lines = this.doc.splitTextToSize(text, this.pageWidth - this.margin - 30)
    lines.forEach((line: string, index: number) => {
      this.doc.text(line, this.margin + 12, this.currentY + (index * 6))
    })
    this.currentY += lines.length * 6 + 4
  }

  private checkPageBreak(requiredSpace: number): void {
    if (this.currentY + requiredSpace > this.pageHeight - 40) {
      this.addPageBreak()
    }
  }

  private addPageBreak(): void {
    this.doc.addPage()
    this.currentY = this.margin + 20
  }

  private getRiskLevelText(category: RiskCategory): string {
    const texts = {
      [RiskCategory.PROHIBITED]: 'Verboden Systeem',
      [RiskCategory.HIGH_RISK]: 'Hoog-risico Systeem',
      [RiskCategory.LIMITED_RISK]: 'Beperkt Risico',
      [RiskCategory.MINIMAL_RISK]: 'Minimaal Risico'
    }
    return texts[category]
  }

  private getRiskColor(category: RiskCategory): string {
    const colors = {
      [RiskCategory.PROHIBITED]: '#dc2626',
      [RiskCategory.HIGH_RISK]: '#ea580c', 
      [RiskCategory.LIMITED_RISK]: '#d97706',
      [RiskCategory.MINIMAL_RISK]: '#16a34a'
    }
    return colors[category]
  }

  private hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result 
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [0, 0, 0]
  }
}