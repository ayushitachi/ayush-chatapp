import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://chatapp-backend-7sdr.onrender.com";
//http://localhost:5000
//chatapp-backend-7sdr.onrender.com

export const socket = io(URL, {
  autoConnect: false,
});
