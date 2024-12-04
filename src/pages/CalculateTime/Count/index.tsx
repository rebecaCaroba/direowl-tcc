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

    function handleNext() {
        if(time.minutes >= 1) {
            setStep(2) 
        }

        return
    }

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
        }, 1000)
    }

    const handleStop = () => {
        if (intervalRef.current !== null) {
            setBtnDisable(false)
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    const formatUnit = (unit: number) => unit < 10 ? `0${unit}` : `${unit}`;

    const [minuteTens, minuteOnes] = formatUnit(time.minutes).split('');
    const [secondTens, secondOnes] = formatUnit(time.seconds).split('');

    return (
        <>
            <div className="time-title">
                <h1>Livros em mãos?</h1>
                <span>Leia algumas páginas por no mínimo 1 minuto, desconciderando sumários e agradecimentos</span>
            </div>
            <div className='time'>
                <span>{minuteTens}</span>
                <span>{minuteOnes}</span>
                <div className="count-separator">:</div>
                <span>{secondTens}</span>
                <span>{secondOnes}</span>
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
            <button className="btn-yellow" disabled={btnDisable} onClick={handleNext}>Próximo</button>
        </>
    )
}