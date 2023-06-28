require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const lodash = require("lodash");
const findOrCreate = require('mongoose-findorcreate');
const path = require("path");
const { log } = require("console");

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/CSC", { useNewUrlParser: true });

const memberSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    schoolId: String,   // ye temariw ID
    section: String,
    gender: String,
    email: String,
    phoneNumber: String,
    interests: [String],        //topics that the member is interested on e.g., programming, artificial intelligence, cybersecurity, data science, web development, etc.
    skillLevel: String,        // members skill level on selected interests
    attendances:[Object]        // collections of memebers attendance
});
const Member = new mongoose.model("member", memberSchema);


const eventSchema= new mongoose.Schema({
    title: String,
    dateAndTime:Date,
    venue : String,
    description: String,
    registrationRequired: Boolean,  //is registration required or not?? if not required registrationLink will be empty.
    registrationDeadline:Date,
    registrationLink: String
});

const Event = new mongoose.model("event", eventSchema);


const newsSchema = new mongoose.Schema({
    title: String,
    date: Date,
    content: String,
    coverURL: String
});

const News= new mongoose.model("news", newsSchema);


const galleryImageSchema = new mongoose.Schema({
    caption: String,
    imageURL: String
});


const GalleryImage= new mongoose.model("galleryImage", galleryImageSchema);


app.get("/", function(req,res){
    // home page will be displayed
    res.send("home page");
})

app.get("/newMembership", function(req,res){
    // new membership registration page will be displayed.
})

app.post("/newMembership",function(req,res){

    const member = new Member({
        
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        schoolId : req.body.schoolId,
        section: req.body.section,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        interests: req.body.interests ,
        skillLevel: req.body.skillLevel
    })

    member.save();
    console.log("successfully saved");
    res.redirect("/");
    
})




app.get("/news", function(req,res){
    // news page will be displayed.
})


app.get("/events", function(req,res){
    // events page will be displayed.
})

app.get("/login", function(req,res){
    // admin will be authenticated.
})


app.get("/admin", function(req,res){
    // admin will be authenticated and admins page will be displayed.
})

app.get("/admin/events", function(req,res){
    // events and new-event adding form will be displayed for admin.
})

app.post("/admin/events", function(req,res){
    // new-event will be saved on database .
})


app.get("/admin/news", function(req,res){
    // news and new-news adding form will be displayed for admin.
})

app.post("/admin/news", function(req,res){
    // new-news will be saved on database .
})

app.get("/admin/attendance", function(req,res){
    // attendance taking page will be rendered
})

app.post("/admin/attendance", function(req,res){
    // new attendance will be saved on DB
})




app.listen(3000, function(req,res){
    console.log("listening on port 3000");
})