import { CountdownTimer } from "./components/CoundownTimer"


function App() {

  return (
    <main>
      <CountdownTimer
        minutes={2}
        size={200}
        strokeBgColor="pink"
        strokeColor="blue"
        strokeWidth={4}
        updateTimer="second"
      />
    </main>
  )
}

export default App
