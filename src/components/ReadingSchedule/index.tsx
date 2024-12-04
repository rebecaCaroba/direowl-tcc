import { FaPlayCircle } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { api } from "../../lib/axios";
import { useNavigate } from 'react-router-dom';
import { AxiosError } from "axios";
import confetti from 'canvas-confetti';
import './style.scss'
import { TooltipContext } from "../../context/TooltipContext";
import { DeleteScheduleBtn } from "./DeleteScheduleBtn";
import { ScheduleContext } from "../../context/ScheduleContext";
import corujaLendo from '../../assets/corujalendo.svg'

interface TimelineProps {
    bookId: string | undefined
    book: {
        title: string,
        author: string[],
        publisher: string,
        publishedDate: string,
        pages: number,
        description: string,
        imageLinks?: string,
        isbn?: number | string
    }
}

export function ReadingSchedule({ bookId, book }: TimelineProps) {
    const navigate = useNavigate()
    const { schedule, getSchedule } = useContext(ScheduleContext)

    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)
    const [time, setTime] = useState<number>(() => {
        const savedTime = localStorage.getItem(`timer-${bookId}`)
        return savedTime ? JSON.parse(savedTime) : 0
    })
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const timerRef = useRef<any>(null)


    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1
                    localStorage.setItem(`timer-${bookId}`, JSON.stringify(newTime))
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
    }, [isRunning, bookId])

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
                const response = await api.put('/completed-schedule', {
                    schedule_id: schedule[0].schedule_id,
                    complete: true
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                if (response.data.message) {
                    TextTooltip(response.data.message)
                    ShowTooltip(true)
                }

                confetes()
            } else {
                await api.post('/create-dayRead', {
                    schedule_id: schedule[0].schedule_id,
                    day: dayRead + 1,
                    seconds: 0,
                    is_read: false,
                })
            }

            localStorage.removeItem(`timer-${bookId}`)
            setTime(0)

            await getSchedule(bookId)
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }

        }

    }

    async function confetes() {
        // Configurações para o confete
        const params = {
            particleCount: 1000,
            spread: 1000,
            startVelocity: 150,
            origin: { x: 0.000000001, y: 0.000000001 },
            angle: 90
        };

        // Joga confetes da esquerda para a direita
        params.origin.y = 1;
        params.angle = 360;
        confetti(params);

        // Joga confetes da direita para a esquerda
        params.origin.x = 1;
        params.angle = 175;
        confetti(params);
    }

    return (
        <div>
            {schedule.length > 0 ? ((
                <>
                    <div className="title">
                        <h1>Cronograma de {schedule[0].total_days} dia(s)</h1>
                    </div>
                    {schedule.map((item, index) => (
                        <section className="timeline" key={index} >
                            <div className={`timeline-container ${item.is_read == true ? 'isread' : ''}`}>
                                <div className="timeline-day ">
                                    <span>Dia</span>
                                    <h1>{item.day}</h1>
                                </div>
                                <div className="timeline-info ">
                                    <div className="timeline-text">
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
                    ))}
                    <div className="btn-schedule">
                        <DeleteScheduleBtn schedule_id={schedule[0].schedule_id} />
                    </div>
                </>
            )
            ) : (
                <div className="create-read">
                    <article onClick={() => { navigate(`/calculate-time/${bookId}/${book.pages}`) }}>
                        <img src={corujaLendo} alt="" />
                        <h1 className='text-yellow'>Que tal criar uma rotina de leitura?</h1>
                    </article>
                </div>
            )}
        </div>
    )
}
