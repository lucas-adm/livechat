package com.example.demo.oauths;

import com.example.demo.application.dtos.out.oauth.OAuthOutput;
import org.springframework.stereotype.Service;

@Service
public interface OAuthService {

    public OAuthOutput getUser(String key);

}