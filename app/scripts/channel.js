
var FactoryChannel  = function Channels(){
    'use strict';
    //membros privados
    var _channels = [];
    var _orderChannels = function(){
        return _channels.sort();
    };
 
    //membros publicos
    return {
        addChannel: function(channel) {
            _channels.push(channel);
            //return this;
        },
        getOrderChannels: function(){
            return _orderChannels(_channels);
        },
        getChannels: function(){
            return _channels;
        },
        addUploadsPlaylistId: function(channelId,playlistId)
        {
            for (var i = _channels.length - 1; i >= 0; i--) {
                if(_channels[i].channelId === channelId){
                    _channels[i].uploadsPlaylistId = playlistId;
                }
            }
        }
    };
};



var Channel = function (_channelId,_title,_thumbnail,_uploadsPlaylistId) {
        'use strict';
        return {
            channelId:  _channelId,
            title: _title,
            thumbnail: _thumbnail,
            uploadsPlaylistId:_uploadsPlaylistId
        };
    };
