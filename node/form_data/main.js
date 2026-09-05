document.querySelector('#myForm').addEventListener('submit', handleFormSubmit)
const formDataObject = {}

function handleFormSubmit(ev) {
  ev.preventDefault()
  const formData = new FormData(ev.target)
  for (let [key, value] of formData.entries()) {
    formDataObject[key] = value
  }
}

document.querySelector('#anotherButton').addEventListener('click', () => {
  console.log(formDataObject)
})
