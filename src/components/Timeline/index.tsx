import { FaPlayCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import './style.scss'

export function Timeline() {
    return (
        <>
            <h1>Cronograma</h1>
            <section className="timeline">
                <div className="timeline-container">
                    <div className="timeline-day">
                        <span>dia</span>
                        <h1>01</h1>
                        <button>
                            <FaBookmark />
                        </button>
                    </div>
                    <div className="timeline-info">
                        <div className="timeline-text">
                            <h2>Página 1 a 5</h2>
                            <p>Leia por no mínimo 4 minutos</p>
                        </div>
                        <div className="timeline-timer">
                            <button>
                                <FaPlayCircle />
                            </button>
                            <span>00:00</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}