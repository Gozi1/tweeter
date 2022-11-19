//Ajax form submit 

$(document).ready(function() {
  
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
            <h3>${tweetData.content.text}</h3>
            <footer>
              <h6>${timeago.format(tweetData.created_at)}</h6>
              <ul>
                <li><i class="fa-solid fa-flag"></i></li>
                <li><i class="fa-solid fa-retweet"></i></i></li>
                <li><i class="fa-solid fa-heart"></i></li>
              </ul>
            </footer>
          </article>`);
    return $tweet
  }
  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });
}
  const loadlasttweet = function() {
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: 'GET',
      dataType: 'json', // added data type
      success: function(res) {
          pop =res.pop()
          renderTweets([pop]);
          console.log(pop);
          
      }
  });
  }
  const validator = (data) => {
    truedata = data.split("=")[1];
    if(!truedata ||truedata === " ")return "tweet cannot be empty";
    else if(truedata.length >140)return "tweet is above maximum length" ;
    return null;
  }
  $( "#tweet-form" ).submit(function( event ) {
    event.preventDefault();
    
    // serializes the form's elements.
    const form = $(this).serialize();
    const actionUrl = $(this).attr('action');
    const validate = validator(form)
    if(validate){
      alert(validate);
      return false
    }
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form, 
        success: function(data)
        {
          loadlasttweet();
          // show response from the php script.
        }
    });
  });

})