import { database, JSONObject, table } from "../../types"

export type valueAdded = {
  addedType: string
  addedCount: number
  message?: string
}

export interface addedDB extends valueAdded {
  value: database
}

export interface addedValue extends valueAdded {
  value: JSONObject | Array<JSONObject>
}

export interface addedTable extends valueAdded {
  value: table
}