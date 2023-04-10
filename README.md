# SKDB

## Installation

```
# npm
npm install esk_db
```

## Usage

```
import Esk_DB from 'esk_db'
```

## Creating a database
```
const DB = new Esk_DB.Database('name')
const save = DB.save()

# returns a json object
console.log(save)

```

## Creating a table
```
values: 

  (name: string, [array of values])
  
  value: {
    name: string
    required: boolean,
    type: 'string' | 'boolean' | 'number' | 'object',
    primaryKey: (optional) boolean
  }
  DB.addTable(name: string, [])

```
```

const Table = DB.addTable('name', [
  {
    name: 'value1',
    required: false,
    type: 'string'
  }, 
  {
    name: 'value_required',
    required: true,
    type: 'number',
    primaryKey: true
  }
])

const tableSave = Table.save()

# returns a json object
console.log(tableSave)

```

## Add a value
```
const Person = Table.addValue({
  value1: "Person",
  value_required: 223
})

# returns a json object
console.log(Person)

```

## Search a value
```
# returns all the values of the table
Table.findAll()

# returns the value as a json (if the value exists)

 search: name of the property
 value: value of the property

Table.findOne({
  search: 'value_required',
  value: 223
})

# returns a array of the values with the same value

  name: name of the property
  value: value of the property

Table.find({
  name: 'value1',
  value: "Person"
})

```

## Edit a value
``` 
 search: (search the value in the table to edit) { 
  valueName: name of the property,
  value: value of the property
 }
 
 newValue: (new value for the value) {
  valueName,
  value
 }
 
 const edit = Table.editOne({
  search: {
    valueName: 'value_required',
    value: 223
  },
  newValue: {
    valueName: 'value1',
    value: "Other_Person"
  }
 })

# returns a json object
console.log(edit)

```

## Delete values
```
 # delete by key (only delete 1)
 
 const delete = Table.deleteByKey({
  key: 'value_required',
  value: 223
 })
 
 # returns a json object
 console.log(delete)
 
 # delete by value
 
 you have to pass 2 params:
  {}: the value to search
  number: the limit to delete
  
  in this case the function will delete only 2 values or less with that value
 
 const delete = Table.deleteByValue({
  valueName: 'value1',
  value: 'Person'
 }, 2)

```

