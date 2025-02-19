import jwt from "jsonwebtoken";

const hardCodedUsername = "naval.ravikant";
const hardCodedPassword = "05111974";
const login = (req, res) => {
  const { username, password } = req.body;

  if (username === hardCodedUsername && password === hardCodedPassword) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "2h",
    });
    return res.status(200).json({ authToken: token });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
};
export default login;
