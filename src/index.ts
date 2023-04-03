import { database, dbType, permission } from "./types";
import createNewDB from "./utils/createNewDB";

const info: database = {
  name: 'School',
  tables: [
    {
      name: 'students',
      values: [
        {
          name: 'name',
          required: true,
          type: dbType.String,
          limit: 50
        },
        {
          name: 'card',
          required: true,
          primaryKey: true,
          type: dbType.Number,
          limit: 8
        }
      ]
    },
    {
      name: 'teachers',
      values: [
        {
          name: 'name',
          required: true,
          type: dbType.String,
          limit: 50
        },
        {
          name: 'card',
          required: true,
          primaryKey: true,
          type: dbType.Number,
          limit: 8
        }
      ]
    }
  ],
  privileges: [
    {
      name: 'root',
      permissions: permission.All
    }
  ]
}

console.log(createNewDB(info))