let http=require("http")
let url=require("url");
const server=http.createServer((req,res)=>{
    let obj=url.parse(req.url,true).query;
    if(obj.name=="nikhil" && obj.pass=="nikhil@123"){
        res.write("loginsuccefully");
    }else{
        res.write("wrong password");
    }
    res.end();
})
server.listen(2020);
console.log("server started on 2020");