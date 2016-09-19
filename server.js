let port = process.env.PORT || 5000,
  express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  server = express(),
  EchoController = require('./EchoController');
  // io = require('socket.io')(port),

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

var whitelist = [`http://localhost:8080`, 'http://portal.boisecodeworks.com']
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  }
}

server.use('/api/echo', cors(corsOptions), EchoController)

server.listen(port, () => {
  console.log('listenting on port: ', port)
})

// io.on('connection', s => {
//   s.on('post', (data) => {
//     EchoController.post(data.key, data.code)
//     s.emit('key', data.key)
//   })
//   s.on('get', (data) => {
//     let code = EchoController.get(data.key)
//     s.emit('FOO', code)
//   })
// })
