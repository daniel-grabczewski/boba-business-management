import { User, UpdateUser } from '../../models/Users'
import initialUsers from '../data/usersData'

// Initialize new key 'users' to be equal to value of initialUsers IF localStorage 'users' key doesn't exist
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

// Get user details, given their user id as User
export function getUserByUserId(userId: string): User | null {
  try {
    const users = getUsersFromLocalStorage()
    const user = users.find(user => user.userId === userId)
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

// Get demo user details as User
export function getDemoUserDetails(): User | null {
  try {
    const demoUserId = initialUsers[0].userId
    const users = getUsersFromLocalStorage()
    const demoUser = users.find(user => user.userId === demoUserId)
    
    if (!demoUser) {
      console.error(`Demo user with ID ${demoUserId} not found`)
      return null
    }

    return demoUser
  } catch (error) {
    console.error('Failed to get demo user details', error)
    return null
  }
}


// Given new user details as UpdateUser, update demo user's details to the new details.
export function updateDemoUserDetails(updatedDetails: UpdateUser) {
  try {
    const users = getUsersFromLocalStorage()
    const demoUser = getDemoUserDetails()
    if (!demoUser) {
      console.error(`Demo user not found`)
      return null
    }
    
    const updatedUsers = users.map((user) => {
      if (user.userId === demoUser.userId) {
        return {
          ...user,
          ...updatedDetails,
        }
      } else {
        return user
      }
    })
    setUsersInLocalStorage(updatedUsers)
  } catch (error) {
    console.error(
      `Failed to update details of demo user with updated details : ${JSON.stringify(
        updatedDetails
      )}`, error
    )
  }
}
