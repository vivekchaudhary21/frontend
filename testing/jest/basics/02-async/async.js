const axios = require('axios')

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const fetchData = async id => {
  const result = await axios({
    method: 'get',
    url: `${USERS_URL}/${id}`
  })
  return result.data
}

module.exports = fetchData
