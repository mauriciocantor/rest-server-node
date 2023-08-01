

const isAdminRole = (req,res,next) => {
    if(!req.userAuthenticated){
        return res.status(500).json({msg: "Se valida rol sin verificar token"});
    }

    const { role, name } = req.userAuthenticated;

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({msg: `${name} no es administrador - no es posible continuar con la operación`});
    }

    next();
}

const hasRole = ( ...roles ) => {
    // se retorna la funcion que espera el middleware para poder tomar parametros en la funcion inicial
    return (req, res, next) => {
        if(!req.userAuthenticated){
            return res.status(500).json({msg: "Se valida rol sin verificar token"});
        }

        const { role, name } = req.userAuthenticated;

        if( !roles.includes(role)){
            return res.status(401).json({msg: `${name} no es administrador - no es posible continuar con la operación`});
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}