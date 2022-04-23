import users_login from '../Models/users_login.js';

const sing_up = (req, res) => {
    const {body} = req;
    const {username, avatar} = body;
    const login = {username, avatar};
    users_login.push(login);
        
    res.send('ok');
}

export default sing_up;