const path = require('path')

module.exports = {
  entry: './lib/mvc.js',
  output: {
    filename: 'mvc.js',
    path: path.resolve(__dirname, 'example/www')
  }
}