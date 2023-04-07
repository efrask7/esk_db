import { isString } from "../functions/utils.js"
import { readDatabasesWithoutConfig } from "./readDBs.js"

const dbExist = (dbName: string): boolean => {

  if (!isString(dbName)) {
    throw new Error("The param 'dbName' is not valid")
  }

  const dbs = readDatabasesWithoutConfig()
  if (!dbs.includes(dbName)) {
    return false
  }
  
  return true
}

export default dbExist