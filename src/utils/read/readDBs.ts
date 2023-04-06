import { database } from "../../types";
import fs from "fs"
import config from "../../config.json"
import { isString } from "../functions/utils";

const { databasePath } = config

const readDatabases = (): Array<database> => {
  const databases = fs.readdirSync(databasePath)

  const [ _ignore, ...listOfDatabases ] = databases

  let databasesInfo: Array<database> = []

  if (listOfDatabases.length === 0) return []

  for (let i in listOfDatabases) {
    let db = fs.readFileSync(databasePath + listOfDatabases[i] + '/config.json', {encoding: 'utf-8'})
    databasesInfo.push(JSON.parse(db))
  }

  return databasesInfo
}

const readDatabase = (name: string): database => {

  if (!isString(name) || !name) {
    throw new Error('The name of the database is not valid or is missing')
  }

  const dbs = fs.readdirSync(databasePath)
  if (!dbs.includes(name)) {
    throw new Error(`The database ${name} does not exists`)
  }

  const db = fs.readFileSync(databasePath + name + '/config.json', {encoding: 'utf-8'})

  return JSON.parse(db)
}

const readDatabasesWithoutConfig = (): string[] => {
  const dbs = fs.readdirSync(databasePath)
  const [ _ignore, ...listOfDbs ] = dbs

  return listOfDbs
}

export { readDatabases, readDatabase, readDatabasesWithoutConfig }