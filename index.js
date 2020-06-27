const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./Routes/blogRoutes");
const { urlencoded } = require("express");

// express app
const app = express();
//connect to mongo db
const dbURI =
  "mongodb+srv://blogadmin:blogadmin5025@nodeblog-vwjvs.mongodb.net/blogsite?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // listen for requests
    app.listen(3000);
    console.log("connected to db");
  })
  .catch((err) => console.error(err));

//middlewares and static files
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

app.get("/", (req, res) => {
  res.redirect("/blogs");
  //   const blogs = [
  //     {
  //       title: "Yoshi finds eggs",
  //       snippet: "Lorem ipsum dolor sit amet consectetur",
  //     },
  //     {
  //       title: "Mario finds stars",
  //       snippet: "Lorem ipsum dolor sit amet consectetur",
  //     },
  //     {
  //       title: "How to defeat bowser",
  //       snippet: "Lorem ipsum dolor sit amet consectetur",
  //     },
  //   ];
  //   res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", router);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
