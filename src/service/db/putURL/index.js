const doc = require('../connect')
const handleResponse = require('../handle-response')

module.exports = (Item) =>
  new Promise((resolve, reject) => {
    const TableName = 'onyx-service-urls'

    doc.put({
      Item,
      TableName
    }, handleResponse(resolve, reject))
  })
