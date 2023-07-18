import { Schema, model } from "mongoose";

//nombre, correo, contraseña
const UsuarioSchema = new Schema({
    name: {type: String, require: true, trim: true, unique: true},
    email: {type: String, require: true, trim: true, unique: true},
    password: {type: String, require: true, trim: true, unique: true},
}, { 
    versionkey: false
})

const Usuario = model('Usuario', UsuarioSchema); 

export default Usuario; 