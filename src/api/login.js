import fly from '../utils/fly'

export function loginApi (data) {
  return fly.post('api/auth/jwt/token', data)
}
