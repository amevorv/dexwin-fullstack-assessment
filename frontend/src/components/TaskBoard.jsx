import { useEffect, useState } from 'react';
import { getTasks, updateTaskStatus } from '../api/client.js';
import TaskItem from './TaskItem.jsx';

export default function TaskBoard({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    setLoading(true);
    getTasks(projectId)
      .then((data) => {
        if (active) {
          setTasks(Array.isArray(data) ? data : []);
          setError('');
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load tasks');
          setTasks([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [projectId]);

  const handleToggle = async (task) => {
    const next = task.status === 'DONE' ? 'TODO' : 'DONE';
    setTasks((currentTasks) =>
      currentTasks.map((item) => (item.id === task.id ? { ...item, status: next } : item))
    );

    try {
      await updateTaskStatus(task.id, next);
    } catch (err) {
      setError(err.message || 'Unable to update task');
      setTasks((currentTasks) =>
        currentTasks.map((item) => (item.id === task.id ? { ...item, status: task.status } : item))
      );
    }
  };

  return (
    <div>
      <div className="board-header">
        <h2>Tasks</h2>
        <span className="task-count">{tasks.length}</span>
      </div>
      {loading ? (
        <div className="empty-state">Loading tasks…</div>
      ) : error ? (
        <div className="empty-state">{error}</div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={handleToggle} />
          ))}
        </div>
      )}
    </div>
  );
}
