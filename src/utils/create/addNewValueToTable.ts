import fs from 'fs'
import config from '../../config.json'
import { JSONObject, valueAdded } from '../../types'

const { databasePath } = config 

const addNewValueToTable = (databaseName: string, tableName: string, info: JSONObject, primary?: string): valueAdded => {
  const dbs = fs.readdirSync(databasePath)
  if (!dbs.includes(databaseName)) {
    throw new Error(`The database ${databaseName} does not exist`)
  }  

  const path = databasePath + databaseName + '/'

  //const dbConfig = fs.readFileSync(path + 'config.json', {encoding: 'utf-8'})
  //const config: database = JSON.parse(dbConfig)
  //let indexOfTable = config.tables.findIndex(value => value.name === tableName)

  let values: Array<JSONObject> = JSON.parse(fs.readFileSync(path + tableName + '/data.json', {encoding: 'utf8'}))

  if (primary) {
    if (values.find(v => v[primary] === info[primary])) {
      return { addedCount: 0, message: 'Key repeated', value: info }
    }
  }

  info["id"] = values.length + 1

  let newValues = [
    ...values,
    info
  ]

  fs.writeFileSync(path + tableName + '/data.json', JSON.stringify(newValues))

  return { addedCount: 1, value: info }

}
//addNewValueToTable('School', 'students', {"name": "Juansito", "card": 55599683})

// const isValidType = (value: any, type: dbType): boolean => {
//   if (type === dbType.Boolean && typeof value !== 'boolean') {
//     return false
//   }

//   if (type === dbType.Array && typeof value !== 'object') {
//     return false
//   }

//   if (type === dbType.JSON && typeof value !== 'object') {
//     return false
//   }

//   if (type === dbType.Number && typeof value !== 'number') {
//     return false
//   }

//   if (type === dbType.String && typeof value !== 'string') {
//     return false
//   }

//   return true
// }

export default addNewValueToTable