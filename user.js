$(document).ready(function(){
console.log('test');
  $('form').submit(function(e){
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: "http://localhost:8888",
      data: $('.testWords').val()
    }).done(function(data){
      console.log(data);
    }).fail(function(err){
      console.log(err);
    })
  })

  // $('.change1').click(function(){
  //   $.ajax({
  //     method: "POST",
  //     url: "http://localhost:8888",
  //     data: {1:'X'}
  //   }).done(function(data){
  //     console.log(data);
  //   }).fail(function(err){
  //     console.log(err);
  //   })
  // })


})
