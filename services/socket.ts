import io from "socket.io-client";

// const socket = io("http://localhost:3001", {
const socket = io("https://youchatbackend-kga1.onrender.com", {
  //   transports: ["websocket"],
});

export default socket;
