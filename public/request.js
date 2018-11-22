// make the xml http request function here
const request = (() => {
  const url = './src/?data';
  // request function
  function _request(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    // console.log("Data in request file: " + url);
    const dataString = JSON.stringify(data);

    xhr.onreadystatechange = function() {
      // make sure response is ready and 200 http status code
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // console.log("xhr response text" + xhr.responseText);
          callback(null, JSON.parse(xhr.responseText));
        } else {
          callback(true);
        }
      }
    };

    // open the xhr request, set header, and send
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    //console.log(dataString);
    xhr.send(dataString);
  }

  // request method functions
  const get = (url, callback) => {
    _request("GET", url, null, callback);
  };
  const post = (url, data, callback) => {
    _request("POST", url, data, callback);
  };

  return {
    get: get,
    post: post
  };
})();
