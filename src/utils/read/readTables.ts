import config from '../../config.js'
import fs from 'fs'
import { isString } from '../functions/utils.js'

const { databasePath } = config

const readTables = (dbName: string): string[] => {
  if (!isString(dbName) || !dbName) {
    throw new Error('The name of the database is not valid or is missing')
  }
  const path = databasePath + dbName

  const tables = fs.readdirSync(path)

  let tablesToReturn = []

  for (let i in tables) {
    if (!tables[i].includes('.json')) {
      tablesToReturn.push(tables[i])
    }
  }

  return tablesToReturn
}

export default readTables