import 'reflect-metadata';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { ApplicationEnvironment } from '@settings/index';
import { router } from './routes';

dotenv.config();

if(!ApplicationEnvironment.Port) {
    process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export { app };

