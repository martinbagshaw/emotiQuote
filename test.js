const test = require('tape');

// router function calls other functions, which are impure
// const router = require("./src/router.js");

test("Testing tape is working", function(t){
  t.equal(1,1, "one should equal one");
  t.end();
});





// mock the router function here - test urls
const router = (request) => {
  const url = request.url;
  if (url === "/") {
    return 'home';
  }
  else if (url === "/data") {
    return 'json';
  }
  else if (url === "/public") {
    return 'files';
  }
  else {
    return 'error';
  }
}

// test the router function
test('router sending to home', function(t){
  const actual = router( {url:'/'} );
  const expected = 'home';
  t.equals(actual, expected), 'should send to homeHandler function in handler.js';
  t.end();
})
test('router sending to data folder', function(t){
  const actual = router( {url:'/data'} );
  const expected = 'json';
  t.equals(actual, expected), 'should send to jsonHandler function in handler.js';
  t.end();
})
test('router sending to public folder', function(t){
  const actual = router( {url:'/public'} );
  const expected = 'files';
  t.equals(actual, expected), 'should send to publicHandler function in handler.js';
  t.end();
})
test('router sending an error', function(t){
  const actual = router( {url:'/src'} );
  const expected = 'error';
  t.equals(actual, expected), 'should throw an error, and not get sent to handler.js';
  t.end();
})





// mock the homeHandler function
const homeHandler = (filePath) => {
  if (filePath !== '/public/index.html') {
    return '500: internal server error';
  } else {
    return '200: ok';
  }
};

// test the home handler function
test('homeHandler working as expected', function(t){
  const actual = homeHandler('/public/index.html');
  const expected = '200: ok';
  t.equals(actual, expected), 'should load the index.html file, and write 200 http status code in the header';
  t.end();
})
test('homeHandler error', function(t){
  const actual = homeHandler('/public/css/style.css');
  const expected = '500: internal server error';
  t.equals(actual, expected), 'should throw an error, and write 500 http status code in the header';
  t.end();
})







// mock the publicHandler function
const publicHandler = (request) => {
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
  // need to be more stringent than just checking for a string
  if (typeof extensionType[extension] !== 'string') {
    return '500: internal server error';
  } else {
    return `${extensionType[extension]}`;
  }
};

// test the publicHandler function
test('publicHandler working with css files', function(t){
  const actual = publicHandler({url:'/css/style.css'});
  const expected = 'text/css';
  t.equals(actual, expected), 'should load the style.css file, and write 200 http status code in the header';
  t.end();
})
test('publicHandler throwing an error with json files', function(t){
  const actual = publicHandler({url:'/data/sample.json'});
  const expected = '500: internal server error';
  t.equals(actual, expected), 'should not load a .json file, and write 500 http status code in the header';
  t.end();
})
test('publicHandler working with js files', function(t){
  const actual = publicHandler({url:'/public/index.js'});
  const expected = 'application/javascript';
  t.equals(actual, expected), 'should load the index.js file, and write 200 http status code in the header';
  t.end();
})






// mock the jsonHandler function
const jsonHandler = (filePath, data) => {
  if (filePath !== '/data/sample.json' || typeof data !== 'object') {
    return '500: internal server error, no json file or object, or wrong path';
  } else {
    return JSON.stringify(data);
  }
};

// test the jsonHandler function
test('jsonHandler working and stringifying data from /data/sample.json', function(t){
  const actual = jsonHandler('/data/sample.json', {Quote: "Testing json stringify."});
  const expected = '{"Quote":"Testing json stringify."}';
  t.equals(actual, expected), 'should stringify the sample.json file, and write 200 http status code in the header';
  t.end();
})
test('jsonHandler failing due to wrong file path argument', function(t){
  const actual = jsonHandler('sample.json', {Quote: "Testing json stringify."});
  const expected = '500: internal server error, no json file or object, or wrong path';
  t.equals(actual, expected), 'should fail to find the sample.json file, and write 500 http status code in the header';
  t.end();
})
test('jsonHandler passing, but entering an empty object', function(t){
  const actual = jsonHandler('/data/sample.json', {});
  const expected = '{}';
  t.equals(actual, expected), 'should stringify an empty sample.json file, and write 200 http status code in the header';
  t.end();
})
test('jsonHandler failing as arguments entered in the wrong order', function(t){
  const actual = jsonHandler({Quote: "Testing json stringify."}, '/data/sample.json');
  const expected = '500: internal server error, no json file or object, or wrong path';
  t.equals(actual, expected), 'should fail as args entered in the wrong order, and write 500 http status code in the header';
  t.end();
})