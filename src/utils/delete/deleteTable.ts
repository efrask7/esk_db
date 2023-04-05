import dbExist from "../read/dbExists"
import tableExists from "../read/tableExists"
import config from "../../config.json"
import fs from "fs"
import { table } from "../../types"
import { deletedTable } from "./types"


const { databasePath } = config


const deleteTable = (dbName: string, tableName: string): deletedTable => {
  if (!dbName || !tableName) {
    throw new Error('You have to provide 2 params: dbName && tableName')
  }

  if (!dbExist(dbName) || !tableExists(dbName, tableName)) {
    throw new Error('The database or table does not exists')
  }

  const path = databasePath + dbName + '/'

  const tables: Array<table> = JSON.parse(fs.readFileSync(path + 'tables.json', {encoding: 'utf-8'}))

  const tableInfo = tables.find(v => v.name === tableName) as table

  let newTables = tables.filter(v => v.name !== tableName)

  fs.rmSync(path + tableName, {recursive: true, force: true})

  fs.writeFileSync(path + 'tables.json', JSON.stringify(newTables))

  return { deletedType: 'Table', deletedCount: 1, deleted: tableInfo }
}

export default deleteTable