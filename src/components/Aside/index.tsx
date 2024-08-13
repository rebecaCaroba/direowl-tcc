import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { ImBooks } from "react-icons/im";
import { LuBookPlus } from "react-icons/lu";
import { GrCatalog } from "react-icons/gr";
import { AiOutlineBarChart } from 'react-icons/ai';
import logobranca from '../../assets/logobranca.svg'
import { IoPersonCircle } from 'react-icons/io5';
import './style.scss'
import { UserContext } from '../../context/UserContext.tsx';


export function Aside() {
  const [activeLink, setActiveLink] = useState(null)
  const { user } = useContext(UserContext)

  const handleLinkClick = (link: any) => {
    setActiveLink(link)

    const element = document.querySelector('#aside') as HTMLElement

    element.classList.toggle('active')
  };

  return (
    <aside id='aside'>
      <nav className="sidebar-nav">
        <div className="sidebar-logo">
          <Link className='links-sidebar' to="/library"><img src={logobranca} width={55} /></Link>
        </div>
        <ul>
          <li className={activeLink === 'library' ? 'active' : ''}>
            <Link
              onClick={() => handleLinkClick('library')}
              to="/library">
              <ImBooks size={26} />
              Estantes
            </Link>
          </li>
          <li className={activeLink === 'library/add-collection' ? 'active' : ''}>
            <Link
              onClick={() => handleLinkClick('library/add-collection')}
              to="/library/add-catalog">
              <GrCatalog size={26} />
              Adicionar catálogo
            </Link>
          </li>
          <li className={activeLink === '/library/add-book' ? 'active' : ''} >
            <Link
              onClick={() => handleLinkClick('/library/add-book')}
              to="/library/add-book">
              <LuBookPlus size={26} />
              Adicionar livro
            </Link>
          </li>
          <li className={activeLink === '/library/profile' ? 'active' : ''}>
            <Link
              onClick={() => handleLinkClick('/library/profile')}
              to="/library/profile">
              <IoPersonCircle size={26} />{user?.name}
            </Link>
          </li>
        </ul>
      </nav>

    </aside>
  )
}