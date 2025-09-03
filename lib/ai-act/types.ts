export enum RiskCategory {
  PROHIBITED = 'PROHIBITED',
  HIGH_RISK = 'HIGH_RISK',
  LIMITED_RISK = 'LIMITED_RISK',
  MINIMAL_RISK = 'MINIMAL_RISK',
}

export type Actor = 'provider' | 'importer' | 'distributor' | 'deployer'

export type HighRiskCategory =
  | 'biometrics'
  | 'criticalInfrastructure'
  | 'education'
  | 'employment'
  | 'essentialServices'
  | 'lawEnforcement'
  | 'migration'
  | 'justice'
  | 'none'

export enum ConformityPath {
  ANNEX_VI = 'ANNEX_VI',
  ANNEX_VII = 'ANNEX_VII'
}

export interface ScopeAnswers {
  isAISystem: 'yes' | 'no' | 'unsure'
  usedInEU: 'yes' | 'no' | 'planned'
}

export interface ProhibitedAnswers {
  subliminalTechniques: boolean
  exploitingVulnerabilities: boolean
  socialScoring: boolean
  biometricIdentification: boolean
  facialRecognitionDatabase: boolean
  emotionRecognition: boolean
  predictivePolicing: boolean
  biometricCategorisation: boolean
}

export interface HighRiskAnswers {
  category: HighRiskCategory
  context?: string
}

export interface ExceptionsAnswers {
  narrowProcedural: boolean
  humanActivity: boolean
  patternDetection: boolean
  preparatoryTask: boolean
  profiling: boolean
}

export interface LimitedRiskAnswers {
  humanInteraction: boolean
  syntheticContent: boolean
  deepfakes: boolean
  emotionRecognition: boolean
  biometricCategorisation: boolean
}

export interface RolesAnswers {
  actor: Actor
  publicAuthority: boolean
  gpaiProvider: boolean
}

export interface GPAIAnswers {
  modelType: 'foundationModel' | 'multimodalModel' | 'specializedModel' | 'apiService'
  computeThreshold: boolean
  capabilities: string[]
}

export interface ComplianceAnswers {
  riskManagement: boolean
  dataGovernance: boolean
  documentation: boolean
  humanOversight: boolean
  accuracyRobustness: boolean
  qualityManagement: boolean
  conformityAssessment: boolean
  ceMarking: boolean
  registration: boolean
}

export interface AssessmentAnswers {
  scope: ScopeAnswers
  prohibited: ProhibitedAnswers
  highRisk: HighRiskAnswers
  exceptions: ExceptionsAnswers
  limitedRisk: LimitedRiskAnswers
  roles: RolesAnswers
  gpai?: GPAIAnswers
  compliance: ComplianceAnswers
}

export interface LegalOutput {
  riskCategory: RiskCategory
  rationale: string[]
  applicableArticles: string[]
  obligations: string[]
  conformityPath?: ConformityPath
  ceMarkingRequired: boolean
  euDeclarationRequired: boolean
  registrationSteps: string[]
  friaRequired: boolean
  gpaiDuties: string[]
  postMarketDuties: string[]
  timeline: string
  exemptions?: string[]
  recommendations: string[]
}

export interface ComplianceGaps {
  critical: GapItem[]
  high: GapItem[]
  medium: GapItem[]
}

export interface GapItem {
  id: string
  title: string
  description: string
  article: string
  priority: 'critical' | 'high' | 'medium'
  effort: string
  timeline: string
  resources: string[]
  solutions: string[]
}

export interface ActionPlan {
  phase: string
  timeline: string
  actions: ActionItem[]
}

export interface ActionItem {
  id: string
  title: string
  description: string
  owner: string
  effort: string
  dependencies: string[]
  deliverables: string[]
}

export interface AssessmentResult {
  riskCategory: RiskCategory
  complianceScore: number
  legalOutput: LegalOutput
  gaps: ComplianceGaps
  actionPlan: ActionPlan[]
  estimatedCost: string
  estimatedTimeline: string
  cloudwijkSupport: string[]
}

// Question flow types
export interface QuestionOption {
  value: string
  label: string
  description?: string
}

export interface Question {
  id: string
  type: 'single' | 'multiple' | 'boolean' | 'text'
  title: string
  description: string
  help?: string
  options?: QuestionOption[]
  required: boolean
  validation?: (value: any) => string | null
  dependsOn?: {
    questionId: string
    value: any
  }[]
}