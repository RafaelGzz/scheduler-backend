import express from 'express';
import cors from 'cors';
import { connect } from './includes/database.js';

import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import nurseRouter from './routes/nurse.js';
import ptoRouter from './routes/pto.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter)
app.use('/api/nurse', nurseRouter)
app.use('/api/pto', ptoRouter)
    // Database
connect();

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})