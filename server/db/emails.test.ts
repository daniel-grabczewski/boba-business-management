import {
  beforeEach,
  beforeAll,
  afterAll,
  describe,
  it,
  expect
} from 'vitest'
import * as db from './emails'
import knex from 'knex'
import config from './knexfile'
const testDb = knex(config.test)

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

afterAll(async () => {
  await testDb.destroy()
})

describe('getAllEmails', () => {
  it('returns all emails', async () => {
    const expectedAmountOfEmails = 15
    const emails = await db.getAllEmails(testDb)
    expect(emails.length).toBe(expectedAmountOfEmails)
  })

  it('emails has the correct properties', async () => {
    const emails = await db.getAllEmails(testDb)
    expect(emails[0]).toHaveProperty('id')
    expect(emails[0]).toHaveProperty('userName')
    expect(emails[0]).toHaveProperty('isRead')
    expect(emails[0]).toHaveProperty('title')
    expect(emails[0]).toHaveProperty('createdAt')
  })
})

describe('getEmailById', () => {
  it('return email that match given email id', async () => {
    const testId = 1
    const expectedTitle = 'Appreciation for Great Service'
    const email = await db.getEmailById(testId, testDb)
    expect(email.title).toBe(expectedTitle)
  })

  it('email has the correct properties', async () => {
    const testId = 1
    const email = await db.getEmailById(testId, testDb)
    expect(email).toHaveProperty('id')
    expect(email).toHaveProperty('userName')
    expect(email).toHaveProperty('title')
    expect(email).toHaveProperty('createdAt')
    expect(email).toHaveProperty('description')
  })

  it('returns an empty object if there is no matched emailId', async () => {
    const testId = 20
    const email = await db.getEmailById(testId, testDb)
    expect(email).toBeUndefined()
  })
})

describe('sendEmailByUserId', () => {
  it('email is sent successfully', async () => {
    const testUserId = 'auth0|abc12345'
    const newEmail = {
      title: 'testing-12345',
      description: 'testing - Great Customer Service',
    }

    await db.sendEmailByUserId(newEmail, testUserId, testDb)

    const expectedAmountOfEmails = 16
    const emails = await db.getAllEmails(testDb)
    expect(emails.length).toBe(expectedAmountOfEmails)
  })
})

describe('updateEmailReadStatusById', () => {
  it('email status changed to true', async () => {
    const testId = 1
    await db.updateEmailReadStatusById(testId, testDb)
    const email = await db.getEmailById(testId, testDb)
    expect(email.isRead).toBeTruthy
  })
})

describe('deleteEmailById', () => {
  it('email deleted successfully', async () => {
    const testId = 1
    await db.deleteEmailById(testId, testDb)
    const expectedAmountOfEmails = 14
    const emails = await db.getAllEmails(testDb)
    expect(emails.length).toBe(expectedAmountOfEmails)
  })

  it('email deleted according to the Id correctly', async () => {
    const testId = 1
    await db.deleteEmailById(testId, testDb)
    const email = await db.getEmailById(testId, testDb)
    expect(email).toBeNull
  })
})

describe('getAmountofUnreadEmailsByDate', () => {
  it('get the right amount of unread email of given date', async () => {
    const testDate = '2023-07-22'
    const expectedAmountOfEmails = 2
    const amount = await db.getAmountOfUnreadEmailsByDate(testDate, testDb)
    expect(amount?.unreadEmailCount).toBe(expectedAmountOfEmails)
  })

  it('get 0 email for non-exiting date', async () => {
    const testDate = '2023-08-30'
    const expectedAmountOfEmails = 0
    const amount = await db.getAmountOfUnreadEmailsByDate(testDate, testDb)
    expect(amount?.unreadEmailCount).toBe(expectedAmountOfEmails)
  })
})