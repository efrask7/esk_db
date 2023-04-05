import { JSONObject, dbType } from "../../types"
import dbExist from "./dbExists"
import tableExists from "./tableExists"
import valueExists from "./valueExists"
import config from "../../config.json"
import fs from "fs"

const { databasePath } = config

type valueParam = {
  name: string,
  value: dbType
}

const getValuesFromValue = (dbName: string, tableName: string, value: valueParam): Array<JSONObject> => {
  if (!dbName || !tableName || !value) {
    throw new Error('You have to pass 3 params')
  }

  if (!dbExist(dbName)) {
    throw new Error(`The database ${dbName} does not exists`)
  }

  if (!tableExists(dbName, tableName)) {
    throw new Error(`The database ${dbName} don't have a table called ${tableName}`)
  }

  if (!valueExists(dbName, tableName, value.name)) {
    throw new Error(`The table ${tableName} don't have a value called ${value.name}`)
  }

  let returnValues: Array<JSONObject> = []

  const values: Array<JSONObject> = JSON.parse(fs.readFileSync(databasePath + dbName + '/' + tableName + '/data.json', {encoding: 'utf-8'}))

  for (let i in values) {
    if (values[i][value.name] === value.value) {
      returnValues.push(values[i])
    }
  }

  return returnValues
}

export default getValuesFromValue