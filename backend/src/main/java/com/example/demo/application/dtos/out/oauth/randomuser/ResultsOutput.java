package com.example.demo.application.dtos.out.oauth.randomuser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ResultsOutput(
        List<RandomUserData> results
) {
}