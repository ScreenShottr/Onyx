const generateID = require('../../service/url-shortener/generate-short-id')
const dbPutURL = require('../../service/db/putURL')
const dbGetURL = require('../../service/db/getURL')
const qs = require('qs')
const respond = require('../../service/response/generate-response')

module.exports = (event, context, callback) =>
  new Promise(async (resolve, reject) => {
    let fullURL = ''
    let shortURL = ''
    let shortURLID = ''
    const deletePass = await generateID(6)

    if (event.body) {
      const parsedBody = qs.parse(event.body)
      if (parsedBody.fullURL) {
        if (parsedBody.fullURL.length > 500) {
          respond({statusCode: 400, Success: false, Content: "URL too long"}, callback)
          resolve()
        }
        fullURL = parsedBody.fullURL
      } else {
        respond({statusCode: 400, Success: false, Content: "URL not provided"}, callback)
        resolve()
      }
      if (parsedBody.customURL) {
        if (parsedBody.customURL.length > 50) {
          respond({statusCode: 400, Success: false, Content: "Custom URL too long"}, callback)
          resolve()
        }
        shortURLID = parsedBody.customURL
      } else {
        shortURLID = await generateID(6)
      }
    }
    shortURL = `https://onyx.sh/${shortURLID}`
    // Check if it exists (later)
    const Item = {short_url_id: shortURLID, long_url: fullURL, short_url: shortURL, delete_pass: deletePass}
    const result = await dbPutURL(Item)
    respond({statusCode: 200, Success: true, Content: Item}, callback)
    resolve()
  })
