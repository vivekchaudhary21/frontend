import { produce } from 'immer'

const changeName = (person, name) => {
  return produce(person, draft => {
    draft.name = name
  })
}

const person = {
  name: 'Foo'
}

const newPerson = changeName(person, 'Bar')

console.log('Old Person', person) // { name: 'Foo' }
console.log('New Person', newPerson) // { name: 'Bar' }

const people = [
  {
    name: 'Bar'
  }
]

const addPerson = (people, person) => {
  return produce(people, draft => {
    draft.push(person)
  })
}

const newPeople = addPerson(people, person)

console.log('Old People', people)
console.log('New People', newPeople)

// dealing with nested object
const changeStreet = (person, street) => {
  return produce(person, draft => {
    draft.address.street = street
  })
}

const personDetails = {
  name: 'Foo',
  address: {
    street: 'Kings',
    lane: 21
  }
}

const newDetails = changeStreet(personDetails, 'Queens')

console.log('Old', personDetails)
console.log('New', newDetails)
