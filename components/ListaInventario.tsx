import { useState } from "react"
import { updateStock } from "@/lib/api/inventario"

export default function ListaInventario({ inventario, onStockActualizado }) {
  const [editandoId, setEditandoId] = useState(null)
  const [nuevoStock, setNuevoStock] = useState(0)

  const handleEditClick = (item) => {
    setEditandoId(item.id)
    setNuevoStock(item.stock)
  }

  const handleSave = async () => {
    await updateStock(editandoId, nuevoStock)
    setEditandoId(null) // Cerrar el input/modal
    onStockActualizado() // Refrescar la lista de inventario
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Descripción</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {inventario.map((item) => (
          <tr key={item.id}>
            <td>{item.codigo}</td>
            <td>{item.descripcion}</td>
            <td>
              {editandoId === item.id ? (
                <input
                  type="number"
                  value={nuevoStock}
                  onChange={(e) => setNuevoStock(parseInt(e.target.value))}
                />
              ) : (
                item.stock
              )}
            </td>
            <td>
              {editandoId === item.id ? (
                <button onClick={handleSave}>Guardar</button>
              ) : (
                <button onClick={() => handleEditClick(item)}>Editar stock</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
