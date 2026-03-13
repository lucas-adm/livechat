package com.example.demo.application.controllers.user;

import com.example.demo.application.dtos.in.oauth.github.CodeInput;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserPresenceService;
import com.example.demo.domain.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService service;
    private final UserPresenceService presenceService;

    @GetMapping
    public List<User> fetchUsers() {
        return service.getAll();
    }

    @GetMapping("/online")
    public Set<String> fetchOnlineUsersIds() {
        return presenceService.getOnlineIds();
    }

    @GetMapping("/random")
    public User loginViaRandomUser() {
        return service.authViaRandomUser();
    }

    @PostMapping("/github")
    public User loginViaGitHub(@RequestBody CodeInput input) {
        return service.authViaGitHub(input.code());
    }

}