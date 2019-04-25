import {Router} from 'express';
import users from './user';
import auth from './auth';

const app = Router();

app.get('/', (req, res) => {
    res.json({hello: 'from express island'});
});

app.use('/users', users);
app.use("/auth", auth);

export default app;
