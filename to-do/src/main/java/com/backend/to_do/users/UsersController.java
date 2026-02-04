package com.backend.to_do.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;


@Controller
@RequestMapping(path="/users")
public class UsersController {
    
    @Autowired
    private UsersRepository userRepository;
    
    @PostMapping(path="/add")
    public @ResponseBody void addNewUser(@RequestParam String name, @RequestParam String username) {
        Users test = new Users();
        test.setName(name);
        test.setUsername(username);
        userRepository.save(test);
        System.out.println("user added and saved");
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Users> getAllUsers() {
        //returns a JSON or XML with the users
        return userRepository.findAll();
    }
}
