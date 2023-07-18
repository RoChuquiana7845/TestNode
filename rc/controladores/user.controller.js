import Usuario from './../modelos/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => { 
    const { name, email, password }  = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUsuario = new Usuario({ name, email, password:hashedPassword});
        const UsuarioGuardado = await newUsuario.save();
        const accessToken = jwt.sign({ userId: newUsuario._id }, "RC");
        res.json({
            "Nuevo Usuario": UsuarioGuardado,
            "token": accessToken
        });
    } catch (error) {
        res.status(500).json({
            message: "Algo salio mal creando el usuario"
        })
    }
}

export const login = async (req, res) => { 
    const { name: namer, passwordr} = req.body;
    try { 
        const usuario = await Usuario.findOne({name: {$eq: namer}, password: {$eq: passwordr}});
        if (!usuario) { 
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        } 
        res.status(200).json(usuario);
    } catch (error) { 
        console.error(error);
    }
}
