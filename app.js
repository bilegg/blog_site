const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// connect to mongodb
const dbURI =
    "mongodb+srv://admin:oT4BP8OdEzy86SLA@mycluster.jkeio.mongodb.net/project?retryWrites=true&w=majority";

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to db");

        app.listen(3000, () => {
            console.log("server starting at port 3000");
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(express.static("public"));

// mongodb and mongoose routes
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "title 2",
        snippet: "dsad",
        body: "dsadasdsd",
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/single-blog", (req, res) => {
    Blog.findById();
});

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
    });
});

app.get("/blogs", (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", {
                title: "My blog",
                blogs: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/blogs/create", (req, res) => {
    res.render("create", {
        title: "Create a new blog",
    });
});

app.use((req, res) => {
    res.status(404).render("404", {
        title: "Error",
    });
});
