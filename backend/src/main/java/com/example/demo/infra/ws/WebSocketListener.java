package com.example.demo.infra.ws;

import com.example.demo.application.dtos.in.chat.PresenceInput;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserPresenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import tools.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class WebSocketListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;
    private final UserPresenceService presence;

    @EventListener
    public void handleConnect(SessionConnectEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = sha.getSessionId();
        String uJson = sha.getFirstNativeHeader("user");
        if (uJson == null || uJson.isBlank()) return;
        User user = objectMapper.readValue(uJson, User.class);
        presence.add(sessionId, user);
        messagingTemplate.convertAndSend("/topics/presence", new PresenceInput(user, true));
    }

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        User user = presence.remove(sessionId);
        if (user == null) return;
        messagingTemplate.convertAndSend("/topics/presence", new PresenceInput(user, false));
    }

}