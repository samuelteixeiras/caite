
function updateProgressBar(_id,_total,_current){

  var x  = (100 * _current) / _total;
  $("."+_id).show();
  $("."+_id).attr("style","width: "+x+"%");

  if(x == 100){
    $("."+_id).parent().hide();
  }

}

function showProgressBar(){
  $(".progress-bar").parent().show();
}

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





