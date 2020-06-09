const { Router } = require('express');
const router = Router();


const { isLoggedIn } = require('../controllers/auth');
const ctr = require('../controllers/task.controller');

router.get('/createTask', isLoggedIn,(req, res) => {
    res.render('formTask');
});

router.get('/tasks', isLoggedIn, ctr.getTasks)

router.get('/delete/:id', isLoggedIn, ctr.deleteTask)

router.get('/edit/:id', isLoggedIn, ctr.editTaskget);

router.post('/edit/:id', isLoggedIn, ctr.editTaskpost);

router.post('/createTask', isLoggedIn, ctr.createTask);

module.exports = router;