
var channels = [];

function handleAPILoaded() {
  
   var request = gapi.client.youtube.subscriptions.list({
    part:'id,snippet,contentDetails',
    maxResults:'8',
    mine:'true'
  });

  request.execute(function(response) {
    var res = response.result;
    // console.log(res);

    var i = res.items.length;
    while (i--) {
        t = res.items[i];
        //channelId, title ,thumbnail
        channels.push([t.snippet.resourceId.channelId , t.snippet.title , t.snippet.thumbnails.default.url]);
    };



    //now show the places
    var c = channels.length;
    while (c--) {

         console.log(c);
        // console.log(channels[c][1]);
        // console.log(channels[c][2]);

        var content ="<div class='col-md-3'>" 
                      +"<a target='_blank' href='https://www.youtube.com/channel/"+ channels[c][0] +"'>"
                      +"<h4 class='media-heading'>"+ channels[c][1] +"</h4>"
                      +"<img class='channel-img' src='"+ channels[c][2] +"'"
                      +"</a>"
                      +"</div>";

        $('#channel-html').prepend(content);

    
         var requestChannel = gapi.client.youtube.channels.list({
          part:'contentDetails',
          maxResults:'1',
          id:channels[c][0]
        });

        requestChannel.execute(function(response,c) {

          var myChannels = response.result;
          // console.log(myChannels);
          console.log(c);

          var j = myChannels.items.length;
          while (j--) {
               var itemChannel = myChannels.items[j];
               var uploadsPlaylistId = itemChannel.contentDetails.relatedPlaylists.uploads;
               // console.log(uploadsPlaylistId); 

              var requestPlaylist = gapi.client.youtube.playlistItems.list({
                part:"snippet",
                playlistId: uploadsPlaylistId,
                maxResults: 1,
              });

              requestPlaylist.execute(function(response) {
                  
                  var res   = response.result.items;
                  // console.log(res[0].snippet.resourceId.videoId);
                  // var videoId = video.getId();
                  
                  var videoId = res[0].snippet.resourceId.videoId;
                  // console.log("https://www.youtube.com/watch?v="+ res[0].snippet.resourceId.videoId);


                   var requestVideo = gapi.client.youtube.videos.list({
                    part:"snippet",
                    id: videoId,
                    maxResults: 1,
                    });

                    requestVideo.execute(function(response) {

                       console.log(response.result.items);

                      var res   = response.result.items;
                      var thumbnail = res[0].snippet.thumbnails.medium.url;
                      var img = "<img data-thumb='"+  thumbnail +"' src='"+ thumbnail +"' alt='Thumbnail' width='185' data-group-key='thumb-group-0'>";
                      var channelId = res[0].snippet.channelId;
                      var channelTitle  = res[0].snippet.channelTitle;

                      var content ="<br><div class='col-md-3'>" 
                      +"<a target='_blank' href='https://www.youtube.com/channel/"+ channelId +"'>"
                      +"<h4 class='media-heading'>"+ channelTitle +"</h4>"
                      + img 
                      +"</a>"
                      +"</div>";
                      $('#channel-html').append(content);
                    });

              });

          }  

         


        });
        // https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UCiTxWhcBqrRp3NZCEpKbXiA&key=
        
    };
    // fim while 

  });

}

