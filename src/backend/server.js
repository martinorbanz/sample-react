const express = require('express')
const app = express();
const server = require('http').createServer(app);
const PORT = '5000';
const path = require('path');
const routes = require('./routes');

/**
 * Catch unhandled errors in promises globally to prevent crashes
 */
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
});

/**
 * Serve React's build directory 
 */
app.use(express.static(path.join(__dirname, '../../build')));

routes(app);

server.listen(PORT, () => {
  console.log('http running on port', PORT);
});

