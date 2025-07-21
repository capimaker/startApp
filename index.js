require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./config/config');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
//const swaggerUI = require('swagger-ui-express');
//const docs = require('./docs/index');

dbConnection();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ENDPOINTS

app.use('/users', require('./routes/users'));

// SERVER
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
