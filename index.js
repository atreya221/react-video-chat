const express = require("express");
//const app = require("express")();
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const mysql = require("mysql");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);


const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: [ "GET", "POST" ]
  }
});

//app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/app', (req, res) => {
  res.send('Running');
});

const db = mysql.createConnection({
  user: "atreya",
  host: "localhost",
  password: "Atreya@2001",
  database: "LOGIN_SYSTEM",
});

app.post("/register", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    //console.log(hash);
    db.query(
      "INSERT INTO users (name, username, password) VALUES (?,?,?)",
      [name, username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});


io.on('connection', function(socket) {
  socket.on('send-username', function(username) {
      socket.emit("me", username);
      socket.join(username);
      //console.log(username);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("screenShare", ({ userToCall }) => {
    socket.broadcast.to(userToCall).emit("screenShare");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    //console.log(userToCall);
    socket.broadcast.to(userToCall).emit("callUser", { signal: signalData, from: from, name: name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", { signal: data.signal });
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
