import client from "../../../utils/client";

export const editTask = async (
  setResponse,
  taskId,
  taskName,
  taskDescription,
  topics,
  linksUrl,
  status,
  priority
) => {
  console.log(
    "EDITTASK --------------->",
    setResponse,
    taskId,
    taskName,
    taskDescription,
    topics,
    linksUrl,
    status,
    priority
  );
  try {
    const { data } = await client.patch(`/task/${taskId}`, {
      taskName,
      taskDescription,
      linksUrl,
      topics,
      status,
      priority,
    });
    setResponse(data);
    return;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};
