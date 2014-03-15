
var channels = new factoryChannel();

/*
  GET https://www.googleapis.com/youtube/v3/videos
  Show the video
  @param videoId
*/

function videoList(videoId){

  var requestVideo = gapi.client.youtube.videos.list({
      part:"snippet",
      id: videoId,
      maxResults: 1,
  });

  requestVideo.execute(function(response) {

    // console.log(response.result.items);

    var res   = response.result.items;
    var thumbnail = res[0].snippet.thumbnails.medium.url;
    var img = "<img data-thumb='"+  thumbnail +"' src='"+ thumbnail +"' alt='Thumbnail' width='185' data-group-key='thumb-group-0'>";
    var channelId = res[0].snippet.channelId;
    var channelTitle  = res[0].snippet.channelTitle;

    var content ="<div class='col-md-3'>" 
                      +"<a target='_blank' href='https://www.youtube.com/channel/"+ channelId +"'>"
                      +"<h4 class='media-heading'>"+ channelTitle +"</h4>"
                      + img 
                      +"</a>"
                      +"</div>";
                      $('#channel-html').append(content);
  });

}

/*
  GET https://www.googleapis.com/youtube/v3/videos
  Show the video
  @param _uploadsPlaylistId
  @param _maxResults #option , default value 1 # Acceptable values are 1 to 50
*/


function playlistItems(_uploadsPlaylistId,_maxResults) {

  var maxResults = _maxResults || 1;

   var requestPlaylist = gapi.client.youtube.playlistItems.list({
       part:"snippet",
       playlistId: _uploadsPlaylistId,
       maxResults: maxResults,
   });

  requestPlaylist.execute(function(response) {
    var res   = response.result.items;
    var videoId = res[0].snippet.resourceId.videoId;
    videoList(videoId);
  });


}


/*
  Add uploadsPlaylistId to channelList
  GET https://developers.google.com/youtube/v3/docs/channels
  action list
  @param channelId  
  

*/
function channelList(_channelId,_playlistItemsMaxResults){

  var requestChannel = gapi.client.youtube.channels.list({
          part:'contentDetails',
          maxResults:'1',
          id:_channelId
  });

  requestChannel.execute(function(response) {

    var myChannels = response.result;
    var i = myChannels.items.length;
    while (i--) {
         var itemChannel = myChannels.items[i];
         var uploadsPlaylistId = itemChannel.contentDetails.relatedPlaylists.uploads;
         channels.addUploadsPlaylistId(itemChannel.id,uploadsPlaylistId);
         playlistItems(uploadsPlaylistId,_playlistItemsMaxResults);
    }     

  });        

}

/**
  GET https://www.googleapis.com/youtube/v3/subscriptions
  action list
  @param _maxChannelsResults  # Acceptable values are 0 to 50, inclusive. The default value is 5.
  @param _order # alphabetical, relevance , unread
  @param _maxVideosByChannelResults  # Acceptable values are 0 to 50, inclusive. The default value is 1.
  @return channels ( channelId, title ,thumbnail )
*/

function subscriptionsList(_maxChannelsResults,_order,_maxVideosByChannelResults){
  

  var requestList = gapi.client.youtube.subscriptions.list({
    part:'id,snippet,contentDetails',
    maxResults: _maxChannelsResults,
    order: _order,
    mine:'true'
  });


   requestList.execute(function(response) {

    var res = response.result;
    var i = res.items.length;
    while (i--) {
        t = res.items[i];
        var channelYouTube = new Channel(t.snippet.resourceId.channelId , t.snippet.title , t.snippet.thumbnails.default.url);

        channels.addChannel(channelYouTube);
        channelList(channelYouTube.channelId,_maxVideosByChannelResults);
    };
     // console.log(channels);
   });

}


function handleAPILoaded(){
    subscriptionsList(16, "alphabetical");
}
