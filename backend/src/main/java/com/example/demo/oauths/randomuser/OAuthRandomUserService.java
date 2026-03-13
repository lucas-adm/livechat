package com.example.demo.oauths.randomuser;

import com.example.demo.application.dtos.out.oauth.OAuthOutput;
import com.example.demo.application.dtos.out.oauth.randomuser.ResultsOutput;
import com.example.demo.oauths.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import tools.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
@RequiredArgsConstructor
public class OAuthRandomUserService implements OAuthService {

    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper mapper;

    @Override
    public OAuthOutput getUser(String key) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://randomuser.me/api"))
                    .header("Accept", "application/json")
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            ResultsOutput resultsOutput = mapper.readValue(response.body(), ResultsOutput.class);
            return new OAuthOutput(resultsOutput.results().getFirst());
        } catch (Exception e) {
            throw new RuntimeException("Invalid code.");
        }
    }

}