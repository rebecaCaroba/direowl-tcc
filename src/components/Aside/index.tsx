import { Link } from 'react-router-dom'
import { useState } from 'react';
import './style.scss'
import { ImBooks } from "react-icons/im";
import { LuBookPlus } from "react-icons/lu";
import { GrCatalog } from "react-icons/gr";
import { AiOutlineBarChart } from 'react-icons/ai';
import logobranca from '../../assets/logobranca.svg'

export function Aside() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link: any) => {
    setActiveLink(link);

    const element = document.querySelector('#aside') as HTMLElement

    element.classList.toggle('active')
  };

  return (
    <aside id='aside'>
      <nav className="sidebar-nav">
        <div className="sidebar-logo">
          <Link className='links-sidebar' to="/library"><img src={logobranca} width={100} /></Link>
        </div>
        <ul>
          <li className={activeLink === 'library' ? 'active' : ''}>
            <Link
              onClick={() => handleLinkClick('library')}
              to="/library">
              <ImBooks size={24} />
              Estantes
            </Link>
          </li>
          <li className={activeLink === 'library/add-collection' ? 'active' : ''}>
            <Link
              onClick={() => handleLinkClick('library/add-collection')}
              to="/library/add-catalog">
              <GrCatalog size={24} />
              Adicionar catálogo
            </Link>
          </li>
          <li className={activeLink === '/library/add-book' ? 'active' : ''} >
            <Link
              onClick={() => handleLinkClick('/library/add-book')}
              to="/library/add-book">
              <LuBookPlus size={24} />
              Adicionar livro
            </Link>
          </li>
          <li className={activeLink === '/library/dashboards' ? 'active' : ''}>
            <Link
              onClick={() => handleLinkClick('/library/dashboards')}
              to="/library/dashboards">
              <AiOutlineBarChart size={24} />
              Painéis
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}