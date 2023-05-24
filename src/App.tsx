import { CountdownTimer } from './components/CoundownTimer'

export const App = () => {
  return (
    <main>
      <CountdownTimer
        minutes={15}
        size={150}
        strokeBgColor='pink'
        strokeColor='blue'
        strokeWidth={4}
        updateTimer='second'
        updateStroke='second'
      />
    </main>
  )
}
