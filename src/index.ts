import app from './server';

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`Travel assistant server listening on port ${port}`);
});
