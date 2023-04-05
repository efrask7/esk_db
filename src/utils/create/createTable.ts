import { dbTypeValue, table, valueAdded } from "../../types"
import config from "../../config.json"
import fs from "fs"
import readTables from "../read/readTables"

const { databasePath } = config

const createTable = (dbName: string, info: table): valueAdded => {

  const tables = readTables(dbName)

  if (tables.includes(info.name)) return { addedCount: 0, message: `Table ${info.name} already exists in database ${dbName}` }
  if (!isValidTable(info)) {
    throw new Error('The provided table is not valid')
  }

  const path = databasePath + dbName + '/'
  const files = fs.readdirSync(path)
  if (files.includes('tables.json')) {
    const tables: Array<table> = JSON.parse(fs.readFileSync(path + 'tables.json', {encoding: 'utf-8'}))
    console.log(tables)
    let newTables = [
      ...tables,
      info
    ]
    fs.writeFileSync(path + 'tables.json', JSON.stringify(newTables))
  } else {
    fs.writeFileSync(path + 'tables.json', JSON.stringify([info]))
  }

  const INITIAL_STATE: table[] = []
  fs.mkdirSync(path + info.name)
  fs.writeFileSync(path + info.name + '/data.json', JSON.stringify(INITIAL_STATE))
  
  return { addedCount: 1, value: info }
}

const isString = (name: string): boolean => {
  return typeof name === 'string'
}

const isValidTable = (tableParam: table): boolean => {
  if (!tableParam.name || !isString(tableParam.name)) {
    return false
  }
  
  for (let i in tableParam.values) {
    if (!tableParam.values[i].required ||typeof tableParam.values[i].required !== 'boolean') {
      return false
    }

    if (!Object.values(dbTypeValue).includes(tableParam.values[i].type as dbTypeValue)) {
      return false
    }
  }

  return true
}

export default createTable