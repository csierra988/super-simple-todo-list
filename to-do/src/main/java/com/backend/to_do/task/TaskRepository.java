package com.backend.to_do.task;

import org.springframework.data.repository.CrudRepository;
import java.util.List;
import com.backend.to_do.users.Users;


public interface TaskRepository extends CrudRepository<Task, Integer>{
    List<Task> findAllByUser(Users user);
}
