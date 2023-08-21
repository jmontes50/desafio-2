import { Router } from "express";
import { register, login } from "../services/user.services.js";
import passport from 'passport';
import { isAuth } from '../middleware/isAuth.js';
import UserDao from "../daos/mongodb/user.dao.js";

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
            req.session.email = userFound.email;
            res.redirect('/realtime');
        } else res.redirect('/error-login')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.post('/register-github', passport.authenticate('register'), (req, res, next) => {
//     try {
//         res.json({
//             msg: "Register ok",
//             session: req.session,
//         });
//     } catch (error) {
//         next(error.message);
//     }
// });

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

export default router;