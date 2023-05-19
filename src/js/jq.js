$(document).ready(function() { 
  $('#selection').on('change', function() {
    var audio = document.getElementById("player");
    var source = document.getElementById("mp3_src");
    audio.pause();
    if ($(this).val()) {
      source.src = $(this).val();
      audio.load();
      audio.play();
    }
  });
});
