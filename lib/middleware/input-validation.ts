import DOMPurify from 'isomorphic-dompurify'
import { z } from 'zod'

// Enhanced input sanitization
export function sanitizeInput(input: string): string {
  // Remove null bytes
  let cleaned = input.replace(/\0/g, '')
  
  // Sanitize HTML/XSS
  cleaned = DOMPurify.sanitize(cleaned, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [] 
  })
  
  // Trim whitespace
  cleaned = cleaned.trim()
  
  // Limit length
  if (cleaned.length > 10000) {
    cleaned = cleaned.substring(0, 10000)
  }
  
  return cleaned
}

// Validate and sanitize email
export function sanitizeEmail(email: string): string {
  const emailSchema = z.string().email().max(254)
  
  try {
    const validated = emailSchema.parse(email.toLowerCase().trim())
    return validated
  } catch {
    throw new Error('Invalid email format')
  }
}

// Validate assessment answers
export const AssessmentAnswersSchema = z.object({
  scope: z.object({
    isAISystem: z.enum(['yes', 'no', 'unsure']),
    usedInEU: z.enum(['yes', 'no', 'planned'])
  }).optional(),
  
  prohibited: z.object({
    subliminalTechniques: z.boolean(),
    exploitingVulnerabilities: z.boolean(),
    socialScoring: z.boolean(),
    biometricIdentification: z.boolean(),
    facialRecognitionDatabase: z.boolean(),
    emotionRecognition: z.boolean(),
    predictivePolicing: z.boolean(),
    biometricCategorisation: z.boolean()
  }).optional(),

  highRisk: z.object({
    category: z.enum([
      'biometrics', 'criticalInfrastructure', 'education', 
      'employment', 'essentialServices', 'lawEnforcement', 
      'migration', 'justice', 'none'
    ]),
    context: z.string().max(1000).optional()
  }).optional()
  
  // Add other sections as needed
})

// Validate contact form
export const ContactFormSchema = z.object({
  name: z.string().min(1).max(100).transform(sanitizeInput),
  email: z.string().email().max(254).transform(sanitizeEmail),
  company: z.string().max(200).optional().transform(val => val ? sanitizeInput(val) : val),
  message: z.string().min(10).max(2000).transform(sanitizeInput),
  marketingConsent: z.boolean().optional()
})

// Validate lead data
export const LeadSchema = z.object({
  email: z.string().email().max(254).transform(sanitizeEmail),
  name: z.string().max(100).optional().transform(val => val ? sanitizeInput(val) : val),
  company: z.string().max(200).optional().transform(val => val ? sanitizeInput(val) : val),
  role: z.string().max(100).optional().transform(val => val ? sanitizeInput(val) : val),
  industry: z.string().max(100).optional().transform(val => val ? sanitizeInput(val) : val)
})

export function validateAndSanitize<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      throw new Error(`Validation errors: ${messages.join(', ')}`)
    }
    throw error
  }
}