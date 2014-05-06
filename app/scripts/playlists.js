var channels = new FactoryChannel();


/**
  DELETE https://developers.google.com/youtube/v3/docs/playlistItems/delete
  action delete
  @param _id  # playlist id
*/
function deletePlaylist(_id){
    'use strict';
    var requestList = gapi.client.youtube.playlists.delete({
           id : _id,
    });

    requestList.execute(function(response) {
       var res = response.result;
    });

}

/**
  GET
  action list
  @param _maxPlayListsResults  # Acceptable values are 0 to 50, inclusive. The default value is 5.
  @param _pageToken
*/

function listPlaylists(_maxPlayListsResults,_pageToken){
    'use strict';

    var pageToken = _pageToken || '';
    var requestList = gapi.client.youtube.playlists.list({
        part:'id,snippet,status,contentDetails',
        mine:'true',
        pageToken: pageToken
    });



    requestList.execute(function(response) {
        var res = response.result;

        for (var i =0 ; i < res.items.length ; i++) {

            var t = res.items[i];
            var thumbnail = t.snippet.thumbnails.high.url;
            var itemCount = t.contentDetails.itemCount;
            var playlistlTitle = t.snippet.title;
            var title  = t.snippet.title;

            var num = parseInt($('#badge-on-button').html());
            num++;

            var urlPlaylist = 'https://www.youtube.com/playlist?list='+ t.id ;
            $("#listGroup").append(playlistElement(urlPlaylist,title,itemCount,t.id));

            $('#badge-on-button').html(num);

        }

        if (res.nextPageToken != null ){
            listPlaylists(_maxPlayListsResults,res.nextPageToken);
        }

    });

}


function playlistElement(_urlPlaylist,_title,_itens,_id){
    'use strict';
    var playlistElement ='<li class="list-group-item">'
                              +'<input type="checkbox" class="pull-left" playlistid="'+ _id +'">';
                            if(_itens > 1)
                                playlistElement  +='<span class="badge">'+_itens+' vídeos </span>'
                            else
                                playlistElement+='<span class="badge">'+_itens+' vídeo </span>'

                            playlistElement+='<a class="video-title" href="'+ _urlPlaylist +'">'+ _title +'</a>'
                              +'</input>'
                            +'</li>';
    return playlistElement;

}
