var pub = require('redis-connection')();
var sub = require('redis-connection')('subscriber');

var SocketIO = require('socket.io');
var io;


function init (listener, callback) {
  
    
    sub.on("ready", function () {      
      
          io = SocketIO.listen(listener);
          io.on('connection', function(socket){

                socket.on('join room', function(channel){
                      console.log('Connected to:::'+channel);

                      socket.join(channel);
                      sub.subscribe(channel);


                });

          });

          io.on('disconnect', function(socket){

               console.log('Disconnected');   

          });
          
          sub.on("message", function (channel, message) {
    	               console.log(channel + " : " + message);
    	               //io.emit(channel, message); // relay to all connected socket.io clients
                     io.to(channel).emit( channel, message);
          });

          setTimeout(function(){ callback() }, 300); // wait for socket to boot

    });

}



module.exports = {
  init: init,
  pub: pub,
  sub: sub
};
