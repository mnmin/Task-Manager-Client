import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UserForm = ({ handleSubmit, handleChange }) => {
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <TextField
        // autoFocus
        className="user-form-input"
        label="First Name"
        variant="outlined"
        name="firstName"
        onChange={handleChange}
        required
      />
      <TextField
        className="user-form-input"
        label="Last Name"
        variant="outlined"
        name="lastName"
        onChange={handleChange}
        required
      />
      <TextField
        className="user-form-input"
        type="email"
        label="Email"
        variant="outlined"
        name="email"
        onChange={handleChange}
        required
      />
      <TextField
        className="user-form-input"
        type="password"
        label="Password"
        variant="outlined"
        name="password"
        onChange={handleChange}
        required
      />
      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
