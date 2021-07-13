const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');
const userRoutes = require('./routes/user');
const commonRoutes = require('./routes/common');

const cors = require('cors');

const port = process.env.development || 4000;

db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/user', userRoutes);
app.use('/api/common', commonRoutes);

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});