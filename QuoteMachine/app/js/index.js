var currentQuote = '',
    currentAuthor = '';
//window.$ = window.jQuery = require('https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js');
$("body").css("transition", "all 3s");
var arr = ["#f00", "#0f0", "#00f"];

function changeColor() {
    $("body").css({
        backgroundColor: arr[parseInt(Math.random() * 3)]
    });
}
changeColor();
setInterval(changeColor, 3000);

function inIframe() { try { return window.self !== window.top; } catch (e) { return true; } }


function getQuote() {
    $("#box").toggleClass("jello");

    $.ajax({
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success: function(response) {
            var r = response;
            currentQuote = r.quote;
            currentAuthor = r.author;
            if (inIframe()) {
                $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
            }
            $(".quote-text").animate({
                    opacity: 0
                }, 500,
                function() {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#text').text(r.quote);
                });
            $(".quote-author").animate({
                    opacity: 0
                }, 500,
                function() {
                    $(this).animate({
                        opacity: 1
                    }, 500);
                    $('#author').html(r.author);
                });

            var color = Math.floor(Math.random() * colors.length);
            $("html body").animate({
                backgroundColor: colors[color],
                color: colors[color]
            }, 1000);
            $(".button").animate({
                backgroundColor: colors[color]
            }, 1000);
        }
    });
}


$(document).ready(function() {
    getQuote();
    $('#new-quote').on('click', getQuote);
    $('#tweet-quote').on('click', function() {
        if (!inIframe()) {
            openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });
    $('#tumblr-quote').on('click', function() {
        if (!inIframe()) {
            openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote));
        }
    });
});
