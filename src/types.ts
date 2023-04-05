export interface database {
  name: string
  privileges: Array<user>
}

export type table = {
  name: string
  values: Array<value>
}

export type value = {
  name: string
  required: boolean
  primaryKey?: boolean
  type: string
  limit?: number
  defaultValue?: dbType
}

export type valueToSearch = {
  search: string
  value: dbType
}

export type JSONValue = 
  | string
  | number
  | object
  | boolean
  

export interface JSONObject {
  [x: string]: JSONValue
}

export type valueInTable = {
  name: string,
  value: dbType
}

export type valueWithoutInfo = Pick<value, 'name' | 'type'>

export type dbType = string | boolean | number | object

export enum dbTypeValue {
  String = 'string',
  Boolean = 'boolean',
  Number = 'number',
  Object = 'object'
}

export enum permission {
  All = 'all',
  Read = 'read'
}
export type user = {
  name: string
  password?: string
  permissions: permission
}