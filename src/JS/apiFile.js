// Variables for getting and creating elements
const quoteButton = document.getElementById("quoteButton");

const quoteDiv = document.getElementById("quoteDiv");
const quoteP = document.getElementById("quoteP");

const createP = document.createElement("p");

/*
async function added through click eventlistener.
Fetches random object from url.
logs error if response is not ok
takes quote from response and puts it in htmlt
*/

quoteButton.addEventListener("click", async () => {
    const response = await fetch('https://animechan.vercel.app/api/random');

    if(!response.ok) {
        
        const message =  `You got an ERROR: ${response.status}`;
        throw new Error(message);

    } else {
        const responseObj = await response.json();
        if(quoteP) {
            quoteP.innerText(responseObj.quote);
        } else {
            createP;
            createP.innerText = responseObj.quote;
            quoteDiv.appendChild(createP);
        }
    }
});