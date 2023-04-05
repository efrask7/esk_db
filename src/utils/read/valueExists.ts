import dbExist from "./dbExists"
import tableExists from "./tableExists"
import fs from "fs"
import config from "../../config.json"
import { table } from "../../types"

const { databasePath } = config

const valueExists = (dbName: string, tableName: string, value: string): boolean => {
  if (!dbExist(dbName) || !tableExists(dbName, tableName)) {
    throw new Error('The provided database or table does not exists')
  }

  const tableInfo: Array<table> = JSON.parse(fs.readFileSync(databasePath + dbName + '/tables.json', {encoding: 'utf-8'}))

  const index = tableInfo.findIndex(v => v.name === tableName)

  const exists = tableInfo[index].values.find(v => v.name === value)

  if (!exists) {
    return false
  }

  return true
}

export default valueExists