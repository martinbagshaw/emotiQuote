# emotiQuote
A project started on Founders and Coders Course, Week 4:node week.
A collaboration with [HStewart23](https://github.com/HStewart23), [Zurda](https://github.com/zurda), and [Onwordi](https://github.com/onwordi). I thought I'd finish it off and put it up as a personal repo as I thought it was a pretty cool project, though we were a ways off of completion.

## Whiteboarding the architecture
![whiteboarding node project](https://user-images.githubusercontent.com/38128436/48849876-389a0100-ed9f-11e8-8134-6ab3303bfb75.JPG)

### To open this project:
- clone the repo 
- ```npn init``` in the folder to install dependencies
- ```npm run dev``` to run the project
- hosted on port 5000 at ```http://localhost:5000/```
- alternatively, [view the hosted version on Heroku](https://emotiquote.herokuapp.com/)

### Dependencies:
- nodemon
- tape
- tap-spec

### Hurdles, trials and tribulations, a-ha moments :sob: :weary: :open_mouth: :boom:
- Much of Thursday afternoon was like this. We went around in circles a fair bit when working out the server / routing / handling of files on the back end. Working in a 4 isn't always the best
![coding JavaScript underwater](https://starecat.com/content/wp-content/uploads/programming-pro-tip-code-javascript-underwater-so-nobody-could-see-you-crying.jpg)
- Sources of confusion came from:
    - doing stuff on the back end for the first time (does stuff log to the browser console or terminal, and when?)
    - routing files - where do they get hosted?
    - conditionals in routing file
    - not doing TDD
    - A little bit of event delegation with autocomplete towards the end (attach event listeners that can pick up data from ajax request)
    - Unknown ways of accessing json data on the server from the front end (i.e. ajax request, or below mentioned method)
- Would make a good case for test driven development - to isolate parts of the code, in order to determine the source of the problem.
- Main a-ha moment was in logging out urls of files in ```router.js``` to the terminal console, and changing order of conditionals for ```index.html```, ```json file```, and all other files. This allowed a json endpoint to be output at **/data**.
- Would be good to revisit this, and reconfigure to do the searching of the file on the **back end**, rather than on the front. Would probably be using **POST** requests to do this. [See how other teams figured this out here](https://github.com/fac-15).

### Possible Improvements
- Doing a fair bit of DOM manipulation, probably use an MVC framework to handle this (once I learn one).
- Can't transition between css background gradients (added with classes for different emotions). Quick fix would be to pick solid colours.
- More quotes, more emotions to be covered, wider colour range.
- Change colours on interface elements (list items, buttons, etc.), as well as the background.
- Make tests that aren't bullshit. But hey, I'm a testing novice at the moment, and server functions that require node modules such as ```fileServer``` and ```path``` _may_ or _may not_ be worth testing. I do not know at the moment. I suspect as this would be pulling in code that isn't my own, probably not.
