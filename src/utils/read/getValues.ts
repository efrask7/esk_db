import config from '../../config.json'
import { JSONObject } from '../../types'
import dbExist from './dbExists'
import fs from 'fs'
import tableExists from './tableExists'

const { databasePath } = config

const getValues = (dbName: string, tableName: string): Array<JSONObject> => {
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