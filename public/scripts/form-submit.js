//Ajax form submit

$(document).ready(function() {
  
  //hides the error div at the start of code
  $('.error').hide();

  const createTweetElement = function(tweetData) {
    let  $tweet = $(`
    <article class = "tweet">
            <header >
              <div>
                <img src=${tweetData.user.avatars} alt="avatar"/>
              <h4>${tweetData.user.name}</h4>
              </div>
              <h4>${tweetData.user.handle}</h4>
            </header>
            <p>${tweetData.content.text}</p>
            <footer>
              <h6>${timeago.format(tweetData.created_at)}</h6>
              <ul>
                <li><i class="fa-solid fa-flag"></i></li>
                <li><i class="fa-solid fa-retweet"></i></i></li>
                <li><i class="fa-solid fa-heart"></i></li>
              </ul>
            </footer>
          </article>`);
    return $tweet;
  };

  const loadlasttweet = function() {
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
        // if ajax request is successful then prepend the posted tweet
        const tweetdata = res.pop();
        const $tweet = createTweetElement(tweetdata);
        $('#tweets-container').prepend($tweet);
      }
    });
  };

  /** checks to see if data fits the conditions for tweets
  returns the error is not meet else return null **/
  const validator = (data) => {
    const truedata = data.split("=")[1];
    if (!truedata || truedata === " ") return "tweet cannot be empty";
    else if (truedata.length > 140) return "tweet is above maximum length";
    return null;
  };

  //sumbits posted tweets
  $("#tweet-form").submit(function(event) {

    event.preventDefault();
    
    // serializes the form's elements.
    const form = $(this).serialize();
    const actionUrl = $(this).attr('action');
    const validate = validator(form);

    /** if tweet does not meet the conditions
    then displays the error and exits sumbit**/
    if (validate) {
      $('.error>p').text(validate);
      $('.error').slideDown(300);
      return false;
    }

    //hides error div
    $('.error').slideUp(300);
    //clears text-area
    $("#tweet-text").val('');
    //resets counter
    const counter = $('#tweet-text').closest('form').children('div').children('output');
    counter.val(140);

    //ajax post request
    $.ajax({
      type: "POST",
      url: actionUrl,
      data: form,
      success: function(data) {
        loadlasttweet();
      }
    });
  });

});