const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login',(req,res) => {
    res.render('login');
})
router.post('/login',async(req,res) => {
    const uid = req.body.id
    req.session.uid = uid
    return res.redirect('/')
})

module.exports = router;