// import is available in ES6. However, its not included in Node.js yet
// require is a common.js syntax

const http = require("http");
const path = require("path");
const fs = require("fs");

// const fs = require("os");
// const fs = require("url");

// plain node js server
/*const server = http.createServer((req, res) => {

});*/

const express = require('express');
const app = express();

app.use(express.json());

const posts = [
  {
    username: 'user1',
    title: 'Post 1'
  },
  {
    username: 'user2',
    title: 'Post 2'
  }
]

app.get('/*', authenticateToken, (req, res) => {


  const msg = posts.filter(post => post.username === req.user.name)

  fs.writeFile(path.join(__dirname, "/src", "response.json"), JSON.stringify(msg), err => {
      if (err) throw err;
  });

  // Build file path
  let filePath = path.join(
    __dirname,
    "src",
    req.url === "/" ? "home.png" : req.url
  );

  // Extension of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extname == "") filePath += ".html";


  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        res.writeHead(404, { "Content-Type": contentType });
        res.end("404 page not found");
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });

})


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));