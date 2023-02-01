import express from 'express';
import locationRouter from './api/locations/location.router';
import instanceRouter from './api/instances/instance.router';
import resetRouter from './api/reset.router';
import cors from 'cors';

const app = express();
export default app;

app.use(cors());

app.use('/locations', locationRouter);
app.use('/instances', instanceRouter);
app.use('/reset', resetRouter);
