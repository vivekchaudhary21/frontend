const firstNames = [
  'Aarav',
  'Vivaan',
  'Aditya',
  'Anaya',
  'Diya',
  'Isha',
  'Emma',
  'Olivia',
  'Liam',
  'Noah',
  'Sophia',
  'Mason',
]

const lastNames = [
  'Sharma',
  'Patel',
  'Gupta',
  'Singh',
  'Mehta',
  'Khan',
  'Smith',
  'Johnson',
  'Brown',
  'Wilson',
  'Miller',
  'Davis',
]

const locations = [
  'Bengaluru, India',
  'Mumbai, India',
  'Delhi, India',
  'Pune, India',
  'New York, United States',
  'San Francisco, United States',
  'London, United Kingdom',
  'Berlin, Germany',
  'Toronto, Canada',
  'Sydney, Australia',
]

export const users = Array.from({ length: 10000 }, (_, index) => {
  const id = index + 1
  const firstName = firstNames[index % firstNames.length]
  const lastName =
    lastNames[Math.floor(index / firstNames.length) % lastNames.length]
  const username = `${firstName}.${lastName}.${id}`.toLowerCase()

  return {
    id,
    name: `${firstName} ${lastName}`,
    username,
    email: `${username}@example.com`,
    phone: `+1-555-${String(id).padStart(4, '0')}`,
    picture: `https://i.pravatar.cc/48?u=${id}`,
    location: locations[index % locations.length],
    age: 18 + (index % 48),
    searchIndex: id,
  }
})

export const fetchUsers = () => users
