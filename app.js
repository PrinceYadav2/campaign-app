const express = require("express");
const usersRouter = require("./routes/usersRoutes");
const organizationRouter = require("./routes/organizationRoutes");
const countryRouter = require("./routes/countryRoutes");

const app = express();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

app.use(express.json());
const nameSpace = '/api/v1';
app.use(nameSpace+"/users/", usersRouter);
app.use(nameSpace+"/organization", organizationRouter);
app.use(nameSpace+"/countries", countryRouter);

const bcrypt = require("bcrypt");

//middleware to read req.body.<params>

//CREATE USER

// module.exports = app;
