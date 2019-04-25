import {Router} from 'express';
import User from '../models/user';


const api = Router();

api.post('/register', async (req, res) => {
  try {
    const { nickname, email, password, password_confirmation } = req.body
    let user  = new User({
      nickname,
      email,
      password,
    })

    await user.save()
    res.status(201).json({data : { user }});
  } catch (e) {
    res.status(400).json({error : e.message})
  }

})

api.post("/login" , (req, res) => {
  passport.authenticate(
    "local",
    {
      session : false
    },
    (err, user, message) => {
      if (err) {
        res.status(400).json({ err })
      }
      const {id, email, nickname} = user.toJSON()
      return res.status(200).json({data : {
        user : {uuid, email, nickname}
      }})
    }
  )(req,res)
})

export default api;
