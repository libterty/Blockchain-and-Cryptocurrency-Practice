const Websocket = require('ws')
const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

class P2pServer {
  // Take one piece of data as input
  constructor(blockchain) {
    this.blockchain = blockchain
    this.sockets = []
  }
  // Starting of the server and creating
  listen() {
    // Server create base on env setup or 5001
    const server = new Websocket.Server({ port: P2P_PORT })

    // event listener, listen incoming msg and sending websocket server
    server.on('connection', socket => this.connectSocket(socket))

    this.connectToPeers()

    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`)
  }

  connectToPeers() {
    peers.forEach(peer => {
      // ws://localhost:5001, creat a socket obj
      const socket = new Websocket(peer)

      // If server is start late, callback create socket we assgin manually by running script command
      socket.on('open', () => this.connectSocket(socket))
    })
  }

  // helper function
  connectSocket(socket) {
    this.sockets.push(socket)
    console.log('Socket connected')

    // Pass the socket obj been passed in the connectSocket
    this.msgHandler(socket)

    this.sendChain(socket)
  }

  msgHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message)

      this.blockchain.replaceChain(data)
    })
  }

  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain))
  }

  syncChains() {
    this.sockets.forEach(socket => {
      this.sendChain(socket)
    })
  }
}

module.exports = P2pServer
