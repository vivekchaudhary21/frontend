import { formData } from "./form"

const form = document.querySelector('form')!

form.addEventListener('submit', e =>{
  e.preventDefault()
  const values = formData(form)
  console.log(values)
})

