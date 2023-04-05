import Database from "./models/database";

const SchoolDB = new Database('School')

let db = SchoolDB.save()
console.log(db)

let students = SchoolDB.addTable('students', [
{
  name: 'fullname',
  required: true,
  type: 'string'
},
{
  name: 'card',
  required: true,
  type: 'number',
  limit: 8,
  primaryKey: true
}])

console.log(students.save())

// console.log(students.addValue({
//   fullname: 'pepito',
//   card: 34399232
// }))

const teachers = SchoolDB.addTable('teachers', [
  {
    name: 'fullname',
    required: true,
    type: 'string'
  },
  {
    name: 'card',
    required: true,
    type: 'number',
    limit: 8,
    primaryKey: true
  }, 
  {
    name: 'hasClassroom',
    required: true,
    type: 'boolean'
  }
])

console.log(teachers.save())

console.log(teachers.addValue({
  fullname: 'Juan',
  card: 22933456,
  hasClassroom: true
}))

//console.log(teachers.deleteByKey({key: 'card', valueToRemove: 55599300}))

// console.log(teachers.findOne({
//   search: 'card',
//   value: 55599300
// }))

// console.log(students.findOne({
//   search: 'card',
//   value: 55599300
// }))

// console.log(teachers.find())

//console.log(SchoolDB.delete())