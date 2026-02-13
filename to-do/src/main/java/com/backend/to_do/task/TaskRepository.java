package com.backend.to_do.task;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

import com.backend.to_do.users.Users;


public interface TaskRepository extends JpaRepository<Task, Integer>{
    List<Task> findAllByUser(Users user);

    Optional<Task> findByTaskIdAndUser(Integer taskId, Users user);
}
