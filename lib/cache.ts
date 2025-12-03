import { redis } from './redis'

export async function cacheGet(key: string) {
  const data = await redis.get(key)
  if (!data) return null
  // If data is already an object, return it directly
  if (typeof data === 'object') return data
  // Otherwise parse the JSON string
  return JSON.parse(data as string)
}
export async function cacheSet(key: string, value: object | string, ttl = 60) {
  // default: 60 seconds
  return await redis.set(key, JSON.stringify(value), { ex: ttl })
}

export async function cacheDel(key: string) {
  return await redis.del(key)
}
