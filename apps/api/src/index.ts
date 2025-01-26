import { createServer } from "./server";
import { log } from "@dropbox/logger";
import express from "express";
import { join } from "path";
import syncDatabase from "./config/sync-db.config";
import { router } from "./routes/files.route";
import { connectDatabase } from "./db/postgres";
import { errorHandler } from "./middlewares/error-handler";

const port = process.env.PORT || 3001;
const server = createServer();
connectDatabase();
syncDatabase();
server.use("/api", router);
const clientPath = join(__dirname, "../..", "client", "dist");
server.use(express.static(clientPath));

server.get("*", (req, res) => {
  res.sendFile(join(clientPath, "index.html"));
});
server.use(errorHandler);
server.listen(port, () => {
  log(`API running on http://localhost:${port}`);
});
