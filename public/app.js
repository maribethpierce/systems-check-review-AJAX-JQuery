$(document).ready(function() {
  $('#new-option-form').on("submit", function(event) {
    event.preventDefault();
    alert("hello!");
    var new_option = $('#new-option-field').val();

    if (new_option.length > 0) {
      //make a method that you can just call here
      //make it outside the listener
      submitNewOption(new_option)
    } else {
      alert("Please enter something.")
    }
  })

  var submitNewOption = function(new_option) {
    //above we have stoppend the browser from taking the user input
    //and posting it to the page, so we have to create the post request
    //in javascript - check the server.rb to know where to interact
    //so here, we're in the '/place_vote' action, so we need to have
    //choice = params['choice'] identified
    //AJAX syntax to make the request: =>
    //then put ajax request into a variable so that we can call a
    //method on it later - just to keep it readable
    var request = $.ajax({
      method: "post",
      url: "/new_option",
      data: { option: new_option }
    })
    //above: for the data part => the data that is being fed to the server
    //is presented in a hash where the word option: connects to the params['choice']
    //and then new_option feeds it what was gathered above as user input from the form
    //ajax takes this info and puts it into a string url after a ? that the server interprets
    //in data additional hash pairs would be separated by comma
    //now that we've sent the info, what do we want the server to do with it:
    request.success(function() {
      //you're putting this code straight into the browser, so it has to be in html
      //format - no erb - so add the html and concatenate the variables
      $('#new-vote-form').prepend('
        <label for="choice">
        <input type="radio" name="choice" value="' + new_option +'">
        ' + new_option + '</label><br />'
      );
      $('#vote-count').prepend('
      <tr>
        <td>' + new_option + '</td>' + '
        <td>0</td>
      </tr>
      ')
    //  alert("success!");
    })
  }
});
