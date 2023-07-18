import Producto from "../modelos/Producto.js";
import jwt from "jsonwebtoken";

export const productosStock = async (req, res) => { 
    try { 
        const producto = await Producto.find({stock: { $gte: 101}}).exec();
        if (!producto.length) { 
            return res.status(404).json({
                message: "No hay productos con un stock mayor a 100"
            })
        }
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los productos"
        })
    }
};

export const findProductoByID = async (req, res, next) => { 
    const { id } = req.params; 
    try { 
        const producto = await Producto.find({precio: { $gte: 2, $lte: 5}, _id:id}); 
        if (!producto.length) {
            return res.status(404).json({
                message: 'No hay productos con un precio entre 2.5 y 5'
            })
        };
        res.status(200).json(producto);
    } catch (error) {
        if (error.name == "CastError") { 
            return next();
        } 
        res.status(500).json({
            error,
            message: 'Error en funcion findProductoByID'
        })
    }
}

export const findProductoByDescripcion = async (req, res, next) => { 
    const { descripcion }= req.params;
    try { 
       const producto = await Producto.find({precio: { $gte: 2.5, $lt: 5}, descripcion: {$eq: descripcion}});
       if (!producto.length) {
        return res.status(404).json({
            message: 'No hay productos con un precio entre 2.5 y 5'
        })
       };
       res.status(200).json(producto);
    } catch (error) { 
        if (error.name == "CastError") { 
            return next();
        }
        res.status(500).json({
            error,
            message: 'Error en la funcion findProductoByDescripcion'
        });
    }
};

export const createProducto = async (req, res) => {
    const { descripcion, precio, stock } = req.body;
    try {
        const saldo = precio * stock;
        const newProducto = new Producto({ descripcion, precio, stock, saldo});
        const ProductoGuardado = await newProducto.save();
        res.json({
            "Nuevo Producto": ProductoGuardado
        });
    } catch (error) {
        res.status(500).json({
            message: "Algo salio mal creando el producto :c"
        })
    }
}

export const deleteProductoByID = async (req, res, next) => {
    const { id } = req.params;
    try{ 
        const producto = await Producto.findOneAndDelete({_id: {$eq: id}});
        if(!producto) { 
            return res.status(404).json({ 
                message: "No se encontro el producto con el id proporcionado"
            })
        }
        res.status(200).json({
            message: "El producto fue eliminado",
            productoelim: producto
        });
    } catch (error) { 
        if (error.name == "CastError") { 
            return next();
        }
        res.status(500).json({
            error,
            message: 'Error en la funcion deleteProductoByID'
        });
    }
}

export const deleteProductoByDescripcion = async (req, res, next) => { 
    const { descripcion } = req.params;
    try { 
        const productofind = await Producto.findOneAndDelete({descripcion: {$eq: descripcion}});
        if (!productofind) { 
            return res.status(404).json({
                message: "No se encontro  el producto con la descripcion dada"
            })
        }
        res.status(200).json({
            message: "El producto fue eliminado",
            productoelim: productofind
        });
    } catch (error) { 
        console.error(error);
    }
}

export const actulizarProducto = async (req, res) => { 
    const {id } = req.params;
    try { 
        await Producto.findByIdAndUpdate(id, req.body);
        res.json({
            message: 'Excelente tu producto fue actualizado'
        })
    } catch (error) { 
        res.status(500).json({
            message: `No puedo actualizar el producto con el id: ${id}`
        })
    }
}