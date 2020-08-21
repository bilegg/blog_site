const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("server starting at port 3000");
});

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
    res.render("404", {
        title: "Error",
    });
});
