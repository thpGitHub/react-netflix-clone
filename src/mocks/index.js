if (process.env.NODE_ENV === 'development') {
    console.log("process.env.NODE_ENV === 'development'")
    module.exports = require('./browser')
}
