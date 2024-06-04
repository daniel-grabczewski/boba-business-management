export interface User {
  userId: string
  firstName: string
  lastName: string
  userName: string
  phoneNumber: string
  emailAddress: string
  address: string
  city: string
  country: string
  zipCode: string
}

export interface UpdateUser {
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  city: string
  country: string
  zipCode: string
}

export interface NewUser {
  firstName: string
  lastName: string
  userName: string
  emailAddress: string
}

export interface NewUserBackend extends NewUser {
  auth0Id: string
}
