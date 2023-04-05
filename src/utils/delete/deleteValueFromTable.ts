import { JSONObject, dbType, objectDeleted, table, value } from "../../types"
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

const deleteValuesFromValue = (dbName: string, tableName: string, valueInfo: {valueName: string, value: dbType}, limit?: number): objectDeleted => {
  if (!dbName || !tableName || !valueInfo) {
    throw new Error('You have to pass 3 params')
  }

  if (!dbExist(dbName)) {
    throw new Error(`The database ${dbName} does not exists`)
  }

  if (!tableExists(dbName, tableName)) {
    throw new Error(`The database ${dbName} don't have a table called ${tableName}`)
  }
  
  if (!valueInfo.valueName) {
    throw new Error("The param valueInfo don't have the property 'valueName'")
  }

  const path = databasePath + dbName + '/'

  const tableConfig: Array<table> = JSON.parse(fs.readFileSync(path + 'tables.json', {encoding: 'utf-8'}))

  const table: table = tableConfig.find(v => v.name === tableName) as table
  const type: value = table.values.find(v => v.name === valueInfo.valueName) as value

  if (!valueInfo.value && type.type !== 'boolean') {
    throw new Error("The param valueInfo don't have the property 'value'")
  }

  if (type.type === 'boolean' && !Object.keys(valueInfo).includes('value')) {
    throw new Error("The param valueInfo don't have the property 'value'")
  }

  const values: Array<JSONObject> = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf-8'}))

  let newValues: Array<JSONObject> = []
  let valuesToDelete: Array<JSONObject> = []

  if (!limit) {
    valuesToDelete = values.filter(v => v[valueInfo.valueName] === valueInfo.value)
    newValues = values.filter(v => v[valueInfo.valueName] !== valueInfo.value)
  } else {
    newValues = values
    let valuesMap = values.map(v => v[valueInfo.valueName] === valueInfo.value)
    let repeat = 0

    for (let i in values) {
      if (repeat === limit) break;
      if (valuesMap[i]) {
        let newValuesFilter = newValues.filter(v => v !== values[i])
        newValues = newValuesFilter
        valuesToDelete.push(values[i])
        repeat++
      }
    }
  }

  fs.writeFileSync(path + tableName + '/data.json', JSON.stringify(newValues))

  return { deletedCount: valuesToDelete.length, deleted: valuesToDelete }
}

export { deleteValueFromPrimaryKey, deleteValuesFromValue }