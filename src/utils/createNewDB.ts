import { database, permission, user } from "../types";
import fs from 'fs'
import config from "../config.json"
import { readDatabasesWithoutConfig } from "./readDBs";

const { databasePath } = config

const createNewDB = (databaseInfo: database) => {
  const { name, privileges } = databaseInfo
  const route = `${databasePath}/${name}/`

  const dbs = readDatabasesWithoutConfig()
  if (dbs.includes(name)) return

  if (!isString(name)) {
    throw new Error('The provided name is not valid')
  }

  for (let i in privileges) {
    if (!isValidUser(privileges[i])) {
      throw new Error('The provided user is not valid. ' + privileges[i])
    }
  }
  
  fs.mkdirSync(route, {recursive: true})
  fs.writeFileSync(route + '/config.json', JSON.stringify(databaseInfo))

  return `DB: ${name} created`
}

const isString = (name: string): boolean => {
  return typeof name === 'string'
}

// const isValidTable = (table: table): boolean => {
//   if (!table.name || !isString(table.name)) {
//     return false
//   }
  
//   for (let i in table.values) {
//     if (!table.values[i].required ||typeof table.values[i].required !== 'boolean') {
//       return false
//     }

//     if (!Object.values(dbType).includes(table.values[i].type)) {
//       return false
//     }
//   }

//   return true
// }

const isValidUser = (user: user): boolean => {
  if (!user.name || !isString(user.name)) {
    return false
  }

  if (!isValidPermission(user.permissions)) {
    return false
  }

  return true
}

const isValidPermission = (permissionParam: permission): boolean => { 
  if (!isString(permissionParam) || !Object.values(permission).includes(permissionParam)) {
    return false
  }

  return true
}

//! for (let i in tables) {
//!   const INITIAL_STATE: Array<Object> = []
//!   fs.mkdirSync(route + tables[i].name)
//!   fs.writeFileSync(route + tables[i].name + '/' + 'data.json', JSON.stringify(INITIAL_STATE))
//! }

export default createNewDB