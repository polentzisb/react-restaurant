import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function NavbarMain() {
  const [openPath, setOpenPath] = useState(null);
  const { pathname } = useLocation();
  const open = openPath === pathname;
  const close = () => setOpenPath(null);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" onClick={close} aria-label="Wasabi, inicio"><span className="brand-mark" aria-hidden="true">w.</span><span>wasabi<small>SUSHI & BENTO</small></span></Link>
        <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpenPath(open ? null : pathname)}>{open ? 'Cerrar' : 'Menú'} <span aria-hidden="true">{open ? '×' : '☰'}</span></button>
        <nav id="main-navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label="Navegación principal" onKeyDown={(event) => { if (event.key === 'Escape') close(); }}>
          <NavLink to="/" end onClick={close}>Inicio</NavLink>
          <NavLink to="/menu" onClick={close}>Nuestro menú</NavLink>
          <NavLink to="/about" onClick={close}>Nosotros</NavLink>
          <NavLink to="/contact" className="nav-contact" onClick={close}>Hablemos <span aria-hidden="true">↗</span></NavLink>
        </nav>
      </div>
    </header>
  );
}
