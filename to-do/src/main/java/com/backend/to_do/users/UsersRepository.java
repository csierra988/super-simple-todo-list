package com.backend.to_do.users;

import org.springframework.data.repository.CrudRepository;
import java.util.Optional;


//auto implemented to hold user records
public interface UsersRepository extends CrudRepository<Users, Integer>{
    
    Optional<Users> findByUsername(String username);
}
