const fs = require("fs");
const path = require("path");
const data = require("./data/sample.json");
// const port = 5000;

const homeHandler = (request, response) => {
  const url = request.url;

  // if (url === "/") {
    const filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        response.writeHead(500, { "Content-Type": "text/html" });
        response.end("this is an error");
        return;
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(file);
      }
    });
  // }
};

const publicHandler = (request, response) => {

  const url = request.url;

  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    // ico: "image/x-ico",
    jpg: "image/jpeg",
    png: "image/png"
  };
  // handeling generic files
  const extension = url.split(".")[1];
  const filePath = path.join(__dirname, "..", "public", url);


  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log(error);
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("this is an error");
      return;
    } else {
      response.writeHead(200, {
        "Content-Type": `${extensionType[extension]}`
      });
      response.end(file);
    }
  });
};

const jsonHandler = (request, response) => {
  const url = request.url;
  const filePath = path.join(__dirname, "data", "sample.json");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log("json error");
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("this is an json error");
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(data.quotes));
    }
  });
};

module.exports = {
  homeHandler,
  publicHandler,
  jsonHandler
};
