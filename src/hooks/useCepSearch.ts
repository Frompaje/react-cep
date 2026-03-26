import { useState } from 'react'
import { toast } from 'sonner'
import { searchCepsByRadius, ApiError } from '../services/api'
import type { CepSearchParams, CepSearchResponse } from '../types/cep'

export function useCepSearch() {
  const [result, setResult] = useState<CepSearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [rttMs, setRttMs] = useState<number | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const search = async (params: CepSearchParams) => {
    console.log('[cep-search] Hook search called', params)
    setIsLoading(true)
    setHasSearched(true)

    const start = performance.now()
    try {
      const data = await searchCepsByRadius(params)
      console.log('[cep-search] Hook success data', data)
      setResult(data)
      toast.success('ZIP code search completed successfully.', {
        description: `${data.total} ZIP codes found.`,
      })
    } catch (error) {
      setResult(null)
      if (error instanceof ApiError) {
        toast.error(error.message, {
          description: `HTTP ${error.status}`,
        })
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Unknown error while searching ZIP codes.')
      }
      console.error('ZIP radius search failed:', error)
    } finally {
      const end = performance.now()
      console.log('[cep-search] Hook finished', {
        rttMs: end - start,
      })
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
