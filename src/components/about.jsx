import { Link } from 'react-router-dom';
import img2 from '../assets/img2.webp';
import '../styles/about.css';

export default function About() {
  return (
    <section className="about-page page-shell" aria-labelledby="about-title">
      <div className="about-image"><img src={img2} alt="Cocineros preparando platos detrás de una barra de sushi" width="1200" height="1680" decoding="async" /><span className="image-caption">UN LUGAR PARA DISFRUTAR</span></div>
      <div className="about-copy"><span className="eyebrow">HOLA, SOMOS WASABI</span><h1 id="about-title">Pequeñas pausas.<br /><em>Grandes sabores.</em></h1><p>Un almuerzo a tu ritmo. Un encuentro con amigos. Ese antojo de sushi que no necesita una ocasión especial.</p><p>En Wasabi, la carta reúne sushi rolls y bento boxes para que encuentres una opción para cada momento. Explora los clásicos, descubre los bentos y elige tu favorito.</p><div className="about-details"><div><span>01</span><h2>Sushi rolls</h2><p>Un clásico para disfrutar y compartir.</p></div><div><span>02</span><h2>Bento boxes</h2><p>Una alternativa para cambiar la rutina.</p></div></div><Link className="button" to="/menu">Conoce nuestra carta <span aria-hidden="true">↗</span></Link></div>
    </section>
  );
}
