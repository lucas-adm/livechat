package com.example.demo.oauths.github;

import com.example.demo.application.dtos.out.oauth.OAuthOutput;
import com.example.demo.application.dtos.out.oauth.github.CodeOutput;
import com.example.demo.application.dtos.out.oauth.github.GitHubUserData;
import com.example.demo.oauths.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
@RequiredArgsConstructor
public class OAuthGitHubService implements OAuthService {

    @Value("${oauth.github.client.id}")
    private String ci;

    @Value("${oauth.github.client.secret}")
    private String cs;

    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper mapper;

    @Override
    public OAuthOutput getUser(String key) {

        try {

            HttpRequest codeRequest = HttpRequest.newBuilder()
                    .uri(URI.create(String.format(
                            "https://github.com/login/oauth/access_token?client_id=%s&client_secret=%s&code=%s",
                            ci, cs, key)))
                    .header("Accept", "application/json")
                    .build();
            HttpResponse<String> codeResponse = client.send(codeRequest, HttpResponse.BodyHandlers.ofString());
            CodeOutput codeData = mapper.readValue(codeResponse.body(), CodeOutput.class);

            HttpRequest userRequest = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.github.com/user"))
                    .headers(
                            "Accept", "application/json",
                            "Authorization", "Bearer " + codeData.accessToken()
                    )
                    .build();
            HttpResponse<String> userResponse = client.send(userRequest, HttpResponse.BodyHandlers.ofString());
            GitHubUserData userData = mapper.readValue(userResponse.body(), GitHubUserData.class);

            return new OAuthOutput(userData);

        } catch (Exception e) {
            throw new RuntimeException("Invalid code.");
        }

    }

}