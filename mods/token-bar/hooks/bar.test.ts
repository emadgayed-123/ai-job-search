import { expect, test } from 'claude-code/testing'

import { bar, compact, label, level, toReading } from './bar'

test('bar fills in proportion to percent', () => {
  expect(bar(0, 10)).toBe('░░░░░░░░░░')
  expect(bar(50, 10)).toBe('█████░░░░░')
  expect(bar(100, 10)).toBe('██████████')
})

test('level turns amber at 60 and red at 85', () => {
  expect(level(59)).toBe('success')
  expect(level(60)).toBe('warning')
  expect(level(85)).toBe('error')
})

test('reading derives percent when the engine gives none and formats the label', () => {
  const r = toReading({ tokens: 50_000, window: 200_000 }, 1.234)
  expect(r.percent).toBe(25)
  expect(compact(1_000_000)).toBe('1.0M')
  expect(label(r)).toBe(' 25% · 50k/200k tokens · $1.23')
})
