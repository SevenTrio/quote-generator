document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("quote-loader");
    const quoteTextContainer = document.getElementById("quote-text-container");
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    const newQuoteButton = document.getElementById("new-quote");
    const tweetQuoteButton = document.getElementById("tweet-quote");

    const PROXY_URL = "https://stormy-waters-81463.herokuapp.com/"
    const API_URL = "http://api.forismatic.com/api/1.0/"

    const handleShowLoader = () => {
        newQuoteButton.disabled = true;
        tweetQuoteButton.disabled = true;
        quoteTextContainer.hidden = true;
        loader.hidden = false;
    }

    const handleHideLoader = () => {
        newQuoteButton.disabled = false;
        tweetQuoteButton.disabled = false;
        quoteTextContainer.hidden = false;
        loader.hidden = true;
    }

    newQuoteButton.addEventListener("click", () => {
        handleShowLoader()
        handleGetQuote();
    });

    tweetQuoteButton.addEventListener("click", () => {
        const quote = quoteText.innerText;
        const author = quoteAuthor.innerText;
        window.open(`https://twitter.com/intent/tweet?text=${quote} ©${author}`, "_blank");
    });

    const handleGetQuote = () => {
        const method = "getQuote";
        const lang = "en";
        const format = "json";

        fetch(`${PROXY_URL}${API_URL}?method=${method}&lang=${lang}&format=${format}`)
            .then(response => response.json())
            .then(quote => {
                quoteText.innerText = quote.quoteText;
                quoteAuthor.innerText = quote.quoteAuthor.length ? quote.quoteAuthor : "Unknown author";

                handleHideLoader();
            })
            .catch(err => {
                console.log("Error Reading data: " + err);
                handleGetQuote();
            })
    }

    handleGetQuote();
});