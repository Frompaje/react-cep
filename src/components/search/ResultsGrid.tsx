import type { CepRadiusResponse } from '../../types/cep'
import { CepCard } from './CepCard'
import { Skeleton } from '../ui/skeleton'

interface ResultsGridProps {
  data: CepRadiusResponse | null
  isLoading: boolean
  hasSearched: boolean
}

export function ResultsGrid({ data, isLoading, hasSearched }: ResultsGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Results</h2>
          {data && (
            <p className="text-xs text-slate-500">
              Origin: {data.cepOrigem} | Radius: {data.raioKm} km
            </p>
          )}
        </div>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
          {data?.total ?? 0} ZIP codes
        </span>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-slate-200 p-4">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && data && data.ceps.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.ceps.map((zipCode) => (
            <CepCard key={zipCode} zipCode={zipCode} />
          ))}
        </div>
      )}

      {!isLoading && hasSearched && (!data || data.ceps.length === 0) && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No ZIP codes were found for the selected radius.
        </div>
      )}
    </section>
  )
}
