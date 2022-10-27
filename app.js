const express = require("express");
const usersRouter = require('./routes/usersRoutes');

const app = express();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

app.use(express.json());
app.use('/api/v1/users/', usersRouter);

const bcrypt = require("bcrypt");

//middleware to read req.body.<params>

//CREATE USER


// module.exports = app;
