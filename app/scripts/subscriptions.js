
var channels = new FactoryChannel();

/*
  GET https://www.googleapis.com/youtube/v3/videos
  Show the video
  @param videoId
*/

function videoList(videoId){
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
        var num = parseInt($('#badge-on-button').html());
        num++;
        var urlVideo = 'https://www.youtube.com/watch?v='+ videoId ;
        $('#channel-html > div:nth-child('+num+')').find('a').attr('href',urlVideo).attr('title',videoTitle).html(videoTitle);
        $('#channel-html > div:nth-child('+num+')').find('img').replaceWith(img);
        $('#badge-on-button').html(num);
    });

}

/*
  GET https://www.googleapis.com/youtube/v3/videos
  Show the video
  @param _uploadsPlaylistId
  @param _maxResults #option , default value 1 # Acceptable values are 1 to 50
*/


function playlistItems(_uploadsPlaylistId,_maxResults) {
    'use strict';
    var maxResults = _maxResults || 1;

    var requestPlaylist = gapi.client.youtube.playlistItems.list({
        part:'snippet',
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
    'use strict';

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
            $('#channel-html').append(videoElement);
            var t = res.items[i];
            var channelYouTube = new Channel(t.snippet.resourceId.channelId , t.snippet.title , t.snippet.thumbnails.default.url);

            channels.addChannel(channelYouTube);
            channelList(channelYouTube.channelId,_maxVideosByChannelResults);
        }
    });

}


