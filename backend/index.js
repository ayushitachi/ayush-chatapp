const express = require("express");
const app = express();
const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const connect = require("./dbconfig");
const User = require("./models/User");
const Message = require("./models/Message");
const bcrypt = require("bcrypt");

// middlewares
app.use(cors());
app.use(express.json()); // to parse JSON data
app.use(express.urlencoded({ extended: false })); // to parse JSON data in req body

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// connecting to database
connect();

app.get("/", (req, res) => {
  res.status(200).json({ msg: "hello" });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Checking if user does not exist in db
    console.log(email, password);
    const user = await User.findOne({ email });
    // console.log("user in backend", user[0].password);
    if (user == null || Object.keys(user).length === 0) {
      res.status(200).json({ message: "User does not exist", success: false });
      return;
    }

    // verifying password is corect or not
    const pwdResult = await bcrypt.compare(password, user.password);
    // console.log(pwdResult);

    if (!pwdResult) {
      res.status(200).json({ message: "password is wrong", success: false });
      return;
    }
    res.status(200).json({ message: "user found", success: true, user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Generate a salt and hash the password with the secret
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // console.log("hashed password", hashed);
    try {
      const response = new User({ username, email, password: hashed });
      await response.save();
      res.status(200).json({
        msg: "User Created succesfully",
        user: response,
        success: true,
      });
    } catch (err) {
      res
        .status(200)
        .json({ mg: "User already exist", success: false, error: err });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
});

app.get("/allUsers", async (req, res) => {
  const user = await User.find();
  res.status(200).json({ user });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Handle joining a private chat room
  socket.on("joinRoom", async ({ userId, targetUserId }) => {
    const room = [userId, targetUserId].sort().join("_"); // Unique room name
    // console.log(room);
    socket.join(room);

    // Fetch chat history from MongoDB and emit to the clients
    try {
      const msg = await Message.find({
        $or: [
          { sender: userId, receiver: targetUserId },
          { sender: targetUserId, receiver: userId },
        ],
      }).sort({ timestamp: 1 });

      // emiting chat history to the client
      socket.emit("chatHistory", msg);

      console.log(`${socket.id} joined room: ${room}`);
    } catch (err) {
      console.log("error finding msg", err);
    }
  });

  // Handle messages
  socket.on("sendMessage", async ({ sender, receiver, message }) => {
    const room = [sender, receiver].sort().join("_");
    // console.log(room);
    io.to(room).emit("receiveMessage", { sender, receiver, message });

    // Save the message to MongoDB
    try {
      const newMessage = new Message({ sender, receiver, message });
      await newMessage.save();
    } catch (err) {
      console.log("error in sending msg", err);
    }
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(5000, () => {
  console.log("app is working");
});
