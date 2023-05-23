import { CountdownTimer } from './components/CoundownTimer'

export const App = () => {
  return (
    <main>
      <CountdownTimer
        minutes={2}
        size={200}
        strokeBgColor='pink'
        strokeColor='blue'
        strokeWidth={4}
        updateTimer='second'
        updateStroke='second'
      />
      <CountdownTimer
        minutes={20}
        size={100}
        strokeBgColor='pink'
        strokeColor='blue'
        strokeWidth={4}
        updateTimer='second'
        updateStroke='minute'
      />
    </main>
  )
}
