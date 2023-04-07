import { JSONObject, dbType, value, valueToSearch } from "../types.js";
import addNewValueToTable from "../utils/create/addNewValueToTable.js";
import createTable from "../utils/create/createTable.js";
import deleteTable from "../utils/delete/deleteTable.js";
import { deleteValueFromPrimaryKey, deleteValuesFromValue } from "../utils/delete/deleteValueFromTable.js";
import modifyValue from "../utils/modify/modifyValue.js";
import { valueToModify } from "../utils/modify/types.js";
import getValueFromValue from "../utils/read/getValueFromValue.js";
import getValues from "../utils/read/getValues.js";
import getValuesFromValue from "../utils/read/getValuesFromValue.js";

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

    if (!value) {
      throw new Error(`You don't provide the value. If is a value that is not required, pass a empty json`)
    }

    for (let i in this.values) {

      if (!Object.keys(value).includes(this.values[i].name) && this.values[i].required && this.values[i].type !== 'boolean' && !this.values[i].defaultValue) {
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

  editOne(value: valueToModify) {
    return modifyValue(this.dbName, this.tableName, value)
  }

  deleteByKey(value: {key: string, valueToRemove: dbType}) {
    return deleteValueFromPrimaryKey(this.dbName, this.tableName, value)
  }

  deleteByValue(valueInfo: {valueName: string, value: dbType}, limit?: number) {
    return deleteValuesFromValue(this.dbName, this.tableName, valueInfo, limit)
  }

  deleteTable() {
    return deleteTable(this.dbName, this.tableName)
  }
}

export default Table