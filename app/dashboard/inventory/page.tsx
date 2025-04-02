import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { inventory } from "@/lib/mock-data"
import { Plus, Search, Filter, QrCode, Edit } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function InventoryPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const isAdmin = session.user.role === "admin"

  const getSupplyLevelBadge = (level: string) => {
    switch (level) {
      case "A":
        return <Badge className="bg-green-100 text-green-800">A</Badge>
      case "B":
        return <Badge className="bg-yellow-100 text-yellow-800">B</Badge>
      case "C":
        return <Badge className="bg-red-100 text-red-800">C</Badge>
      default:
        return <Badge>{level}</Badge>
    }
  }

  const isLowStock = (item: any) => {
    return item.quantity < item.minQuantity
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventario</h1>
          <p className="text-muted-foreground">Gestiona el inventario de perfiles PVC</p>
        </div>
        {isAdmin && (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Agregar Producto
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input placeholder="Buscar productos..." className="h-9" />
          <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
            <Search className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Buscar</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Nivel de suministro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              <SelectItem value="A">Nivel A</SelectItem>
              <SelectItem value="B">Nivel B</SelectItem>
              <SelectItem value="C">Nivel C</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Nivel</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Mínimo</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Última Actualización</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id} className={isLowStock(item) ? "bg-red-50" : undefined}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{getSupplyLevelBadge(item.supplyLevel)}</TableCell>
                <TableCell className={`text-right ${isLowStock(item) ? "font-bold text-red-600" : ""}`}>
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell className="text-right">
                  {item.minQuantity} {item.unit}
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <QrCode className="h-4 w-4" />
                  </Button>
                  {isAdmin && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

