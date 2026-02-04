package com.backend.to_do.task;

import com.backend.to_do.users.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity //creates the Task table
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taskId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable=false)
    //creates user_id column, with foreign key to users.id
    private Users user;

    private String task;
    private Boolean completed;

  
}
