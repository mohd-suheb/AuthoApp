const express = require('express');
const router = express.Router();

const {login, signup} = require('../controllers/Auth');
const { auth, isstudent, isadmin } = require('../middlewares/auth');


router.post("/login", login);
router.post("/signup", signup);

//route for test
route.get('/test', auth, (req, res)=>{
    res.json({
        succees: true,
        message:" welcome to the routr for testing"
    })
})

//protected routes
route.get('/student', auth, isstudent, (req, res)=>{
    res.json({
        succees: true,
        message :'welcome to the protected route for student'
    });
});
//
route.get('/admin', auth, isadmin, (req, res)=>{
    res.json({
        succees: true,
        message :'welcome to the protected route for aadmin'
    });
});



module.exports = router;