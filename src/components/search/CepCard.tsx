import { MapPin } from 'lucide-react'
import { Card, CardHeader } from '../ui/card'

interface CepCardProps {
  zipCode: string
}

export function CepCard({ zipCode }: CepCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-indigo-600" />
            <span className="text-lg font-semibold text-slate-900">{zipCode}</span>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
