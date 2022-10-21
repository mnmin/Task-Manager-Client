import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UserForm = ({ handleSubmit, handleChange }) => {
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="user-form-fields">
        <TextField
          className="user-form-input"
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="user-form-fields">
        <TextField
          className="user-form-input"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          onChange={handleChange}
        />
      </div>
      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
