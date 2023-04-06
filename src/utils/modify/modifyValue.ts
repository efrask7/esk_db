import fs from 'fs'
import config from '../../config.json'
import { valueModified, valueToModify } from './types'
import { JSONObject, dbTypeValue, table, value } from '../../types'
import { isString, isValidType } from '../functions/utils'
import dbExist from '../read/dbExists'
import tableExists from '../read/tableExists'
import valueExists from '../read/valueExists'

const { databasePath } = config

const modifyValue = (dbName: string, tableName: string, valueToModify: valueToModify): valueModified => {
  if (!dbName || !tableName || !valueToModify) {
    throw new Error('You have to pass 3 params')
  }

  if (!isString(dbName) || !isString(tableName) || !isString(valueToModify.search.valueName) || !isString(valueToModify.newValue.valueName)) {
    throw new Error('The params are not valid')
  }

  if (!dbExist(dbName) || !tableExists(dbName, tableName)) {
    throw new Error(`The database ${dbName} does not exists or don't have a table called ${tableName}`)
  }

  if (!valueExists(dbName, tableName, valueToModify.search.valueName) || !valueExists(dbName, tableName, valueToModify.newValue.valueName)) {
    throw new Error(`The value ${valueToModify.search.valueName} or ${valueToModify.newValue.valueName} does not exists in the table ${tableName}`)
  }

  const path = databasePath + dbName + '/'

  const tables: Array<table> = JSON.parse(fs.readFileSync(path + 'tables.json', {encoding: 'utf-8'}))

  const table = tables.find(v => v.name === tableName) as table

  const searchType = table.values.find(v => v.name === valueToModify.search.valueName) as value

  if (!isValidType(valueToModify.search.value, searchType.type as dbTypeValue)) {
    throw new Error(`The value ${valueToModify.search.valueName} is not valid, type must be: ${searchType.type}`)
  }

  let values: Array<JSONObject> = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf-8'}))

  const value = values.find(v => v[valueToModify.search.valueName] === valueToModify.search.value)

  if (!value) {
    return { modifiedCount: 0, message: `The value: ${valueToModify.search.valueName}: ${valueToModify.search.value} no exists`, modified: {} }
  }

  const valueIndex = values.findIndex(v => v[valueToModify.search.valueName] === valueToModify.search.value)

  const modifyType = table.values.find(v => v.name === valueToModify.newValue.valueName) as value

  if (!isValidType(valueToModify.newValue.value, modifyType.type as dbTypeValue)) {
    throw new Error(`The value ${valueToModify.newValue.valueName} is not valid, type must be: ${modifyType.type}`)
  }

  values[valueIndex][valueToModify.newValue.valueName] = valueToModify.newValue.value

  fs.writeFileSync(path + tableName + '/data.json', JSON.stringify(values))

  return { modifiedCount: 1, modified: value }
}

export default modifyValue