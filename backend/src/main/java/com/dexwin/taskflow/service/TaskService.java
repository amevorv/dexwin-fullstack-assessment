package com.dexwin.taskflow.service;

import com.dexwin.taskflow.entity.Task;
import com.dexwin.taskflow.entity.TaskStatus;
import com.dexwin.taskflow.repository.TaskRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Map<String, Object>> getTaskSummaries(Long projectId) {
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        List<Map<String, Object>> summaries = new ArrayList<>();
        for (Task task : tasks) {
            Map<String, Object> summary = new HashMap<>();
            summary.put("id", task.getId());
            summary.put("title", task.getTitle());
            summary.put("status", task.getStatus());
            summary.put("assignee", task.getAssignee() != null ? task.getAssignee().getUsername() : null);
            summary.put("commentCount", task.getComments() != null ? task.getComments().size() : 0);
            summaries.add(summary);
        }
        return summaries;
    }

    @Transactional(readOnly = true)
    public List<Task> search(String query) {
        String jpql = "SELECT t FROM Task t WHERE lower(t.title) LIKE lower(:query)";
        return entityManager.createQuery(jpql, Task.class)
            .setParameter("query", "%" + query + "%")
            .getResultList();
    }

    @Transactional
    public Task updateStatus(Long taskId, TaskStatus status) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setStatus(status);
        return taskRepository.save(task);
    }
}
