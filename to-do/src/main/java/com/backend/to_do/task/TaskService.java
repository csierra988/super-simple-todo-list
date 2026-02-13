package com.backend.to_do.task;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.backend.to_do.users.Users;
import com.backend.to_do.users.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository repository;
    private final UsersRepository usersRepository;

    private Users currentUser() {
        String username = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();
        
        Users user = usersRepository.findByUsername(username)
            .orElseThrow();
        
        return user;
    }

    public Task add(TaskRequest request) {
        Users user = currentUser();

        Task task = Task.builder()
            .task(request.getTask())
            .user(user)
            .completed(false)
            .build();

        return repository.save(task);
    }

    public List<Task> getAll() {
        Users user = currentUser();
        return repository.findAllByUser(user);
    }

    public Task complete(Integer id, TaskRequest request) {
        Users user = currentUser();
        
        Task task = repository.findByTaskIdAndUser(id, user)
            .orElseThrow();
        
        if (request.getCompleted() == null) {
            throw new RuntimeException("missing completion");
        }
        task.setCompleted(request.getCompleted());
        return repository.save(task);
    }

    public void delete(Integer id) {
        Users user = currentUser();
        
        Task task = repository.findByTaskIdAndUser(id, user)
            .orElseThrow();

        repository.delete(task);
    }
}
