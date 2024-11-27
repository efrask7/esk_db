import { IExampleProps } from "./types";

export default function addValues({ users }: IExampleProps) {
  const newUser = users.addValue({
    uuid: 'e58978a9-e7f9-44a5-b398-35e9cbb88393',
    nombre: 'Juan'
  })

  const newUser2 = users.addValue({
    uuid: 'aa989d91-b409-4867-adac-16939def7fc3',
    nombre: 'Pepe'
  })

  const newUser3 = users.addValue({
    uuid: 'da2d1ec6-d80d-4628-8372-9f77fa2d8db2',
    nombre: 'Juan'
  })

  const newUser4 = users.addValue({
    uuid: '8cbf0edf-ee2d-4968-8b14-3459f847314a',
    nombre: 'Pedro'
  })


  if (newUser.addedCount > 0) console.log(newUser)
  if (newUser2.addedCount > 0) console.log(newUser2)
  if (newUser3.addedCount > 0) console.log(newUser3)
  if (newUser4.addedCount > 0) console.log(newUser4)
}