import sherlock from '../../../assets/sherlock.jpg'
import { RiTimerLine } from "react-icons/ri";
import './style.scss'
import { Timeline } from '../../../components/Timeline';

export function Book() {
    return (
        <main className='book'>
            <section className='book-container'>
                <div className='book-info'>
                    <h1 className='text-yelow'>Sherlock - O retorno de Sherlock Holmes</h1>
                    <cite>By Arthur Conan Doyle</cite> <span>&nbsp;&nbsp;&nbsp; Editora BOD GmbH DE</span>
                    <span className='timer'><RiTimerLine /> 18 horas e 30 mins</span>

                    <p>O criador da série Mark Gatiss; Sherlock Holes, elementar meu caro Watson, o lendário detetive retorna em sua aventura mais eletrizante e o texto vem acompanhado de uma introdução escrita por Mark Gatiss</p>

                    <div className="book-btn">
                        <button className='button-ler'>LER AGORA</button>
                        <button className='button-fav'>ADICIONAR AOS FAVORITOS</button></div>
                    </div>
                <div className="book-image">
                    <img src={sherlock} alt="" />
                </div>
            </section>
            
            <Timeline />
        </main>
    )
}