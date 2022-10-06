func =function(){ $.getJSON('https://aws.random.cat/meow')
  .done(function(data){
    console.log(data);
    $('#cat_pic').attr('src',data.file)
});}


$('#select option').change(function() {
  if ($(this).prop('selected') == true) {
    console.log($(this).val());
  }
});