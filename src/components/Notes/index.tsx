import './style.scss'

interface PropsNotes {
    bookId: number
}

export function Notes({ bookId }: PropsNotes) {

    async function handleDeleteNote(data: number) {
        console.log(data, bookId)
    }

    return (
        <div className="Notes">
            <div className="title">
                <h1>Notas</h1>
            </div>
            <div className="notes-container">
                <div className="notes-content">
                    <header>
                        <data value="">30/07/2007</data>
                        <button onClick={() => handleDeleteNote(1)}>x</button>
                    </header>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga esse, quasi eius ratione nobis quia mollitia placeat blanditiis consectetur quaerat ex sequi minima rerum neque sit obcaecati. Vel, magnam nisi.
                    </p>
                </div>
            </div>
        </div>
    )
}