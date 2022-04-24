import isFilled from '../Helpers/is_filled.js';
import tweets_list from '../Models/tweets_list.js';
import users_login from '../Models/users_login.js';

const getUserAvatar = (username) => {
    return users_login.find(
        user => user.username === username
    );
}

const getTweets = (page) => {
    if(isFilled(page)){
        if(page >= 1){
            const qtdMessages = 10;
            const fim = page * qtdMessages;
            const inicio = fim - qtdMessages;

            const tweetsToSend = tweets_list.slice(inicio, fim);
            
            return tweetsToSend.map(tweetToSend => {
                const {username, tweet} = tweetToSend;
                const {avatar} = getUserAvatar(username);
        
                return {username, avatar, tweet};
            });

        } else {
            res.status(400).send('Informe uma página válida!');
        }

    } else {
        res.status(400).send('O campo ?page deve conter algum valor');
    }
}

const getUsernameTweets = (username, res) => {
    res.send(
        tweets_list.filter(tweet => tweet.username === username)
    );
}

const postTweet = (req, res) => {
    const {body} = req;
    const {username, tweet} = body;

    if(isFilled(username) && isFilled(tweet)){
        const userTweet = {username, tweet};
        tweets_list.unshift(userTweet);
        res.status(201).send('ok');

    } else {
        res.status(400).send('Todos os campos são obrigatórios');
    }
}

const tweets = {
    get: (req, res) => {
        const {page} = req.query;
        res.send(getTweets(page));
    },
    post: (req, res) => {
        postTweet(req, res);
    },
    getUserMessage: (req, res) => {
        const {username} = req.params;
        getUsernameTweets(username, res);
    }
}

export default tweets;