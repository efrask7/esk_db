import { IExampleProps } from "./types";

export default function deleteValues({ users }: IExampleProps) {

  const deleteByKey = users.deleteByKey({
    key: 'uuid',
    valueToRemove: '8cbf0edf-ee2d-4968-8b14-3459f847314a'
  })

  console.log(deleteByKey)

  console.log(users.findAll())

  const deleteByValue = users.deleteByValue({
    valueName: 'nombre',
    value: 'Juan'
  })

  //Opcional, pasarle un limite por parametros
  // const deleteByValue = users.deleteByValue({
  //   valueName: 'nombre',
  //   value: 'Juan'
  // }, 5)

  console.log(deleteByValue)

  console.log(users.findAll())
}