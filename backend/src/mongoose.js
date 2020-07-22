const mongoose = require('mongoose');

module.exports = function (app) {
  mongoose.connect(
    app.get('mongodb'),
    { 
      useCreateIndex: true, 
      useNewUrlParser: true, 
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      keepAlive: true
    } 
  );
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
