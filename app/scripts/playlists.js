var channels = new FactoryChannel();

/**
  GET https://www.googleapis.com/youtube/v3/subscriptions
  action list
  @param _maxPlayListsResults  # Acceptable values are 0 to 50, inclusive. The default value is 5.
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
        //console.log(res);

        for (var i =0 ; i < res.items.length ; i++) {

            var t = res.items[i];
            console.log(t);
            var thumbnail = t.snippet.thumbnails.high.url;
            var itemCount = t.contentDetails.itemCount;
            var playlistlTitle = t.snippet.title;
            var title  = t.snippet.title;
            //var img = '<img data-thumb="'+  thumbnail +'" src="'+ thumbnail +'" title="'+playlistlTitle+'" width="224"  height="126" data-group-key="thumb-group-0">';

            var num = parseInt($('#badge-on-button').html());
            num++;

            var urlPlaylist = 'https://www.youtube.com/playlist?list='+ t.id ;
            $("#listGroup").append(playlistElement(urlPlaylist,title,itemCount));

            $('#badge-on-button').html(num);

        }

        if (res.nextPageToken != null ){
            listPlaylists(_maxPlayListsResults,res.nextPageToken);
        }else{
          console.log("fim");
        }

    });

}


function playlistElement(_urlPlaylist,_title,_itens){


      // var playlistElement =  '<div class="col-md-3 col-channel">'
      //                       +'<span class="glyphicon glyphicon-remove" id="remove-icon"></span>'
      //                       +'<div class="panel panel-primary">'
      //                         +'<div class="panel-body panel-channel">'
      //                           + _img
      //                         +'</div>'
      //                         +'<div class="panel-footer panel-primary">'
      //                              +'<a class="video-title" href="'+ _urlPlaylist +'">'+ _title +'</a>'
      //                         +'</div>'
      //                       +'</div>'
      //                     +'</div>';

      var playlistElement ='<li class="list-group-item">'
                              +'<input type="checkbox" class="pull-left">';
                            if(_itens > 1)
                                playlistElement  +='<span class="badge">'+_itens+' vídeos </span>'
                            else
                                playlistElement+='<span class="badge">'+_itens+' vídeo </span>'
                            
                            playlistElement+='<a class="video-title" href="'+ _urlPlaylist +'">'+ _title +'</a>'
                              +'</input>'
                            +'</li>';
    return playlistElement;

}
