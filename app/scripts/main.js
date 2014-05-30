$(function() {
  'use strict';
	$('#login-modal').on('hidden.bs.modal', function () {
	  window.setTimeout(checkAuth, 1);
	});


    $( '#channel-html' ).sortable();
    $( '#channel-html' ).disableSelection();

    $('body').on('click','.glyphicon.glyphicon-remove',function(){
      $(this).parent().remove();
    });


  });


function handleAPILoaded(){
    'use strict';
    localStorage.setItem("totalChannels", 0);
    subscriptionsList(16, 'alphabetical');
    enableForm();
}



