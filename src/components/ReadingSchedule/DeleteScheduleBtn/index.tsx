import { useCallback, useContext } from 'react'
import { api } from '../../../lib/axios'
import { NotificationModalContext } from '../../../context/NotificationModalContext'
import { TooltipContext } from '../../../context/TooltipContext'
import './style.scss'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

interface DeleteScheduleBtnProps {
    schedule_id: number
}

export function DeleteScheduleBtn({schedule_id}: DeleteScheduleBtnProps) {
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)
    const { messageModal, showModal } = useContext(NotificationModalContext)
    const navigate = useNavigate()

    const handleDeleteSchedule = useCallback( async () => {
        console.log(schedule_id)
        try {
            const response = await api.delete(`/delete-schedule/${schedule_id}`)

            if (response.data.message) {
                TextTooltip(response.data.message)
                ShowTooltip(true)
            }

            navigate('/library')

        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }
            console.log(err)
        }
    }, [schedule_id])

    function confirmDelete() {
        messageModal('Você tem certeza que quer desistir do cronograma?')
        showModal(handleDeleteSchedule)
    }

    return (
        <div>
            <button onClick={confirmDelete} className="btn-delete">Desistir</button>
        </div>
    )
}