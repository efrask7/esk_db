import { JSONObject, valueToSearch } from "../../types"
import config from '../../config.json'
import fs from 'fs'
import dbExist from "./dbExists"
import tableExist from "./tableExists"

const { databasePath } = config

const getValueFromValue = (dbName: string, tableName: string, value: valueToSearch): JSONObject => {
  
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