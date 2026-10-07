export type Reading = {
  tokens: number
  window: number
  percent: number
  usd?: number
}

declare module 'claude-code' {
  interface PluginState {
    'token-bar': { reading: Reading | null; isHidden: boolean }
  }
}
