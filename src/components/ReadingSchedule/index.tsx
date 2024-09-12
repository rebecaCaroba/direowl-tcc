import { FaPlayCircle } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { api } from "../../lib/axios";
import { AxiosError } from "axios";
import './style.scss'

interface TimelineProps {
    bookId: string | undefined
}

interface ScheduleEntry {
    schedule_id: number
    book_id: number
    dayread_id: number
    total_days: number
    total_minutes: number
    day: number
    is_read: boolean
    last_day_read: number
    minutes_per_day: number
    seconds: number
}

export function ReadingSchedule({ bookId, }: TimelineProps) {

    const [schedule, setSchedule] = useState<ScheduleEntry[]>([])
    const [time, setTime] = useState<number>(() => {
        const savedTime = localStorage.getItem('timer')
        return savedTime ? JSON.parse(savedTime) : 0
    })
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const timerRef = useRef<number | null>(null)

    useEffect(() => {
        getSchedule(bookId)

    }, [bookId])


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
                console.log(err)
                return
            }
            console.log(err)
        }
    }

    async function handleCompleted(dayRead: number, timeInSeconds: number, dayreadId: number): Promise<void> {
        try {
            const token = localStorage.getItem('token')
            await api.patch('/completed-day', {
                timeInSeconds,
                is_read: true,
                dayreadId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (dayRead == schedule[0].total_days) {
                console.log(schedule[0].schedule_id)

                await api.put('/completed-schedule', {
                    schedule_id: schedule[0].schedule_id,
                    complete: true
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                alert('parabens!')
            }else {
                await api.post('/create-dayRead', {
                    schedule_id: schedule[0].schedule_id,
                    day: dayRead + 1,
                    seconds: 0,
                    is_read: false,
                })
            }

            localStorage.removeItem('timer')
            setTime(0)

            await getSchedule(bookId)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1
                    localStorage.setItem('timer', JSON.stringify(newTime))
                    return newTime
                })
            }, 10)
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

    const handleStop = async (timeInSeconds: number, dayRead: number, dayreadId: number) => {
        setIsRunning(false)

        if (timerRef.current !== null) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }

        const minutes = Math.floor((timeInSeconds % 3600) / 60)

        if (minutes >= schedule[0].minutes_per_day) {
            await handleCompleted(dayRead, timeInSeconds, dayreadId)
        }
    }

    const formatTime = (timeInSeconds: number): string => {
        const hours = Math.floor(timeInSeconds / 3600)
        const minutes = Math.floor((timeInSeconds % 3600) / 60)
        const seconds = timeInSeconds % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <>
            <h1>Cronograma</h1>
            {schedule.length > 0 ? (
                schedule.map((item, index) => (
                    <section className="timeline" key={index} >
                        <div className={`timeline-container ${item.is_read == true ? 'isread' : ''}`}>
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
                                            <button onClick={() => handleStop(
                                                time,
                                                item.day,
                                                item.dayread_id,
                                            )}>
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
