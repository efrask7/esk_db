import fs from 'fs'
import config from '../../config.js'
import { JSONObject, dbType, dbTypeValue, table, value } from '../../types.js'
import { addedValue } from './types.js'
import dbExist from '../read/dbExists.js'
import { isString, isValidType } from '../functions/utils.js'
import tableExists from '../read/tableExists.js'

const { databasePath } = config 

const addNewValueToTable = (databaseName: string, tableName: string, info: JSONObject, primary?: string): addedValue => {
  
  if (!databaseName || !tableName || !info) {
    throw new Error('You have to pass 3 params')
  }

  if (!isString(databaseName) || !isString(tableName)) {
    throw new Error('The database or table name is not valid')
  }

  if (typeof info !== 'object') {
    throw new Error("The param 'info' is not valid")
  }

  if (primary && !isString(primary)) {
    throw new Error("The param 'primary' is not valid")
  }

  if (!dbExist(databaseName)) {
    throw new Error(`The database ${databaseName} does not exists`)
  }  

  if (!tableExists(databaseName, tableName)) {
    throw new Error(`The database ${databaseName} does not have a table called ${tableName}`)
  }

  const path = databasePath + databaseName + '/'

  const tablesConfig: Array<table> = JSON.parse(fs.readFileSync(path + 'tables.json', {encoding: 'utf-8'}))
  const tableCfg = tablesConfig.find(v => v.name === tableName) as table

  const values: Array<JSONObject> = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf8'}))

  for (let i in tableCfg.values) {
    const value = tableCfg.values[i]
    if (value.required && !info[value.name] && !value.defaultValue) {
      throw new Error(`You don't provide ${value.name}`)
    }

    if (value.type === 'boolean') {
      if (!Object.keys(info).includes(value.name)) {
        throw new Error(`You dont provide: ${value.name}`)
      }
    }

    if (!info[value.name] && !value.required && Object.keys(value).includes('defaultValue')) {
      info[value.name] = value.defaultValue as dbType
    }

    if (value.limit && info[value.name].toString().length > value.limit) {
      throw new Error(`The value ${value.name} is larger than the limit`)
    }

  }

  for (let i in info) {
    let valueCfg: value | undefined = tableCfg.values.find(v => v.name === i)
    if (!valueCfg) {
      throw new Error(`The property ${i} of 'info' does not exists in the table`)
    }

    if (!isValidType(info[i], valueCfg.type as dbTypeValue)) {
      throw new Error(`The value of ${i} is not valid, type must be: ${valueCfg.type}`)
    }
  }

  if (primary) {
    if (values.find(v => v[primary] === info[primary])) {
      return { addedType: 'Value', addedCount: 0, message: 'Key repeated', value: info }
    } 
  }

  info["id"] = values.length + 1

  let newValues = [
    ...values,
    info
  ]

  fs.writeFileSync(path + tableName + '/data.json', JSON.stringify(newValues))

  return { addedType: 'Value', addedCount: 1, value: info }
}

export default addNewValueToTable