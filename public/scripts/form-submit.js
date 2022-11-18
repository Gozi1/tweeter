//Ajax form submit 

$(document).ready(function() {
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
          console.log("post success"); // show response from the php script.
        }
    });
  });
})