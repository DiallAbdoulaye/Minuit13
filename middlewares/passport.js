import passport from 'passport';
import {Strategy} from 'passport-local'
import User from '../models/user'

passport.use(new Strategy(
    {
        usernameField: "nickname",
        passwordField: "password"
    },
    async (nickname, password, done) => {
        try {
            const user = await User.findOne({ where: {nickname}})

            if (user === null){
                return done('Please check your nickname')
            }

            if (!(awaituser.checkPassword(password))){
                return done('incorrect password.')
            }
            done(false, user)
        } catch (err) {
            done(`Something wrong happend : ${err.messages}`)
        }
    }));