import { Router } from "express";
import * as authCtrl from "../controladores/user.controller.js";
import authenticateToken from "../funcion/authenticateToken.js";

const router = Router(); 

router.post("/register", authCtrl.register); 

router.get("/login",  authenticateToken, authCtrl.login);

export default router;