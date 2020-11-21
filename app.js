
const randomCount = 24

let quote = ''

let randomImage = generateRandomImgElement()

function generateQuoteElement(responseJSON) {
    console.log(responseJSON)
    console.log(responseJSON.content.length)
    return `<p class="quote">"${responseJSON.content}"</p><p class="credit"> - ${responseJSON.originator.name}</p>`
}

function generateRandomImgElement() {
    const randomPhotoNum = Math.floor(Math.random()*randomCount + 1)
    return `<img class="random-img" src="img/random-photos/${randomPhotoNum}.jpg" alt="Random picture of friends">`
}

function renderQuoteImage() {
    if (quote.length > 0) {
        $('.quote-wrapper').html(quote)
        $('.image-wrapper').html(randomImage)
    } else {
        getQuote()
        renderQuoteImage()
    }
    
}

function displayQuoteImage() {
    $('.app-container').removeClass('fadedLeft')
    $('.app-container').removeClass('hidden')
}

function getQuote() {
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
        "headers": {
            "x-rapidapi-key": "6ed26ec87bmshc2d94822fdb7eeap11432bjsn54d6d7f84ec2",
            "x-rapidapi-host": "quotes15.p.rapidapi.com"
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(responseJSON => {
        if (responseJSON.content.length <= 100) {
            quote = generateQuoteElement(responseJSON)
        } else {
            setTimeout(getQuote, 1000)
        }})
    .catch(err => {
        console.error(err);
    });
}



function transitionDisplay() {
    console.log('transitionDisplay ran.')
    $('.icon-button').addClass('faded')
    $('.intro').addClass('dark')
    setTimeout(function() {
        $(displayQuoteImage)
        $('.icon-wrapper').addClass('hidden')
        $(getQuote)
        randomImage = generateRandomImgElement()
    }, 500)
    
}


function watchIcon() {
    $('.icon-button').click(function() {
        console.log('watchIcon ran.')
        $(renderQuoteImage)
        $(transitionDisplay)
    })
}

function watchNext() {
    $('.next-btn').click(function() {
        console.log('watchNext ran.')
        $('.app-container').addClass('fadedLeft')
        setTimeout(function() {
            $('.app-container').addClass('hidden')
            $(renderQuoteImage)
            setTimeout(displayQuoteImage, 500)
            $(getQuote)
            randomImage = generateRandomImgElement()
        }, 1000);
    })
}

function watchForm() {
    $(getQuote)
    $(watchIcon)
    $(watchNext)
}

$(watchForm)