const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const otherFunctions = require("./otherFunctions");
const http = require("http");
const { Server } = require("socket.io");
const { Hash } = require("crypto");
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
const bcrypt = require("bcrypt");
const saltRounds = 10;
const server = http.createServer(app);
const io = new Server(server);

const connectedUsers = {};

//express stuff
app.get("/", (req, res) => {
  res.render("home"); // Render the home page
});

io.on("connection", (socket) => {
  socket.on("join-room", ({ selectedOption, username }) => {
    connectedUsers[socket.id] = { username, selectedOption };
    socket.join(selectedOption);
    socket.username = username; // Store the username in the socket object
    socket.to(selectedOption).emit("userConn", `${username} joined ${selectedOption}`);
  });

  socket.on('emitMessage', (data) => {
    if (data.room === data.selectedOption) {
      socket.broadcast.to(data.selectedOption).emit('message', { username: data.username, message: data.message });
      console.log("message sent");
    }
  });

  socket.on("disconnect", () => {
    const { username, selectedOption } = connectedUsers[socket.id] || {};
    delete connectedUsers[socket.id];

    socket.broadcast.to(selectedOption).emit('userConn', `${username} disconnected`);
  });
});

app.post("/chat", (req, res) => {
  const selectedOption = req.body.engine;
  const username = req.body.user;
  //password verification here --> bcrypt.hash(req.body.pass, 10, (err, hash) => { if (err) { console.error(err); return; } //do password verification here });

  let colors = otherFunctions.getTheme(selectedOption);
  res.render("chat", { chat: selectedOption, palette: colors, username, selectedOption });
});

server.listen(PORT, () => {
  console.log(`Running on server ${PORT}`);
});