import useCountdownTimer from '../hooks/useCountdownTimer'
import { CountdownTimerProps } from '../interfaces/CountdownTimer'

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

  return (
    <div>
      <div className='button-container'>
        <button className='button' onClick={startTimer} disabled={isPlaying}>
          START
        </button>
        <button className='button' onClick={pauseTimer} disabled={!isPlaying}>
          PAUSE
        </button>
      </div>
      <figure
        className='countdown-container'
        style={{ '--countdown-size': `${size}px` } as React.CSSProperties}
      >
        <p className='countdown-text'>{timeDisplay}</p>
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
    </div>
  )
}
