// Define some variables used to remember state.
var playlistId, channelId;

// Enable the form for creating a playlist.
function enableForm() {
    'use strict';
    $('#playlist-button').attr('disabled', false);
}

/*
  POST https://www.googleapis.com/youtube/v3/playlists
  Create a private playlist.
  @param _privacyStatus # default status is private
*/

function createPlaylist(_element,_privacyStatus) {
    'use strict';
    var privacyStatus = _privacyStatus || 'public';
    var request = gapi.client.youtube.playlists.insert({
        part: 'snippet,status',
        resource: {
            snippet: {
                title: 'Caite Playlist',
                description: 'A private playlist created automaticaly with the YouTube API on Caite'
            },
            status: {
                privacyStatus: privacyStatus
            }
        }
    });
    request.execute(function(response) {
        var result = response.result;
        if (result) {
            playlistId  = result.id;
            var videoIds= getVideosIds(_element);
            addVideosToPlaylist(videoIds,0,playlistId);

        } else {
            playlistId = 0;
        }
    });
}


function addVideoToPlaylistByVideoId(_videoId,_playListId) {
    'use strict';
    addToPlaylist(_videoId,0,_playListId);
}



function getVideosIds(_element){

    var videoIds=new Array();  

    $(_element).find("span").each(function(){
        videoIds.push($( this ).attr("videoId"));
        console.log($( this ).attr("videoId"));
    });
    return videoIds;
}

/*
  POST https://www.googleapis.com/youtube/v3/playlistItems
  Add a video to a playlist. 
  @param videoId
  @param position #started by 0 for the first video in playlist , default 0 
*/

function addVideosToPlaylist(_videoIds, _position,_playListId) {
    'use strict';
    var id = _videoIds.shift();

    var details = {
        videoId: id,
        kind: 'youtube#video'
    };
    var position = _position || 0;
    var request = gapi.client.youtube.playlistItems.insert({
        part: 'snippet',
        resource: {
            snippet: {
                playlistId: playlistId,
                resourceId: details,
                snippet: position,
            }
        }
    });
    request.execute(function(response) {
        if(_videoIds.length > 0 ){
            addVideosToPlaylist(_videoIds, _position+1,_playListId);
        }else{
            var embed = '<iframe width="560" height="315" src="//www.youtube.com/embed/videoseries?list='+playlistId+'" frameborder="0" allowfullscreen></iframe>';
            $("#channel-html").replaceWith(embed);
        }

    });

}


/*
  POST https://www.googleapis.com/youtube/v3/playlistItems
  Add a video to a playlist. 
  @param videoId
  @param position #started by 0 for the first video in playlist , default 0 
*/

function addToPlaylist(_id, _position,_playListId) {
    'use strict';
    var details = {
        videoId: _id,
        kind: 'youtube#video'
    };
    var position = _position || 0;
    var request = gapi.client.youtube.playlistItems.insert({
        part: 'snippet',
        resource: {
            snippet: {
                playlistId: playlistId,
                resourceId: details,
                snippet: position,
            }
        }
    });
    request.execute(function(response) {
        $('#status').html('<pre>' + JSON.stringify(response.result) + '</pre>');
    });

}
