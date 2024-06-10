import { User } from "../../models/Users"
import users from "../data/usersData"

export function getDemoUserDetails() : User {
  return users[0]
}