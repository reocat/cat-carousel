func =function(){ $.getJSON('https://aws.random.cat/meow')
  .done(function(data){
    console.log(data);
    $('#cat_pic').attr('src',data.file)
});}

$(document).ready(function() {

  $('#selection').on('change', function() {
    change($(this).val());
  });

});


function change(sourceUrl) {
  var audio = document.getElementById("player");
  var source = document.getElementById("mp3_src");

  audio.pause();

  if (sourceUrl) {
    source.src = sourceUrl;
    audio.load();
    audio.play();
  }
}