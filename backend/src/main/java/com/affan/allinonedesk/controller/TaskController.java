package com.affan.allinonedesk.controller;

import com.affan.allinonedesk.model.Task;
import com.affan.allinonedesk.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository repo;

    @GetMapping
    public List<Task> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return repo.save(task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task updatedTask) {
        return repo.findById(id)
                .map(task -> {
                    task.setTitle(updatedTask.getTitle());
                    task.setDueDate(updatedTask.getDueDate());
                    task.setCompleted(updatedTask.isCompleted());
                    return repo.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }
}
