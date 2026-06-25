const BASE_URL = 'http://localhost:8080/api';

async function request(path, options) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, options);
    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export function getProjects() {
  return request('/projects');
}

export function getTasks(projectId) {
  return request(`/projects/${projectId}/tasks`);
}

export function updateTaskStatus(taskId, status) {
  return request(`/tasks/${taskId}/status?status=${status}`, { method: 'PUT' });
}

export function createTask(projectId, task) {
  return request(`/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
}
