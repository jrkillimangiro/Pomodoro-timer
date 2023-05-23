export interface CountdownTimerProps {
  minutes: number
  size: number
  strokeBgColor: string
  strokeColor: string
  strokeWidth: number
  updateTimer: 'second' | 'minute'
  updateStroke: 'second' | 'minute'
}
