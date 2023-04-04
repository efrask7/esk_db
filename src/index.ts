import Database from "./models/database";
import { dbType } from "./types";

const SchoolDB = new Database('School')

let db = SchoolDB.save()
console.log(db)

let students = SchoolDB.addTable('students', [{
  name: 'fullname',
  required: true,
  type: dbType.String
},
{
  name: 'card',
  required: true,
  type: dbType.Number,
  limit: 8,
  primaryKey: true
}])

console.log(students.save())

console.log(students.addValue({
  fullname: 'juan',
  card: 55599234
}))