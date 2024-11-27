import { IExampleProps } from "./types";

export default function findValues({ users }: IExampleProps) {
  const allUsers = users.findAll()
  console.log('findAll', allUsers)

  const oneUser = users.findOne({
    search: 'nombre',
    value: 'Pepe'
  })

  console.log('findOne', oneUser)

  const findUsers = users.find({
    name: 'nombre',
    value: 'Juan'
  })

  console.log('find', findUsers)
}