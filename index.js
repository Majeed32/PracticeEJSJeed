import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

function Post(title, content) {
  this.title = title;
  this.content = content;
  this.id = Date.now() + Math.floor(Math.random() * 1000);
}
let firstPost = new Post(
  "My First Blog Project",
  "Today I started building my first blog using Node, Express, and EJS. It feels great finally seeing something run in the browser that I created from scratch."
);

let secondPost = new Post(
  "Debugging at 2AM",
  "Spent way too long fixing a tiny typo that broke my app. Lesson learned: always read error messages carefully and take breaks when stuck."
);

let thirdPost = new Post(
  "Learning Never Stops",
  "Every day I learn something new about JavaScript and backend development. It’s challenging but also really rewarding when things finally click."
);
let postArray = [firstPost, secondPost, thirdPost];

app.get("/", (req, res) => {
  res.render("index.ejs", { array: postArray });
});

app.get("/add", (req, res) => {
  res.render("add.ejs", { post: {} });
});
app.get("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = postArray.find((p) => p.id === postId);

  if (!post) {
    res.send("Post not found");
  } else {
    res.render("post.ejs", { post: post });
  }
});

app.get("/edit/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = postArray.find((post) => post.id === postId);
  res.render("add.ejs", { post: post });
});
app.get("/delete/:id", (req, res) => {
  const postId = Number(req.params.id);
  postArray = postArray.filter((post) => post.id !== postId);
  res.redirect("/");
});

app.post("/addPost", (req, res) => {
  const post = new Post(req.body.title, req.body.content);
  postArray.push(post);
  res.redirect("/");
});

app.post("/updatePost/:id", (req, res) => {
  const postId = Number(req.params.id);
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;
  const post = postArray.find((post) => post.id === postId);
  if (post) {
    post.title = updatedTitle;
    post.content = updatedContent;
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
