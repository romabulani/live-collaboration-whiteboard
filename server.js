const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://draw-on-whiteboard.netlify.app",
    methods: ["GET", "POST"],
  },
});

const filePath = "drawings.json";

// Read the drawings file synchronously to ensure it's done before the server runs
let drawings = [];
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]"); // Initialize with empty array
} else {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    drawings = JSON.parse(data); // Parse the JSON file into the drawings array
  } catch (err) {
    console.error("Error reading drawings.json:", err);
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to the Live Collaboration Whiteboard!");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send stored drawings to the new user
  socket.emit("load-drawings", drawings);

  // Listen for drawing events and broadcast them
  socket.on("draw", (data) => {
    drawings.push(data);
    fs.writeFile("drawings.json", JSON.stringify(drawings), (err) => {
      if (err) {
        console.error("Error saving drawings:", err);
      }
    });

    io.emit("draw", data);
  });

  // Listen for the clear event
  socket.on("clear", () => {
    drawings = [];
    fs.writeFile("drawings.json", "[]", (err) => {
      if (err) {
        console.error("Error clearing drawings:", err);
      }
    });

    io.emit("clear");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on https://live-collaboration-whiteboard-nllh.onrender.com");
});
