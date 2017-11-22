const doc = require('../connect')
const handleResponse = require('../handle-response')

module.exports = (Key) =>
  new Promise((resolve, reject) => {
    const TableName = 'onyx-service-urls'

    doc.delete({
      Key,
      TableName
    }, handleResponse(resolve, reject))
  })
