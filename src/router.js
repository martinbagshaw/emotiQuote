const fs = require('fs');
const path = require('path');
// const port = 5000;

const extensionType = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  ico: 'image/x-ico',
  jpg: 'image/jpeg',
  png: 'image/png'
};

const router = (request, response) => {
  const url = request.url;
  const extension = url.split('.')[1];

  if(url === '/') {
    const filePath = path.join(__dirname, '../', 'public', 'index.html');
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
  } else if (url !== '/') {
    // handeling generic files
    const filePath = path.join(__dirname, '..', 'public', url);
    fs.readFile(filePath, (error, file) => {
      if(error) {
        console.log(error)
        response.writeHead(500, {'Content-Type':'text/html'})
        response.end('this is an error');
        return;
      } else {
        response.writeHead(200, {'Content-Type':`${extensionType[extension]}`});
        response.end(file);
      }
    });
  }
  //else {
    // handeling errors
  //}

}









module.exports = router;
