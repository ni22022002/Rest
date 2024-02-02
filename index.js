const express=require("express");
const app=express();
const port=8080;
const path=require("path");

// uuid package use to create id for post,and this is unique id
const {v4:uuidv4} =require('uuid');
// uuidv4(),it is a function to generate unique key

// method override is use to do actions like delete and patch
const methodOverride=require("method-override")
app.use(methodOverride('_method'))  //jidhr _method hoga udhr override krdena


// to parse the data
app.use(express.urlencoded({extended:true}))



app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {   
        id:uuidv4(),
        username:"nishant",
        content:"i live in nashik",
    },
    {
        id:uuidv4(),
        username:"manoj",
        content:"i live in UK",

    },

     {
        id:uuidv4(),
        username:"mohan",
        content:"i live in Dubai",

    },
];

// this api is used to get the data
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})

// to add a new post,for this we need to perform 2 steps,first to serve the form that is to take the data from the user to enter and send to database and secoond step to fetch it
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    //console.log(req.body);  //post request mai req ke body mai data aati h so use print krnlenege
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content})
    //res.send("post request wworking");

    res.redirect("/posts")
// redirect is use to redirect to other url
})

// this api is use to get a specific id,not the entire database
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;   //yaha hum params use kiye because hume just ek parameter return krnah hai
    //console.log(id);
    let post=posts.find((p)=> id===p.id);   //it is finding the id from the database/array
    //console.log(post);
    //res.send("request working")
    res.render("show.ejs",{post})
})

// Patch request,,use to update
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newContent;
    console.log(post);
    // res.send("patch request working");
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);  //this plays all the game ye kya krta h us id ke alawa sabko render and id wale ko chd dega
    // res.send("delete success")
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log("listening to port:8080")
})