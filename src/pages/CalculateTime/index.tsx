import { useState } from "react";
import "./style.scss";
import { FormTime } from "./FormTime";
import { Count } from "./Count";

interface ResCalculateTimeType {
    minutesDay: number,
    pags: number,
    horus: number
}

interface TimeType {
  minutes: number,
  seconds: number
}

export function CalculateTime() {
  const [step, setStep] = useState(1)

  const [resCalculateTime, setResCalculateTime] = useState<ResCalculateTimeType>({
    minutesDay: 0,
    pags: 0,
    horus: 0
  })

  const [time, setTime] = useState<TimeType>({ minutes: 0, seconds: 0 })

  return (
    <div className="calculate-time-container">
      {step == 1 && (
        <div className="count-container">
          <Count setTime={setTime} time={time} setStep={setStep} />
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
         <h1>{`${resCalculateTime.minutesDay} minutos por dia`}</h1>
         <span>{`Total: ${resCalculateTime.horus} minutos`}</span>
         <button className="btn-yellow">Concluir</button>
       </div>
      )}
    </div>
  );
}
