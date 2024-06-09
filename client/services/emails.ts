import { NewEmail, UpdateEmailReadStatus, Email } from '../../models/Emails'
import initialEmails from '../data/emailsData'


// get all emails from local storage
// initial set emails
// set emails

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


//! getAllEmails
export function getAllEmails() : Email[] {

}



//! getEmailById
//  sendEmailByUserIdShopper
//! updateEmailReadStatusById
//! deleteEmailById
//! countUnreadEmailsSinceDate
//! countTotalUnreadEmails

export async function fetchAllEmails(token: string) {
  try {
    const res = await request
      .get(rootUrl + '/emails')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
    return res.body.emails
  } catch (error) {
    console.error('Error fetching all emails:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

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
      (error as Error).message,
    )
    throw { error: (error as Error).message }
  }
}

//modifyEmailStatus

export async function modifyEmailById(
  token: string,
  emailId: number,
  updatedEmailStatus: UpdateEmailReadStatus,
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
      (error as Error).message,
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
