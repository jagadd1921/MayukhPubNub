$( document ).ready(function() {
  

  for(var i=0; i<5000; i++){


  		console.log('Socket for channel::::'+i);		
    
      var socket = io(); // initialise socket.io connection
      socket.emit( 'join room' , i+'');

      socket.on( i+'' ,  function(data){

          var txt3 = document.createElement("p");  // Create with DOM
          txt3.innerHTML = "Channel:::"+data;

          $('#main').append(txt3);

      });

  }

  
});
