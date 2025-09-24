import dotenv from 'dotenv';
import app from './app.js';

// Load env variables
dotenv.config();

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
