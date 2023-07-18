import jwt from 'jsonwebtoken';
import Usuario from './../modelos/Usuario.js';

const authenticateToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
  
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];
    
    if (!accessToken) {
      return res.status(401).json({ message: 'No se ha proporcionado un token de acceso' });
    }

    const decodedToken = jwt.verify(accessToken, "RC");
    const user = await Usuario.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'Token de acceso no válido' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al autenticar el token de acceso' });
  }
};

export default authenticateToken;