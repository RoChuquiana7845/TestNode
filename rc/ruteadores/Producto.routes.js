import { Router } from "express";
import * as productoCtrl from "../controladores/producto.controller.js";
import authenticateToken from '../funcion/authenticateToken.js';

const router = Router(); 

router.get("/", authenticateToken, productoCtrl.productosStock); 

router.get("/:id", authenticateToken, productoCtrl.findProductoByID);

router.get("/:descripcion", authenticateToken, productoCtrl.findProductoByDescripcion);

router.post("/", authenticateToken, productoCtrl.createProducto ); 

router.put("/:id", authenticateToken, productoCtrl.actulizarProducto); 

router.delete("/:id", authenticateToken, productoCtrl.deleteProductoByID);

router.delete("/:descripcion", authenticateToken, productoCtrl.deleteProductoByDescripcion);

export default router;