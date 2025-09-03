import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const AssessmentWizard = dynamic(
  () => import('@/app/(checker)/ai-act-checker/assessment/page'),
  {
    loading: () => (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 p-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-8" />
          <div className="grid gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    ),
    ssr: false
  }
)

export default AssessmentWizard