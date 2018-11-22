// make the xml http request function here
const request = (() => {  
    
    // request function
    function _request(method, url, data, callback) {
        const xhr = new XMLHttpRequest();
        const dataString = JSON.stringify(data);

        xhr.onreadystatechange = function(){
            // make sure response is ready and 200 http status code
            if (xhr.readyState === 4 && xhr.status === 200){
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(true);
            }
        }

        // open the xhr request, set header, and send
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(dataString);
    };


    // request method functions
    const get = (url, callback) => _request('GET', url, null, callback);
    const post = (url, data, callback) => _request('POST', url, data, callback);


    return {
        get: get,
        post: post
    };

})();