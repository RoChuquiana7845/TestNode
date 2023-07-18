import { Schema, model } from "mongoose";

const ProductoSchema = new Schema({
    descripcion: {type: String, require: true, trim: true, unique: true},
    precio: {type: Number, require: true, trim: true, unique: true},
    stock: {type: Number, require: true, trim: true, unique: true},
    saldo: {type: Number, default: 0},
}, { 
    versionKey: false
})

const Producto = model('Producto', ProductoSchema);

export default Producto;
