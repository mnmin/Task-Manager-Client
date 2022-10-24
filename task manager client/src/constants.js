const constants = {
  token: process.env.REACT_APP_USER_TOKEN,
  user: {
    permittedProperties: ["email", "password"],
  },
  task: {
    permittedProperties: ["content"],
  },
};

export default constants;
