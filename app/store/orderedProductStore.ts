import { create } from 'zustand'

export interface Order {
  id: string
  total_amount: number
  payment_status: string
  discount_amount: number
}

export interface OrderSuccessData {
  id: string;
  productName: string
  productImage: string
  productSize: string | null
  productPrice: number
  order: Order
  orderDate: string
  orderTime: string
}

interface OrderStore {
  orderSuccessData: OrderSuccessData
  setOrderSuccessData: (data: OrderSuccessData) => void
  clearOrderSuccessData: () => void
}

export const useOrderStore = create<OrderStore>((set) => ({
  orderSuccessData: {
    id: "",
    productName: '',
    productImage: '',
    productSize: null,
    productPrice: 0,
    order: {
      id: '',
      total_amount: 0,
      payment_status: '',
      discount_amount: 0,
    },
    orderDate: '',
    orderTime: '',
  },

  setOrderSuccessData: (data) =>
    set(() => ({
      orderSuccessData: data,
    })),

  clearOrderSuccessData: () =>
    set(() => ({
      orderSuccessData: {
        id: "",
        productName: '',
        productImage: '',
        productSize: null,
        productPrice: 0,
        order: {
          id: '',
          total_amount: 0,
          payment_status: '',
          discount_amount: 0
        },
        orderDate: '',
        orderTime: '',
      },
    })),
}))
