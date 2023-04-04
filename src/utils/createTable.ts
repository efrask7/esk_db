import { table } from "../types"
import config from "../config.json"
import fs from "fs"
import readTables from "./readTables"

const { databasePath } = config

const createTable = (dbName: string, info: table) => {

  const tables = readTables(dbName)

  if (tables.includes(info.name)) return

  const path = databasePath + dbName + '/'
  fs.writeFileSync(path + 'tables.json', JSON.stringify(info))
  
  const INITIAL_STATE: table[] = []
  fs.mkdirSync(path + info.name)
  fs.writeFileSync(path + info.name + '/data.json', JSON.stringify(INITIAL_STATE))
  
  return `Table ${info.name} created`
}

export default createTable