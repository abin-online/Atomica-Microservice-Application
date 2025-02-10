import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { initSocket } from "./socket";
import connectDb from "./database/db";
import { collabRouter } from "./route/collabRoutes";

dotenv.config();

const app = express();
const server = createServer(app);

const { PORT, CORS_ORIGIN } = process.env;

if (!PORT) {
    throw new Error("Missing required environment variable: PORT");
}

connectDb();
initSocket(server);

app.use(cors({ origin: CORS_ORIGIN || "https://atomica.live" }));
app.use(express.json());

const router = express.Router();
collabRouter(router);

app.use("/session", router);

app.get("/", (req, res) => {
    res.json("COLLABORATION SERVICE");
});


server.listen(PORT, () => {
    console.log(`Collaboration service is running at http://localhost:${PORT}`);
});
