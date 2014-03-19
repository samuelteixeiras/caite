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

function createPlaylist(_privacyStatus) {
    'use strict';
    var privacyStatus = _privacyStatus | 'private';
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
            playlistId = result.id;
        } else {
            playlistId = 0;
        }
    });
}

// Add a video ID specified in the form to the playlist.
function addVideoToPlaylist() {
    'use strict';
    addToPlaylist($('#video-id').val(),0,$("playlist-id").val());
}


function addVideoToPlaylistByVideoId(videoId) {
    'use strict';
    addToPlaylist(videoId);
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
    var position = _position | 0;
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
