// import is available in ES6. However, its not included in Node.js yet
// 'require' is a common.js syntax

// plain node js server
// const http = require("http");
// const server = http.createServer((req, res) => {});

// using express framework
const express = require('express');

const app = express();

// middleware
app.use(express.json());

// resource routes middleware
app.use("/user", require("./auth"));
app.use("/", require("./routes"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));