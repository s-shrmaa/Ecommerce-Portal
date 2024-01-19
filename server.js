const express = require("express");
const path = require("path");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer")
const mongoose = require("mongoose");
const Users = require("./models/userModel");

mongoose.connect("mongodb://localhost:27017/Test")
.then(resuly=>{
    console.log("Connected to database!");
}).catch(err=>{
    console.log("Issue in connection!!");
})

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieparser());
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: '123#456$@',
    cookie: {maxAge: 1000*60*60*24}
}));

const mstorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "public/files");
    },
    filename: (req,file,cb)=>{
        const ext = file.mimetype.split("/")[1];
        cb(null, "admin." + ext);
    }
})
const upload = multer({storage:mstorage});

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/signup", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/signup.html"));
})

app.post("/signup", upload.single("pic"), (req,res)=>{
    let obj = {"name": req.body.name, 
    "username": req.body.username, 
    "password":req.body.password};

    const userObj = new Users(obj);
    userObj.save().then(result=>{
        console.log(result);
        res.end();
    });

    res.redirect("/login");
})

app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/login.html"));
})

app.post("/login", (req,res)=>{      
       Users.findOne({$and:[{'name':req.body.name}, {"username": req.body.username}, {"password": req.body.password}]}).then((response)=>{
        if(response){
            req.session.name = req.body.name;
            res.redirect("/products");
        }
        else{
            res.redirect("/login");
        }
    });
})

app.get("/products", (req,res)=>{
    if(req.session.name){
        res.render("products", {"nameDisplay": req.session.name});
    }
    else{
       res.redirect("/login");
    }
})


app.get("/product", (req,res)=>{
    res.sendFile(path.join(__dirname, "./public/product.html"));
})

app.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/");
})

app.get("*", (req,res)=>{
    res.status(404);
})

app.listen(8000, (err)=>{
    if(err){
        console.log("Unable to start server!");
    }
    else{
        console.log("Server started...");
    }
});
   