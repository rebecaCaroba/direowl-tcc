import { AxiosError } from "axios";
import { createContext, ReactNode, useState } from "react";
import { api } from "../../lib/axios";

interface ScheduleContextProviderProps {
    children: ReactNode
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


interface ScheduleContextType {
    getSchedule: (bookId: string | undefined) => Promise<void>
    schedule: ScheduleEntry[]
    setSchedule: React.Dispatch<React.SetStateAction<ScheduleEntry[]>>
}

export const ScheduleContext = createContext({} as ScheduleContextType)

export function ScheduleContextProvider({
    children
}: ScheduleContextProviderProps) {
    const [schedule, setSchedule] = useState<ScheduleEntry[]>([])

    async function getSchedule(bookId: string | undefined) {

        try {
            const bookIdNumber = Number(bookId)
            const response = await api.get(`get-schedule/${bookIdNumber}`)
            setSchedule(response.data.result)
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                
                return
            }
            
        }
    }


    return (
        <ScheduleContext.Provider value={{
            getSchedule,
            setSchedule,
            schedule,
        }}
        >
            {children}
        </ScheduleContext.Provider>
    )
}