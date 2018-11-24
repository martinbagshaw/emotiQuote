// make the xml http request function here
const request = (() => {
  
  
  // no need to specify the url here
  // REMEMBER:
  //  - this function is designed to be reusable
  //  - any url should be able to be passed in
  // const url = './src/?data';




  // request function
  function _request(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    
    
    // console.log("Data in request file: " + url);

    // no need to pass the data here
    //  - json endpoint is passed into request function in index.js
    // const dataString = JSON.parse(data);



    xhr.onreadystatechange = function() {
      // wait until response is ready
      if (xhr.readyState === 4) {
        // 200 http status code
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
    xhr.send();
  }

  // request method functions
  // - this calls the above function, and assigns it to the get variable
  const get = (url, callback) => {
    _request("GET", url, null, callback);
  };

  // not needed yet, not posting data
  // const post = (url, data, callback) => {
  //   _request("POST", url, data, callback);
  // };

  // previously had post: post
  return {
    get: get,

  };

})();