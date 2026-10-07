import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import { bar, label, level, toReading } from './bar'

const reading = atom({ plugin: 'token-bar', key: 'reading' } as const, null)
const isHidden = atom({ plugin: 'token-bar', key: 'isHidden' } as const, false)

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'token-bar',
      description: 'Show or hide the token consumption bar',
    })
    const ran = await next(e)
    const usage = await $.session.usage()
    await update($, reading, () => toReading(usage.context, usage.cost?.usd))

    return ran
  })

  on('session.measure', async ($, e, next) => {
    const before = await read($, reading)
    const now = toReading(e.context, e.cost?.usd)
    await update($, reading, () => now)

    if (before && before.percent < 85 && now.percent >= 85) {
      $.ui.toast(`Context at ${now.percent}%: consider /compact`)
    }

    return next(e)
  })

  on('command.run', { command: 'token-bar' }, async $ => {
    const hidden = await update($, isHidden, was => !was)

    return { text: hidden ? 'Token bar hidden.' : 'Token bar shown.' }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const r = await read($, reading)

    if (e.props.hasSurvey || r === null || r.window === 0 || (await read($, isHidden))) {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box>
        <Text dimColor>Context </Text>
        <Text color={level(r.percent)}>{bar(r.percent)}</Text>
        <Text dimColor>{label(r)}</Text>
      </Box>
    )
  })
}
