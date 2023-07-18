import express from "express";
import AuthRouter from "./ruteadores/Usuario.routes.js";
import ProductRouter from "./ruteadores/Producto.routes.js";
import conectarDB from "./db.js";

const app = express(); 

app.set("port", process.env.PORT || 4002);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application" });
  });

app.use("/api/auth", AuthRouter);
app.use("/api/products", ProductRouter);

app.listen(app.get('port'), ()=> {
    console.log(`El servidor esta en funcionamiento =>  http://localhost:${app.get('port')}/`)
})

conectarDB();