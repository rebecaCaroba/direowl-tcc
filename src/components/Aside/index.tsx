import { Link } from 'react-router-dom'
import { useState } from 'react';
import './style.scss'

export function Aside() {
    const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link: any) => {
    setActiveLink(link);
  };

    return (
    <aside>
        <div className="sidebar-logo">
            <Link to="/library"><h2>Logo</h2></Link>
        </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link
            className={activeLink === 'library' ? 'active' : ''}
            onClick={() => handleLinkClick('library')}
            to="/library">Página inicial</Link>
          </li>
          <li>
            <Link
            className={activeLink === 'library/add-collection' ? 'active' : ''}
            onClick={() => handleLinkClick('library/add-collection')} 
            to="/library/add-catalog">Adicionar catálogo</Link>
          </li>
          <li>
            <Link
            className={activeLink === '/library/add-book' ? 'active' : ''}
            onClick={() => handleLinkClick('/library/add-book')} 
            to="/library/add-book">Adicionar livro</Link>
          </li>
          <li>
            <Link
            className={activeLink === '/library/dashboards' ? 'active' : ''}
            onClick={() => handleLinkClick('/library/dashboards')} 
            to="/library/dashboards">Painéis</Link>
          </li>
        </ul>
      </nav>
    </aside>
    )
}