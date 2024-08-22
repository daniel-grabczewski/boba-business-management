export interface ShopperProduct {
  id: number
  name: string
  slug: string
  image: string
  price: number
  description: string
  stock: number
  averageRating: number
}

export interface AdminProduct {
  id: number
  name: string
  slug: string
  image: string
  price: number
  description: string
  stock: number
  isEnabled: boolean
  averageRating: number
}

export interface LowStockProduct {
  id: number
  name: string
  image: string
  stock: number
}

export interface UpsertProduct {
  name: string
  image: string
  price: number
  description: string
  stock: number
  isEnabled: boolean
}
