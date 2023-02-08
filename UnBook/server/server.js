import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import { readdir } from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-type"],
  },
});

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR => ", err));


// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

// autoload routes
readdir("./routes", (err, files) => {
  files.map((r) => app.use("/api", require(`./routes/${r}`)));
});

{/* // socketio
io.on("connect", (socket) => {
  // console.log("SOCKET>IO", socket.id);
  socket.on('send-message', (message) => {
    //console.log('new message received =>', message);
    socket.broadcast.emit('receive-message', message);
  })
}); */}

io.on("connect", (socket) => {
  // console.log("SOCKET>IO", socket.id);
  socket.on("new-post", (newPost) => {
    console.log('post submited =>', newPost);
    socket.broadcast.emit("new-post", newPost);
  })

  socket.on("delete-post", (deletePost) => {
    console.log('post deleted =>', deletePost);
    socket.broadcast.emit("delete-post", deletePost);
  })
  socket.on("new-comment", (comment) => {
    console.log('new comment =>', comment);
    socket.broadcast.emit("new-comment", comment);
  })
  socket.on("remove-comment", (comment) => {
    console.log('coment removed =>', comment);
    socket.broadcast.emit("remove-comment", comment);
  })
});

const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server running on port ${port}`));
