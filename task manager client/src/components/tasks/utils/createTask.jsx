import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import React from 'react';
import { useState } from 'react';
import client from '../../../utils/client';
import { useLoggedInUser } from "../../../context/LoggedInUser";
import { useNavigate } from 'react-router-dom';

export const FormCreateTaskDialog = ({ openDialog, setOpenDialog }) => {
  const navigate = useNavigate();
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  const [editTaskLinksUrl, setEditTaskLinksUrl] = useState("");
  const [taskResponse, setTaskResponse] = useState("");
  const { user } = useLoggedInUser();

  const createNewTask = async (setResponse, taskName, taskDescription, linksUrl) => {
    try {
      const { data } = await client.post('/task/', { taskName, taskDescription, linksUrl, user: { id:  user.id } });
      setResponse(data);
      return;
    } catch (error) {
      console.error(error.response.data);
      return error.response.data;
    }
  };
  
  const refreshTasks = () => {
    navigate('../tasks', { replace: true });
  };

  const handleCreateTask = async () => {
    const res = await createNewTask(setTaskResponse, editTaskName, editTaskDescription, editTaskLinksUrl);
    if (res?.status === "fail") {
      console.log("Error Creating Task", res.message)
      //return setEditError(res.message);
    }
    else {
      window.location.reload(false);
      //refreshTasks();
      setOpenDialog(false);
    }
  };

  // if(showDialog) {
  //   setOpen(true)
  // }

  return (
    <div>
      {/* <Dialog open={openDialog} onClose={setOpenDialog}> */}
      <Dialog open={openDialog} scroll="body">
        <DialogTitle>Create a new Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use the following fields to create a new task
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="taskName"
            label="Task Name"
            type="taskName"
            fullWidth
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
            variant="outlined"
            size="small"
            multiline
            inputProps={{ maxLength: 150 }}
            onChange={(e) => setEditTaskLinksUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => handleCreateTask()}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
