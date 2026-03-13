package com.example.demo.application.dtos.out.oauth.randomuser;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Picture(
        @JsonProperty("large") String avatar
) {
}