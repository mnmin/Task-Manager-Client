import { useState, useEffect } from "react";
import client from "../../utils/client";
import "./style.css";
import jwt_decode from "jwt-decode";
import { renderTasks } from "./utils/getAllTasks";
import TaskItem from "./TaskItem";
import { Alert } from "@mui/material";

const TasksPage = () => {
  const [task, setTask] = useState({ content: "" });
  const [taskResponse, setTaskResponse] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskError, setTaskError] = useState(false);

  // CHANGE THIS ONE
  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);
    if (!token) {
      return;
    }

    const decoded = jwt_decode(token);
    let id = decoded.userId;
    console.log("TASKPAGE TOKEN", token, id);

    client.get(`/user/${id}`).catch((err) => console.error("user error", err));
    renderTasks(setTasks);
    console.log("TASKPAGE tasks", tasks);
    setTask({ ...task });
    // eslint-disable-next-line
  }, [taskResponse]);

  //  CREATE TASK FUCTION

  return (
    <>
      <section className="tasks-section">
        {taskError && <Alert severity="error">Must provide content</Alert>}

        {/* <p>Status: success</p> */}

        {tasks?.length > 0 ? (
          <ul className="tasks-list">
            {tasks?.map((task, index) => (
              <TaskItem
                task={task}
                key={index}
                setTask={setTask}
                setTaskResponse={setTaskResponse}
              />
            ))}
          </ul>
        ) : (
          <p className="no-tasks-message">There are no tasks at the moment.</p>
        )}
      </section>
    </>
  );
};

export default TasksPage;
