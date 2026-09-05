const net = require('net')
const PORT = 3000

const server = net.createServer((socket) => {
  console.log('client connected')
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}. Address is: `, server.address())
})
