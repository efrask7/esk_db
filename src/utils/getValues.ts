import config from '../config.json'
import { readDatabasesWithoutConfig } from './readDBs'
import readTables from './readTables'
import fs from 'fs'

const { databasePath } = config

const getValues = (dbName: string, tableName: string): [] => {
  const path = databasePath + dbName + '/'

  const dbs = readDatabasesWithoutConfig()
  if (!dbs.includes(dbName)) {
    throw new Error('The provided database does not exists')
  }

  const tables = readTables(dbName)
  if (!tables.includes(tableName)) {
    throw new Error('The provided table does not exists')
  }

  const values: [] = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf-8'}))

  return values
}

export default getValues