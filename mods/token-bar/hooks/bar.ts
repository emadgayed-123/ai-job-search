import type { Reading } from '../types'

const WIDTH = 24

export const toReading = (
  context: { tokens?: number; window: number; percent?: number },
  usd?: number,
): Reading => {
  const tokens = context.tokens ?? 0
  const percent =
    context.percent ?? (context.window > 0 ? Math.round((tokens / context.window) * 100) : 0)

  return { tokens, window: context.window, percent: Math.min(100, Math.max(0, percent)), usd }
}

export const compact = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`

export const bar = (percent: number, width = WIDTH): string => {
  const filled = Math.round((percent / 100) * width)

  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

export const level = (percent: number): 'success' | 'warning' | 'error' =>
  percent >= 85 ? 'error' : percent >= 60 ? 'warning' : 'success'

export const label = (r: Reading): string => {
  const cost = r.usd === undefined ? '' : ` · $${r.usd.toFixed(2)}`

  return ` ${r.percent}% · ${compact(r.tokens)}/${compact(r.window)} tokens${cost}`
}
