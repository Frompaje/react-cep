import { useState } from 'react'
import { toast } from 'sonner'
import type { CepRadiusResponse, CepSearchParams } from '../types/cep'
import { cepService } from '../services/cepService'

export function useCepSearch() {
  const [result, setResult] = useState<CepRadiusResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rttMs, setRttMs] = useState<number | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const search = async (params: CepSearchParams) => {
    setIsLoading(true)
    setHasSearched(true)

    const start = performance.now()
    try {
      const data = await cepService.searchByRadius(params)
      setResult(data)
      toast.success('ZIP code search completed successfully.', {
        description: `${data.total} ZIP codes found.`,
      })
    } catch (error) {
      setResult(null)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Unknown error while searching ZIP codes.')
      }
    } finally {
      const end = performance.now()
      setRttMs(end - start)
      setIsLoading(false)
    }
  }

  return {
    result,
    isLoading,
    rttMs,
    hasSearched,
    search,
  }
}
