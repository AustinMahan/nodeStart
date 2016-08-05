$(document).ready(function(){
console.log('test');
  // $('form').submit(function(e){
  //   e.preventDefault()
  //   $.ajax({
  //     method: "POST",
  //     url: "http://localhost:8888",
  //     data: $('.testWords').val()
  //   }).done(function(data){
  //     console.log(data);
  //   }).fail(function(err){
  //     console.log(err);
  //   })
  // })

  $('p').click(function(){
    console.log(parseInt($(this).text()));
    $.ajax({
      method: "POST",
      url: "http://localhost:8888",
      data: {0:'X'}
    }).done(function(data){
      data = data.split(',')
      data[0] = data[0].charAt(2)
      data[8] = data[8].charAt(0)
      for(var i = 0; i < 9; i++){
        $('.change' + (i+1)).html(data[i])
      }
      console.log(data);

      console.log(data[1]);
    }).fail(function(err){
      console.log(err);
    })
  })


})
