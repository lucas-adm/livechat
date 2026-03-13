package com.example.demo.domain.user;

import com.example.demo.application.dtos.out.oauth.OAuthOutput;
import com.example.demo.oauths.OAuthFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final OAuthFacade facade;

    private User saveIfNotExists(OAuthOutput data) {
        return repository.findById(data.id()).orElseGet(() -> repository.save(new User(
                data.id(),
                data.avatar(),
                data.username(),
                data.displayName(),
                data.bio()
        )));
    }

    public User authViaRandomUser() {
        OAuthOutput data = facade.getRandomUser();
        return saveIfNotExists(data);
    }

    public User authViaGitHub(String key) {
        OAuthOutput data = facade.getGitHubUser(key);
        return saveIfNotExists(data);
    }

    public List<User> getAll() {
        return repository.findAll();
    }

}