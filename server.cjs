const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const port = Number.parseInt(process.env.PORT || "3000", 10);
const dev = !process.argv.includes("--prod");
const hostname = "0.0.0.0";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => handle(req, res));
  const io = new Server(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  const emitActiveSessions = () => {
    io.emit("active-sessions:update", io.of("/").sockets.size);
  };

  io.on("connection", (socket) => {
    socket.emit("active-sessions:update", io.of("/").sockets.size);
    emitActiveSessions();

    socket.on("disconnect", () => {
      emitActiveSessions();
    });
  });

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
