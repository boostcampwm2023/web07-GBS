import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = 3010;

const app = express();
const server = http.createServer(app);

const socket = new Server(server);
server.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
