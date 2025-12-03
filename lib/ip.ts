import { headers } from 'next/headers'

export async function getIP() {
  const h = await headers()

  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'anonymous'
}
