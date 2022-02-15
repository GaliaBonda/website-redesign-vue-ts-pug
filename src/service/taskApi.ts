import api from '@/service/api';
import Task from '@/interfaces/task.interface';

export async function getTasks() {
  try {
    const response = await api.get('/tasks');
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function addTask(task: Task) {
  try {
    await api.post('/tasks', task);
  } catch (error) {
    console.error(error);
  }
}

export async function changeTask(index: string, task: Task) {
  try {
    await api.put(`/tasks/${index}`, task);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTask(index: string) {
  try {
    await api.delete(`/tasks/${index}`);
  } catch (error) {
    console.error(error);
  }
}
