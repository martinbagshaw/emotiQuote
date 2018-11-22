// output JSON and do DOM stuff here
(function() {
    const handleError = error => {
        const h2 = document.createElement("h2");
        h2.textContent = "Server HandleError";
        document.querySelector("#error").appendChild(h2);
    };

    const renderData = dataString => {
        console.log("Render Data console log: " + dataString);
        const h2 = document.createElement("h2");
        h2.textContent = dataString;
        document.querySelector("#error").appendChild(h2);
    };



    request.get("/src/data/sample.json", function(error, response) {
        if (error) {
            handleError(error);
        } else {
            renderData(response);
        }
    });
})();
