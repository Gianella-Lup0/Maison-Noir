import Item from './Item'
import './ItemList.css'

export default function ItemList({ productos, filtro, onFiltroChange, categorias }) {
  return (
    <section className="ilc">
      <div className="ilc__hero">
        <p className="ilc__season">Automne — Hiver 2026</p>
        <h1 className="ilc__title">La Colección</h1>
        <p className="ilc__subtitle">{productos.length} piezas. Una visión.</p>
      </div>

      <div className="ilc__filters">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`ilc__filter ${filtro === cat ? 'active' : ''}`}
            onClick={() => onFiltroChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="ilc__grid">
        {productos.map(producto => (
          <Item key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  )
}
