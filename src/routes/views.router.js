import { Router } from "express";
const router = Router();

router.get('/login', (req, res) => {
    res.render('errorRegister')
});

router.get('/register', (req, res) => {
    res.render('register')
});

router.get('/error-login', errorLogin = (req, res) => {
    res.render('errorLogin')
});

router.get('/error-register', (req, res) => {
    res.render('errorRegister')
});

router.get('/profile', (req, res) => {
    res.render('profile')
    console.log(req.session);
});

export default router;