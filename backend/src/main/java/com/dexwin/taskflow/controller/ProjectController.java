package com.dexwin.taskflow.controller;

import com.dexwin.taskflow.entity.Project;
import com.dexwin.taskflow.repository.ProjectRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public Project getById(@PathVariable Long id) {
        return projectRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Project not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Project create(@Valid @RequestBody Project project) {
        return projectRepository.save(project);
    }
}
