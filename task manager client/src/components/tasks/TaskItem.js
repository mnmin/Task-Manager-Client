import { Button, TextField, ClickAwayListener } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { deleteTask } from "./utils/deleteTask";
import { editTask } from "./utils/editTask";
import { useNavigate } from "react-router-dom";
import { useLoggedInUser } from "../../context/LoggedInUser";

import { blue, yellow } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormUpdateTaskDialog } from "./utils/editTaskPanel";

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[900],
      contrastText: blue[500],
    },
  },
});

const TaskItem = ({ task, setTaskResponse }) => {
  const [isOwner, setIsOwner] = useState(true);
  const [isPrivate, setIsPrivate] = useState(task.isPrivate);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskLinksUrl, setEditTaskLinksUrl] = useState("");
  const [editError, setEditError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TaskItem", task);
    setIsOwner(true);
    resetDelBtn();
    resetEditBtn();
  }, [task, user.id]);

  const resetDelBtn = () => {
    setIsDeleting(false);
  };

  const resetEditBtn = () => {
    setIsEditing(false);
  };

  const handleEditTask = async () => {
    const res = await editTask(
      setTaskResponse,
      task.id,
      editTaskName,
      editTaskDescription,
      editTaskLinksUrl
    );
    if (res?.status === "fail") {
      return setEditError(res.message);
    }
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    if (!isDeleting) {
      setIsDeleting(true);
    } else {
      deleteTask(setTaskResponse, task.id);
      setIsDeleting(false);
    }
  };

  let liClasses = "task-item";

  const handleEdit = () => {
    setOpenDialog(true);
    console.log("HANDLE EDIT -------------------->", openDialog, task);
  };

  const TryAgain = () => {
    try {
      return editError;
    } finally {
      setTimeout(() => {
        setEditError("");
      }, 3000);
    }
  };

  return (
    <li className={liClasses}>
      <div className="task-wrap">
        <div className="task-header-wrap">
          <div className="task-profile-wrap">
            <h3 className={"task-owner-name"}>
              <div>
                <p className="task-id">Task # {task.id}</p>
              </div>
            </h3>
          </div>
        </div>
        {editError && (
          <div style={{ textAlign: "left", color: "red" }}>
            <TryAgain />
          </div>
        )}
        {isEditing ? (
          <>
            <div className="edit-content-wrap">
              <TextField
                autoFocus
                fullWidth
                value={task.taskName}
                variant="outlined"
                size="small"
                inputProps={{ maxLength: 50 }}
                onChange={(e) => setEditTaskName(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                value={task.taskDescription}
                variant="outlined"
                size="small"
                multiline
                inputProps={{ maxLength: 150 }}
                onChange={(e) => setEditTaskDescription(e.target.value)}
              ></TextField>
              <TextField
                fullWidth
                value={task.linksUrl}
                variant="outlined"
                size="small"
                multiline
                inputProps={{ maxLength: 150 }}
                onChange={(e) => setEditTaskLinksUrl(e.target.value)}
              ></TextField>
              <Button
                className="submit-edited-task" //setOpenDialog
                onClick={handleEditTask}
              >
                <ArrowUpwardIcon />
              </Button>
              <Button
                className="cancel-edit"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <ClearIcon />
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="task-content">{task.taskName}</p>
            <p className="task-content">{task.taskDescription}</p>
            <p className="task-content">{task.linksUrl}</p>
          </>
        )}
        {/* <p className="task-content">{task.taskDescription}</p> */}
        <div className="comment-nav-wrap">
          {isOwner && (
            <div className="edit-button-form-wrap">
              <FormUpdateTaskDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                setTaskResponse={setTaskResponse}
                setEditError={setEditError}
                task={task}
              ></FormUpdateTaskDialog>
              {!isEditing && (
                <Button
                  className="edit-button-icon"
                  //onClick={() => setIsEditing(true)}
                  //onClick={() => {setOpenDialog(true)}}
                  onClick={handleEdit}
                >
                  <EditIcon />
                </Button>
              )}
            </div>
          )}
          {isOwner && (
            <div className="delete-button">
              <ClickAwayListener onClickAway={resetDelBtn}>
                <Button
                  className="delete-button-icon"
                  color={`${isDeleting ? "error" : "info"}`}
                  onClick={handleDeleteTask}
                >
                  <DeleteIcon />
                </Button>
              </ClickAwayListener>
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
