const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//function takes a markup variable, containing a template for a users tweets
const createTweetElement = function(objData) {
  const safeText = `${escape(objData.content.text)}`;
  const currentTime = new Date();
  const dateOfTweet = new Date(parseInt(objData.created_at));
  let timeDiff = Math.floor((currentTime - dateOfTweet) / 86400000);
  const markup = `<div class = "box">
      <header class = "header-details">
      <div class = "header-icon-name">
      <img src= "${objData.user.avatars}"/>
      <span class = "username">${objData.user.name}</span>
      </div>
      <span class = "twitter-handle"> ${objData.user.handle}</span>
      </header>
      <div class = "middle">
      <span> ${safeText} </span>
      </div>
      <footer class = "bottom">
      <div class="bottomContents">
      <span class = "timePast">
      ${timeDiff} days
      </span>
      <div class = "icons">
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      <i class="fas fa-flag-usa"></i>
      </div>
      </div>
      </footer>
      </div>`;
  return markup;
};

//JQuery method to run once the page DOM is ready for JavaScript code to execute
$(document).ready(function() {
  $(".error1").hide();
  $(".error2").hide();
  //loops through object containing tweet information that createTweetElement accesses
  const renderTweets = function(tweets) {
    $(".tweets-container").empty();
    for (let i in tweets) {
      $(".tweets-container").prepend(createTweetElement(tweets[i]));
    }
  };
  $("form").submit(function(event) {
    event.preventDefault();
    const textInput = $("#textInput").val();
    $("#textInput").text(textInput);
    //validation information
    if (textInput === "" || textInput === null) {
      console.log("ERROR1");
      $(".error1").fadeIn("very slow");
    } else if (textInput.length > 140) {
      $(".error2").fadeIn("slow");
    } else {
      $(".error1").hide();
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize(),
        success: function() {
          $(".tweets-container").html("");
          loadTweets();
        },
      }).then(function() {
        $("#textInput").val("");
      });
    }
    $(".counter").text(140);
  });

  //GET request for tweets
  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function(data) {
        renderTweets(data);
      },
    });
  };
  loadTweets();
});
