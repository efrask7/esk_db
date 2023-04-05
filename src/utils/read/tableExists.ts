import readTables from "./readTables"

const tableExists = (dbName: string, tableName: string): boolean => {
  const tables = readTables(dbName)

  if (!tables.includes(tableName)) {
    return false
  }

  return true
}

export default tableExists