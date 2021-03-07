const resource_router = require("express").Router();
const path = require("path");
const filesystem = require("fs");
const jwt = require('jsonwebtoken');
// const os = require("os");
// const url = require("url");

resource_router.use(authenticate);

resource_router.get('/',(req, res) => {
    const filename = "index.html";
    const content_type = "text/html";
    // Build file path
    let filePath = path.join( __dirname, "src", filename);
     // Read File
     console.log(filePath)
     filesystem.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == "ENOENT") {
          // Page not found
          res.writeHead(404, { "Content-Type": content_type });
          res.end("404 page not found");
        } else {
          //  Some server error
          res.writeHead(500, { "Content-Type": content_type });
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": content_type });
        res.end(content, "utf8");
      }
    });
  })
  
  resource_router.get('/data', (req, res) => {
    
    const filename = "response.json";
    const content_type = "application/json";
  
    // Build file path
    let filePath = path.join( __dirname, "src", filename);
     // Read File
     filesystem.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == "ENOENT") {
          // Page not found
          res.writeHead(404, { "Content-Type": content_type });
          res.end("404 page not found");
        } else {
          //  Some server error
          res.writeHead(500, { "Content-Type": content_type });
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { "Content-Type": content_type });
        res.end(content, "utf8");
      }
    });
  
  })

  function authenticate (req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

module.exports = resource_router;