const express = require('express')
const path = require('path')
const fs = require('fs')
const PORT = 8000

const app = express()

app.get('/cities', (req, res) => {
  console.log('fetching data...')
  fs.readFile(path.join(__dirname, 'data', 'cities.json'), 'utf-8',  (err, data) => {
    if (err) {
      console.error('err', err)
      res.status(500).send('Can\'t read cities.json')
    } else {
      res.send(data)
    }
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
