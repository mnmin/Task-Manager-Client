const constants = {
  token: process.env.REACT_APP_USER_TOKEN,
  user: {
    permittedProperties: ["first_name", "last_name", "email", "password"],
  },
  post: {
    permittedProperties: ["content"],
  },
};

export default constants;
