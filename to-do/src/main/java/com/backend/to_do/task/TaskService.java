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

    public Task add(TaskRequest request) {
        String username = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();
        
        Users user = usersRepository.findByUsername(username)
            .orElseThrow();

        Task task = Task.builder()
            .task(request.getTask())
            .user(user)
            .completed(false)
            .build();

        return repository.save(task);
    }

    public List<Task> getAll() {
       String username = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();
        
        Users user = usersRepository.findByUsername(username)
            .orElseThrow();

        return repository.findAllByUser(user);
    }



}
