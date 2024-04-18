const generarId = () =>{
    const random = Math.random().toString(32).substring(2); // elimina dos primeros caracteres
    const fecha = Date.now().toString(32); // convierte a caracteres 
    return random+fecha;
};

export default generarId;