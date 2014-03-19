

var videoElement =  '<div class="col-md-3 col-channel">'
                            +'<span class="glyphicon glyphicon-remove" id="remove-icon"></span>'
                            +'<div class="panel panel-primary">'
                              +'<div class="panel-body panel-channel">'
                                +'<img alt="" src="http://placehold.it/175x98" />'
                              +'</div>'
                              +'<div class="panel-footer panel-primary">'
                                   +'<a class="video-title"></a>'  
                              +'</div>'
                            +'</div>'
                      +'</div>';

$(function() {
  'use strict';
	$('#login-modal').on('hidden.bs.modal', function () {
	  window.setTimeout(checkAuth, 1);
	});


    $( '#channel-html' ).sortable();
    $( '#channel-html' ).disableSelection();
  });


function handleAPILoaded(){
    'use strict';
    subscriptionsList(16, 'alphabetical');
    enableForm();
}

