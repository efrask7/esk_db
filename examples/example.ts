import Esk_DB from "../src/index"
import addValues from "./add"
import deleteValues from "./delete"
import editValue from "./edit"
import findValues from "./find"

const db = new Esk_DB('db_test')
const dbSave = db.save()

console.log(dbSave)

const users = db.addTable('users', [
  {
    name: 'uuid',
    required: true,
    type: 'string',
    primaryKey: true
  },
  {
    name: 'nombre',
    required: true,
    type: 'string'
  }
])

const userSaved = users.save()

console.log(userSaved)

console.log('--- Funcion para agregar valores')
addValues({ users, db })
console.log('--- Funciones para buscar valores')
findValues({ users, db })
console.log('--- Funciones para editar valores')
editValue({ users, db })
console.log('--- Funciones para eliminar valores')
deleteValues({ users, db })

// Eliminar tabla
users.deleteTable()

//Eliminar base de datos
db.deleteDatabase()

//Si se elimina la base de datos sin eliminar la tabla, se eliminaran todas las tablas automaticamente