export interface LimitResult {
  success: boolean
}

export interface RateLimiter {
  limit(key: string): Promise<LimitResult>
}

export async function checkRateLimit(limiter: RateLimiter, key: string): Promise<boolean> {
  const { success } = await limiter.limit(key)
  return success
}
