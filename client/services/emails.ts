import { NewEmail, Email } from '../../models/Emails'
import { getDemoUserDetails } from '../utils/getDemoUserDetails'
import initialEmails from '../data/emailsData'
import { generateCurrentDateTime } from '../utils/generateDate'
import { formatDateToDDMMYYYY } from '../utils/formatDate'


// Initialize localStorage key 'emails' to be equal to value of initialEmails, if localStorage 'emails' key doesn't exist,
export function setEmailsInLocalStorageInitial(): void {
  try {
    const emailsInStorage = localStorage.getItem('emails')

    if (!emailsInStorage) {
      localStorage.setItem('emails', JSON.stringify(initialEmails))
    }
  } catch (error) {
    console.error('Failed to initialize emails in localStorage:', error)
  }
}

// Replace localStorage emails with given emails
export function setEmailsInLocalStorage(emails: Email[]): void {
  try {
    localStorage.setItem('emails', JSON.stringify(emails))
  } catch (error) {
    console.error('Failed to set emails in localStorage:', error)
  }
}

// Retrieve array of objects 'emails' from localStorage
export function getEmailsFromLocalStorage(): Email[] {
  try {
    const emails = localStorage.getItem('emails')
    return emails ? JSON.parse(emails) : []
  } catch (error) {
    console.error('Failed to get emails from localStorage:', error)
    return []
  }
}

// Returns new email id, unique from every other email id
export function generateNewEmailId() : number {
  const emails = getEmailsFromLocalStorage()
  const newId =
      emails.length > 0
        ? Math.max(...emails.map((email) => email.id)) + 1
        : 1
  
  return newId
}

// Get email that matches given id
export function getEmailById(id: number): Email | undefined {
  try {
    const emails = getEmailsFromLocalStorage()
    const email = emails.find((email) => email.id === id)
    return email
  } catch (error) {
    console.error(`Failed to get email by ID: ${id}`, error)
    return undefined
  }
}

// Given Email data, send it to localStorage 'emails'
export function sendEmailFromDemoUser(newEmail: NewEmail): void {
  try {
    const emails = getEmailsFromLocalStorage()
    const demoUser = getDemoUserDetails()
    const newEmailId = generateNewEmailId()
    const currentDateTime = generateCurrentDateTime()

    emails.push({
      id: newEmailId,
      userId: demoUser.userId,
      ...newEmail,
      isRead: false,
      createdAt: currentDateTime,
    })

    setEmailsInLocalStorage(emails)
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

// Given an id and a readStatus of true/false, update the email with the matching id with the new readStatus
export function updateEmailReadStatusById(id: number, updatedReadStatus: boolean): void {
  try {
    const emails = getEmailsFromLocalStorage()
    const emailIndex = emails.findIndex(email => email.id === id)

    if (emailIndex !== -1) {
      emails[emailIndex].isRead = updatedReadStatus
      setEmailsInLocalStorage(emails)
    } else {
      console.error(`Email with ID: ${id} not found`)
    }
  } catch (error) {
    console.error(`Failed to update read status for email with ID: ${id}`, error)
  }
}

// Given an id, delete the email with the matching id
export function deleteEmailById(id: number): void {
  try {
    const emails = getEmailsFromLocalStorage()
    const newEmails = emails.filter(email => email.id !== id)

    if (emails.length === newEmails.length) {
      console.warn(`Email with ID: ${id} not found`)
    } else {
      setEmailsInLocalStorage(newEmails)
    }
  } catch (error) {
    console.error(`Failed to delete email with ID: ${id}`, error)
  }
}

// Given a date in 'DD/MM/YYYY' format, return a count of the emails which are unread from that given date
export function countUnreadEmailsFromDate(date: string): number {
  const emails = getEmailsFromLocalStorage()
  return emails.reduce((count, email) => {
    // Format YYYY-MM-DD HH:MM:SS to DD/MM/YYYY
    const emailDate = formatDateToDDMMYYYY(email.createdAt)
    if (emailDate === date && !email.isRead) {
      count++
    }
    return count
  }, 0)
}

// Returns count of all emails that have false isRead status
export function countTotalUnreadEmails() : number {
  const emails = getEmailsFromLocalStorage()
  return emails.reduce((count, email) => {
    if (!email.isRead) {
      count++
    }
    return count
  }, 0)
}

