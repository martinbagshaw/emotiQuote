const handler = require("./handler.js");
const path = require("path");
const filePath = path.join(__dirname, "..", "public", "index.html");


const router = (request, response) => {
  const url = request.url;
  
  
  // console.log(url);
  // json path no longer required
  // const jsonPath = path.join(__dirname, "..", "data", "sample.json");
  // console.log(jsonPath);
  
  
  
  // MOVED /data directory to the root
  // - css and js files hosted at http://localhost:5000/css/style.css and http://localhost:5000/index.js
  // - would need to access src/data, and ignore src, which seems difficult

  

  // CLUE:
  // - refreshing page on index.html would not log out the json file in the terminal (not linked in the html)
  // - not using jsonPath and indexOf on it helped
  // - perhaps includes() would work better

  
  
  // CLUE:
  // - url logging
  // - these only log out in the terminal
  // - /data url logged out for data folder
  // console.log(url + ' +++++++++++++++  url');


  // - - - - - - - - - - -
  // home page
  if (url === "/") {
    handler.homeHandler(request, response);
  }

  

  // CLUE: JSON
  // - THIS NEEDED TO COME BEFORE FILES
  // - ALSO MOVED DATA FOLDER FROM SRC TO ROOT DIRECTORY
  // - indexOf also didn't work as expected
  // - - - - - - - - - - -
  // data (json)
  else if (url === "/data") {
    handler.jsonHandler(request, response, url);
  }



  // - - - - - - - - - - -
  // files
  else if (filePath.indexOf("public") !== -1) {
  // else if (url.indexOf("public") !== -1) {
    handler.publicHandler(request, response, url);
  }

  
  else {
    response.writeHead(404, "Content-Type: text/html");
    response.end("<h1>file not found </h1>");
  }
};

module.exports = router;
