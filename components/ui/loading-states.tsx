import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex space-x-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          
          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function AssessmentLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex justify-between mt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Question card */}
        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  )
}

export function SpinnerLoader({ message = "Laden..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-cloudwijk-blue mb-4" />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  )
}

export function PDFGeneratingLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-cloudwijk-blue/20 border-t-cloudwijk-blue animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="h-6 w-6 text-cloudwijk-blue" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v1.276l7.086 3.18a.5.5 0 00.828 0L17 6.276V5a2 2 0 00-2-2H4zM2 8.276V15a2 2 0 002 2h11a2 2 0 002-2V8.276l-6.086 2.732a2.5 2.5 0 01-1.828 0L2 8.276z" />
          </svg>
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-900">PDF wordt gegenereerd...</p>
      <p className="mt-1 text-sm text-gray-600">Dit duurt een paar seconden</p>
    </div>
  )
}