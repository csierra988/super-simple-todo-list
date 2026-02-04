package com.backend.to_do.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.to_do.config.JwtService;
import com.backend.to_do.users.Roles;
import com.backend.to_do.users.Users;
import com.backend.to_do.users.UsersRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UsersRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) {
        var user = Users.builder()
            .name(request.getName())
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Roles.USER)
            .build();
        
        repository.save(user);
        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwt)
            .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        var user = repository.findByUsername(request.getUsername())
            .orElseThrow();

        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwt)
            .build();
    }

}
