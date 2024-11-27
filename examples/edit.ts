import { IExampleProps } from "./types";

export default function editValue({ users }: IExampleProps) {
  const edit = users.editOne({
    search: {
      valueName: 'uuid',
      value: '8cbf0edf-ee2d-4968-8b14-3459f847314a'
    },
    newValue: {
      valueName: 'nombre',
      value: 'Antonio'
    }
  })

  console.log(edit)

  console.log(users.findOne({
    search: 'uuid',
    value: '8cbf0edf-ee2d-4968-8b14-3459f847314a'
  }))
}