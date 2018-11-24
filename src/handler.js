const fs = require("fs");
const path = require("path");
const data = require("../data/sample.json");



// handle the home page (loading index.html)
const homeHandler = (request, response) => {
  // const url = request.url;
  const filePath = path.join(__dirname, "..", "public", "index.html");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, "Content-Type: text/html");
      response.end("this is an error");
    } else {
      response.writeHead(200, "Content-Type: text/html");
      response.end(file);
    }
  });
};



// handle all files
const publicHandler = (request, response) => {
  const url = request.url;
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-ico",
    jpg: "image/jpeg",
    png: "image/png"
  };
  const extension = url.split(".")[1];
  const filePath = path.join(__dirname, "..", "public", url);

  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("this is an error");
    } else {
      response.writeHead(200, {
        "Content-Type": `${extensionType[extension]}`
      });
      response.end(file);
    }
  });
};



// handle json endpoint
const jsonHandler = (request, response) => {
  const filePath = path.join(__dirname, "../", "data", "sample.json");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log("json error");
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("this is an json error");
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(data));
    }
  });
};


module.exports = {
  homeHandler,
  publicHandler,
  jsonHandler
};
