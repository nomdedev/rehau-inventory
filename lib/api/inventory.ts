import { inventory } from "@/lib/mock-data"

export async function getInventory() {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return inventory
}

export async function getInventoryItem(id: string) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return inventory.find((item) => item.id === id)
}

export async function updateInventoryItem(id: string, data: any) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would update the database
  // For now, we'll just return the updated data
  return {
    ...inventory.find((item) => item.id === id),
    ...data,
  }
}

export async function createInventoryItem(data: any) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would create a new item in the database
  // For now, we'll just return the data with a new ID
  return {
    id: `${inventory.length + 1}`,
    ...data,
    lastUpdated: new Date().toISOString().split("T")[0],
  }
}

export async function deleteInventoryItem(id: string) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would delete the item from the database
  // For now, we'll just return success
  return { success: true }
}

