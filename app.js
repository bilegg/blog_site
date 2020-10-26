const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const bodyParser = require("body-parser");

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

// middlewares
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // allowing passing of form data
app.use(express.static("public"));

// mongodb and mongoose routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
    });
});

app.get("/blogs/create", (req, res) => {
    res.render("create", {
        title: "New blog",
    });
});

// home page, get all blogs
app.get("/blogs", (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", {
                title: "Home",
                blogs: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

// show details about a single blog
app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render("details", { blog: result, title: "Blog details" });
        })
        .catch((err) => {
            console.log(err);
        });
});

// add a new blog from /blogs/create
app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        })
        .catch((err) => {
            console.log(err);
        });
});

// delete blog
app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/blogs" });
        })
        .catch((err) => {
            console.log(err);
        });
});

// update blog
app.put("/blogs/:id", (req, res) => {
    const blog = req.body;

    console.log("update: ", blog);
    Blog.updateOne(
        { _id: blog.id },
        { title: blog.title, snippet: blog.snippet, body: blog.body }
    )
        .then((result) => {
            res.json({ redirect: "/blogs" });
        })
        .catch((err) => {
            console.log(err);
        });
});

// default error site
app.use((req, res) => {
    res.status(404).render("404", {
        title: "Error",
    });
});
