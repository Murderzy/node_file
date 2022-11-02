import express from'express'
import multer  from'multer'
import path from "path";
const upload = multer({ dest: 'uploads/' })
import news from'./models/news.js'
   
const app = express();
const __dirname = path.resolve();

const urlencodedParser = express.urlencoded({extended: false});
  
app.get("/",  (req, res)=> {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", urlencodedParser, upload.array('avatar'),  (req, res) =>{
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);

    let biggest;
    if (news.length !== 0) {
      biggest = news.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      );
    }
    news.push({
      id: biggest ? biggest.id + 1 : 1,
      title: req.body.title,
      text: req.body.text,
      photo: req.body.avatar
});
console.log("add");
res.redirect('/');
}) 
app.listen(3000, ()=>console.log("Сервер запущен..."));