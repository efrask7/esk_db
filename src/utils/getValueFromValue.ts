import { JSONObject, valueToSearch } from "../types"
import config from '../config.json'
import { readDatabasesWithoutConfig } from "./readDBs"
import readTables from "./readTables"
import fs from 'fs'

const { databasePath } = config

const getValueFromValue = (dbName: string, tableName: string, value: valueToSearch) => {
  
  const dbs = readDatabasesWithoutConfig()

  if (!dbs.includes(dbName)) {
    throw new Error(`The database ${dbName} does not exist`)
  }

  const tables = readTables(dbName)

  if (!tables.includes(tableName)) {
    throw new Error(`The database ${dbName} don't have a table called ${tableName}`)
  }

  const path = databasePath + dbName + '/'

  const values: Array<JSONObject> = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf-8'}))

  const valueSearch = values.find(v => v[value.search] === value.value)

  if (!valueSearch) {
    return {}
  }

  return valueSearch
}

export default getValueFromValue