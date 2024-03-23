require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connection = require('./config/connectionDATABASE');
const corsOptions = require('./config/corsOptions');

// Routes
const rootRoutes = require('./routes/root');
const categoryRoutes = require('./routes/categorieRoute');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const saleRoutes = require('./routes/saleRoute');
const loginRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 4000;

// Connect to database
connection();


// Middleware
app.use(express.json());
app.use(cors(
    {
      credentials: true,
      origin: 'http://localhost:3000'
    }
));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', rootRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/sales', saleRoutes);
app.use('/auth', loginRoutes);

// Handle 404
app.use("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

if(connection){
  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}