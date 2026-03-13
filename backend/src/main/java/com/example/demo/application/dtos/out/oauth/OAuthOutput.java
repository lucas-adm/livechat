package com.example.demo.application.dtos.out.oauth;

import com.example.demo.application.dtos.out.oauth.github.GitHubUserData;
import com.example.demo.application.dtos.out.oauth.randomuser.RandomUserData;

public record OAuthOutput(
        String id,
        String avatar,
        String username,
        String displayName,
        String bio
) {

    public OAuthOutput(GitHubUserData data) {
        this(
                data.id(),
                data.avatar(),
                data.username(),
                data.displayName(),
                data.bio()
        );
    }

    public OAuthOutput(RandomUserData data) {
        this(
                data.login().id(),
                data.picture().avatar(),
                data.login().username(),
                data.name().toDisplayName(data.name()),
                null
        );
    }

}