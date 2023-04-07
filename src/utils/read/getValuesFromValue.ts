import { JSONObject, dbType } from "../../types.js"
import dbExist from "./dbExists.js"
import tableExists from "./tableExists.js"
import valueExists from "./valueExists.js"
import config from '../../config.js'
import fs from "fs"
import { isString } from "../functions/utils.js"

const { databasePath } = config

type valueParam = {
  name: string,
  value: dbType
}

const getValuesFromValue = (dbName: string, tableName: string, value: valueParam): Array<JSONObject> => {
  if (!dbName || !tableName || !value) {
    throw new Error('You have to pass 3 params')
  }

  if (!isString(dbName) || !isString(tableName)) {
    throw new Error('The database or table name are not valid')
  }

  if (!dbExist(dbName)) {
    throw new Error(`The database ${dbName} does not exists`)
  }

  if (!tableExists(dbName, tableName)) {
    throw new Error(`The database ${dbName} don't have a table called ${tableName}`)
  }

  if (!value.name || !isString(value.name)) {
    throw new Error("The property 'name' of value is not valid")
  } 

  if (!value.value && typeof value.value !== 'boolean') {
    throw new Error("The type of 'value' of value is not valid")
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