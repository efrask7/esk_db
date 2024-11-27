# ESK_DB

## Instalación

```bash
# npm
npm install esk_db
```

## Descripción
Esk_DB es una libreria que te permite crear bases de datos y tablas de manera sencilla, ademas de poder añadir, buscar, editar y eliminar valores de las tablas, haciendo uso de la liberia *fs* de nodejs, guardando los datos en archivos json.

## Importante
Este proyecto se hizo en una semana con fines educativos con el objetivo de aprender a hacer uso de la libreria *fs* de nodejs, por lo que no es recomendable usarlo en un proyecto real.

## Uso
Puedes encontrar ejemplos en la carpeta [examples](https://github.com/efrask7/esk_db/tree/main/examples)

```javascript
import Esk_DB from 'esk_db'
```

## Crear una base de datos

```javascript
const DB = new Esk_DB.Database('nombre')
const save = DB.save()

// devuelve un objeto json
console.log(save)
```

## Crear una tabla

```javascript
// type value = {
//   name: string
//   required: boolean
//   primaryKey?: boolean
//   type: string (string | boolean | number | object)
//   limit?: number
//   defaultValue?: any
// }

// Siendo value un arreglo con los atributos de la tabla

DB.addTable(nombre: string, []: Array<value>)
```

```javascript
const Table = DB.addTable('nombre', [
  { /* Primer atributo */
    name: 'uuid',
    required: true,
    type: 'number',
    primaryKey: true
  },
  { /* Segundo atributo */
    name: 'name',
    required: true,
    type: 'string'
  } 
])

// devuelve un objeto json
const tableSave = Table.save()

console.log(tableSave)
```

## Añadir un valor

```javascript

//Teniendo en cuenta el ejemplo de arriba
const Persona = Table.addValue({
  uuid: "Persona",
  name: 'Juan'
})

// devuelve un objeto json
console.log(Persona)
```

## Buscar un valor

```javascript
// devuelve todos los valores de la tabla
Table.findAll()

// devuelve el valor como un json (si el valor existe)
// search: nombre del atributo
// value: valor del atributo

Table.findOne({
  search: 'valor_requerido',
  value: 223
})

// devuelve un array de los valores con el mismo valor
// name: nombre del atributo
// value: valor del atributo

Table.find({
  name: 'valor1',
  value: "Persona"
})
```

## Editar un valor

```javascript
// search: (buscar el valor en la tabla para editar) { 
//   valueName: nombre del atributo,
//   value: valor del atributo
// }
// newValue: (nuevo valor para el atributo) {
//   valueName: atributo a editar,
//   value: nuevo valor
// }

const edit = Table.editOne({
  search: {
    valueName: 'atributo',
    value: 223
  },
  newValue: {
    valueName: 'valor1',
    value: "nuevo_valor"
  }
})

// devuelve un objeto json
console.log(edit)
```

## Eliminar valores

```javascript
// eliminar por clave primaria
const eliminar = Table.deleteByKey({
  key: 'atributo',
  valueToRemove: 'valor'
})

// devuelve un objeto json
console.log(eliminar)

// eliminar por valor
// debes pasar un objeto con dos atributos:
// valueName: el atributo a buscar
// value: el valor a buscar
// la función elimina todos los datos que tengan el valor proporcionado

const eliminar = Table.deleteByValue({
  valueName: 'valor1',
  value: 'Persona'
})

// tambien es posible limitar la cantidad de datos a eliminar pasandole un atributo extra
// limit: cantidad de datos a eliminar
// parametros: (objeto a buscar, limite a eliminar)

const eliminar = Table.deleteByValue({
  valueName: 'valor1',
  value: 'Persona'
}, 3)
```

