package com.example.demo.domain.message;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "messages")
@Data
public class Message {

    @Id
    private String id;
    private String clientId;
    private String creator;
    private String content;
    @CreatedDate
    private Instant createdAt;
    private Instant updatedAt;
    private Boolean updated;
    private Boolean read;
    private Boolean deleted;

    public static Message create(String clientId, String creator, String content) {
        Message message = new Message();
        message.clientId = clientId;
        message.creator = creator;
        message.content = content;
        message.updated = false;
        message.read = false;
        message.deleted = false;
        return message;
    }

}