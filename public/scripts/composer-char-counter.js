$(document).ready(function() {
  const tweetinput = $('#tweet-text');
  tweetinput.on('input', () => {
    const counter = tweetinput.closest('form').children('div').children('output');
    
    const tweet = tweetinput.val();
    const newLength = 140 - tweet.length;
    if(newLength >= 0){
      
      counter.removeClass( 'over-counter');
    }
    else{
      counter.addClass( 'over-counter');
    }
    counter.val(newLength);
});
});

