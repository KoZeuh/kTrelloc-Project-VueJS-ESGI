import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';


import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import boardRoutes from './routes/boardRoutes';
import boardListRoutes from './routes/boardListRoutes';
import cardRoutes from './routes/cardRoutes';
import tagRoutes from './routes/tagRoutes';
import checklistRoutes from './routes/checklistRoutes';

const app: Application = express();

dotenv.config();


app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/board/list', boardListRoutes);
app.use('/api/board/card', cardRoutes);
app.use('/api/board/tag', tagRoutes);
app.use('/api/board/checklist', checklistRoutes);

export default app;
