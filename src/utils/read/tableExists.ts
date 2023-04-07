import { isString } from "../functions/utils.js"
import dbExist from "./dbExists.js"
import readTables from "./readTables.js"

const tableExists = (dbName: string, tableName: string): boolean => {
  if (!dbName || !tableName) {
    throw new Error('The database or table name is missing')
  }

  if (!isString(dbName) || !isString(tableName)) {
    throw new Error('The database or table name is not valid')
  }

  if (!dbExist(dbName)) {
    throw new Error(`The database ${dbName} does not exists`)
  }
  
  const tables = readTables(dbName)

  if (!tables.includes(tableName)) {
    return false
  }

  return true
}

export default tableExists