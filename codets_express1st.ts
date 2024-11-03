import * as express from "express";
let app:any= express();
app.get('/',(req:any,res:any):any=>{
    res.status(200).json({"home":"ts 1st try"})
})
app.listen(9090,()=>{
    console.log("server is running on port 9090")
})