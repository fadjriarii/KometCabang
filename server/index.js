import app from './app.js';

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`[KOMET Backend] Express.js server running on port ${PORT}`);
});
