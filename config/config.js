module.exports = {
  'secret': 'jsonwebtokensaregreat',
  'database': process.env.MONGOLAB_URI || 'mongodb://localhost:27017/players-app',
  'port': process.env.PORT || 3000
};