import { Link } from 'react-router-dom';

const priceFormatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'USD', currencyDisplay: 'code' });

export default function MenuItem({ image, name, price, category }) {
  return (
    <article className="menu-card">
      <div className="menu-image"><img src={image} alt={name} loading="lazy" decoding="async" width="640" height="480" /><span className="category-label">{category === 'bento' ? 'Bento box' : 'Sushi roll'}</span></div>
      <div className="menu-card-info"><h3>{name}</h3><p>{priceFormatter.format(price)}</p><Link className="dish-link" to="/contact" state={{ dish: name }} aria-label={`Consultar por ${name}`}><span aria-hidden="true">↗</span></Link></div>
    </article>
  );
}
