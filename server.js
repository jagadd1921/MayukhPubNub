var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({	
	port: Number(process.env.PORT || 8081 )
});
server.register(require('inert'), function () {

	server.route([
	  { method: 'GET', path: '/', handler: { file: "index.html" } },
		// switch these two routes for a /static handler?
	  { method: 'GET', path: '/client.js', handler: { file: './client.js' } },
	  { method: 'GET', path: '/style.css', handler: { file: './style.css' } }
	]);

	server.start(function () {
		require('./lib/chat').init(server.listener, function(){
			// console.log('REDISCLOUD_URL:', process.env.REDISCLOUD_URL);
			console.log('Feeling Chatty?', 'listening on: http://127.0.0.1:'+process.env.PORT);
		});
	});

});
module.exports = server;
