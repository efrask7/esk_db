import { JSONObject, value } from "../types";
import addNewValueToTable from "../utils/addNewValueToTable";
import createTable from "../utils/createTable";

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
      if (!value[this.values[i].name]) {
        throw new Error(`You dont provide: ${this.values[i].name}`)
      }

      if (this.values[i].primaryKey) {
        primary = this.values[i].name
      }
    }
    
    return addNewValueToTable(this.dbName, this.tableName, value, primary)
  }
}

export default Table