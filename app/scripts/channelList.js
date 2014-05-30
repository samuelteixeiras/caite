var channels = new FactoryChannel();



function videoElement(_urlChannel,_title,_img){
      'use strict';

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


/**
  GET https://www.googleapis.com/youtube/v3/subscriptions
  action list
  @param _maxChannelsResults  # Acceptable values are 0 to 50, inclusive. The default value is 5.
  @param _order # alphabetical, relevance , unread
  @param _maxVideosByChannelResults  # Acceptable values are 0 to 50, inclusive. The default value is 1.
  @param _pageToken # get the next page
  @return channels ( channelId, title ,thumbnail )
*/

function channelSubscriptionsList(_maxChannelsResults,_order,_maxVideosByChannelResults,_pageToken){
    'use strict';

    var pageToken = _pageToken || '';
    var requestList = gapi.client.youtube.subscriptions.list({
        part:'id,snippet,contentDetails',
        maxResults: _maxChannelsResults,
        order: _order,
        mine:'true',
        pageToken: pageToken
    });



    requestList.execute(function(response) {
        var res = response.result;
        for (var i =0 ; i < res.items.length ; i++) {

            var t = res.items[i];
            console.log(t);
            var channelYouTube = new Channel(t.snippet.resourceId.channelId , t.snippet.title , t.snippet.thumbnails.default.url);
            channels.addChannel(channelYouTube);
            var thumbnail = t.snippet.thumbnails.high.url;
            var channelTitle = t.snippet.title;
            var title  = t.snippet.title;
            var img = '<img data-thumb="'+  thumbnail +'" src="'+ thumbnail +'" title="'+channelTitle+'" width="88"  height="88" data-group-key="thumb-group-0">';

            var num = parseInt($('#badge-on-button').html());
            num++;

            var urlChannel = 'https://www.youtube.com/channel/'+ t.snippet.resourceId.channelId ;
            $('#channel-html').append(videoElement(urlChannel,title,img));
            $('#badge-on-button').html(num);

        }

        if (res.nextPageToken != null ){
            channelSubscriptionsList(_maxChannelsResults,_order,_maxVideosByChannelResults,res.nextPageToken);
        }

    });

}



