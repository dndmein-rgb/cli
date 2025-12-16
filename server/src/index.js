import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from 'cors'
import { auth } from "./lib/auth.js"
const app=express();

app.use(
    cors({
        origin:"http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }))
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hllo');
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})
