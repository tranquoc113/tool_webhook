"use strict";

// Use dotenv to read .env vars into Node
require("dotenv").config();

// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  { urlencoded, json } = require("body-parser"),
  app = express(),
  path = require("path");

app.use(urlencoded({ extended: true }));

// Parse application/json
app.use(json());
app.use(express.static(path.resolve(__dirname, "./index.html")));

app.get("/", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.get("/zalo/webhook", (req, res) => {
  console.log("sss", req.body);
  res.status(200).send("ok");
});
app.post("/zalo/webhook", (req, res) => {
  fetch(
    "http://172.168.10.129:8000/api/webhook/zalo/",
    {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify({a:123456})
    }
  )
  res.status(200).send("ok");
  console.log(JSON.stringify(req.body));
});
app.get("/fetch", (req, res) => {
  fetch(
    "http://172.168.10.129:8000/api/webhook/zalo/",
    {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify({a:123456})
    }
  )
  res.status(200).send("ok");
  console.log(JSON.stringify(req.body));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
