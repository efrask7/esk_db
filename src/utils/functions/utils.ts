import { user, permission } from "../../types"

export const isString = (name: string): boolean => {
  return typeof name === 'string'
}

export const isValidUser = (user: user): boolean => {
  if (!user.name || !isString(user.name)) {
    return false
  }

  if (!isValidPermission(user.permissions)) {
    return false
  }

  return true
}

export const isValidPermission = (permissionParam: permission): boolean => { 
  if (!isString(permissionParam) || !Object.values(permission).includes(permissionParam)) {
    return false
  }

  return true
}