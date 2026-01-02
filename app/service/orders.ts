import apiClient from '@/app/lib/axios'

export interface OrderItem {
  order_id: string
  created_date: string
  product_name: string
  product_price: number
  product_mrp: number
  product_amount: number
  quantity: number
}

export interface OrdersResponse {
  count: number
  orders: OrderItem[]
}


export const ordersService = {
  listOrders: async (token?: string, baseURL?: string): Promise<OrderItem[]> => {
    try {
      const config: any = {}
      
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        }
      }
      
      const url = baseURL ? `${baseURL}/api/user-orders/` : '/api/user-orders/'
      
      const response = await apiClient.get<OrdersResponse>(url, config)

      if (response.data?.orders && Array.isArray(response.data.orders)) {
        return response.data.orders
      }

      console.warn('Unexpected orders response structure:', response.data)
      return []
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },
}
