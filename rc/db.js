import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: process.ENV }); 

const conectarDB = async () => { 
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/apitest", { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Conectado");
        console.log(`Base de datos  esta conectada a: ${db.connection.name}`)
    } catch (error) { 
        console.error(error);
    }
}

export default conectarDB;