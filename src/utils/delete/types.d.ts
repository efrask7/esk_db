import { table, JSONObject } from "../../types"

export type objectDeleted = {
  deletedType: string
  deletedCount: number
}

export interface deletedDB extends objectDeleted {
  deleted: {
    name: string,
    tables: Array<table>
  }
}

export interface deletedValue extends objectDeleted {
  deleted: JSONObject | Array<JSONObject>
}

export interface deletedTable extends objectDeleted {
  deleted: table
}