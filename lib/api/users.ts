import { users } from "@/lib/mock-data"

export async function getUsers() {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return users
}

export async function getUser(id: string) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return users.find((user) => user.id === id)
}

export async function updateUser(id: string, data: any) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would update the database
  // For now, we'll just return the updated data
  return {
    ...users.find((user) => user.id === id),
    ...data,
  }
}

export async function createUser(data: any) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would create a new user in the database
  // For now, we'll just return the data with a new ID
  return {
    id: `${users.length + 1}`,
    ...data,
  }
}

export async function deleteUser(id: string) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would delete the user from the database
  // For now, we'll just return success
  return { success: true }
}

