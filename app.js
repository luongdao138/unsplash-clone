const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.on('open', () => console.log('connect to db successfully!'));

const imageRouter = require('./routes/image');

app.use('/api/v1/images', imageRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
