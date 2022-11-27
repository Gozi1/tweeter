$(document).ready(function() {
  
  //getting the id for input field
  const tweetinput = $('#tweet-text');

  /*checks charater count present in the input field 
  if over 140 when color changes red and shows the 
  how much character count is over 140*/
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

