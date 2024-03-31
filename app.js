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

//express stuff
app.get("/", (req, res) => {
  res.render("home"); // Render the home page
});

app.post("/chat", (req, res) => {
  const selectedOption = req.body.engine;
  const username = req.body.user;

  //password verification here -->

  bcrypt.hash(req.body.pass, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }

    //do password verification here
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    //joining Room
    socket.join(selectedOption);
    socket.broadcast.emit("userConn", `${username} joined ${selectedOption}`);

    socket.on('emitMessage', (data) => {
      if(data.room == selectedOption){
      socket.broadcast.to(selectedOption).emit('message', {username: data.username , message: data.message});
      }
    });

    socket.on("disconnect", () => {
      io.emit("userConn", `${username} disconnected`);
    });
  });

  let colors = otherFunctions.getTheme(selectedOption);
  res.render("chat", { chat: selectedOption, palette: colors, username }); // Render the chat page
});

server.listen(PORT, () => {
  console.log(`Running on server ${PORT}`);
});
