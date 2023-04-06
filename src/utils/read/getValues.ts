import config from '../../config.json'
import { JSONObject } from '../../types'
import dbExist from './dbExists'
import fs from 'fs'
import tableExists from './tableExists'
import { isString } from '../functions/utils'

const { databasePath } = config

const getValues = (dbName: string, tableName: string): Array<JSONObject> => {
  
  if (!dbName || !tableName) {
    throw new Error('You have to pass 2 params')
  }

  if (!isString(dbName) || !isString(tableName)) {
    throw new Error('One of the params is not valid')
  }
  
  const path = databasePath + dbName + '/'

  if (!dbExist(dbName)) {
    throw new Error(`The database ${dbName} does not exist`)
  }

  if (!tableExists(dbName, tableName)) {
    throw new Error(`The database ${dbName} don't have a table called ${tableName}`)
  }

  const values: Array<JSONObject> = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf-8'}))

  return values
}

export default getValues