import type { CepSearchParams, CepSearchResponse, CepSearchItem } from '../types/cep'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

const API_URL = import.meta.env.VITE_API_URL

function normalizeItem(item: Record<string, unknown>): CepSearchItem {
  const distance = item.distanceKm ?? item.distance ?? null
  const latitude = item.latitude ?? item.lat ?? null
  const longitude = item.longitude ?? item.lng ?? null

  return {
    zipCode: String(item.zipCode ?? item.cep ?? ''),
    distanceKm: distance === null ? null : Number(distance),
    latitude: latitude === null ? null : Number(latitude),
    longitude: longitude === null ? null : Number(longitude),
  }
}

function buildResponse(payload: unknown, params: CepSearchParams): CepSearchResponse {
  if (Array.isArray(payload)) {
    const results = payload
      .map((item) => mapPayloadItem(item))
      .filter((item): item is CepSearchItem => item !== null)
    return {
      originCep: params.originCep,
      radiusKm: params.radiusKm,
      total: results.length,
      results,
    }
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>
    const rawResults = Array.isArray(record.ceps)
      ? record.ceps
      : Array.isArray(record.results)
      ? record.results
      : Array.isArray(record.data)
        ? record.data
        : []
    const results = rawResults
      .map((item) => mapPayloadItem(item))
      .filter((item): item is CepSearchItem => item !== null)
    return {
      originCep: String(record.originCep ?? record.cepOrigem ?? params.originCep),
      radiusKm: Number(record.radiusKm ?? record.raioKm ?? params.radiusKm),
      total: Number(record.total ?? results.length),
      results,
    }
  }

  return {
    originCep: params.originCep,
    radiusKm: params.radiusKm,
    total: 0,
    results: [],
  }
}

function mapPayloadItem(item: unknown): CepSearchItem | null {
  if (typeof item === 'string') {
    return {
      zipCode: item,
      distanceKm: null,
      latitude: null,
      longitude: null,
    }
  }

  if (!item || typeof item !== 'object') {
    return null
  }

  const normalized = normalizeItem(item as Record<string, unknown>)
  if (!normalized.zipCode) {
    return null
  }

  return normalized
}

export async function searchCepsByRadius(
  params: CepSearchParams,
): Promise<CepSearchResponse> {
  if (!API_URL) {
    throw new ApiError(500, 'VITE_API_URL is not defined')
  }

  const query = new URLSearchParams({
    cep: params.originCep,
    raioKm: String(params.radiusKm),
  })

  const response = await fetch(`${API_URL}/ceps/radius?${query.toString()}`)

  if (!response.ok) {
    let message = 'Unexpected error while searching ZIP codes.'
    if (response.status === 400) {
      message = 'Invalid request. Please check ZIP code and radius.'
    } else if (response.status === 404) {
      message = 'No ZIP codes found for this radius.'
    } else if (response.status >= 500) {
      message = 'Server error. Please try again in a few moments.'
    }
    throw new ApiError(response.status, message)
  }

  const payload = (await response.json()) as unknown
  return buildResponse(payload, params)
}
