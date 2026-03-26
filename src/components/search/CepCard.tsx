import { ExternalLink, MapPin } from 'lucide-react'
import type { CepSearchItem } from '../../types/cep'
import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { cn } from '../../lib/utils'

interface CepCardProps {
  item: CepSearchItem
}

export function CepCard({ item }: CepCardProps) {
  const hasCoordinates = item.latitude !== null && item.longitude !== null
  const mapsUrl = `https://www.google.com/maps?q=${item.latitude},${item.longitude}`

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-indigo-600" />
            <span className="text-lg font-semibold text-slate-900">{item.zipCode}</span>
          </div>
          {item.distanceKm !== null && (
            <Badge variant="secondary">{item.distanceKm.toFixed(2)} km</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {hasCoordinates && (
          <>
            <div className="text-sm text-slate-600">
              <div>Latitude: {item.latitude.toFixed(6)}</div>
              <div>Longitude: {item.longitude.toFixed(6)}</div>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            >
              Open in Maps
              <ExternalLink className="h-4 w-4" />
            </a>
          </>
        )}
      </CardContent>
    </Card>
  )
}
