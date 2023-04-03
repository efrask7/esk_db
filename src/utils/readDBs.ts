import { database } from "../types";
import fs from "fs"
import config from "../config.json"

const { databasePath } = config

export const readDatabases = (): Array<database> => {
  const databases = fs.readdirSync(databasePath)

  const [ _ignore, ...listOfDatabases ] = databases

  let databasesInfo: Array<database> = []

  for (let i in listOfDatabases) {
    let db = fs.readFileSync(databasePath + listOfDatabases[i] + '/config.json', {encoding: 'utf-8'})
    databasesInfo.push(JSON.parse(db))
  }

  return databasesInfo
}

export const readDatabase = (name: string): database => {
  const dbs = fs.readdirSync(databasePath)
  if (!dbs.includes(name)) {
    throw new Error('The database: ' + name + ' does not exist')
  }

  const db = fs.readFileSync(databasePath + name + '/config.json', {encoding: 'utf-8'})

  return JSON.parse(db)
}