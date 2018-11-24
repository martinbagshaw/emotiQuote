// output JSON and do DOM stuff here
(function() {


    // error function
    const handleError = () => {
        const h2 = document.createElement("h2");
        h2.textContent = "Server HandleError";
        document.querySelector("#error").appendChild(h2);
    };



    /*
    - get response
    - attach event listener to input, pass in response data
    - match input and group responses
    - output html
    */


    // initial autocomplete
    // _____________________________


    // add event listeners (text input and item clicks)
    // - all require response json
    const addTextInput = (response) => {
        const searchInput = document.querySelector('.text-input');
        // displayMatches runs 2 functions to filter information before displaying
        searchInput.addEventListener(
            'input',
            e => displayMatches(e.target.value, response),
            false
        );
        // after suggestions are shown, indivdidual quotes need to be shown on click
        const suggestions = document.querySelector('#suggestions');
        suggestions.addEventListener(
            'click',
            e => displayQuotes(e, response),
            false
        );
        // back button on individual quotes - same behaviour as displayMatches
        suggestions.addEventListener(
            'click',
            e => displayMatches(e.target, response),
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



    // group quotes
    // - returns quotes, grouped by emotion
    const groupQuotes = matches => {
        
        // 1 - sort alphabetically
        const alpha = matches.map(quote => quote.Emotion).sort();
        
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
        return quotesByEmo;

    }
    


    // display matches function
    // - group quotes by emotion
    // - returns html to DOM
    // - also handles back button (chevron-left) click
    const displayMatches = (val, quotes) => {
        
        // handle back button click
        let backBtn = false;
        if (val.attributes !== undefined && val.attributes[1]!== undefined) {
            if (val.attributes[1].nodeValue.includes('chevron-left')) backBtn = true;
        }
        if (typeof val !== 'string' && backBtn === false) return false;
        // if click, val = DOM element
        // - in this case, select input.value instead
        if (backBtn === true) {
            val = document.querySelector('.text-input').value;
            document.querySelector('body').className = 'bg-default';
        }


        // 1 - run findMatches and groupQuotes
        // - find and group quotes by emotion
        const matchArray = findMatches(val, quotes);
        const groupedByEmotion = groupQuotes(matchArray);

        // 2 - compose html
        // val = event
        if (val !== undefined){

            // this changes, therefore let
            // - maybe use reduce, with (no of items) for each category
            let html = groupedByEmotion.map(quote => {
                return `
                    <li class="searched">${quote[0]}
                    <div class="quote-meta">
                        <span class="quote-occurences">(${quote[1]} Quote${quote[1]>1 ? 's':''})</span>
                        <button aria-label="View Quotes" class="quote-button chevron"> > </button>
                    </div>
                    </li>
                `;
            }).join(''); // join array as a string
        
            // no results message
            if (html.length < 1) {
                html = `<li class="no-results">No results found. Please try again</li>`;
            }
            // no narrowed down matches, clear html, reset colour
            else if (matchArray.length === quotes.length) {
                html = '';
                document.querySelector('body').className = 'bg-default';
            }
            // add html to DOM
            suggestions.innerHTML = html;
        }
    }




    // suggestion click
    // _____________________________
    const getQuotes = (e, quotes) => {
        // get emotion from click of li.searched
        // - e.target must search for closest parent li
        if(e.target.closest('li.searched')!==null){
            const emotion = e.target.closest('li.searched').childNodes[0].textContent.trim();
            // get quotes by clicked emotion
            return quotes.filter(quote => quote.Emotion === emotion);
        }
    }

    // change html, add classes
    const displayQuotes = (e, quotes) => {
        const selectedQuotes = getQuotes(e, quotes);
        if (e !== undefined && selectedQuotes !== undefined){
            const emotion = selectedQuotes.find(item => item.Emotion).Emotion;

            // 1- add background colour
            document.querySelector('body').className = bgClasses[emotion];
            // console.log(selectedQuotes);

            // 2 - compose html
            let html = selectedQuotes.map(quote => {
                return `
                    <li class="found-quote">
                    <button aria-label="Back to Search" class="quote-button chevron-left"> < </button>
                    <div class="quote-content">${quote.Quote}</div>
                    <div class="quote-author"> - ${quote.Author}</div>
                    </li>
                `;
            }).join(''); // join array as a string

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
        
        Passionate : "bg-red",
        Stressed : "bg-red",
        Love : "bg-red",

        Sad : "bg-blue",
        Depressed : "bg-blue",
        
        Happy : "bg-yellow",
        Hopeful : "bg-yellow",
        Joyful : "bg-yellow",
        Anxious : "bg-yellow",

        Envious : "bg-green",
        Motivated : "bg-green"
    };


})();


/*
deploying to heroku



*/
