export interface CepSearchParams {
  originCep: string
  radiusKm: number
}

export interface CepRadiusResponse {
  cepOrigem: string
  raioKm: number
  total: number
  ceps: string[]
}
