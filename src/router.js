const fs = require('fs');
const path = require('path');
// const port = 5000;

const router = (request, response) => {
  const url = request.url;

  if(url === '/') {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (error, file) => {
      if(error) {
        console.log(error)
        response.writeHead(500, {'Content-Type':'text/html'})
        response.end('this is an error');
        return;
      } else {
        response.writeHead(200, {'Content-Type':'text/html'})
        response.end(file);
      }
    });
  }
}









module.exports = router;
