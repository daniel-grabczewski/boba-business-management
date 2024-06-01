export interface Email {
  id: number
  userName: string
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
  user_id: string
  title: string
  description: string
}

export interface UpdateEmailReadStatus {
  id: number
  is_read: boolean
}

export type Emails = Email[]
