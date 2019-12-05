const http = require('http')
const serverHandle = require('../app')
const PORT = 8000

http.createServer(serverHandle).listen(PORT)