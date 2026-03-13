package com.example.demo.application.dtos.out.chat;

import com.example.demo.domain.user.User;

public record TypingOutput(User user, Boolean typing) {
}