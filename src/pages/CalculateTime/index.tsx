import { useState } from "react";
import "./style.scss";
import { FormTime } from "./FormTime";
import { Count } from "./Count";
import { ResCalculateTime } from "./ResCalculateTime";

interface ResCalculateTimeType {
  minutesDay: number,
  amoutPags: number,
  minutesTotal: number
  daysToRead: number
}

interface TimeType {
  minutes: number,
  seconds: number
}

export function CalculateTime() {
  const [step, setStep] = useState(1)

  const [resCalculateTime, setResCalculateTime] = useState<ResCalculateTimeType>({
    minutesDay: 0,
    amoutPags: 0,
    minutesTotal: 0,
    daysToRead: 0
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
        <ResCalculateTime resCalculateTime={resCalculateTime} />
      )}
    </div>
  );
}
