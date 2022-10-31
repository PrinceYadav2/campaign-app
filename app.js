const express = require("express");
const usersRouter = require("./routes/usersRoutes");
const organizationRouter = require("./routes/organizationRoutes");

const app = express();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

app.use(express.json());
app.use("/api/v1/users/", usersRouter);
app.use("/api/v1/organization", organizationRouter);

const bcrypt = require("bcrypt");

//middleware to read req.body.<params>

//CREATE USER

// module.exports = app;
