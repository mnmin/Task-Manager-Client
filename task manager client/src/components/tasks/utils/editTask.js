import client from '../../../utils/client';

export const editTask = async (setResponse, taskId, taskName, taskDescription, linksUrl) => {
  console.log("EDITTASK --------------->", setResponse, taskId, taskName, taskDescription, linksUrl)
  try {
    const { data } = await client.patch(`/task/${taskId}`, { taskName, taskDescription, linksUrl });
    setResponse(data);
    return;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};
