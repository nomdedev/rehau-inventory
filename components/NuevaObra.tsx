import { useState } from "react"
import { createObra } from "@/lib/api/obras"

export default function NuevaObra({ onClose, onObraCreada }) {
  const [nombre, setNombre] = useState("")
  const [cliente, setCliente] = useState("")
  const [direccion, setDireccion] = useState("")
  const [estado, setEstado] = useState("")
  const [fechaInput, setFechaInput] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createObra({
      nombre,
      cliente,
      direccion,
      estado,
      fecha: new Date(fechaInput),
    })
    onClose() // Cerrar el modal
    onObraCreada() // Actualizar la lista de obras
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="text"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        placeholder="Cliente"
      />
      <input
        type="text"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        placeholder="Dirección"
      />
      <input
        type="text"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        placeholder="Estado"
      />
      <input
        type="date"
        value={fechaInput}
        onChange={(e) => setFechaInput(e.target.value)}
        placeholder="Fecha"
      />
      <button type="submit">Guardar</button>
    </form>
  )
}
