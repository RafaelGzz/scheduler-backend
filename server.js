import express from 'express';
import cors from 'cors';
import { connect } from './includes/database.js';

import authRouter from './routes/auth.js';
import accountRouter from './routes/admin.js';
import tasksRouter from './routes/tasks.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/user', authRouter);
app.use('/api/admin', accountRouter)
app.use('/api/tasks', tasksRouter)
// Database
connect();

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})