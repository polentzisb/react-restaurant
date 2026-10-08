import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import NavbarMain from './components/navbar';
import Footer from './components/footer';

const About = lazy(() => import('./components/about'));
const Menu = lazy(() => import('./components/menu'));
const Contact = lazy(() => import('./components/contact'));
const titles = { '/': 'Sushi & Bento', '/menu': 'Nuestro menú', '/about': 'Nosotros', '/contact': 'Contacto' };

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = `Wasabi · ${titles[pathname] || 'Página no encontrada'}`;
    window.scrollTo(0, 0);
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

function NotFound() {
  return <div className="page-shell empty-state"><span className="eyebrow">404 · Un pequeño desvío</span><h1>Este plato no está en la carta.</h1><p>La página que buscas no existe. Sigamos con algo rico.</p><Link className="button" to="/menu">Explorar el menú <span aria-hidden="true">↗</span></Link></div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <a className="skip-link" href="#main-content">Saltar al contenido</a>
        <NavbarMain />
        <main id="main-content" tabIndex={-1}>
          <Suspense fallback={<div className="page-shell" role="status">Cargando…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <RouteEffects />
      </div>
    </BrowserRouter>
  );
}
