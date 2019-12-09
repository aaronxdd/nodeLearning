const fs = require('fs')
const path = require('path')

function writeLogs (fileName, log) {
  const fullFilName = path.resolve(__dirname, '../', 'logs', fileName)
  let wirteStream = fs.createWriteStream(fullFilName, {
    flags: 'a'
  })
  wirteStream.write(log+'\n')
}

function accessLogs (log) {
  writeLogs('access.log', log)
}

module.exports = {
  accessLogs
}