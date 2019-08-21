const Blockchain = require('../blockchain')
const express = require('express')
const bodyParser = require('body-parser')
const P2pServer = require('./p2p-server')

const HTTP_PORT = process.env.HTTP_PORT || 3001

const app = express()
const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded)

app.get('/blocks', (req, res) => {
  res.json(bc.chain)
})

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data)
  console.log(`New block added: ${block.toString()}`)

  res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => {
  console.log(`Server is on http://localhost:${HTTP_PORT}`)
})

p2pServer.listen()
