const uuidv4 = require('uuid/v4')
module.exports = (length) =>
  new Promise((resolve, reject) => {
    const id = (uuidv4()).replace('-', '').substring(0, 6)
    resolve(id)
  })

