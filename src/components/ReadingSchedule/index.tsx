import { FaPlayCircle } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import './style.scss'
import { useEffect, useRef, useState } from "react";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";

interface TimelineProps {
    bookId: string | undefined
}

interface ScheduleEntry {
    schedule_id: number
    book_id: number
    dayread_id: number
    day: number
    is_read: boolean
    last_day_read: number
    minutes_per_day: number
    seconds: number
    total_days: number
}

export function ReadingSchedule({ bookId }: TimelineProps) {

    const [schedule, setSchedule] = useState<ScheduleEntry[]>([])
    const [teste, setTeste] = useState<number>(0)
    const [time, setTime] = useState<number>(() => {
        const savedTime = localStorage.getItem('timer')
        return savedTime ? JSON.parse(savedTime) : 0
    })
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const timerRef = useRef<number | null>(null)

    useEffect(() => {
        async function getSchedule(bookId: string | undefined) {
            const token = localStorage.getItem('token')

            try {
                const bookIdNumber = Number(bookId)
                const response = await api.get(`get-schedule/${bookIdNumber}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setSchedule(response.data.result)
            } catch (err) {
                if (err instanceof AxiosError && err?.response?.data?.message) {
                    alert(err.response.data.message)
                    return
                }
                console.log(err)
            }
        }

        getSchedule(bookId)

    }, [bookId, teste])


    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1
                    localStorage.setItem('timer', JSON.stringify(newTime))
                    return newTime
                })
            }, 1000)
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [isRunning])

    const handleStart = () => {
        setIsRunning(true)
        localStorage.setItem('isRunning', JSON.stringify(true))
    }

    async function day() {
        api.get('/put-day-read')
            .then(res => console.log(res))
    }

    const handleStop = async () => {
        setIsRunning(false)

        if (time >= (schedule[0].minutes_per_day * 60)) {
            await day()
        }

        if (timerRef.current !== null) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }

    const formatTime = (timeInSeconds: number): string => {
        const hours = Math.floor(timeInSeconds / 3600)
        const minutes = Math.floor((timeInSeconds % 3600) / 60)
        const seconds = timeInSeconds % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    async function handleCompleted( dayRead: number, timeInSeconds: number, dayreadId: number): Promise<void> {
        // const minutes = Math.floor((timeInSeconds % 3600) / 60)

        try {

            // if(timeInSeconds) {
            const token = localStorage.getItem('token')
            await api.post('/completed-day', {
                timeInSeconds,
                is_read: true,
                dayreadId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            await api.post('/create-dayRead', {
                schedule_id: schedule[0].schedule_id,
                day: dayRead + 1,
                seconds: 0,
                is_read: false,
            })

            localStorage.removeItem('timer')
            setTime(0)
            const n = Math.random()
            setTeste(n)

            // } else {
            // alert(`Leia por no mínimo ${timeline[0].minutes_per_day} minutos`)
            // return
            // }
        } catch (err) {
            console.log(err)
        }

    }

    console.log({ schedule })

    return (
        <>
            <h1>Cronograma</h1>
            {schedule.length > 0 ? (
                schedule.map((item, index) => (
                    <section className="timeline" key={index} >
                        <div className={`timeline-container ${item.is_read == true ? 'isread' : ''}`}>
                            <div className={`${!item.is_read ? 'timeline-line-no-read' : 'timeline-line-read'}`}>
                                <button onClick={() => handleCompleted(item.day, time, item.dayread_id)}>oi</button>
                            </div>
                            <div className="timeline-day ">
                                <span>Dia</span>
                                <h1>{item.day}</h1>
                            </div>
                            <div className="timeline-info ">
                                <div className="timeline-text">
                                    <h2>Página 1 a 5</h2>
                                    <p>Leia por no mínimo {item.minutes_per_day} minutos</p>
                                </div>

                                <div className="timeline-timer">
                                    {item.is_read == false ? (
                                        !isRunning ? (
                                            <button onClick={handleStart}>
                                                <FaPlayCircle />
                                            </button>

                                        ) : (
                                            <button onClick={handleStop}>
                                                <FaRegStopCircle />
                                            </button>
                                        )
                                    ) : (
                                        <button>
                                            <FaPlayCircle />
                                        </button>
                                    )}
                                    <span>{item.seconds ? formatTime(item.seconds) : formatTime(time)}</span>
                                </div>
                            </div>
                        </div>
                        <br /><br />
                    </section>
                ))
            ) : (
                <h2>Crie uma rotina de leitura :)</h2>
            )}
        </>
    )
}