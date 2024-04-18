import Empleado from "../models/Empleado.js";
import jwt from "jsonwebtoken"

const identi = async (req,res,next) => {
    let ttkn;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            ttkn = req.headers.authorization.split(' ')[1]; // divide la cadena y obtengo la segunda parte
            const decoded = jwt.verify(ttkn,process.env.JWT_SECRET);
            req.empleado = await Empleado.findById(decoded.id).select("-pass -token"); // creo una nueva variable en request
            //console.log(`middle ${req.usuario}`);
            return next();
        }catch(error){
            return res.status(404).json({msg:'Hubo un error de identificación'});
        }
    }

    if(!ttkn){
        const err = new Error("Token no válido");
        return res.status(401).json({msg:err.message});
    }
    next();
}

export default identi;