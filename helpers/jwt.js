const jwt = require("jsonwebtoken");
const secretKey = "2021";

const tokenGenerator = (user) => {
  console.log(user, "--user");
  const { email, role, id } = user;

  return jwt.sign(
    {
      email,
      role,
      id
    },
    secretKey
  );
};

const tokenVerifier = (access_token) => {
  return jwt.verify(access_token, secretKey);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
