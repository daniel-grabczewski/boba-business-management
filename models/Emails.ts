export interface Email {
  id: number
  userId : string
  isRead: boolean
  title: string
  description: string
  createdAt: string
}

export interface NewEmail {
  title: string
  description: string
}