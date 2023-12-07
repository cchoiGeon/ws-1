const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  const chat = io.of('/chat');
  io.on('connection', (socket) => {
    console.log('index 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('index 네임스페이스 접속 해제');
    });
  })
  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');

    socket.on('join', (data) => { // data는 브라우저에서 보낸 방 아이디
      socket.join(data); // 네임스페이스 아래 존재하는 방에 접속
    });
    
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
    });
  })
};