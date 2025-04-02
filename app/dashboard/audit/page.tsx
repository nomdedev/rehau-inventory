import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { auditLogs } from "@/lib/mock-data"
import { Search, Filter, Download } from "lucide-react"

export default async function AuditPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Auditoría</h1>
          <p className="text-muted-foreground">Registro de actividades en el sistema</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input placeholder="Buscar actividades..." className="h-9" />
          <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
            <Search className="h-4 w-4" />
            <span className="ml-2 hidden lg:inline">Buscar</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-9 w-[180px]">
              <SelectValue placeholder="Módulo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los módulos</SelectItem>
              <SelectItem value="auth">Autenticación</SelectItem>
              <SelectItem value="inventory">Inventario</SelectItem>
              <SelectItem value="orders">Órdenes</SelectItem>
              <SelectItem value="projects">Proyectos</SelectItem>
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
              <TableHead>Acción</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Módulo</TableHead>
              <TableHead>Fecha y Hora</TableHead>
              <TableHead>Detalles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.action}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.module}</TableCell>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

