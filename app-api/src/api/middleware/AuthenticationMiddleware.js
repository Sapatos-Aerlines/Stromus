require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    verifyJWT(req, res, next){
        // "authorization": "Bearer xxx.yyy.zzz"
        //console.log("HEADERS: "+JSON.stringify(req.headers));
        
        const bearerHeader = req.headers['authorization'];

        if (!bearerHeader) return res.status(401).send({ auth: false, message: 'Nenhum token fornecido.'});

        const token = bearerHeader.replace('Bearer ','');
        
        // Verifica se JWT é válido
        jwt.verify(token, "iashjbaoiasudoassadn", function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token.' });
            next();
       });

    },
}