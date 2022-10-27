import client from "../../../utils/client";

async function getAllTasks() {
  try {
    const response = await client.get("/tasks");
    return response.data.data;
  } catch (err) {
    console.error("tasks error", err);
  }
}

export function renderTasks(setTasks) {
  let allTasks = [];
  getAllTasks()
    .then((response) => {
      console.log("GETALLTASKS response", response);
      allTasks = response;
      console.log("GETALLTASKS alltasks", allTasks);
      setTasks(allTasks);
    })
    .catch((err) => console.error(err));
}

async function getAllTasksByUserId(userId) {
  try {
    if (userId) {
      const response = await client.get(`/tasks/${userId}`);
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export function renderTasksByUserId(userId, setTasks) {
  let allTasks = [];
  getAllTasksByUserId(userId)
    .then((response) => {
      console.log("GETALLTASKS by USERID response", response);
      allTasks = response;
      console.log("GETALLTASKS by USERID alltasks", allTasks);
      setTasks(allTasks);
    })
    .catch((err) => console.error(err));
}

async function getAllTasksByUserIdAndPriority(userId, priorityOrder) {
  try {
    if (userId) {
      const response = await client.get(`/tasks/${userId}/priorityOrder/${priorityOrder}`);
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export function renderTasksByUserIdAndPriority(userId, priorityOrder, setTasks) {
  let allTasks = [];
  getAllTasksByUserIdAndPriority(userId, priorityOrder)
    .then((response) => {
      console.log("GETALLTASKS by USERID and PRIORITY response", response);
      allTasks = response;
      console.log("GETALLTASKS by USERID and PRIORITY alltasks", allTasks);
      setTasks(allTasks);
    })
    .catch((err) => console.error(err));
}
