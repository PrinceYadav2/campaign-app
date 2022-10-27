const mysql = require("mysql");

const Helper = require('../helpers/helpers');
const Response = require('../response/response')
const db = require("../dbServer");

const helper = new Helper();
const response = new Response();

exports.createUser = async (req, res) => {
    const userDetails = { 
        user : req.body.firstName,
        email : req.body.email,
        lastName : req.body.lastName,
        countryId : req.body.countryId,
        organization : req.body.organisation,
        date : helper.getCurrentDate()
    }
  
    const hashedPassword = req.body.password;
    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = "SELECT * FROM userTable WHERE email = ?";
      const search_query = mysql.format(sqlSearch, [userDetails.email]);
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
        userDetails.email,
        hashedPassword,
        userDetails.user,
        userDetails.lastName,
        userDetails.date,
        userDetails.date,
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
          const resp = response.generateResponse(409, "FAIL", "USER ALREADY EXIST");
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
            const data = {
                id,
                email: userDetails.email,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                role: "ADMIN",
                mobile: "9354864550",
                countryId: 2,
                organizationId: 2,
                createdAt: userDetails.date,
                updatedAt: userDetails.date,
                confirmed: true,
                organization: {
                    id: 2,
                    uid: "OSM2",
                    name: "Osmosys",
                    createdAt: "2021-12-07"
                },
                country: {
                    id: 2,
                    countryName: "India",
                    countryCode: "IND",
                    phoneCode: "+91"
                }
            }
            const resp = response.generateResponse(201,"SUCCESS",data);
            res.json(resp)
          });
        }
      });
    });
  }