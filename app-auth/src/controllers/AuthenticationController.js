const UserService = require("../services/UserService");
const utils = require("../utils/utils");

module.exports = {
    async doLogin(req, res) {
        if (req.body.hasOwnProperty('username')) {
            const userLogin = await UserService.getByUsername(req.body.username);

            if (userLogin) {
                const authenticated = await utils.comparePwd(req.body.pwd, userLogin.pwd);
                if (authenticated) {
                    const token = utils.signJwt(userLogin._id);
                    //console.log("TOKEN: ", token)
                    
                    userLogin.token = token; // funcionando para salvar o token
                    res.set('Authorization', `Bearer ${token}`); // não tá funcionando
                    res.status(200).send(userLogin);
                }
            } else {
                res.status(400).send("Senha e/ou usuário incorretos");
            }
        } else {
            res.status(400).send("Objeto de requisição deve conter um atributo username");
        }
    },

    doLogout(req, res) {
        res.set('Authorization', `Bearer `);
        res.status(200).send();
    },
}