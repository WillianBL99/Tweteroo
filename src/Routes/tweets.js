import isFilled from '../Helpers/is_filled.js';
import tweets_list from '../Models/tweets_list.js';
import users_login from '../Models/users_login.js';

const getUserAvatar = (username) => {
    return users_login.find(
        user => user.username === username
    );
}

const getTweets = (n) => {
    const tweetsToSend = tweets_list.slice(tweets.length - n);
    
    return tweetsToSend.map(tweetToSend => {
        const {username, tweet} = tweetToSend;
        const {avatar} = getUserAvatar(username);

        return {username, avatar, tweet};
    });
}

const postTweet = (req, res) => {
    const {body} = req;
    const {username, tweet} = body;

    if(isFilled(username) && isFilled(tweet)){
        const userTweet = {username, tweet};
        tweets_list.push(userTweet);
        res.send('ok');

    } else {
        res.status(400).send('Todos os campos são obrigatórios');
    }
}

const tweets = {
    get: (res) => {
        res.send(getTweets(10));
    },
    post: (req, res) => {
        postTweet(req, res);
    }
}

export default tweets;