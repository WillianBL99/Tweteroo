import express, {json} from 'express';
import cors from 'cors';
import chalk from 'chalk';

import sing_up from './Routes/sign_up.js';
import tweets from './Routes/tweets.js';

const app = express();
app.use(cors());
app.use(json());

app.listen(5000, () => {
    console.log(chalk.green.bold('Is running...'));
});

app.post('/sign-up', (req, res) => {
    sing_up(req, res);
});

app.post('/tweets', (req, res) => {
    tweets.post(req, res);
});


app.get('/tweets', (req, res) => {
    tweets.get(res);
});