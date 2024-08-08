import { useRef, useState } from "react"
import { TbHandStop } from "react-icons/tb";

interface TimeType {
    minutes: number,
    seconds: number
}

interface CountProps {
    setTime: React.Dispatch<React.SetStateAction<TimeType>>
    time: TimeType
    setStep: React.Dispatch<React.SetStateAction<number>>
}

export function Count({ setTime, time, setStep }: CountProps) {
    const [btnDisable, setBtnDisable] = useState(true)
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
        <>
            <div className='time'>
                {time.minutes < 10 ? (
                    <>
                    <span>0</span>
                    <span>{`${time.minutes}`}</span>
                    </>
                )
                  : (
                    <span>{`${time.minutes}`}</span>
                  )}
                <div className="count-separator">:</div>
                {time.seconds < 10 ? (
                    <>
                    <span>0</span>
                    <span>{`${time.seconds}`}</span>
                    </>
                )
                  : (
                    <span>{`${time.seconds}`}</span>
                  )}
            </div>
            <div className='count-container-button'>
                <button className="btn-yellow" onClick={handleStart}>
                    Começar
                </button>
                <button className="btn-red" onClick={handleStop}>
                    <TbHandStop size={24} />
                    Interromper
                </button>
            </div>
            <button className="btn-yellow" disabled={btnDisable} onClick={() => { setStep(2) }}>Próximo</button>
        </>
    )
}