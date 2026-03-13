package com.example.demo.domain.user;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
public class User {

    @Id
    private String id;
    private String avatar;
    private String username;
    private String displayName;
    private String bio;

    public User(String id, String avatar, String username, String displayName, String bio) {
        this.id = id;
        this.avatar = avatar;
        this.username = username;
        this.displayName = displayName;
        this.bio = bio;
    }

}