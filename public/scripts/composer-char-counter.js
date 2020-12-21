//function to allow counter to reference the number of characters added to the text input and if user inputs more than the 140 limit it will turn red and return a negative integer
$(document).ready(function () {
    let counterValue = 140;
    const counter = $('.counter');
    counter.text(counterValue);
    $('.new-tweet-input').on('input', function() {
      const characters = $(this).val().length 
      counter.html(counterValue - characters);
       if (counterValue < characters) {
        counter.css('color', 'red');
       } else {
        counter.css('color', '#545149');
       }
    });
  });