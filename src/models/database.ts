import { permission, value, user } from "../types.js";
import createNewDB from "../utils/create/createNewDB.js";
import deleteDatabase from "../utils/delete/deleteDatabase.js";
import Table from "./table.js";

class Database {
  name: string
  privileges: Array<user>
  constructor (name: string) {
    this.name = name
    this.privileges = [{
      name: 'root',
      permissions: permission.All
    }]
  }

  save() {
    return createNewDB({
      name: this.name,
      privileges: this.privileges
    })
  }

  addTable(name: string, values: Array<value>) {
    for (let i in values) {
      if (values[i].name === 'id') {
        throw new Error("You can't create a value with the name 'id'")
      }
    }
    return new Table(this.name, name, values)
  }

  deleteDatabase() {
    return deleteDatabase(this.name)
  }
}

export default Database