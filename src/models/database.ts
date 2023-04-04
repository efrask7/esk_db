import { permission, value } from "../types";
import { user } from "../types";
import createNewDB from "../utils/createNewDB";
import Table from "./table";

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
    return new Table(this.name, name, values)
  }
}

export default Database