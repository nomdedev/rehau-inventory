"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Building,
  Users,
  FileText,
  Settings,
  ChevronRight,
  LogOut,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"

interface SidebarProps {
  role: string
}

export function Sidebar({ role }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsCollapsed(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    })
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "viewer"],
    },
    {
      title: "Inventario",
      href: "/dashboard/inventory",
      icon: Package,
      roles: ["admin", "viewer"],
    },
    {
      title: "Órdenes",
      href: "/dashboard/orders",
      icon: ClipboardList,
      roles: ["admin", "viewer"],
    },
    {
      title: "Obras",
      href: "/dashboard/projects",
      icon: Building,
      roles: ["admin", "viewer"],
    },
    {
      title: "Usuarios",
      href: "/dashboard/users",
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Auditoría",
      href: "/dashboard/audit",
      icon: FileText,
      roles: ["admin"],
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: Settings,
      roles: ["admin"],
    },
  ]

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "70px" },
  }

  return (
    <>
      <motion.div
        variants={sidebarVariants}
        animate={isCollapsed ? "collapsed" : "expanded"}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 z-20 h-full bg-white shadow-md"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Rehau</span>
              </motion.div>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="ml-auto">
              <ChevronRight className={cn("h-5 w-5 transition-transform", isCollapsed ? "" : "rotate-180")} />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="ml-3"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-2">
            <Button
              variant="ghost"
              className={cn("w-full justify-start text-gray-700 hover:bg-gray-100", isCollapsed && "justify-center")}
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ml-3"
                >
                  Cerrar sesión
                </motion.span>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
      {isMobile && (
        <div
          className={cn("fixed inset-0 z-10 bg-black/50 transition-opacity", isCollapsed ? "hidden" : "block")}
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  )
}

