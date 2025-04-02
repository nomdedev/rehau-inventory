"use client"

import { useState } from "react"
import { Menu, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

interface HeaderProps {
  user: {
    name?: string
    role?: string
  }
}

export function Header({ user }: HeaderProps) {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nueva orden creada", time: "Hace 5 minutos" },
    { id: 2, message: "Inventario actualizado", time: "Hace 1 hora" },
  ])

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" })
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    })
  }

  const clearNotifications = () => {
    setNotifications([])
    toast({
      title: "Notificaciones borradas",
      description: "Todas las notificaciones han sido borradas",
    })
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="ml-2 text-xl font-bold md:ml-0">Rehau Inventory Manager</h1>
      </div>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {notifications.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notificaciones</span>
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearNotifications}
                  className="h-auto text-xs font-normal text-primary"
                >
                  Borrar todas
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2">
                  <span>{notification.message}</span>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-2 text-center text-sm text-gray-500">No hay notificaciones</div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user.name}</span>
                <span className="text-xs text-gray-500">
                  {user.role === "admin" ? "Administrador" : "Visualizador"}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

