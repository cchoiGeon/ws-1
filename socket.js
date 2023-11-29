const SocketIO = require('socket.io');
const User = require('./models/user');

module.exports = (server, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
  
  io.use(wrap(sessionMiddleware));
  
  io.on('connection', async (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
      // User 모델 조회
      const user = await User.findAll({ where: { email: req.session.uid } });
      console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

      socket.on('disconnect', () => {
        console.log('클라이언트 접속 해제', ip, socket.id);
        clearInterval(socket.interval);
      });

      socket.on('error', (error) => {
        console.error(error);
      });

      socket.on('reply', async (data) => {
        // Sequelize를 사용하여 데이터베이스에 데이터 삽입
        await User.create({ email: req.session.uid, chatting: data });
        
        // 사용자 정보 조회 및 클라이언트에 전송
        const updatedUser = await User.findAll({ where: { email: req.session.uid } });
        socket.emit('news', updatedUser);
      });

      if (user) {
        socket.emit('news', user);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  });
};
