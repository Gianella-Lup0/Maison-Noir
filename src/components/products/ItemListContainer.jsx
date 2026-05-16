import { useState, useEffect } from 'react'
import ItemList from './ItemList'
import './ItemListContainer.css'

export default function ItemListContainer() {
  const [todosLosProductos, setTodosLosProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('Todos')

  // Carga de datos desde JSON local con useEffect + fetch
  useEffect(() => {
    fetch('/productos.json')
      .then(res => res.json())
      .then(data => {
        setTodosLosProductos(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error cargando productos:', err)
        setLoading(false)
      })
  }, [])

  // Lógica de filtrado — se queda en el Container
  const categorias = ['Todos', ...new Set(todosLosProductos.map(p => p.categoria))]
  const productosFiltrados = filtro === 'Todos'
    ? todosLosProductos
    : todosLosProductos.filter(p => p.categoria === filtro)

  if (loading) {
    return (
      <div className="ilc__loading">
        <div className="ilc__spinner" />
        <p>Cargando colección...</p>
      </div>
    )
  }

  // ItemListContainer delega el render a ItemList
  return (
    <ItemList
      productos={productosFiltrados}
      filtro={filtro}
      onFiltroChange={setFiltro}
      categorias={categorias}
    />
  )
}
