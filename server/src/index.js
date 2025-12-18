import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from 'cors'
import { auth } from "./lib/auth.js"
const app=express();

app.use(express.json());
app.use(
    cors({
        origin:"http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }))

// Debug middleware
app.use((req, res, next) => {
    if (req.path.includes('/device')) {
        console.log('Device auth request:', {
            method: req.method,
            path: req.path,
            body: req.body,
            query: req.query
        });
    }
    next();
});

app.use('/api/auth', toNodeHandler(auth));

app.get('/',(req,res)=>{
    res.send('Hello');
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})
