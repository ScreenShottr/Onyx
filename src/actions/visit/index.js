const dbGetURL = require('../../service/db/getURL')
const qs = require('qs')
const respond = require('../../service/response/generate-response')
const redirect = require('../../service/response/generate-redirect')

module.exports = (event, context, callback) =>
  new Promise(async (resolve, reject) => {
    console.log(event)
    let shortURLID = ''
    if (event.pathParameters) {
      if (!event.pathParameters.short_url_id) {
        respond({statusCode: 400, Success: false, Content: 'short URL ID not provided'}, callback)
        return
      } else {
        shortURLID = event.pathParameters.short_url_id
      }
    }
    const Item = {short_url_id: shortURLID}
    const getResult = await dbGetURL(Item)
    if (!getResult.Item) {
      respond({statusCode: 400, Success: false, Content: 'URL Not found'}, callback)
    } else {
      const {
        long_url
      } = getResult.Item

      redirect({Location: long_url}, callback)
      return
    }
    resolve()
  })
