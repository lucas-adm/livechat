package com.example.demo.domain.user;

import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserPresenceService {

    @Getter
    private final Set<String> onlineIds = ConcurrentHashMap.newKeySet();
    private final Map<String, User> onlineSessions = new ConcurrentHashMap<>();

    public void add(String sessionId, User user) {
        onlineSessions.put(sessionId, user);
        onlineIds.add(user.getId());
    }

    public User remove(String sessionId) {
        User user = onlineSessions.remove(sessionId);
        if (user != null) onlineIds.remove(user.getId());
        return user;
    }

    public List<User> getOnlineUsers() {
        return new ArrayList<>(onlineSessions.values());
    }

}