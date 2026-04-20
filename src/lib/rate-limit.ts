import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const hasRedisEnv =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN

// The Vercel Redis integration sets KV_REST_API_URL / KV_REST_API_TOKEN,
// but the Upstash SDK's fromEnv() reads UPSTASH_REDIS_REST_URL / _TOKEN.
// Map one to the other so fromEnv() works without declaring duplicate vars.
if (hasRedisEnv) {
  process.env.UPSTASH_REDIS_REST_URL ??= process.env.KV_REST_API_URL
  process.env.UPSTASH_REDIS_REST_TOKEN ??= process.env.KV_REST_API_TOKEN
}

export const ratelimit = hasRedisEnv
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '1 h'),
      analytics: false,
      prefix: 'rl:contact',
    })
  : null

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult | null> {
  if (!ratelimit) {
    console.warn('[rate-limit] Redis not configured — skipping rate limit for', ip)
    return null
  }
  const { success, limit, remaining, reset } = await ratelimit.limit(ip)
  return { success, limit, remaining, reset }
}
