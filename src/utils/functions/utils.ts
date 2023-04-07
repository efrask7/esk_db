import { user, permission, dbTypeValue } from "../../types.js"

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

export const isValidType = (value: any, type: dbTypeValue): boolean => {
  if (type === "boolean" && typeof value !== 'boolean') {
    return false
  }

  if (type === "object" && typeof value !== 'object') {
    return false
  }

  if (type === "object" && typeof value !== 'object') {
    return false
  }

  if (type === "number" && typeof value !== 'number') {
    return false
  }

  if (type === "string" && typeof value !== 'string') {
    return false
  }

  return true
}