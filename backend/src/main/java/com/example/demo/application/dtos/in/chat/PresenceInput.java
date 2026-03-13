package com.example.demo.application.dtos.in.chat;

import com.example.demo.domain.user.User;

public record PresenceInput(User user, boolean online) {
}