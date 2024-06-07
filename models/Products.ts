export interface ShopperProduct {
  id: number
  name: string
  image: string
  price: number
  description: string
  stock: number
  averageRating: number
}

export interface AdminProduct {
  id: number
  name: string
  image: string
  price: number
  description: string
  stock: number
  isEnabled: boolean
  averageRating: number
}

export interface LowStockProducts {
  id: number
  name: string
  image: string
}

export interface UpsertProduct {
  name: string
  image: string
  price: number
  description: string
  stock: number
  isEnabled: boolean
}
