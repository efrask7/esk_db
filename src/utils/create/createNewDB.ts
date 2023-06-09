import { database } from "../../types.js";
import fs from 'fs'
import config from '../../config.js'
import { addedDB } from "./types.js"
import { isString, isValidUser } from "../functions/utils.js";
import dbExist from "../read/dbExists.js";

const { databasePath } = config

const createNewDB = (databaseInfo: database): addedDB => {

  if (!databaseInfo) {
    throw new Error('You have to provide the database')
  }

  if (!databaseInfo.name || !isString(databaseInfo.name)) {
    throw new Error('The database name is not valid or is missing')
  }

  if (!databaseInfo.privileges) {
    throw new Error('You have to provide the users of the database')
  }

  const { name, privileges } = databaseInfo
  const route = `${databasePath}/${name}/`

  if (!fs.existsSync(databasePath)) {
    fs.mkdirSync(databasePath, {recursive: true})
  }

  if (dbExist(name)) return { addedType: 'Database', addedCount: 0 , message: `Database ${databaseInfo.name} already exists`, value: {name: databaseInfo.name, privileges: databaseInfo.privileges} }

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