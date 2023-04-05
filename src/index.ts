import Database from "./models/database";

const SchoolDB = new Database('School')

SchoolDB.save()

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

students.save()

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

teachers.save()

teachers.addValue({
  fullname: 'Juan',
  card: 22933456,
  hasClassroom: true
})

teachers.addValue({
  fullname: 'Juansito',
  card: 22933452,
  hasClassroom: true
})

teachers.addValue({
  fullname: 'Juans',
  card: 22933451,
  hasClassroom: true
})

teachers.addValue({
  fullname: 'JPepe',
  card: 22933410,
  hasClassroom: false
})

teachers.addValue({
  fullname: 'Jepe',
  card: 22933110,
  hasClassroom: false
})

teachers.addValue({
  fullname: 'Test',
  card: 22933166,
  hasClassroom: false
})

teachers.addValue({
  fullname: 'Test 22',
  card: 22934110,
  hasClassroom: false
})

teachers.addValue({
  fullname: 'Test 54',
  card: 23933110,
  hasClassroom: false
})

teachers.addValue({
  fullname: 'Tetro',
  card: 22933499,
  hasClassroom: true
})

teachers.addValue({
  fullname: 'J2',
  card: 22933932,
  hasClassroom: true
})

console.log(teachers.findOne({
  search: 'fullname',
  value: false
}))

// console.log('-----------------')

// console.log(teachers.find({
//   name: 'hasClassroom',
//   value: false
// }))

// console.log('Delete 5...')

// console.log(teachers.deleteByValue({
//   valueName: 'hasClassroom',
//   value: false,
// }, 8))

// console.log(teachers.find({
//   name: 'hasClassroom',
//   value: false
// }))

// console.log(teachers.deleteByValue({
//   valueName: 'hasClassroom',
//   value: false
// }))

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

const Shop = new Database('Shop')

console.log(Shop.save())

// const products = Shop.addTable('products', [
//   {
//     name: 'name',
//     required: true,
//     type: 'string'
//   }
// ])

// console.log(products.save())

// console.log(products.deleteTable())

console.log(Shop.deleteDatabase())