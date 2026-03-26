import { AxiosError } from 'axios'
import { API } from '@/lib/axios'
import type { CepRadiusResponse, CepSearchParams } from '../types/cep'


export class CepService {
  private readonly URL = '/ceps/radius'

  async searchByRadius(params: CepSearchParams): Promise<CepRadiusResponse> {
    try {
      const response = await API.get(this.URL, {
        params: {
          cep: params.originCep,
          raioKm: params.radiusKm,
        },
      })
      return response.data as CepRadiusResponse
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message ?? 'Unexpected error while searching ZIP codes.'
        throw new Error(message)
      }

      throw new Error('Unexpected error while searching ZIP codes.')
    }
  }

}

export const cepService = new CepService()
