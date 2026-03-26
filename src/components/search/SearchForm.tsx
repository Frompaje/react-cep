import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { CepSearchParams } from '../../types/cep'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'

const searchFormSchema = z.object({
  originCep: z.string().regex(/^\d{8}$/, 'ZIP code must contain exactly 8 digits'),
  radiusKm: z.number().min(1, 'Minimum radius is 1 km').max(50, 'Maximum radius is 50 km'),
})

type SearchFormValues = z.infer<typeof searchFormSchema>

interface SearchFormProps {
  onSubmit: (params: CepSearchParams) => Promise<void>
  isLoading: boolean
}

export function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      originCep: '',
      radiusKm: 10,
    },
  })

  const radiusKm = watch('radiusKm')

  const handleCepInput = (value: string) => value.replace(/\D/g, '').slice(0, 8)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="originCep">
          Origin ZIP Code
        </label>
        <Input
          id="originCep"
          placeholder="01001000"
          maxLength={8}
          {...register('originCep', {
            onChange: (event) => {
              event.target.value = handleCepInput(event.target.value)
            },
          })}
        />
        {errors.originCep && (
          <p className="text-xs font-medium text-red-600">{errors.originCep.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700" htmlFor="radiusKm">
            Search Radius
          </label>
          <span className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">
            {radiusKm} km
          </span>
        </div>
        <Slider
          id="radiusKm"
          min={1}
          max={50}
          step={1}
          value={radiusKm}
          onChange={(event) => setValue('radiusKm', Number(event.target.value))}
        />
        {errors.radiusKm && (
          <p className="text-xs font-medium text-red-600">{errors.radiusKm.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        <Search className="h-4 w-4" />
        {isLoading ? 'Searching...' : 'Search ZIP Codes'}
      </Button>
    </form>
  )
}
