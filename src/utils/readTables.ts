import config from '../config.json'
import fs from 'fs'

const { databasePath } = config

const readTables = (dbName: string): string[] => {
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