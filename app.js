const moment = require("moment");

const express = require("express");
const mysql = require("mysql");
const app = express();
const db = require("./dbServer");

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

const bcrypt = require("bcrypt");
app.use(express.json());
//middleware to read req.body.<params>

//CREATE USER
app.post("/signup", async (req, res) => {
  console.log(req);
  const user = req.body.firstName;
  const email = req.body.email;
  const lastName = req.body.lastName;
  const countryId = req.body.countryId;
  const organization = req.body.organisation;

  let date = new Date();
  date =
    date.getUTCFullYear() +
    "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getUTCDate()).slice(-2) +
    " " +
    ("00" + date.getUTCHours()).slice(-2) +
    ":" +
    ("00" + date.getUTCMinutes()).slice(-2) +
    ":" +
    ("00" + date.getUTCSeconds()).slice(-2);
  const createdAt = date;
  const updatedAt = date;

  const hashedPassword = req.body.password;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM userTable WHERE email = ?";
    const search_query = mysql.format(sqlSearch, [email]);
    // const idQuery = "SELECT COUNT(*) FROM userTable";
    // const id = await connection.query(idQuery, (err, res)=>{
    //     if(err) throw err;
    //     console.log('##########',res[0]);
    //     return res+1;
    // });
    const id = Math.floor(Math.random() * 100);
    console.log(id);
    const sqlInsert = "INSERT INTO userTable VALUES (?,?,?,?,?,?,?,?)";
    const insert_query = mysql.format(sqlInsert, [
      id,
      email,
      hashedPassword,
      user,
      lastName,
      createdAt,
      updatedAt,
      1,
    ]);
    // ? will be replaced by values
    // ?? will be replaced by string
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      if (result.length != 0) {
        connection.release();
        console.log("------> User already exists");
        res.json({
          status: 409,
          statusText: "FAIL",
          message: "User already exist",
        });
      } else {
        await connection.query(insert_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("--------> Created new User");
          console.log(result.insertId);
          res.sendStatus(201);
        });
      }
    });
  });
});

// module.exports = app;
