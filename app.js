//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');


const homeStartingContent =
  "Hi every we as an small interest created this website to assist your job search and also want to make you part to make someone happy by helping others to find their job. If You know any jobs that you think will help our friends. Go to Post a job section on top right and post the job by taking just a few seconds. This will help your friends and others.";
const aboutContent =
  "We want to help people find jobs and achieve their goals and want each and every one to succeed in their career and be happy.";
const contactContent =
  "Job Find, feynman245@gmail.com";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const posts = [];

app.get("/", (req, res) => {
  res.render("home", {
    home: "Home",
    posts:posts,
    homeStartingContent: homeStartingContent,
  });
  
});
app.get("/about", (req, res) => {
  res.render("about", { about: "About", aboutContent: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contact: "Contact", contactContent: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose", { compose: "Compose" });
});
app.post("/compose", (req, res) => {
  let post = {
    title: req.body.postTitle,
    content:req.body.postContent
  }
  posts.push(post);
  res.redirect('/');
});
app.get('/posts/:postName', (req, res) => { 
  posts.forEach(post => { 
    if (lodash.lowerCase(post.title) === lodash.lowerCase(req.params.postName)) { 
      res.render('post', { postTitle: post.title, postContent: post.content });
    }
  })
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
