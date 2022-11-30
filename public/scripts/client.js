$(document).ready(function() {

/** function that goes through an array of tweet data
 the renders them onto the #tweets-container
 */
const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });
}

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
  return $tweet
}

const loadtweets = function() {
  $.ajax({
    url: "http://localhost:8080/tweets",
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
        renderTweets(res);
        
    }
});
}

 loadtweets(); 
});
