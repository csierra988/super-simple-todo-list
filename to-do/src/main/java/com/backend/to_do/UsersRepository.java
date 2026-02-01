package com.backend.to_do;

import org.springframework.data.repository.CrudRepository;

//auto implemented to hold user records
public interface UsersRepository extends CrudRepository<Users, Integer>{
    
}
