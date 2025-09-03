import { NextRequest, NextResponse } from 'next/server'

interface RateLimitOptions {
  windowMs: number
  maxRequests: number
  message?: string
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// Simple in-memory store (in production, use Redis or similar)
const store: RateLimitStore = {}

export function rateLimit(options: RateLimitOptions) {
  const { windowMs, maxRequests, message = 'Too many requests' } = options

  return function rateLimitMiddleware(request: NextRequest) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous'
    const key = `rate_limit:${ip}`
    const now = Date.now()

    // Clean up expired entries periodically
    if (Math.random() < 0.01) {
      Object.keys(store).forEach(k => {
        if (store[k]?.resetTime && store[k].resetTime < now) {
          delete store[k]
        }
      })
    }

    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs
      }
      return null // Allow request
    }

    if (store[key].count >= maxRequests) {
      return NextResponse.json(
        { error: message, retryAfter: Math.ceil((store[key].resetTime - now) / 1000) },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((store[key].resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(store[key].resetTime).toISOString()
          }
        }
      )
    }

    store[key].count += 1
    return null // Allow request
  }
}

// Predefined rate limiters
export const assessmentRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // Max 5 assessments per 15 minutes per IP
  message: 'Te veel assessment pogingen. Probeer over 15 minuten opnieuw.'
})

export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30, // Max 30 API calls per minute per IP
  message: 'Te veel API verzoeken. Probeer over een minuut opnieuw.'
})

export const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3, // Max 3 contact form submissions per hour per IP
  message: 'Te veel contact berichten. Probeer over een uur opnieuw.'
})