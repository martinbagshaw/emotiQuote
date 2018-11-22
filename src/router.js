const handler = require("./handler.js");
const path = require("path");
const filePath = path.join(__dirname, "..", "public", "index.html");

const router = (request, response) => {
  const url = request.url;
  const jsonPath = path.join(__dirname, "..", url);

  if (url === "/") {
    handler.homeHandler(request, response);
  } else if (filePath.indexOf("public") !== -1) {
    handler.publicHandler(request, response, url);
  } else if (jsonPath.indexOf("data") !== -1) {
    // console.log("Json path " + jsonPath);
    handler.jsonHandler(request, response, url);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("<h1>file not found </h1>");
  }
};

module.exports = router;
//
