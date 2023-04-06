import { JSONObject, dbType } from "../../types"

export type valueModified = {
  modifiedCount: number
  message?: string
  modified: JSONObject | Array<JSONObject>
}

export type valueToModify = {
  search: {
    valueName: string,
    value: dbType
  },
  newValue: {
    valueName: string,
    value: dbType
  }
}