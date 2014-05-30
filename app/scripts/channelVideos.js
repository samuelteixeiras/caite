var channels = new FactoryChannel();


/*
  GET https://www.googleapis.com/youtube/v3/videos
  Show the video
  @param videoId
*/

function videoList(videoId,position){
    'use strict';
    var requestVideo = gapi.client.youtube.videos.list({
        part:'snippet',
        id: videoId,
        maxResults: 1,
    });

    requestVideo.execute(function(response) {

        var res   = response.result.items;
        var thumbnail = res[0].snippet.thumbnails.medium.url;
        var videoTitle = res[0].snippet.title;
        var img = '<img data-thumb="'+  thumbnail +'" src="'+ thumbnail +'" title="'+videoTitle+'" width="175" data-group-key="thumb-group-0">';
        //var channelId = res[0].snippet.channelId;
        //var channelTitle  = res[0].snippet.channelTitle;
        var videoId = res[0].id;
        var urlVideo = 'https://www.youtube.com/watch?v='+ videoId ;
        $('#channel-html > div:nth-child('+position+')').find('span').attr('videoId',videoId);
        $('#channel-html > div:nth-child('+position+')').find('a').attr('href',urlVideo).attr('title',videoTitle).html(videoTitle);
        $('#channel-html > div:nth-child('+position+')').find('img').replaceWith(img);
        $('#badge-on-button').html(position);


    });

}


/*
  GET https://www.googleapis.com/youtube/v3/videos
  Show the video
  @param _uploadsPlaylistId
  @param _maxResults #option , default value 1 # Acceptable values are 1 to 50
*/

function playlistItems(_uploadsPlaylistId,_maxResults,_pageToken) {
    'use strict';
    var maxResults = _maxResults || 50;
    var requestPlaylist = gapi.client.youtube.playlistItems.list({
        part:'snippet',
        playlistId: _uploadsPlaylistId,
        pageToken: _pageToken,
        maxResults: maxResults
    });

    requestPlaylist.execute(function(response) {
        console.log(response.result);
        var i    = response.result.items.length;
        var res  = response.result;
        var i = res.items.length;

        var cont = 0;
        while(i--){

            $('#channel-html').append(videoElement);
            var videoId = res.items[cont].snippet.resourceId.videoId;
            var position = parseInt(localStorage.getItem("totalVideos"));
            position++;
            localStorage.setItem("totalVideos",position);
            videoList(videoId,position);

            cont++;
        }

        if (res.nextPageToken != null ){
            playlistItems(_uploadsPlaylistId,_maxResults,res.nextPageToken);
        }
    });
}

/*
  Add uploadsPlaylistId to channelList
  GET https://developers.google.com/youtube/v3/docs/channels
  action list
  @param channelId


*/
function channelList(_channelId){
    'use strict';
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
            playlistItems(uploadsPlaylistId);
        }
    });
}
