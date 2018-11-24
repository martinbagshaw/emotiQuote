// output JSON and do DOM stuff here
(function() {


    // error function
    const handleError = () => {
        console.log(error);
        const h2 = document.createElement("h2");
        h2.textContent = "Server HandleError";
        document.querySelector("#error").appendChild(h2);
    };



    /*
    - get response
    - attach event listener to input, pass in response data
    - match input to object
    - output html
    */


    // add text input event listener
    const addTextInput = (response) => {
        const searchInput = document.querySelector('.text-input');
        searchInput.addEventListener(
            'input',
            e => displayMatches(e.target.value, response),
            false
        );
    }
   
   
    // find matches
    // - will return an array of objects, or an empty array if nothing matches
    // - searches by 'Emotion' key
    const findMatches = (wordToMatch, quotes) => {
        return quotes.filter(quote => {
            // create regex from latest text input value
            const regex = new RegExp(wordToMatch, 'gi');
            // when matching empty, regex is /(?:)/gi
            // if (regex === /(?:)/gi) return false;

            // display x matches for this emotion => click and reveal
            const quoteMatch = quote.Emotion;
            // return matching quote
            return quoteMatch.match(regex);
        });
    };
    


    // display matches function
    // - group quotes by emotion
    // - returns html to DOM
    const displayMatches = (val, quotes) => {

        const matchArray = findMatches(val, quotes);
        
        // 1 - sort alphabetically
        const alpha = matchArray.map(quote => quote.Emotion).sort();
        
        // 2 - count occurences of quote.Emotion
        let count = [], emo = [], prev;

        for (let i=0; i<alpha.length; i++) {
            // filter for individual emotion
            if ( alpha[i] !== prev ) {
                count.push(1);
                emo.push([alpha[i], 1])
            }
            // count occurences
            else {
                count[count.length-1]++;
                emo[count.length-1][1]++;
            }
            prev = alpha[i];
        }

        // 3 - copy the array, don't reference
        const quotesByEmo = emo.slice();
        // console.log(quotesByEmo);




        // 4 - compose html
        // val = event
        if (val !== undefined){

            // this changes, therefore let
            // - maybe use reduce, with (no of items) for each category
            let html = quotesByEmo.map(quote => {
                return `
                    <li class="searched">${quote[0]}
                    <div class="quote-meta">
                        <span class="quote-occurences">(${quote[1]} Quote${quote[1]>1 ? 's':''})</span>
                        <span class="chevron"> > </span>
                    </div>
                    </li>
                `;
            }).join(''); // join array as a string
        
            // no results message
            if (html.length < 1) {
                html = `<li class="no-results">No results found. Please try again</li>`;
            }
            // no narrowed down matches, clear html
            else if (matchArray.length === quotes.length) {
                html = '';
            }
            // add html to DOM
            suggestions.innerHTML = html;
        }
    }
    



    // pass in /data endpoint - this is where the json is hosted
    // - this could be anywhere else - defined on the back end
    // - currently defined in handler.js
    request.get("/data", function(error, response) {
        if (error) {
            handleError(error);
        } else {
            // add text input event listener
            // - this calls findMatches
            addTextInput(response);
        }
    });




    
    
    
    
    // __________________
    // button click stuff
    // - once an item is selected, bring up associated info

    // classes - toggle with transition
    const bgClasses = {
        sad : "bg-blue",
        passion: "bg-red",
        envy: "bg-green",
        jealous: "bg-yellow"
    };
    
    const selectMatch = e => {
        console.log(e.target.previousElementSibling.value);
        // take textContent of e.target.previousElementSibling
        // get val from object
        // get val.emotion
        // bgClasses[val.emotion]
        const sad = `${bgClasses.sad}`;
        document.querySelector('body').classList.toggle(sad);
    }

    const buttonInput = document.querySelector('.button-input');
    buttonInput.addEventListener('click', selectMatch);

    
    
    
    // suggestions list
    const suggestions = document.querySelector('#suggestions');

    


})();


/*
deploying to heroku



*/
