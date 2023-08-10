import { Router } from "express";
import { register, login } from "../services/user.services.js";
const router = Router();

router.post('/register', async(req, res) => {
    try {
        const user = req.body;
        const newUser = await register(user);
        if(newUser) res.redirect('/login');
        else res.redirect('/error-register');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/login', async(req, res) => {
    try {
        const user = req.body;
        const userFound = await login(user);
        if(userFound) {
            req.session.email = userFound.email;
            res.redirect('/realtime');
        } else res.redirect('/error-login')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;