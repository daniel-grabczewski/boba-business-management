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

export interface SentEmailToBackend {
  userId: string
  title: string
  description: string
}

export interface UpdateEmailReadStatus {
  id: number
  isRead: boolean
}

export type Emails = Email[]
