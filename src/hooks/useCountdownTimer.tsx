import { useState, useEffect, useCallback } from 'react'

import { CountdownTimerProps } from '../interfaces/CountdownTimer'

import { format } from 'date-fns'

const ONE_MINUTE = 60
const ONE_SECOND = 1000
const MILLISECONDS_IN_MINUTE = ONE_MINUTE * ONE_SECOND

export const useCountdownTimer = ({
  minutes,
  size,
  strokeBgColor,
  strokeColor,
  strokeWidth,
  updateTimer,
  updateStroke,
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(minutes * MILLISECONDS_IN_MINUTE)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStrokeOffset, setCurrentStrokeOffset] = useState(0)

  const milliseconds = minutes * MILLISECONDS_IN_MINUTE
  const circumference = size * Math.PI

  const radius = size / 2

  const intervalDuration =
    updateTimer === 'second' ? ONE_SECOND : MILLISECONDS_IN_MINUTE

  const strokeDashoffset = useCallback(() => {
    if (isPlaying) {
      const calculatedOffset =
        circumference - (timeLeft / milliseconds) * circumference
      return isNaN(calculatedOffset) ? 0 : calculatedOffset
    }
    return currentStrokeOffset
  }, [timeLeft, currentStrokeOffset, isPlaying, milliseconds, circumference])

  useEffect(() => {
    let intervalId: number
    const handleInterval = () => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft - intervalDuration

        if (newTimeLeft <= ONE_SECOND) {
          clearInterval(intervalId)
          setIsPlaying(false)
          setCurrentStrokeOffset(0)
          return milliseconds
        }
        switch (updateStroke) {
          case 'second':
            (newTimeLeft / ONE_SECOND) % 1 === 0 &&
              setCurrentStrokeOffset(strokeDashoffset())
            break
          case 'minute':
            (newTimeLeft / ONE_SECOND) % ONE_MINUTE === 0 &&
              setCurrentStrokeOffset(strokeDashoffset())
            break
        }
        return newTimeLeft
      })
    }

    if (isPlaying) {
      intervalId = setInterval(handleInterval, intervalDuration)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [
    isPlaying,
    timeLeft,
    milliseconds,
    strokeDashoffset,
    intervalDuration,
    updateTimer,
    updateStroke,
  ])

  const startTimer = () => {
    setIsPlaying(true)
  }

  const pauseTimer = () => {
    setIsPlaying(false)
  }

  const restartTimer = () => {
    setTimeLeft(minutes * MILLISECONDS_IN_MINUTE)
    setIsPlaying(false)
    setCurrentStrokeOffset(0)
  }

  const handleBreak = (breakTime: number) => {
    setTimeLeft(breakTime * MILLISECONDS_IN_MINUTE)
    setIsPlaying(true)
  }

  const timeDisplay = format(new Date(timeLeft), 'm:ss')

  return {
    timeDisplay,
    startTimer,
    pauseTimer,
    restartTimer,
    currentStrokeOffset,
    strokeBgColor,
    strokeColor,
    strokeWidth,
    isPlaying,
    size,
    radius,
    circumference,
    handleBreak,
  }
}

export default useCountdownTimer
