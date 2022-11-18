//Ajax form submit 

$(document).ready(function() {
  $( "#tweet-form" ).submit(function( event ) {
    event.preventDefault();
    // console.log( $( this ).serialize() );
    const form = $(this);
    const actionUrl = form.attr('action');
    
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function(data)
        {
          alert(data); // show response from the php script.
        }
    });
  });
})