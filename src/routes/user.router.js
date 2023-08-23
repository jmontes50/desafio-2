import { Router } from "express";
import { register, login } from "../services/user.services.js";
import passport from 'passport';
import { isAuth } from '../middleware/isAuth.js';
import UserDao from "../daos/mongodb/user.dao.js";
import { generateToken } from "../jwt/auth.js";

const router = Router();

const userDao = new UserDao();

router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        const newUser = await register(user);
        if (newUser) res.redirect('/login');
        else res.redirect('/error-register');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const user = req.body;
        const userFound = await login(user);
        if (userFound) {
            // req.session.email = userFound.email;
            // res.redirect('/realtime');
            const access_token = generateToken(userFound);
            res.cookie('token', access_token, {httpOnly:true});
            res.json({msg: "Login ok", access_token});
        } else res.redirect('/error-login')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login-github', passport.authenticate('login'), async (req, res, next) => {
    try {
        const user = await userDao.getById(req.session.passport.user);
        res.json({
            msg: "Login ok",
            user,
        });
    } catch (error) {
        next(error.message);
    }
});

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github-profile', passport.authenticate('github', { scope: ['user:email'] }), async (req, res, next) => {
    try {
        const { first_name, last_name, email, isGithub } = req.user;
        res.json({
            msg: "Register/Login Github OK",
            session: req.session,
            userData: {
                first_name,
                last_name,
                email,
                isGithub,
            },
        });
    } catch (error) {
        next(error.message);
    }
});

router.get('/current', passport.authenticate('jwtCookies'), (req, res) => res.send(req.user));



export default router;