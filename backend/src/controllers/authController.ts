const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashedPassword = bcrypt.hashSync(process.env["TEMP_ADMIN_PASSWORD"], 10);

export const Login = async (req: any, res: any) => {
  try {
    const { password } = req.body;

    const isMatch = bcrypt.compareSync(password, hashedPassword);

    /*
      const query = "SELECT * FROM users WHERE password = $1 LIMIT 1";
      const values = [password];
      const result = await client.query(query, values);
      */

    if (isMatch) {
      const token = jwt.sign({ role: "admin" }, process.env["JWT_SECRET"], {
        expiresIn: "1h",
      });
      res.status(200).json({ name: "vic", token });
    } else {
      res.status(401).json({ error: "密碼錯誤" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
