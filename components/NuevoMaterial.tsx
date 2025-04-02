import { useState } from "react"
import { createItemInventario } from "@/lib/api/inventario"

export default function NuevoMaterial({ onClose, onMaterialCreado }) {
  const [codigo, setCodigo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [largo, setLargo] = useState(0)
  const [stock, setStock] = useState(0)
  const [stockMinimo, setStockMinimo] = useState(0)
  const [nivel, setNivel] = useState("")
  const [ubicacion, setUbicacion] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createItemInventario({
      codigo,
      descripcion,
      largo,
      stock,
      stockMinimo,
      nivel,
      ubicacion,
    })
    onClose() // Cerrar el modal
    onMaterialCreado() // Actualizar la lista de materiales
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Código"
      />
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
      />
      <input
        type="number"
        value={largo}
        onChange={(e) => setLargo(parseFloat(e.target.value))}
        placeholder="Largo"
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(parseInt(e.target.value))}
        placeholder="Stock"
      />
      <input
        type="number"
        value={stockMinimo}
        onChange={(e) => setStockMinimo(parseInt(e.target.value))}
        placeholder="Stock mínimo"
      />
      <input
        type="text"
        value={nivel}
        onChange={(e) => setNivel(e.target.value)}
        placeholder="Nivel"
      />
      <input
        type="text"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        placeholder="Ubicación"
      />
      <button type="submit">Guardar</button>
    </form>
  )
}
