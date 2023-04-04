import fs from 'fs'

const tables = fs.readdirSync('./src/databases/School')

for (let i in tables) {
  console.log(tables[i].includes('.json') + ' - ' + tables[i])
}