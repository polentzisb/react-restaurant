import { Link } from 'react-router-dom';
import bannerImage from '../assets/img1.webp';
import { MenuList } from '../data/menulist';
import MenuItem from './menuitem';
import '../styles/home.css';

export default function Home() {
  return (
    <>
      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow"><span className="small-dot" /> UN POCO DE JAPÓN EN TU DÍA</span>
          <h1 id="hero-title">Un buen roll.<br />Un gran <em>día.</em></h1>
          <p>Sushi, bentos y una pausa para disfrutar.<br className="desktop-break" /> Encuentra tu próximo favorito en Wasabi.</p>
          <div className="hero-actions"><Link className="button" to="/menu">Explorar el menú <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/about">Conoce Wasabi <span aria-hidden="true">→</span></Link></div>
          <div className="hero-note"><span aria-hidden="true">✳</span><span>Rolls para compartir.<br />Bentos para disfrutar a tu manera.</span></div>
        </div>
        <div className="hero-visual"><img src={bannerImage} alt="Fachada de Wasabi Sushi & Bento, iluminada al atardecer" width="1600" height="1066" fetchpriority="high" /><div className="image-caption"><span>BIENVENIDO A WASABI</span><span aria-hidden="true">↗</span></div><div className="hero-stamp" aria-hidden="true">SUSHI<br /><span>&</span> BENTO</div></div>
      </section>
      <div className="flavor-strip" aria-label="Sushi, bento y opciones vegetarianas"><span>SUSHI ROLLS</span><span aria-hidden="true">✳</span><span>BENTO BOXES</span><span aria-hidden="true">✳</span><span>VEGGIE LOVE</span><span aria-hidden="true">✳</span><span>WASABI TIME</span></div>
      <section className="featured page-shell" aria-labelledby="featured-title">
        <div className="section-heading"><div><span className="eyebrow">ELIGE TU PRÓXIMO FAVORITO</span><h2 id="featured-title">Algo rico te espera.</h2></div><Link className="text-link" to="/menu">Ver toda la carta <span aria-hidden="true">↗</span></Link></div>
        <div className="menu-grid">{[MenuList[0], MenuList[3], MenuList[2]].map((item) => <MenuItem key={item.id} {...item} />)}</div>
        <p className="price-note">Precios del catálogo original expresados en USD.</p>
      </section>
      <section className="home-invitation page-shell"><span className="eyebrow">¿ALGO EN MENTE?</span><h2>Las buenas conversaciones<br />también abren el apetito.</h2><Link className="button button-light" to="/contact">Escríbenos <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
