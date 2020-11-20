
function generateQuoteElement(responseJSON) {
    console.log(responseJSON)
    return `<p class="quote">"${responseJSON.content}"</p><p class="credit"> - ${responseJSON.originator.name}</p>`
}

function displayQuoteImage(responseJSON) {
    
    $('.quote-wrapper').html(generateQuoteElement(responseJSON))
    $('.quote-wrapper').removeClass('hidden')
    $('.image-wrapper').removeClass('hidden')
}

function getQuoteImage() {
    $('.icon-wrapper').addClass('hidden')
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
    .then(responseJSON => displayQuoteImage(responseJSON))
    .catch(err => {
        console.error(err);
    });
}



function transitionDisplay() {
    console.log('transitionDisplay ran.')
    $('.icon-wrapper').addClass('faded')
    $('.intro').addClass('dark')
    setTimeout(getQuoteImage,1000);
}


function watchForm() {
    $('.icon').one('mouseenter', function() {
        console.log('watchForm ran.')
        $(transitionDisplay)
    })
}

setTimeout(watchForm, 2000)