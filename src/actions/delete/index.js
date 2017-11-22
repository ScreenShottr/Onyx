const dbDeleteURL = require('../../service/db/putURL')
const dbGetURL = require('../../service/db/getURL')
const qs = require('qs')
const respond = require('../../service/response/generate-response')

module.exports = (event, context, callback) =>
  new Promise(async (resolve, reject) => {
    let shortURLID = ''
    let deletePass = ''

    if (event.body) {
      const parsedBody = qs.parse(event.body)
      console.log(parsedBody)
      if (!parsedBody.shortURLID) {
        respond({statusCode: 400, Success: false, Content: 'short URL ID not provided'}, callback)
        resolve()
      } else {
        shortURLID = parsedBody.shortURLID
      }

      if (!parsedBody.deletePass) {
        respond({statusCode: 400, Success: false, Content: 'Delete Pass not provided'}, callback)
        resolve()
      } else {
        deletePass = parsedBody.deletePass
      }
    }
    const Item = {short_url_id: shortURLID}
    const getResult = await dbGetURL(Item)
    if (!getResult.Item) {
      respond({statusCode: 400, Success: false, Content: 'URL Not found'}, callback)
    } else if (getResult.Item.delete_pass !== deletePass ) {
      respond({statusCode: 403, Success: false, Content: 'Incorrect Password'}, callback)
    } else {
      const deleteResult = await dbDeleteURL(Item)
      respond({statusCode: 200, Success: true, Content: 'Deleted'}, callback)
      resolve()
    }
  })
