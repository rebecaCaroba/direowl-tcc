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
    id: number
    book_id: number
    user_id: number
    total_days: number
    pages_per_day: number
    minutes_per_day: number
    total_pages: number
    last_day_read: number
    created_at: string
}

export function ReadingSchedule({ bookId }: TimelineProps) {

    const [schedule, setSchedule] = useState<ScheduleEntry[]>([])
    const [time, setTime] = useState<number>(() => {
        const savedTime = localStorage.getItem('timer')
        return savedTime ? JSON.parse(savedTime) : 0
    })
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const timerRef = useRef<number | null>(null)

    useEffect(() => {
        async function GetTimeline(bookId: string | undefined) {
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

        GetTimeline(bookId)

    }, [bookId])


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

    const handleStop = () => {
        setIsRunning(false)

        if(time >= (schedule[0].minutes_per_day * 60)) {
            day()       
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

    // async function handleCompleted(dayRead, timeInSeconds): any {
    //     const minutes = Math.floor((timeInSeconds % 3600) / 60)

    //     if(timeInSeconds) {
    //         const token = localStorage.getItem('token')
    //         const response = await api.post('/completed-timeline', {
    //             dayRead: dayRead + 1,
    //             timeInSeconds,
    //             bookId
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })

    //         localStorage.removeItem('timer')
    //         setTime(0)
    //         setSchedule(response.data.result)
    //     } else {
    //         alert(`Leia por no mínimo ${timeline[0].minutes_per_day} minutos`)
    //         return
    //     }
    // }

    console.log({schedule})

    return (
        <>
            <h1>Cronograma</h1>
            {schedule.length > 0 ? (
                <section className="timeline">
                    <div className="timeline-container">
                        <div className="timeline-day">
                            <span>Dia</span>
                            <h1>{ schedule[0].last_day_read + 1 }</h1>
                        </div>
                        <div className="timeline-info">
                            <div className="timeline-text">
                                <h2>Página 1 a 5</h2>
                                <p>Leia por no mínimo {schedule[0].minutes_per_day} minutos</p>
                            </div>

                            <div className="timeline-timer">

                                {
                                    isRunning == false ? (
                                        <button onClick={handleStart}>
                                            <FaPlayCircle />
                                        </button>

                                    ) : (
                                        <button onClick={handleStop}>
                                            <FaRegStopCircle />
                                        </button>
                                    )
                                }
                                <span>{formatTime(time)}</span>
                            </div>

                        </div>
                    </div>
                    <br /><br />
                </section>
            ) : (
                <h2>Crie uma rotina de leitura :)</h2>
            )}
        </>
    )
}