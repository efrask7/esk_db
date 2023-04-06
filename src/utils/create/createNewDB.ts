import { database } from "../../types";
import fs from 'fs'
import config from "../../config.json"
import { readDatabasesWithoutConfig } from "../read/readDBs";
import { addedDB } from "./types"
import { isString, isValidUser } from "../functions/utils";

const { databasePath } = config

const createNewDB = (databaseInfo: database): addedDB => {
  const { name, privileges } = databaseInfo
  const route = `${databasePath}/${name}/`

  const dbs = readDatabasesWithoutConfig()
  if (dbs.includes(name)) return { addedType: 'Database', addedCount: 0 , message: `Database ${databaseInfo.name} already exists`, value: {name: databaseInfo.name, privileges: databaseInfo.privileges} }

  if (!isString(name)) {
    throw new Error('The provided name is not valid')
  }

  for (let i in privileges) {
    if (!isValidUser(privileges[i])) {
      throw new Error('The provided user is not valid. ' + privileges[i])
    }
  }
  
  fs.mkdirSync(route, {recursive: true})
  fs.writeFileSync(route + '/config.json', JSON.stringify(databaseInfo))

  return { addedType: 'Database', addedCount: 1, value: { name: name, privileges: privileges } }
}

export default createNewDB