const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');


let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log("mongo DB is connected")
  
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};




process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
