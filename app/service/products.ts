import apiClient from '@/app/lib/axios'

export interface ProductImage {
  product_image: string
}

export interface ProductSize {
  size_id: number
  variation_product_id: number
  size_name: string
  status: boolean
  price: number
}

export interface VariationColor {
  color_id: number
  color_name: string
  color_images: string[]
  status: boolean
  sizes: ProductSize[]
}

export interface Product {
  id: string
  name: string
  product_images: ProductImage[]
  variations_exist: boolean
  variation_colors: VariationColor[]
  sale_price: number
  mrp: number
  new: boolean
  discount: number
  out_of_stock: boolean
  slug: string
}

export interface NewProductsResponse {
  results?: Product[]
  count?: number
  [key: string]: any 
}


export interface PurchaseRequest {
  product_id: string
  variation_product_id?: number
}

export interface Order {
  id: string
  total_amount: number
  payment_status: string
}



export interface OrderCreateApiResponse {
  raw: RawOrderResponse
}


export interface RawOrderResponse {
  message: string
  order: Order
  order_details: OrderDetailSummary[]
}


export interface Order {
  id: string
  invoice_url: string
  number_of_order_items: number
  exchange: boolean
  created: string
  unique_id: string | null
  name: string
  email: string | null
  phone_number: string
  total_amount: number
  pre_amount: number
  payment_status: string
  order_status: string
  discount_amount: number
  tax_rate: number
  delivery_charge: number
  order_note: string | null
  location_note: string | null
  sub_total: number
  payment_mode: string
  fcm_token: string | null
  address: string
  country: string
  state: string
  city: string
  pincode: string
  billing_address: string
  billing_country: string
  billing_state: string
  billing_city: string
  billing_pincode: string
  tax_choice: string
  tracking_id_1: string | null
  tracking_id_2: string | null
  razorpay_order_id: string | null
  razorpay_payment_id: string | null
  restocked: boolean
  date_of_delivery: string | null
  user: string
  applied_coupon: string | null

  order_details: OrderDetail[]
}


export interface OrderDetail {
  id: number
  review: boolean
  review_details: string | null
  feedback: boolean
  product_name: string
  product_image: string
  quantity: number
  tax: number
  amount: number
  price: number
  without_tax_amount: number
  order: string
  product: string
  variation_product: number | null
}

export interface OrderDetailSummary {
  product_name: string
  product_image: string
  quantity: number
  price: number
  amount: number
}



export interface PurchaseResponse {
  message: string
  order: Order
  order_details: OrderDetailSummary[]
}

export const productsService = {

  getNewProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<NewProductsResponse>('/api/new-products/')
            if (Array.isArray(response.data)) {
        return response.data
      } else if (response.data.results && Array.isArray(response.data.results)) {
        return response.data.results
      } else {
        console.warn('Unexpected API response structure:', response.data)
        return []
      }
    } catch (error) {
      console.error('Error fetching new products:', error)
      throw error
    }
  },

  purchaseProduct: async (data: PurchaseRequest): Promise<PurchaseResponse> => {
    try {
      const response = await apiClient.post<PurchaseResponse>('/api/purchase-product/', data)
      return response.data
    } catch (error) {
      console.error('Error purchasing product:', error)
      throw error
    }
  },
}

