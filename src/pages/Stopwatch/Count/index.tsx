import './style.scss'

export function Count() {
    return (
            <div className="count-content">
            <span>{0}</span>
            <span>{0}</span>
            <div className="count-separator">:</div>
            <span>{0}</span>
            <span>{0}</span>
            </div>
    )
}