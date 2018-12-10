import bodyParser from 'body-parser';
import express from 'express';
import paginate from 'express-paginate';
import fs from 'fs';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import config from '../config/database';
import routes from './routes/index';

mongoose.connect(config.database, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
const database = mongoose.connection;

// Check connection
database.once('open', () => {
  console.log('Connected to MongoDB');
});

// Check for DB errors
database.on('error', (err) => {
  console.error(err);
});

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(paginate.middleware(10, 20));
app.use('/files', express.static('files'));
app.use(routes);
app.use((req, res) => {
  res.status(404).json({ message: 'Can\'t find that' });
});

const dirname = path.join(path.resolve('./'));
const logStream = fs.createWriteStream(path.join(dirname, 'morgan-logs.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
