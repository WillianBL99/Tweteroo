import users_login from '../Models/users_login.js';

const validateName = (name) => {
    const isEmpty = name === "";
    const isNull = name === null;
    const isString = typeof(name) === 'string';

    return !isEmpty && !isNull && isString;
}

const validateAvatar = (avatar) => {
    return avatar?true:false;
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