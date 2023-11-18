import express from "express";
import { route } from "./router/router.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);
app.use("/api/v1/", route);
app.use("/public/avatar", express.static(path.join(__dirname, "uploads")));
app.listen(5000, () => {
  console.log("service listen on port 5000");
});
