import isFilled from '../Helpers/is_filled.js';
import tweetsList from '../Models/tweets_list.js';
import users_login from '../Models/users_login.js';

const getUserAvatar = (username) => {
    return users_login.find(
        user => user.username === username
    );
}

const getTweets = (res, page) => {
    if(isFilled(page) && page >= 1){
        const qtdMessages = 10;
        const fim = page * qtdMessages;
        const inicio = fim - qtdMessages;

        const tweetsToSend = tweetsList.slice(inicio, fim);
        
        return tweetsToSend.map(tweetToSend => {
            const {username, tweet} = tweetToSend;
            console.log(tweetToSend, username)
            const {avatar} = getUserAvatar(username);
    
            return {username, avatar, tweet};
        });

    } else {
        res.status(400).send('Informe uma página válida!');
    }
}

const getUsernameTweets = (username, res) => {
    res.send(
        tweetsList.filter(tweet => tweet.username === username)
    );
}

const postTweet = (req, res) => {
    const username = req.header('User');
    
    const {body} = req;
    const {tweet} = body;

    if(isFilled(username) && isFilled(tweet)){
        const userTweet = {username, tweet};
        tweetsList.unshift(userTweet);
        res.status(201).send('ok');

    } else {
        res.status(400).send('Todos os campos são obrigatórios');
    }
}

const tweets = {
    get: (req, res) => {
        const {page} = req.query;
        res.send(getTweets(res, page));
    },
    post: postTweet,
    getUserMessage: (req, res) => {
        const {username} = req.params;
        getUsernameTweets(username, res);
    }
}

export default tweets; 