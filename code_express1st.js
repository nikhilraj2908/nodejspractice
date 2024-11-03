let http=require("http");
let express=require("express");
let app=express();

app.get("/",(req,res)=>{
    res.status(200).json({"message":'get request on default'});
})

app.get("/demo",(req,res)=>{
    res.status(200).json("message:'demo se aai request'");
})

app.post("/",(req,res)=>{
    res.status(200).json("message:'default post request'");
})

app.listen(2021,()=>{
    console.log("server on 2021");
})