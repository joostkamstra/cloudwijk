'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Shield, CheckCircle, FileText, AlertCircle } from 'lucide-react'

export default function AIActCheckerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">EU AI Act Compliance Checker</h1>
          <p className="text-xl text-gray-600">
            Check if your AI system complies with EU AI Act regulation 2024/1689
          </p>
        </div>

        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Free AI Act Compliance Assessment</h2>
          <p className="text-gray-600 mb-6">
            Get clarity on AI Act requirements for your system in 10 minutes. 
            Receive a detailed report with concrete action plans.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-medium">Complete Coverage</h3>
                <p className="text-sm text-gray-600">EU regulation 2024/1689</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-medium">Legally Correct</h3>
                <p className="text-sm text-gray-600">Classification & obligations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-medium">Action Plans</h3>
                <p className="text-sm text-gray-600">Concrete steps with timelines</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h3 className="font-medium">PDF Report</h3>
                <p className="text-sm text-gray-600">For management & compliance</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <p className="text-sm text-amber-800">
                This is an educational tool and does not replace legal advice. 
                For definitive compliance decisions, consult an AI Act specialist.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="flex-1">
              <Link href="/ai-act-checker/assessment">
                Start Assessment →
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Talk to Expert
              </Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Estimated time: 8-12 minutes
          </p>
        </Card>
      </div>
    </div>
  )
}