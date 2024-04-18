import jwt from 'jsonwebtoken';

const generarJWT = (id,nombre,rol) =>{
    // generar un web token, esto firma el payload
    // {objeto},llave privada,{expiracion}
    return jwt.sign({id,nombre,rol}, process.env.JWT_SECRET, {expiresIn:'15d'})
}

export default generarJWT;