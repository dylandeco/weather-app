const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
require("dotenv").config();

const bodyParser = require("body-parser"); // middleware

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  var jsonParser = bodyParser.json();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));

  // Answer API requests.
  app.get("/api", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.post("/login", jsonParser, async function (req, res) {
    if (!req.body.email || !req.body.password) {
      res.status("400");
      res.send("Invalid details!");
    } else {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_AUTH_KEY}`;
        console.log(url);
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: req.body.email,
            password: req.body.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          res.set("Content-Type", "application/json");
          res.send(data);
        } else {
          res.status("400");
          res.send("Invalid details!");
        }
      } catch {}
    }
  });

  app.post("/register", jsonParser, async function (req, res) {
    if (!req.body.email || !req.body.password) {
      res.status("400");
      res.send("Invalid details!");
    } else {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_AUTH_KEY}`;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: req.body.email,
            password: req.body.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          res.set("Content-Type", "application/json");
          res.send(data);
        } else {
          res.status("400");
          res.send("Sign up failed!");
        }
      } catch {}
    }
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
