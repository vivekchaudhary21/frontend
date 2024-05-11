const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express('app')

app.use('/static', express.static(path.resolve(__dirname, '../dist')))

app.get('/', (_, res) => {
  const pathToHtmlFile = path.resolve(__dirname, '../dist/index.html')
  const content = fs.readFileSync(pathToHtmlFile, 'utf-8')
  res.send(content)
})

app.listen(3000, () => {
  console.log('running on port 3000')
})
