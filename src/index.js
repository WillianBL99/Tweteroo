import express, {json} from 'express';
import cors from 'cors';
import chalk from 'chalk';

const userLogin = [];
const tweets = [];

const app = express();
app.use(cors());
app.use(json());

app.listen(5000, () => {
    console.log(chalk.green.bold('Is running...'));
});

app.post('/sign-up', (req, res) => {
    const {body} = req;
    const {username, avatar} = body;
    const login = {username, avatar};
    userLogin.push(login);
    
    res.send('ok');
});

app.post('/tweets', (req, res) => {
    const {body} = req;
    const {username, tweet} = body;
    const userTweet = {username, tweet};
    tweets.push(userTweet);

    res.send('ok');
});

app.get('/tweets', (req, res) => {
    const tweetsToSend = tweets.slice(tweets.length - 10);
    
    res.send(tweetsToSend.map(tweetToSend => {
        const {username, tweet} = tweetToSend;
        const {avatar} = userLogin.find(user => user.username === username);
        return {username, avatar, tweet};
    }));
});