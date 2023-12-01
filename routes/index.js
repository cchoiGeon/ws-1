const express = require('express');
const router = express.Router();
const Room = require('../models/room')

router.get('/', async (req, res) => {
    const rooms = await Room.findAll({})
    res.render('index',{'rooms':rooms});
});

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

router.post('/room',async (req,res) => {
    const newRoom = await Room.create({
        title: req.body.title,
        count: req.body.count,
        owner: req.session.uid,
        password: req.body.password,
    });
    const io = req.app.get('io');
    io.of('/').emit('newRoom', newRoom);
    return res.redirect('/');
})
module.exports = router;