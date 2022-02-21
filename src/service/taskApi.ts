import api from '@/service/api';
import Task from '@/interfaces/task.interface';
import Activity from '@/interfaces/activity.interface';

const ApiUrl = {
  task: '/tasks',
  activity: '/activities',
};

export async function getTasks() {
  try {
    const response = await api.get(ApiUrl.task);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function addTask(task: Task) {
  try {
    await api.post(ApiUrl.task, task);
  } catch (error) {
    console.error(error);
  }
}

export async function changeTask(index: string, task: Task) {
  try {
    await api.put(`${ApiUrl.task}/${index}`, task);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTask(index: string) {
  try {
    await api.delete(`${ApiUrl.task}/${index}`);
  } catch (error) {
    console.error(error);
  }
}

export function getActivities() {
  return api
    .get(ApiUrl.activity)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function addActivity(activity: Activity) {
  api
    .post(ApiUrl.activity, activity)
    .then((res) => {
      res;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteActivity(index: string) {
  api
    .delete(`${ApiUrl.activity}/${index}`)
    .then((res) => {
      res;
    })
    .catch((error) => {
      console.error(error);
    });
}
