import { useState } from 'react';
import { MenuList } from '../data/menulist';
import MenuItem from './menuitem';
import '../styles/menu.css';

const categories = [{ id: 'all', label: 'Toda la carta' }, { id: 'sushi', label: 'Sushi rolls' }, { id: 'bento', label: 'Bento boxes' }];
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export default function Menu() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const items = MenuList.filter((item) => (category === 'all' || item.category === category) && normalize(item.name).includes(normalize(query)));
  return (
    <section className="menu-page page-shell" aria-labelledby="menu-title">
      <div className="page-intro"><span className="eyebrow">PARA CADA ANTOJO, UN FAVORITO</span><h1 id="menu-title">Hoy se come <em>rico.</em></h1><p>Un roll, un bento o un poco de ambos. Tú eliges.</p></div>
      <div className="menu-toolbar"><div className="category-filters" role="group" aria-label="Filtrar por categoría">{categories.map(({ id, label }) => <button type="button" key={id} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}</button>)}</div><div className="search-field"><label className="sr-only" htmlFor="menu-search">Buscar un plato</label><span aria-hidden="true">⌕</span><input id="menu-search" type="search" placeholder="Encuentra tu favorito…" value={query} onChange={(event) => setQuery(event.target.value)} /></div></div>
      <p className="result-count" role="status">{items.length} {items.length === 1 ? 'plato para disfrutar' : 'platos para disfrutar'}</p>
      {items.length ? <div className="menu-grid">{items.map((item) => <MenuItem key={item.id} {...item} />)}</div> : <div className="empty-state"><h2>No encontramos ese plato.</h2><p>Prueba con otro nombre o vuelve a explorar la carta.</p><button className="button" type="button" onClick={() => { setQuery(''); setCategory('all'); }}>Ver todos los platos</button></div>}
      <p className="price-note">Precios del catálogo original expresados en USD. Puedes consultar disponibilidad desde cada plato.</p>
    </section>
  );
}
