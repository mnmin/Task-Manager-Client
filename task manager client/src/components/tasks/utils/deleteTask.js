import client from '../../../utils/client';

export function deleteTask(setTaskResponse, taskId) {
  client
    .delete(`/task/${taskId}`)
    .then(res => {
      setTaskResponse(res.data);
    })
    .catch(err => console.error('Unable to delete task', err.response));
}
