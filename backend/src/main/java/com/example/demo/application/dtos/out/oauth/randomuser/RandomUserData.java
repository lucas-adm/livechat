package com.example.demo.application.dtos.out.oauth.randomuser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RandomUserData(
        Login login,
        Name name,
        Picture picture,
        String email
) {
}
