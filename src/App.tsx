import { CountdownTimer } from './components/CoundownTimer'

export const App = () => {
  return (
    <main>
      <CountdownTimer
        minutes={25}
        size={100}
        strokeBgColor='pink'
        strokeColor='blue'
        strokeWidth={100}
        updateTimer='second'
        updateStroke='second'
      />
    </main>
  )
}
