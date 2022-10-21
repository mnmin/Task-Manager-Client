import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UserForm = ({ handleSubmit, handleChange }) => {
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="user-form-inputs">
        <div className="user-inputs">
          <TextField
            className="user-form-input"
            label="First Name"
            variant="outlined"
            name="first_name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="user-inputs">
          <TextField
            className="user-form-input"
            label="Last Name"
            variant="outlined"
            name="last_name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="user-inputs">
          <TextField
            className="user-form-input"
            type="email"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="user-inputs">
          <TextField
            className="user-form-input"
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
