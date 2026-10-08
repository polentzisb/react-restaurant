import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="site-footer"><div className="footer-inner"><Link className="brand footer-brand" to="/" aria-label="Wasabi, inicio"><span className="brand-mark" aria-hidden="true">w.</span><span>wasabi<small>SUSHI & BENTO</small></span></Link><p>Un buen roll. Un gran día.</p><nav aria-label="Navegación del pie de página"><Link to="/menu">Menú</Link><Link to="/about">Nosotros</Link><Link to="/contact">Contacto</Link></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Wasabi Sushi & Bento</span><span>Hecho para disfrutar.</span></div></footer>
  );
}
