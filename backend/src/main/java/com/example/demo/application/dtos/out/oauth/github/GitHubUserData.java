package com.example.demo.application.dtos.out.oauth.github;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GitHubUserData(
        @JsonProperty("id") String id,
        @JsonProperty("avatar_url") String avatar,
        @JsonProperty("login") String username,
        @JsonProperty("name") String displayName,
        @JsonProperty("bio") String bio
) {
}