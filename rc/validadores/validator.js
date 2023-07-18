export const validarNull =  ({variable, message}) => { 
    if (!variable) { 
        res.status(404).json({
            message: message
        });
    };
}

export const validarEmpty = ({variable, message, res, next}) => { 
    if (!variable.length) {
        res.status(404).json({
            message: message
        });
    }
}

export const validarCastError = (variable) => {
    if (variable == "CastError") { 
        return next();
    }
}