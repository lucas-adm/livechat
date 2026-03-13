package com.example.demo.domain.message;

import com.example.demo.application.dtos.out.message.MessageOutput;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository repository;
    private final UserRepository uRepository;

    public MessageOutput create(User user, String clientId, String content) {
        Message message = Message.create(clientId, user.getId(), content);
        repository.save(message);
        return new MessageOutput(user, message);
    }

    public MessageOutput read(String id) {
        Message message = repository.findById(id).orElseThrow();
        User user = uRepository.findById(message.getCreator()).orElseThrow();
        message.setRead(true);
        repository.save(message);
        return new MessageOutput(user, message);
    }

    public MessageOutput update(String id, String content) {
        Message message = repository.findById(id).orElseThrow();
        User user = uRepository.findById(message.getCreator()).orElseThrow();
        message.setContent(content);
        message.setUpdatedAt(Instant.now());
        message.setUpdated(true);
        repository.save(message);
        return new MessageOutput(user, message);
    }

    public MessageOutput delete(String id) {
        Message message = repository.findById(id).orElseThrow();
        User user = uRepository.findById(message.getCreator()).orElseThrow();
        message.setContent(null);
        message.setDeleted(true);
        repository.save(message);
        return new MessageOutput(user, message);
    }

    public List<MessageOutput> getAll() {
        List<Message> messages = repository.findAllByOrderByCreatedAtAsc();
        Set<String> ids = messages.stream().map(Message::getCreator).collect(Collectors.toSet());
        Map<String, User> users = uRepository.findAllById(ids).stream().collect(Collectors.toMap(User::getId, Function.identity()));
        return messages.stream().map(msg -> new MessageOutput(users.get(msg.getCreator()), msg)).toList();
    }

}