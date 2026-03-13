package com.example.demo.oauths;

import com.example.demo.application.dtos.out.oauth.OAuthOutput;
import com.example.demo.oauths.github.OAuthGitHubService;
import com.example.demo.oauths.randomuser.OAuthRandomUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuthFacade {

    private final OAuthRandomUserService randomUserService;
    private final OAuthGitHubService gitHubService;

    public OAuthOutput getRandomUser() {
        return randomUserService.getUser("key");
    }

    public OAuthOutput getGitHubUser(String code) {
        return gitHubService.getUser(code);
    }

}