import "reflect-metadata";
import { ApplicationEnvironment, ApplicationJWTSecret } from "@settings/index";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

import { router } from "./routes";

dotenv.config();

if (!ApplicationEnvironment.Port || !ApplicationJWTSecret.Secret) {
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export { app };
