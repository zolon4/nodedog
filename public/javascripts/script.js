$(function(){

$(document).ready(function() {
 $("#form").animate({ marginTop: 0, opacity: 1 }, 1000, function(){
  var helpers = ['try asking for "the weather in austin"', 'try "hello"', 'try "its dat boi"']
  var helper = helpers[Math.floor(Math.random()*helpers.length)]
  $('.helpers').append('<small class="text-muted">'+ helper + '</small>')
  $('.helpers').animate({opacity: 1},1500)
  })
 })

 $('#form').keypress(function(e){
  $('body').css('overflow-y','auto')
  $('.wrapper').css('overflow-y','auto')

   var q = $('#form').val()
   if(e.which == 13) {
    $('#pink').animate({ height: '50vh'},800)

    $('#r').html('')
    $('#pic').html('')
    $('#meme').html('')
    $('#form').blur();

    $.ajax({
     url: "https://api.wit.ai/message" ,
     data: {
      'q' : q,
      'access_token' : 'BNBJTHB2WNBTZMSGVG7C4V5BBTQL5LJD'
     },
     dataType : 'jsonp',
     method: "POST",
     success: function(response) {
      console.log(response)
      var entity = response.entities
      console.log(response)
       if ('meme' in entity) {
        $.ajax({
         method: "GET",
         url: "https://www.reddit.com/r/me_irl.json",
         success: function(response) {
          var memes = response.data.children
          var meme = memes[Math.floor(Math.random()*memes.length)];
          var src = meme.data.url
          console.log(meme)
          $('#meme').append("here's a selection from the frontpage of me_irl")
          $("html, body").animate({ scrollTop: $(document).height() }, 2000);
          $('#r').append('<img src="' + src+ '" class="heboot"/ >')
         }
        })
     } else if ('play' in entity && 'artist' in entity) {
      var artist = response.entities.artist[0].value
      $.ajax({
       method: "GET",
       url:"https://api.spotify.com/v1/search?q="+ artist +"&type=artist"
      }).done(function(res){
       var uri = res.artists.items[0].uri
        $('#r').css("margin-top", "1%")
        $('#pic').append('<iframe src="https://embed.spotify.com/?uri=' + uri+ '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>')
      })
      } else if ('datboi' in entity) {
       $('#r').append('oh shit whaddup')

      } else if ('updog' in entity) {
       $('#r').append('not much, wbu?')

      }
      else if ('your' in entity) {
       $('#r').append('I am updog')

      } else if ('greeting' in entity) {
      $('#r').append('yes this is updog')

     } else if ('bork' in entity) {
      $('#r').append('jesus you did me the really big frighten')

     }
     else if ('contact' in entity) {
      console.log(response)
       var contactVal = response.entities.contact[0].value
       $('#r').append('Hello ' + contactVal + '! I am updog')

     } else if ('location' in entity){
       var city = response.entities.location[0].body
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

          } else if ('song' in entity) {
           $('#r').append('I love These')
           $('#pic').append('<iframe src="https://embed.spotify.com/?uri=spotify:user:gorgonzolon:playlist:4T6FSZva3M8nZgHHNeRFi3" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>')
          }
          else {
          $('#r').append('whooops')
         }
        }
       }
      );
     }
    }
   )
 })
