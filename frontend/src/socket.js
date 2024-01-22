import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:5000";
//http://localhost:5000
//chatapp-backend-7sdr.onrender.com

export const socket = io(URL, {
  autoConnect: false,
});
