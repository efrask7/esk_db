import { readDatabasesWithoutConfig } from "./readDBs"

const dbExist = (dbName: string): boolean => {
  const dbs = readDatabasesWithoutConfig()
  if (!dbs.includes(dbName)) {
    return false
  }
  
  return true
}

export default dbExist