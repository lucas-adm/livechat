package com.example.demo.application.dtos.out.oauth.randomuser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Name(
        String first,
        String last
) {
    public String toDisplayName(Name name) {
        return String.format("%s %s", name.first, name.last);
    }
}