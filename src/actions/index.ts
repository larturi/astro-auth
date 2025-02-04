import { loginGoogle, loginUser, logoutUser, registerUser } from './auth'

export const server = {
  // Auth
  registerUser,
  logoutUser,
  loginUser,
  loginGoogle
}
