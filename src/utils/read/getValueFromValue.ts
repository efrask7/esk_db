import { JSONObject, valueToSearch } from "../../types"
import config from '../../config.json'
import fs from 'fs'
import dbExist from "./dbExists"
import tableExist from "./tableExists"
import { isString } from "../functions/utils"

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

  const path = databasePath + dbName + '/'

  const values: Array<JSONObject> = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf-8'}))

  const valueSearch: JSONObject | undefined = values.find(v => v[value.search] === value.value)

  if (!valueSearch) {
    return {}
  }

  return valueSearch
}

export default getValueFromValue