import { orders } from "@/lib/mock-data"

export async function getOrders() {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return orders
}

export async function getOrder(id: string) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return orders.find((order) => order.id === id)
}

export async function updateOrder(id: string, data: any) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would update the database
  // For now, we'll just return the updated data
  return {
    ...orders.find((order) => order.id === id),
    ...data,
  }
}

export async function createOrder(data: any) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would create a new order in the database
  // For now, we'll just return the data with a new ID
  return {
    id: `${orders.length + 1}`,
    orderNumber: `ORD-2023-00${orders.length + 1}`,
    ...data,
    createdAt: new Date().toISOString().split("T")[0],
  }
}

export async function deleteOrder(id: string) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real application, this would delete the order from the database
  // For now, we'll just return success
  return { success: true }
}

