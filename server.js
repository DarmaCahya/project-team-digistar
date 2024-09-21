const express = require('express');
const cors = require('cors');
const mongodb = require('./database/mongodb/db');

require('dotenv').config();

const bundleRoutes = require('./routes/bundleRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

mongodb.connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api/products', productRoutes);
app.use('/api/bundles', bundleRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
