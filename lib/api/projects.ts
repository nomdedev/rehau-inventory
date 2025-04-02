import { projects } from "@/lib/mock-data"

export async function getProjects() {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return projects
}

export async function getProject(id: string) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return projects.find((project) => project.id === id)
}

export async function updateProject(id: string, data: any) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would update the database
  // For now, we'll just return the updated data
  return {
    ...projects.find((project) => project.id === id),
    ...data,
  }
}

export async function createProject(data: any) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would create a new project in the database
  // For now, we'll just return the data with a new ID
  return {
    id: `${projects.length + 1}`,
    ...data,
    startDate: new Date().toISOString().split("T")[0],
  }
}

export async function deleteProject(id: string) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would delete the project from the database
  // For now, we'll just return success
  return { success: true }
}

