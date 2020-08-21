const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

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

app.get("/", (req, res) => {
    const blogs = [
        {
            title: "How to make chicken sandwich",
            snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "My journey in a new country",
            snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "Getting a new car",
            snippet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ];
    res.render("index", {
        title: "Home",
        blogs,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
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
