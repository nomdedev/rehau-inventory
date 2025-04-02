import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { projects } from "@/lib/mock-data"
import { Plus, Search, MapPin, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const isAdmin = session.user.role === "admin"

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Activo":
        return <Badge className="bg-green-100 text-green-800">Activo</Badge>
      case "Completado":
        return <Badge className="bg-blue-100 text-blue-800">Completado</Badge>
      case "Planificación":
        return <Badge className="bg-yellow-100 text-yellow-800">Planificación</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Obras</h1>
          <p className="text-muted-foreground">Gestiona los proyectos de instalación</p>
        </div>
        {isAdmin && (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nuevo Proyecto
          </Button>
        )}
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input placeholder="Buscar proyectos..." className="h-9" />
        <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
          <Search className="h-4 w-4" />
          <span className="ml-2 hidden lg:inline">Buscar</span>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle>{project.name}</CardTitle>
                {getStatusBadge(project.status)}
              </div>
              <CardDescription>{project.client}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  {project.location}
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progreso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                {isAdmin && (
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

