const express = require('express');
const cors = require('cors');
const app = express();
require('./connection');
const router = require('./routes');

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "https://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

server.listen(8080, () => {
  console.log('server running at port', 8080)
})
app.set("socket.io", io);

