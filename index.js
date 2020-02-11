const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);

io.on('connection',(socket)=>{
	console.log('User Connected')
	socket.on('join',function(userNickname){
		console.log(userNickname+" : has join the chat ")
		socket.broadcast.emit('userjoinedthechat',userNickname + " : has joined the chat ")
	});
	socket.on('messagedetection',(senderNickname,messageContent)=>{
		console.log(senderNickname+" : "+messageContent)
		let message = {"senderNickname":senderNickname,"message":messageContent}
		console.log(message);
		socket.emit('message',message)
	});

	socket.on('disconnect',function(){
		console.log('user has left')
		socket.broadcast.emit("userdisconnect","user has left")
	});
});





app.get('/',(req,res) =>{
	res.send('Chat server is running on port 3000')
});

server.listen(3000,()=>{
	console.log('Node app is running on port 3000')
});
