import app from './app.js';

const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`[KOMET Backend] Express.js server running on http://${HOST}:${PORT}`);
});
