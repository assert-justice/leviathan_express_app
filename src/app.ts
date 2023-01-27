import express from 'express';
import locationRouter from './api/locations/location.router';
import instanceRouter from './api/instances/instance.router';
import wordRouter from './api/words/word.router';
const app = express();
export default app;

app.use('/locations', locationRouter);
app.use('/instances', instanceRouter);
app.use('/words', wordRouter);
