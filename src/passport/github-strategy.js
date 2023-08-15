// npm i passport-github2
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/mongodb/user.dao.js';
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.aaaacd78d48e1bbb',
    clientSecret: '23b026a63a73871bb579c81071bbdce9ae17aa71',
    callbackURL: 'http://localhost:8080/users/github-profile',
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    console.log('PROFILE --> ', profile);
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await userDao.getByEmail( email );
    if ( user ) return done( null, user );
    const newUser = await userDao.registerUser({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1],
        email,
        age:0,
        password: '',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));