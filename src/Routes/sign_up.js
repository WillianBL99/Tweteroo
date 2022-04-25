import usersLogin from '../Models/users_login.js';

const validateName = (name) => {
    const includeUser = usersLogin.includes(
        user => user.username === name
    );

    return !includeUser;
}

const sing_up = (req, res) => {
    const {username, avatar} = req.body;

    if(!username || !avatar){
        res.status(400).send('Todos os campos são obrigatórios');

    } else if(!validateName(username)){
        res.status(403).send('Usuário já cadastrado');

    } else {
        const login = {username, avatar};
        usersLogin.push(login);
            
        res.status(201).send('ok');
    }
}

export default sing_up;