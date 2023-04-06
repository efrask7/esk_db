import { dbTypeValue, table } from "../../types"
import config from "../../config.json"
import fs from "fs"
import { addedTable } from "./types"
import tableExists from "../read/tableExists"

const { databasePath } = config

const createTable = (dbName: string, info: table): addedTable => {

  if (!dbName || !info) {
    throw new Error('The database name or table is missing')
  }

  if (tableExists(dbName, info.name)) return { addedType: 'Table', addedCount: 0, message: `Table ${info.name} already exists in database ${dbName}`, value: info }
  
  const tableIsValid = isValidTable(info)

  if (!tableIsValid.isValid) {
    throw new Error(tableIsValid.message)
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
  
  return { addedType: 'Table', addedCount: 1, value: info }
}

const isString = (name: string): boolean => {
  return typeof name === 'string'
}

const isValidTable = (tableParam: table): { isValid: boolean, message?: string } => {
  if (!tableParam.name || !isString(tableParam.name)) {
    return { isValid: false, message: 'The table name is missing or is not valid' }
  }
  
  for (let i in tableParam.values) {
    if (!tableParam.values[i].required || typeof tableParam.values[i].required !== 'boolean') {
      return { isValid: false, message: "The 'required' property is missing or is not a boolean"}
    }

    if (!Object.values(dbTypeValue).includes(tableParam.values[i].type as dbTypeValue)) {
      return { isValid: false, message: `The type ${tableParam.values[i].type} is not valid, the type must be: [${Object.values(dbTypeValue).join(' - ')}]`}
    }
  }

  return { isValid: true }
}

export default createTable