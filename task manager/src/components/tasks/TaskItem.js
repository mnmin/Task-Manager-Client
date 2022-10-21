import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoggedInUser } from "../../context/LoggedInUser";
import { grey, yellow } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[900],
      contrastText: grey[100],
    },
  },
});
const TaskItem = ({ task, setTaskResponse }) => {
  const [isOwner, setIsOwner] = useState(true);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  //   const [editTaskContent, setEditTaskContent] = useState("");
  //   const [editError, setEditError] = useState("");

  const { user } = useLoggedInUser();
  //   const navigate = useNavigate();

  useEffect(() => {
    console.log("TaskItem", task);
    setIsOwner(true);
  }, [task, user.id]);

  const handleDeleteTask = () => {
    if (!isDeleting) {
      setIsDeleting(true);
    } else {
      setIsDeleting(false);
    }
  };

  let liClasses = "task-item";

  return (
    <li className={liClasses}>
      <div className="task-wrap">
        <div className="task-header-wrap">
          <div className="task-profile-wrap">
            <h3 className={"task-owner-name"}>
              <div>
                {task.id} {task.linksUrl} {task.taskName}
              </div>
            </h3>
          </div>
        </div>
        <p className="task-content">{task.taskDescription}</p>
        <div className="comment-nav-wrap">
          {isOwner && (
            <div className="edit-button-form-wrap">
              {!isEditing && (
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    className="edit-button-icon"
                    onClick={() => setIsEditing(false)}
                  >
                    {" "}
                    Edit
                    {/* <EditIcon /> */}
                  </Button>
                </ThemeProvider>
              )}
            </div>
          )}
          {isOwner && (
            <div className="delete-button">
              {isDeleting && (
                <Button variant="text" color="error" onClick={handleDeleteTask}>
                  confirm delete?
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
