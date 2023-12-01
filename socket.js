const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);

  io.on('connection', (socket) => {
    console.log('index 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('index 네임스페이스 접속 해제');
    });
  })
};