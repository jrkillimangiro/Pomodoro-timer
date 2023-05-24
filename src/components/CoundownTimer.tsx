import React, { useState, useEffect } from 'react'
import useCountdownTimer from '../hooks/useCountdownTimer'
import { CountdownTimerProps } from '../interfaces/CountdownTimer'
import { Button } from './Button'

export const CountdownTimer = ({
  minutes,
  size,
  strokeBgColor,
  strokeColor,
  strokeWidth,
  updateTimer,
  updateStroke,
}: CountdownTimerProps) => {
  const {
    timeDisplay,
    startTimer,
    pauseTimer,
    restartTimer,
    handleBreak,
    currentStrokeOffset,
    isPlaying,
    circumference,
    radius,
  } = useCountdownTimer({
    minutes,
    size,
    strokeBgColor,
    strokeColor,
    strokeWidth,
    updateTimer,
    updateStroke,
  })

  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    if (isPlaying) {
      const positiveWords = [
        'ánimo',
        'tu puedes',
        'concéntrate',
        'queda poco',
        'vamos!',
      ]
      const timerInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * positiveWords.length)
        setDisplayText(positiveWords[randomIndex])
      }, 1200)

      return () => {
        clearInterval(timerInterval)
      }
    }
  }, [isPlaying])

  const handlePause = () => {
    if (isPlaying) {
      setDisplayText('en pausa')
    }
    pauseTimer()
  }

  return (
    <div>
      <section className='button-container'>
        <Button
          text={'Pausa corta: 5min'}
          onClick={() => handleBreak(5)}
          size={size}
        />
        <Button
          text={'Pausa larga: 10min'}
          onClick={() => handleBreak(10)}
          size={size}
        />
      </section>

      <figure
        className='countdown-container'
        style={{ '--countdown-size': `${size}px` } as React.CSSProperties}
      >
        <p className='countdown-text'>
          <span className='countdown-timer'>{timeDisplay}</span>
          <p
            className={`timer-text ${
              displayText === 'en pausa' ? 'break-text' : ''
            }`}
          >
            {displayText}
          </p>
        </p>
        <svg className='countdown-svg'>
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill='none'
            stroke={strokeBgColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
        <svg className='countdown-svg'>
          <circle
            strokeDasharray={circumference}
            strokeDashoffset={currentStrokeOffset}
            r={radius}
            cx={radius}
            cy={radius}
            fill='none'
            strokeLinecap='round'
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
      </figure>
      <section className='button-container'>
        <Button
          text='comenzar'
          onClick={startTimer}
          size={size}
          disabled={isPlaying}
        />
        <Button
          text='pausar'
          onClick={handlePause}
          size={size}
          disabled={!isPlaying}
        />
        <Button text='reiniciar' onClick={restartTimer} size={size} />
      </section>
    </div>
  )
}
