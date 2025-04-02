import { useState } from "react"
import { createOrden } from "@/lib/api/ordenes"

export default function NuevaOrden({ onClose, onOrdenCreada }) {
  const [proveedor, setProveedor] = useState("")
  const [proyecto, setProyecto] = useState("")
  const [estado, setEstado] = useState("")
  const [total, setTotal] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createOrden({
      proveedor,
      proyecto,
      estado,
      total: parseFloat(total),
    })
    onClose() // Cerrar el modal
    onOrdenCreada() // Actualizar la lista de órdenes
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={proveedor}
        onChange={(e) => setProveedor(e.target.value)}
        placeholder="Proveedor"
      />
      <input
        type="text"
        value={proyecto}
        onChange={(e) => setProyecto(e.target.value)}
        placeholder="Proyecto"
      />
      <input
        type="text"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        placeholder="Estado"
      />
      <input
        type="number"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        placeholder="Total"
      />
      <button type="submit">Guardar</button>
    </form>
  )
}
