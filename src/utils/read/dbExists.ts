import { isString } from "../functions/utils"
import { readDatabasesWithoutConfig } from "./readDBs"

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