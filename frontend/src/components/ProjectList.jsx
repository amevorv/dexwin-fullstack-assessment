import { useEffect, useState } from 'react';
import { getProjects } from '../api/client.js';

export default function ProjectList({ selectedProjectId, onSelect }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getProjects()
      .then((data) => {
        if (active) {
          setProjects(Array.isArray(data) ? data : []);
          setError('');
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Unable to load projects');
          setProjects([]);
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
  }, []);

  if (loading) {
    return <div className="empty-state">Loading projects…</div>;
  }

  if (error) {
    return <div className="empty-state">{error}</div>;
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <button
          type="button"
          id={`button-${project.id}`}
          aria-label={`Select project ${project.name}`}
          key={project.id}
          className={
            'project-item' + (project.id === selectedProjectId ? ' active' : '')
          }
          onClick={() => onSelect(project.id)}
        >
          <span className="project-name">{project.name}</span>
          {project.description && (
            <span className="project-desc">{project.description}</span>
          )}
        </button>
      ))}
    </div>
  );
}
