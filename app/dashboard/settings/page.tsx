import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra la configuración del sistema</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="advanced">Avanzado</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
              <CardDescription>Actualiza la información básica de la empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la Empresa</Label>
                  <Input id="company-name" defaultValue="Rehau Argentina" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email de Contacto</Label>
                  <Input id="contact-email" type="email" defaultValue="contacto@rehau.com.ar" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue="+54 11 4555-1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input id="address" defaultValue="Av. Libertador 123, Buenos Aires" />
                </div>
              </div>
              <Button>Guardar Cambios</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Inventario</CardTitle>
              <CardDescription>Personaliza las opciones de inventario</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="low-stock-threshold">Umbral de Stock Bajo</Label>
                  <Input id="low-stock-threshold" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-unit">Unidad Predeterminada</Label>
                  <Select defaultValue="units">
                    <SelectTrigger id="default-unit">
                      <SelectValue placeholder="Seleccionar unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="units">Unidades</SelectItem>
                      <SelectItem value="meters">Metros</SelectItem>
                      <SelectItem value="kilograms">Kilogramos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-update" defaultChecked />
                <Label htmlFor="auto-update">Actualizar automáticamente el inventario al procesar órdenes</Label>
              </div>
              <Button>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tema</CardTitle>
              <CardDescription>Personaliza la apariencia del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-20 w-full rounded-md border-2 border-primary bg-white"></div>
                  <Label>Claro</Label>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-20 w-full rounded-md border-2 border-muted bg-gray-950"></div>
                  <Label>Oscuro</Label>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-20 w-full rounded-md border-2 border-muted bg-gradient-to-b from-white to-gray-950"></div>
                  <Label>Sistema</Label>
                </div>
              </div>
              <Button>Aplicar Tema</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="stock-alerts">Alertas de Stock Bajo</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones cuando el stock esté por debajo del umbral
                    </p>
                  </div>
                  <Switch id="stock-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-notifications">Nuevas Órdenes</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones cuando se creen nuevas órdenes
                    </p>
                  </div>
                  <Switch id="order-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="project-updates">Actualizaciones de Proyectos</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones sobre cambios en los proyectos
                    </p>
                  </div>
                  <Switch id="project-updates" defaultChecked />
                </div>
              </div>
              <Button>Guardar Preferencias</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración Avanzada</CardTitle>
              <CardDescription>Opciones avanzadas del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debug-mode">Modo de Depuración</Label>
                    <p className="text-sm text-muted-foreground">
                      Habilita el registro detallado para solución de problemas
                    </p>
                  </div>
                  <Switch id="debug-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Modo de Mantenimiento</Label>
                    <p className="text-sm text-muted-foreground">
                      Pone el sistema en modo de mantenimiento para todos los usuarios
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Frecuencia de Respaldo</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Seleccionar frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Cada hora</SelectItem>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Aplicar Configuración</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
              <CardDescription>Estas acciones pueden causar pérdida de datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button variant="destructive">Reiniciar Base de Datos</Button>
                <p className="text-sm text-muted-foreground">
                  Esta acción eliminará todos los datos y restablecerá el sistema a su estado inicial.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

