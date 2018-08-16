const mongoose = require('mongoose');
const URI = 'mongodb://admin:admin@localhost:27017/test?authSource=admin';

mongoose.connect(URI)
    .then(db => console.log('Db is connected'))
    .catch(error => console.error(error));

module.exports = mongoose;