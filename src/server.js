const http = require('http');
const router = require('./router.js');
const port = process.env.PORT || 5000;

const server = http.createServer(router);

server.listen(port, function(){
  console.log(`server is listening on localhost:${port}`)
});