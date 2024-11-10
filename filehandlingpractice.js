const express=require("express");
const cors=require("cors");
const  mongoose=require("mongoose");
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const multer=require("multer");
const {GridFSBucket}=require('mongodb');
const {GridFsStorage}=require("multer-gridfs-storage")
const crypto=require('crypto');

const path=require("path");

mongoose.connect("mongodb://127.0.0.1:27017/practice")
.then(()=>console.log("connection stablished"))
.catch((err)=>console.log(err))

const conn=mongoose.connection;
let gfsBucket

conn.once("open",()=>{
    gfsBucket=new GridFSBucket(conn.db,{bucketName:"uploads"});
    console.log("gfsBucket is setup")
})

const movieschema=new mongoose.Schema({
    id:{type:Number},
    name:{type:String},
    subtitle:{type:Boolean},
    genre:{type:String},
    language:{type:String},
    photoId:{type:mongoose.Schema.Types.ObjectId, ref: 'uploads.files' }
})
const Movie=mongoose.model("Movie",movieschema)

const storage=new GridFsStorage({
    url:"mongodb://127.0.0.1:27017/practice",
    file:(req,file)=>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)
                }
                const filename=buf.toString("hex")+path.extname(file.originalname);
                const fileinfo={
                    filename:filename,
                    bucketName:"uploads"
                };

                resolve(fileinfo);
            })

        })
    }

})
const upload = multer({ storage });


app.get('/',async(req,res)=>{
    try{
        res.status(200).send('<h1>server side rendering</h1>');
    }
    catch(err){
        console.log(err);
    }
})

app.post('/moviedetails',upload.single("file"), async(req,res)=>{
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    try{
        let id;
        let exist=true;
        while(exist){
            id=Math.round(Math.random()*10000)
            exist= await Movie.exists({id:id})
        }
      const { name, subtitle, language ,genre } = req.body;
      const newmovie=new Movie({
        id,name,subtitle,language,genre,
        photoId:new mongoose.Types.ObjectId(req.file.id) 
      })
      await newmovie.save();
      res.status(200).json({ message: 'Movie saved successfully', Movie: newmovie });
      }
    catch (err) {
        console.error('Error creating movie:', err);
        res.status(500).send("Server error. Could not create movie.");
      }
})



app.listen(2022,()=>console.log("port listening on 2022"));
