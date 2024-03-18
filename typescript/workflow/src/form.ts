export const formData = (form: HTMLFormElement): {[key: string]: string} => {
  const inputs = form.querySelectorAll('input')
  const values: {[key: string]: string} = {}

  inputs.forEach(rec => {
    values[rec.id] = rec.value
  })

  return values
}
