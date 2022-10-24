import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import React from 'react';
import { useState } from 'react';
//import client from '../../../utils/client';
import { useLoggedInUser } from "../../../context/LoggedInUser";
import { useNavigate } from 'react-router-dom';
import { editTask } from "./editTask";

export const FormUpdateTaskDialog = ({ openDialog, setOpenDialog, setTaskResponse, setEditError, task }) => {
    const navigate = useNavigate();
  const [editTaskName, setEditTaskName] = useState(task.taskName);
  const [editTaskDescription, setEditTaskDescription] = useState(task.taskDescription);
  const [editTaskLinksUrl, setEditTaskLinksUrl] = useState(task.linksUrl);
//   const [taskResponse, setTaskResponse] = useState("");
  const { user } = useLoggedInUser();

//   const createNewTask = async (setResponse, taskName, taskDescription, linksUrl) => {
//     try {
//       const { data } = await client.post('/task/', { taskName, taskDescription, linksUrl, user: { id:  user.id } });
//       setResponse(data);
//       return;
//     } catch (error) {
//       console.error(error.response.data);
//       return error.response.data;
//     }
//   };
  
  const handleEditTask = async () => {
    const res = await editTask(setTaskResponse, task.id, editTaskName, editTaskDescription, editTaskLinksUrl);
    if (res?.status === "fail") {
      return setEditError(res.message);
    }
    else {
        // window.location.reload(false);
        setOpenDialog(false);
    }
};

  return (
    <div>
      <Dialog open={openDialog} scroll="body">
        <DialogTitle>Edit Task {task.taskName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use the following fields to edit this task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            label="Task Name"
            type="taskName"
            fullWidth
            value={editTaskName}
            variant="outlined"
            size="small"
            inputProps={{ maxLength: 50 }}
            onChange={(e) => setEditTaskName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="taskDescription"
            label="Task Description"
            type="taskDescription"
            fullWidth
            value={editTaskDescription}
            variant="outlined"
            size="small"
            multiline
            inputProps={{ maxLength: 150 }}
            onChange={(e) => setEditTaskDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            id="linksUrl"
            label="Task Link URLs"
            type="linksUrl"
            fullWidth
            value={editTaskLinksUrl}
            variant="outlined"
            size="small"
            multiline
            inputProps={{ maxLength: 150 }}
            onChange={(e) => setEditTaskLinksUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => handleEditTask()}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
