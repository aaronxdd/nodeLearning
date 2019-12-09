const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.resolve(__dirname, '../', 'logs', 'access.log')
const readStream = fs.createReadStream(fileName)

const rl = readline.createInterface({
  input: readStream
})

let totalNum = 0
let chromeNum = 0

rl.on('line', (linedata) => {
  if (linedata) {
    let arr = linedata.split('--')
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
      chromeNum++
    }
    totalNum++
  }
}).on('close', () => {
  console.log('Chrome浏览器的占比: ' + chromeNum / totalNum)
})

