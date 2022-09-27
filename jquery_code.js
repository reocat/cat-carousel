$.getJSON('https://aws.random.cat/meow')
  .done(function(data){
    console.log(data);
    $('#cat_pic').attr('src',data.file)
})
