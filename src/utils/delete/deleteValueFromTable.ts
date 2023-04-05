import { JSONObject, dbType, objectDeleted, table } from "../../types"
import config from "../../config.json"
import dbExist from "../read/dbExists"
import tableExists from "../read/tableExists"
import fs from "fs"
import valueExists from "../read/valueExists"

const { databasePath } = config

const deleteValueFromPrimaryKey = (dbName: string, tableName: string, value: {key: string, valueToRemove: dbType}): objectDeleted => {
  if (!dbExist(dbName)) {
    throw new Error(`The database ${dbName} does not exists`)
  }

  if (!tableExists(dbName, tableName)) {
    throw new Error(`The database ${dbName} don't have a table called ${tableName}`)
  }

  if (!valueExists(dbName, tableName, value.key)) {
    throw new Error(`The table ${tableName} don't have a value called ${value.key}`)
  }
  const path = databasePath + dbName + '/'

  const tables: Array<table> = JSON.parse(fs.readFileSync(path + 'tables.json', {encoding: 'utf-8'}))

  const table: table = tables.find(v => v.name === tableName) as table
  const valueIndex: number = table.values.findIndex(v => v.name === value.key)

  if (!table.values[valueIndex].required) {
    throw new Error(`The value ${value.key} is not a primary key`)
  }

  const data: Array<JSONObject> = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf-8'}))

  const valueToDelete = data.find(v => v[value.key] === value.valueToRemove) as JSONObject

  let newData = data.filter(v => v[value.key] !== value.valueToRemove)
  fs.writeFileSync(path + tableName + '/data.json', JSON.stringify(newData))

  return { deletedCount: 1, deleted: valueToDelete }
}

export { deleteValueFromPrimaryKey }