import users_login from '../Models/users_login.js';
import isFilled from '../Helpers/is_filled.js';

const validateName = (name) => {
    const isString = typeof(name) === 'string';
    return isFilled(name) && isString;
}

const validateAvatar = (avatar) => {
    return isFilled(avatar);
}

const sing_up = (req, res) => {
    const {body} = req;
    const {username, avatar} = body;

    if(validateAvatar(avatar) && validateName(username)){
        const login = {username, avatar};
        users_login.push(login);
            
        res.send('ok');

    } else {
        res.status(400).send('Todos os campos são obrigatórios');
    }
}

export default sing_up;