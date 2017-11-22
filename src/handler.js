const createFunction = require('./actions/create')
const deleteFunction = require('./actions/delete')
const GetURLInfoFunction = require('./actions/getURLInfo')
const VisitFunction = require('./actions/visit')

module.exports.create = (event, context, callback) => {
  createFunction(event, context, callback)
}

module.exports.delete = (event, context, callback) => {
  deleteFunction(event, context, callback)
}

module.exports.getURLInfo = (event, context, callback) => {
  GetURLInfoFunction(event, context, callback)
}

module.exports.visit = (event, context, callback) => {
  VisitFunction(event, context, callback)
}
