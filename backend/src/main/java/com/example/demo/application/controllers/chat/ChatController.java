package com.example.demo.application.controllers.chat;

import com.example.demo.application.dtos.in.chat.*;
import com.example.demo.application.dtos.out.chat.TypingOutput;
import com.example.demo.application.dtos.out.message.MessageOutput;
import com.example.demo.domain.message.MessageService;
import com.example.demo.domain.user.UserPresenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final MessageService service;
    private final UserPresenceService presence;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/typing")
    @SendTo("/topics/typing")
    public TypingOutput type(TypingInput input) {
        return new TypingOutput(input.user(), input.typing());
    }

    @MessageMapping("/msg")
    @SendTo("/topics/msg")
    public MessageOutput create(MessageInput input) {
        return service.create(input.user(), input.clientId(), input.content());
    }

    @MessageMapping("/read")
    @SendTo("/topics/read")
    public MessageOutput read(ReadInput input) {
        return service.read(input.id());
    }

    @MessageMapping("/update")
    @SendTo("/topics/update")
    public MessageOutput updated(UpdateInput input) {
        return service.update(input.id(), input.content());
    }

    @MessageMapping("/delete")
    @SendTo("/topics/delete")
    public MessageOutput deleted(DeleteInput input) {
        return service.delete(input.id());
    }

}