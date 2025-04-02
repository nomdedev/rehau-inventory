import type React from "react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={session.user.role || "viewer"} />
      <div className="flex flex-1 flex-col md:ml-[240px]">
        <Header user={session.user} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

