import { createServer } from "./server";
import { log } from "@repo/logger";
import routes from "./routes";
import express, { Request, Response } from "express";
import { join } from "path";


const port = process.env.PORT || 3001;
const server = createServer();

server.use("/api", routes);
server.use(express.static(join(__dirname, "../..", "client", "dist"))); 
server.listen(port, () => {
  log(`API running on http://localhost:${port}`);
});
