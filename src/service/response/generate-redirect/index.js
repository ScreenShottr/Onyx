module.exports = ({Location}, callback) => {
  const response = {
    statusCode: 301,
    headers: {
      Location
    }
  }

  callback(null, response)
}
