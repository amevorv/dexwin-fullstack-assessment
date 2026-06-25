const PRIORITY = {
  1: { label: 'High', cls: 'high' },
  2: { label: 'Medium', cls: 'medium' },
  3: { label: 'Low', cls: 'low' },
};

export default function TaskItem({ task, onToggle }) {
  const done = task.status === 'DONE';
  const statusLabel = (task.status || '').replace('_', ' ').toLowerCase();
  const priority = task.priority &&  PRIORITY[task.priority];

  return (
    <div className={'task-card' + (done ? ' done' : '')}>
      <div className="task-main">
        <span className="task-title">{task.name}</span>
        <div className="task-meta">
          <span className={'status-badge status-' + (task.status || '').toLowerCase()}>
            {statusLabel}
          </span>
          {task.priority !== null && (
            <span className={'priority-pill' + (priority ? ' priority-' + priority.cls : '')}>
              {priority ? priority.label : 'P' + task.priority}
            </span>
          )}
          {task.assignee && <span className="assignee-chip">{task.assignee?.username}</span>}
        </div>
      </div>
      <button className="toggle-btn" onClick={() => onToggle(task)}>
        {done ? 'Reopen' : 'Complete'}
      </button>
    </div>
  );
}
