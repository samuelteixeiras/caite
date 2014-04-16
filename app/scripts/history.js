
var history = function(){
	var _totalTime;

	return {
		addTime: function(time) {
            totalTime+=time;
        },
	};
};


function myChannel(){
  'use strict';

    var requestList = gapi.client.youtube.channels.list({
        part:'contentDetails',
        mine:'true',
    });

    requestList.execute(function(response) {
        var res = response.result;
        var t = res.items[0];
        
        var watchHistory = t.contentDetails.relatedPlaylists.watchHistory;
        console.log(res);
        playlistItems(watchHistory,50);
    });    

}




function playlistItems(_playlistId,_maxResults,_pageToken) {
    'use strict';
    var maxResults = _maxResults || 1;
	var pageToken = _pageToken || '';
    var requestPlaylist = gapi.client.youtube.playlistItems.list({
        part:'snippet,contentDetails,status',
        playlistId: _playlistId,
        maxResults: maxResults,
        pageToken: pageToken
    });

    requestPlaylist.execute(function(response) {
    	console.log(response);
        var res   = response.result.items;
        console.log(res);
        //var videoId = res[0].snippet.resourceId.videoId;
        //videoList(videoId);

        if (response.nextPageToken != null ){
            playlistItems(_playlistId,_maxResults,response.nextPageToken);
        }

    });
}