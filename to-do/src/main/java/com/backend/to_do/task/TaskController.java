package com.backend.to_do.task;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RequestMapping("/api/task")
@RestController
@RequiredArgsConstructor
public class TaskController {
    private final TaskService service;
    

    @PostMapping("/add")
    public ResponseEntity<Task> addTask(@RequestBody TaskRequest request) {
        return ResponseEntity.ok(service.add(request));
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTasks() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> completeTask(@PathVariable Integer id, @RequestBody TaskRequest request) {
        return ResponseEntity.ok(service.complete(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
