import { JSONObject, dbType, value, valueToSearch } from "../types";
import addNewValueToTable from "../utils/create/addNewValueToTable";
import createTable from "../utils/create/createTable";
import { deleteValueFromPrimaryKey, deleteValuesFromValue } from "../utils/delete/deleteValueFromTable";
import getValueFromValue from "../utils/read/getValueFromValue";
import getValues from "../utils/read/getValues";
import getValuesFromValue from "../utils/read/getValuesFromValue";

class Table {
  tableName: string
  values: Array<value>
  dbName: string 

  constructor (dbName: string, tableName: string, values: Array<value>) {
    this.tableName = tableName
    this.values = values
    this.dbName = dbName
  }

  save() {
    return createTable(this.dbName, {
      name: this.tableName,
      values: this.values
    })
  }

  addValue(value: JSONObject) {

    let primary

    for (let i in this.values) {

      if (!value[this.values[i].name] && this.values[i].type !== 'boolean') {
        throw new Error(`You dont provide: ${this.values[i].name}`)
      }

      if (this.values[i].type === 'boolean') {
        if (!Object.keys(value).includes(this.values[i].name)) {
          throw new Error(`You dont provide: ${this.values[i].name}`)
        }
      }

      if (this.values[i].primaryKey) {
        primary = this.values[i].name
      }
    }
    
    return addNewValueToTable(this.dbName, this.tableName, value, primary)
  }

  findOne(value: valueToSearch) {
    return getValueFromValue(this.dbName, this.tableName, value)
  }

  findAll() {
    return getValues(this.dbName, this.tableName)
  }

  find(search: {name: string, value: dbType}) {
    return getValuesFromValue(this.dbName, this.tableName, search)
  }

  deleteByKey(value: {key: string, valueToRemove: dbType}) {
    return deleteValueFromPrimaryKey(this.dbName, this.tableName, value)
  }

  deleteByValue(valueInfo: {valueName: string, value: dbType}, limit?: number) {
    return deleteValuesFromValue(this.dbName, this.tableName, valueInfo, limit)
  }
}

export default Table