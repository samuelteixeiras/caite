var channels = new FactoryChannel();

/**
  GET https://www.googleapis.com/youtube/v3/subscriptions
  action list
  @param _maxChannelsResults  # Acceptable values are 0 to 50, inclusive. The default value is 5.
  @param _order # alphabetical, relevance , unread
  @param _maxVideosByChannelResults  # Acceptable values are 0 to 50, inclusive. The default value is 1.
  @return channels ( channelId, title ,thumbnail )
*/

function channelSubscriptionsList(_maxChannelsResults,_order,_maxVideosByChannelResults,_pageToken){
    'use strict';

    var pageToken = _pageToken || "";
    var requestList = gapi.client.youtube.subscriptions.list({
        part:'id,snippet,contentDetails',
        maxResults: _maxChannelsResults,
        order: _order,
        mine:'true',
        pageToken: pageToken
    });



    requestList.execute(function(response) {
        var res = response.result;
        console.log(res);

        console.log(response);
        for (var i =0 ; i < res.items.length ; i++) {

            var t = res.items[i];
            var channelYouTube = new Channel(t.snippet.resourceId.channelId , t.snippet.title , t.snippet.thumbnails.default.url);
            channels.addChannel(channelYouTube);

            var thumbnail = t.snippet.thumbnails.default.url;
            var channelTitle = t.snippet.title;
            var title  = t.snippet.title;
            var img = '<img data-thumb="'+  thumbnail +'" src="'+ thumbnail +'" title="'+channelTitle+'" width="175" data-group-key="thumb-group-0">';

            var num = parseInt($('#badge-on-button').html());
            num++;

            var urlChannel = 'https://www.youtube.com/channel/'+ t.id ;
            $('#channel-html').append(videoElement(urlChannel,title,img));
            $('#badge-on-button').html(num);

        }

        if (res.nextPageToken != null ){
          channelSubscriptionsList(_maxChannelsResults,_order,_maxVideosByChannelResults,res.nextPageToken);
        }

    });

}


/*
  Add uploadsPlaylistId to channelList
  GET https://developers.google.com/youtube/v3/docs/channels
  action list
  @param channelId


*/
function channelPageList(_channelId,_playlistItemsMaxResults){
    'use strict';
    var requestChannel = gapi.client.youtube.channels.list({
            part:'contentDetails,snippet',
            maxResults:'1',
            id:_channelId
        });

    requestChannel.execute(function(response) {

        var myChannels = response.result;
        var i = myChannels.items.length;
        while (i--) {
            var itemChannel = myChannels.items[i];

            var thumbnail = itemChannel.snippet.thumbnails.medium.url;
            var videoTitle = itemChannel.snippet.title;
            var title  = itemChannel.snippet.title;
            var img = '<img data-thumb="'+  thumbnail +'" src="'+ thumbnail +'" title="'+videoTitle+'" width="175" data-group-key="thumb-group-0">';


            var uploadsPlaylistId = itemChannel.contentDetails.relatedPlaylists.uploads;

            var num = parseInt($('#badge-on-button').html());
            num++;

            var urlChannel = 'https://www.youtube.com/channel/'+ itemChannel.id ;
            $('#channel-html > div:nth-child('+num+')').find('a').attr('href',urlChannel).attr('title',title).html(title);
            $('#channel-html > div:nth-child('+num+')').find('img').replaceWith(img);
            $('#badge-on-button').html(num);
        }
    });
}


/*
  Add uploadsPlaylistId to channelList
  GET https://developers.google.com/youtube/v3/docs/channels
  action list
  @param channelId


*/
function channelListByOrder(_channelIds){
    'use strict';

    var _channelId = _channelIds.pop().channelId;
    var requestChannel = gapi.client.youtube.channels.list({
            part:'contentDetails,snippet',
            maxResults:'1',
            id:_channelId
        });

    requestChannel.execute(function(response) {

        var myChannels = response.result;
        var i = myChannels.items.length;
        while (i--) {
            var itemChannel = myChannels.items[i];

            var thumbnail = itemChannel.snippet.thumbnails.medium.url;
            var videoTitle = itemChannel.snippet.title;
            var title  = itemChannel.snippet.title;
            var img = '<img data-thumb="'+  thumbnail +'" src="'+ thumbnail +'" title="'+videoTitle+'" width="175" data-group-key="thumb-group-0">';


            var uploadsPlaylistId = itemChannel.contentDetails.relatedPlaylists.uploads;

            var num = parseInt($('#badge-on-button').html());
            num++;

            var urlChannel = 'https://www.youtube.com/channel/'+ itemChannel.id ;
            $('#channel-html > div:nth-child('+num+')').find('a').attr('href',urlChannel).attr('title',title).html(title);
            $('#channel-html > div:nth-child('+num+')').find('img').replaceWith(img);
            $('#badge-on-button').html(num);
        }

        if(_channelIds.length>0)
            channelListByOrder(_channelIds)
    });
}


function videoElement(_urlChannel,_title,_img){


      var videoElement =  '<div class="col-md-3 col-channel">'
                            +'<span class="glyphicon glyphicon-remove" id="remove-icon"></span>'
                            +'<div class="panel panel-primary">'
                              +'<div class="panel-body panel-channel">'
                                + _img
                              +'</div>'
                              +'<div class="panel-footer panel-primary">'
                                   +'<a class="video-title" href="'+ _urlChannel +'">'+ _title +'</a>'
                              +'</div>'
                            +'</div>'
                          +'</div>';
    return videoElement;

}
