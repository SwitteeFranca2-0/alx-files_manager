const express = require('express')
const router = require('./routes/index');


const server = express()
const port = process.env.PORT || 5000

server.use(express.json());
server.use(router);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})