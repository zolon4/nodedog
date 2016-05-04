$(function(){

  $('#form').mouseover(function(){
   $(this).attr("placeholder", "tell me your name");
    $('#form').mouseleave(function(){
     $(this).attr("placeholder", "ask me about the weather");
    })
   })
 $('#form').keypress(function(e){
   var q = $('#form').val()

   if(e.which == 13) {
    $('#r').html('')
    $('#pic').html('')
    $.ajax({
     url: "https://api.wit.ai/message" ,
     data: {
      'q' : q,
      'access_token' : '5OCANSDN37ESNPMEARLQ6KDYNGTM355X'
     },
     dataType : 'jsonp',
     method: "POST",
     success: function(response) {
      console.log(response)

      var entity = response.outcomes[0].entities

       if ('contact' in entity) {
       var contactVal = response.outcomes[0].entities.contact[0].value

       $('#r').append('Hello ' + contactVal + '! I am updog')
      } else if ('location' in entity){

       var city = response.outcomes[0].entities.location[0].value
        $.ajax({
           method: "GET",
           url: "https://maps.googleapis.com/maps/api/geocode/json?address="+ city+"&key=AIzaSyAHAR1gTNA7hxRl3zOMpWZswWJuAc0Idi4"
          }).done(function(response){
           console.log(response)

           var lat = response.results[0].geometry.location.lat
           var lng = response.results[0].geometry.location.lng
           var city = response.results[0].formatted_address

           $.ajax({
            method: "GET",
            dataType: 'jsonp',
            url: "https://api.forecast.io/forecast/393009429e2d58513731179ff376b6ce/"+lat+"," +lng
           }).done(function(response){
            var temp = response.currently.apparentTemperature
             $('#r').append("It's " + temp + "&deg; in " + city)
          })
          })

      } else if ('sup' in entity) {
       var responses = ['just hangin out', 'just chillin', 'not much', 'dank memes', 'my chances of being funded']
       var reply = responses[Math.floor(Math.random()*responses.length)];
       $('#r').append(reply)

      } else if ('joke' in entity) {
       $("html, body").animate({ scrollTop: $(document).height() }, 1000);
       $('#pic').append('<img class="img-fluid pull-xs-center heboot" src="http://i.imgur.com/zgOt8dH.jpg" /> ')
      } else if ('play' in entity && 'artist' in entity) {
       var artist = response.outcomes[0].entities.artist[0].value
       $.ajax({
        method: "GET",
        url:"https://api.spotify.com/v1/search?q="+ artist +"&type=artist"
       }).done(function(res){
        var uri = res.artists.items[0].uri
        console.log(res.artists.items[0].uri)
        $('#pic').append('<iframe src="https://embed.spotify.com/?uri=' + uri+ '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>')
       })

      } else if ('song' in entity) {

       $('#r').append('I love These')
       $('#pic').append('<iframe src="https://embed.spotify.com/?uri=spotify:user:gorgonzolon:playlist:4T6FSZva3M8nZgHHNeRFi3" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>')
      }
      else {
       $('#r').append('whooops')
      }
     }
    });
   }
  }
 )
 })
