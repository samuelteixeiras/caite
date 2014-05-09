
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



