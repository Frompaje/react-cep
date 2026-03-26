export interface CepSearchParams {
  originCep: string
  radiusKm: number
}

export interface CepSearchItem {
  zipCode: string
  distanceKm: number | null
  latitude: number | null
  longitude: number | null
}

export interface CepSearchResponse {
  originCep: string
  radiusKm: number
  total: number
  results: CepSearchItem[]
}
