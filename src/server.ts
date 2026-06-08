import express from 'express';
import whatsappRouter from './routes/whatsapp';
import healthRouter from './routes/health';
import remindersRouter from './routes/reminders';
import briefingsRouter from './routes/briefings';
import bookingsRouter from './routes/bookings';
import notificationsRouter from './routes/notifications';
import schedulerRouter from './routes/scheduler';

const app = express();
app.use(express.json());

app.use('/webhook', whatsappRouter);
app.use('/reminders', remindersRouter);
app.use('/briefings', briefingsRouter);
app.use('/bookings', bookingsRouter);
app.use('/notifications', notificationsRouter);
app.use('/scheduler', schedulerRouter);
app.use('/health', healthRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
