const { ADMIN } = require("../mongodb/admin.model");
const { adminconnection } = require("../sql/admin.connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.JWT_SECRET_KEY;

async function adminLogin(req, res) {
  const { admin_email, password } = req.body;
  const adminconnectionPromise = adminconnection.promise();
  try {
    let query = `SELECT * FROM admin WHERE admin_email = ?`;
    let [user] = await adminconnectionPromise.query(query, [admin_email]);
    if (user && user.password === password) {
      const token = jwt.sign(
        {
          admin_email: admin_email,
          id: user._id,
        },
        key,
        { expiresIn: "1h" }
      );
      return res.send({ Message: token });
    } else {
      return res.status(401).send("Unathorized");
    }
  } catch (e) {
    console.error("Error", e);
    return res.status(500).send("Internel Server Error");
  }
}

module.exports = { adminLogin };
