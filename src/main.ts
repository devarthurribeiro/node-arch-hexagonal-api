import dotenv from 'dotenv';
dotenv.config();

import { App } from "./App";


const app = new App();


app.start(Number(process.env.PORT));