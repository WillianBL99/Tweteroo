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

app.post('/sign-up', sing_up);

app.post('/tweets', tweets.post);

app.get('/tweets', tweets.get);

app.get('/tweets/:username', tweets.getUserMessage);