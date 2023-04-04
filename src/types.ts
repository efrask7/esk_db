export interface database {
  name: string
  privileges: Array<user>
}

export type table = {
  name: string
  values: Array<value>
}

export interface value {
  name: string
  required: boolean
  primaryKey?: boolean
  type: dbType
  limit?: number
  defaultValue?: dbType
}

type JSONValue = 
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

export enum dbType {
  String = 'String',
  Number = 'Number',
  JSON = 'JSON',
  Array = 'Array',
  Boolean = 'Boolean'
}

export enum permission {
  All = 'all',
  Read = 'read'
}
export type user = {
  name: string,
  password?: string,
  permissions: permission
}