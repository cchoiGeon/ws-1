const express = require('express');
const router = express.Router();
const Room = require('../models/room')
const Chat = require('../models/chat')

router.get('/', async (req, res) => {
    if(!req.session.uid){
        return res.redirect('/login');
    }
    const rooms = await Room.findAll({})
    res.render('index',{'rooms':rooms});
});
router.get('/logout',(req,res) => {
    req.session.destroy(function(err){
        if(err) throw err;
        return res.redirect('/login');
    });
})
router.get('/login',(req,res) => {
    res.render('login');
})

router.get('/create',(req,res) => {
    res.render('createroom')
})

router.post('/login',async(req,res) => {
    const uid = req.body.id
    req.session.uid = uid
    return res.redirect('/')
})

router.get('/chat/:id/remove',async(req,res)=>{
    if(req.session.uid != req.params.id){
        await Chat.destroy({ where: { owner: req.session.uid }});  
        return res.send('ok');
    }else{
        await Room.destroy({ where: { owner: req.params.id }});
        await Chat.destroy({ where: { owner: req.params.id }});
        return res.send('ok');
    }
})

router.get('/chat/:id', async (req,res) => {
    const chat = await Chat.findAll({ where: { owner: req.params.id }});
    return res.render('chat',{'chats':chat});
})

router.post('/chat/:id', async (req,res) => {
    const {title,owner} = await Chat.findOne( {where: { owner : req.params.id }});
    const chat = await Chat.create({
        title,
        chatting:req.body.chatting,
        owner,
        writer:req.session.uid,
    });
    const io = req.app.get('io');
    io.of('/chat').to(req.params.id).emit('newChat', chat);
    return res.send('ok');
});

router.post('/room',async (req,res) => {
    const newRoom = await Room.create({
        title: req.body.title,
        count: req.body.count,
        owner: req.session.uid,
        password: req.body.password,
    });
    await Chat.create({
        title: req.body.title,
        owner: req.session.uid,
    });
    const io = req.app.get('io');
    io.of('/').emit('newRoom', newRoom);
    return res.redirect(`/chat/${req.session.uid}`);
})
module.exports = router;