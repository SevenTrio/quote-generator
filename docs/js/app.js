document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("quote-loader");
    const quoteTextContainer = document.getElementById("quote-text-container");
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    const newQuoteButton = document.getElementById("new-quote");
    const tweetQuoteButton = document.getElementById("tweet-quote");

    newQuoteButton.onclick = function () {
        newQuoteButton.disabled = true;
        tweetQuoteButton.disabled = true;
        quoteTextContainer.hidden = true;
        loader.hidden = false;

        getQuote();
    }

    tweetQuoteButton.onclick = function () {
        window.open(`https://twitter.com/intent/tweet?text=${quoteText.innerText}, ©${quoteAuthor.innerText}`, "_blank");
    }

    function getQuote () {
        fetch('https://stormy-waters-81463.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
            .then(response => response.json())
            .then(quote => {
                quoteText.innerText = quote.quoteText;
                quoteAuthor.innerText = quote.quoteAuthor.length ? quote.quoteAuthor : "Unknown author";

                newQuoteButton.disabled = false;
                tweetQuoteButton.disabled = false;
                quoteTextContainer.hidden = false;
                loader.hidden = true;
            })
            .catch(err => {
                console.log("Error Reading data " + err);
                setTimeout(getQuote, 100);
            })
    }

    getQuote();
});