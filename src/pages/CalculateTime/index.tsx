import { useRef, useState } from "react";
import "./style.scss";
import { FormTime } from "./FormTime";

export function CalculateTime() {
  const [step, setStep] = useState(1)
  const [btnDisable, setBtnDisable] = useState(false)
  const [resCalculateTime, setResCalculateTime] = useState({
    days: 0,
    pags: 0,
    horus: 0
  })

  const [time, setTime] = useState({ minutes: 0, seconds: 0 })
  const intervalRef = useRef<any>(null)

  function handleStart() {
    setBtnDisable(true)
    if (intervalRef.current !== null) {
      return
    }

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        let { minutes, seconds } = prevTime
        seconds++
        if (seconds === 59) {
          minutes++
          seconds = 0;
        }
        return { minutes, seconds }
      })
    }, 100)
  }

  const handleStop = () => {
    if (intervalRef.current !== null) {
      setBtnDisable(false)
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  return (
    <div className="calculate-time-container">
      {step == 1 && (
        <div className="count-container">
          <div className='time'>
            <span>{time.minutes < 10 ? `0${time.minutes}` : time.minutes}</span>
            <div className="count-separator">:</div>
            <span>{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</span>
          </div>
          <div className='count-container-button'>
            <button onClick={handleStart}>
              Começar
            </button>
            <button onClick={handleStop}>
              Pausar
            </button>
          </div>
          <button disabled={btnDisable} onClick={() => { setStep(2) }}>Próximo</button>
        </div>
      )
      }

      {step == 2 && (
        <FormTime setStep={setStep} time={time} setResCalculateTime={setResCalculateTime} />
      )
      }

      {step == 3 && (
         <div className="result-time-container">
         <h1>Resultado</h1>
         <p>
           {`Tempo necessário por dia para concluir a leitura de ${resCalculateTime.pags} páginas:`}
         </p>
         <h1>{`${resCalculateTime.days} minutos por dia`}</h1>
         <span>{`Total: ${resCalculateTime.horus} minutos`}</span>
         <button className="btn-yellow">Concluir</button>
       </div>
      )}
    </div>
  );
}
