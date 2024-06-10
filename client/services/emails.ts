import { NewEmail, UpdateEmailReadStatus, Email } from '../../models/Emails'
import { getDemoUserDetails } from '../utils/getDemoUserDetails'
import initialEmails from '../data/emailsData'

// get all emails from local storage
// initial set emails
// set emails

// If localStorage 'emails' key doesn't exist, initialize new key 'emails' to be equal to value of initialEmails
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
function getEmailsFromLocalStorage(): Email[] {
  try {
    const emails = localStorage.getItem('emails')
    return emails ? JSON.parse(emails) : []
  } catch (error) {
    console.error('Failed to get emails from localStorage:', error)
    return []
  }
}


// Returns new id, unique from every other email id
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



//! updateEmailReadStatusById
//! deleteEmailById
//! countUnreadEmailsSinceDate
//! countTotalUnreadEmails

export async function createNewEmail(newEmail: NewEmail, token: string) {
  try {
    await request
      .post(rootUrl + '/emails')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(newEmail)
  } catch (error) {
    console.error('Error creating new email:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

// fetchEmailbyToday

export async function fetchAmountOfUnreadEmailsByToday(token: string) {
  try {
    const response = await request
      .get(`${rootUrl}/emails/today`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    return response.body.unreadEmailCount
  } catch (error) {
    console.error('Error fetching user email', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

//fetchEmailbyId
export async function fetchEmailById(token: string, emailId: number) {
  try {
    const response = await request
      .get(`${rootUrl}/emails/${emailId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

    return response.body.email
  } catch (error) {
    console.error(
      'Error fetching user email by email id',
      (error as Error).message
    )
    throw { error: (error as Error).message }
  }
}

//modifyEmailStatus

export async function modifyEmailById(
  token: string,
  emailId: number,
  updatedEmailStatus: UpdateEmailReadStatus
) {
  try {
    const response = await request
      .patch(`${rootUrl}/emails/${emailId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(updatedEmailStatus)

    return response.body
  } catch (error) {
    console.error(
      'Error updating user email status by email id',
      (error as Error).message
    )
    throw { error: (error as Error).message }
  }
}

//delete the email
export async function deleteEmailById(emailId: number, token: string) {
  try {
    await request
      .delete(`${rootUrl}/emails/${emailId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
  } catch (error) {
    console.error('Error deleting email:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}
