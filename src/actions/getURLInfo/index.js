const dbGetURL = require('../../service/db/getURL')
const qs = require('qs')
const respond = require('../../service/response/generate-response')

module.exports = (event, context, callback) =>
  new Promise(async (resolve, reject) => {
    let shortURLID = ''
    if (event.body) {
      const parsedBody = qs.parse(event.body)
      if (!parsedBody.shortURLID) {
        respond({statusCode: 400, Success: false, Content: 'short URL ID not provided'}, callback)
        resolve()
      } else {
        shortURLID = parsedBody.shortURLID
      }
    }
    const Item = {short_url_id: shortURLID}
    const getResult = await dbGetURL(Item)
    if (!getResult.Item) {
      respond({statusCode: 400, Success: false, Content: 'URL Not found'}, callback)
    } else {
      const {
        short_url_id,
        short_url,
        long_url
      } = getResult.Item

      const Info = {
        short_url_id,
        short_url,
        long_url
      }
      respond({statusCode: 200, Success: true, Content: Info}, callback)
      resolve()
    }
  })
