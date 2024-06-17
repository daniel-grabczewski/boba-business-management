
import { NewUser, UpdateUser, User } from '../../models/Users'
import initialUsers from '../data/usersData'

// If localStorage 'users' key doesn't exist, initialize new key 'users' to be equal to value of initialUsers
export function setUsersInLocalStorageInitial(): void {
  try {
    const usersInStorage = localStorage.getItem('users')

    if (!usersInStorage) {
      localStorage.setItem('users', JSON.stringify(initialUsers))
    }
  } catch (error) {
    console.error('Failed to initialize users in localStorage:', error)
  }
}

// Retrieve array of objects 'users' from localStorage
export function setUsersInLocalStorage(users: User[]): void {
  try {
    localStorage.setItem('users', JSON.stringify(users))
  } catch (error) {
    console.error('Failed to set users in localStorage:', error)
  }
}

// Retrieve array of objects 'users' from localStorage
export function getUsersFromLocalStorage(): User[] {
  try {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  } catch (error) {
    console.error('Failed to get users from localStorage:', error)
    return []
  }
}

// Get user details, given their user id
export function getUserByUserId(userId: string): User | null {
  try {
    const users = getUsersFromLocalStorage()
    const [user] = users.filter(user => user.userId === userId)
    if (!user) {
      console.log(`User with userId ${userId} not found`)
      return null
    }
    return user
  } catch (error) {
    console.error('Failed to get user by userId:', error)
    return null
  }
}


/*
export async function fetchUser(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}`)
      .set('Authorization', `Bearer ${token}`)

    const userData = response.body as User
    return userData
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function fetchCheckIfUserExists(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/check`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}


export async function fetchIsUserAdmin(token: string) {
  try {
    const response = await request
      .get(`${baseUrl}/isAdmin`)
      .set('Authorization', `Bearer ${token}`)
    const isAdmin: boolean = response.body
    return isAdmin
  } catch (error) {
    console.error('An error occurred:', (error as Error).message)
    throw { error: (error as Error).message }
  }
}

export async function modifyUserDetails(
  updatedUser: UpdateUser,
  token: string,
) {
  try {
    await request
      .patch(`${baseUrl}/edit`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
  } catch (error) {
    console.error('Error modifying user details:', (error as Error).message)
    return { error: (error as Error).message }
  }
}

export async function insertUser(
  newUser: NewUser,
  token: string,
) {
  try {
    await request
      .post(`${baseUrl}/`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
  } catch (error) {
    console.error('Error modifying user details:', (error as Error).message)
    return { error: (error as Error).message }
  }
}
  */