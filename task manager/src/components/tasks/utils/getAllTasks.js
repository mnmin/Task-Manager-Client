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
