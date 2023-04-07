import { JSONObject, dbTypeValue, table, value, valueToSearch } from "../../types.js"
import config from '../../config.js'
import fs from 'fs'
import dbExist from "./dbExists.js"
import tableExist from "./tableExists.js"
import { isString, isValidType } from "../functions/utils.js"
import valueExists from "./valueExists.js"

const { databasePath } = config

const getValueFromValue = (dbName: string, tableName: string, value: valueToSearch): JSONObject => {
  
  if (!dbName || !tableName || !value) {
    throw new Error('You have to pass 3 params')
  }

  if (!isString(dbName) || !isString(tableName)) {
    throw new Error("The param 'dbName' or 'tableName' is not valid")
  }

  if (!value || !value.search) {
    throw new Error("The param 'value' is missing or the property 'search' is missing")
  }

  if (!value.value && typeof value.value !== 'boolean') {
    throw new Error("The property 'value' of the param 'value' is missing")
  }

  if (!dbExist(dbName)) {
    throw new Error(`The database ${dbName} does not exist`)
  }

  if (!tableExist(dbName, tableName)) {
    throw new Error(`The database ${dbName} don't have a table called ${tableName}`)
  }

  if (!valueExists(dbName, tableName, value.search)) {
    throw new Error(`The table ${tableName} don't have a value called ${value.search}`)
  }

  const path = databasePath + dbName + '/'

  const tables: Array<table> = JSON.parse(fs.readFileSync(path + 'tables.json', {encoding: 'utf-8'}))
  const table = tables.find(v => v.name === tableName) as table
  const valueCfg = table.values.find(v => v.name === value.search) as value

  if (!isValidType(value.value, valueCfg.type as dbTypeValue)) {
    throw new Error(`The value ${value.search} is not valid, type must be: ${valueCfg.type}`)
  }

  const values: Array<JSONObject> = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf-8'}))

  const valueSearch: JSONObject | undefined = values.find(v => v[value.search] === value.value)

  if (!valueSearch) {
    return {}
  }

  return valueSearch
}

export default getValueFromValue