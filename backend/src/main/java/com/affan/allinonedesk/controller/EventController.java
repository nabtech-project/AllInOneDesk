package com.affan.allinonedesk.controller;

import com.affan.allinonedesk.model.Event;
import com.affan.allinonedesk.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository repo;

    @GetMapping
    public List<Event> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Event create(@RequestBody Event event) {
        return repo.save(event);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Event update(@PathVariable Long id, @RequestBody Event updatedEvent) {
        return repo.findById(id)
                .map(event -> {
                    event.setTitle(updatedEvent.getTitle());
                    event.setLocation(updatedEvent.getLocation());
                    event.setEventDateTime(updatedEvent.getEventDateTime());
                    return repo.save(event);
                })
                .orElseThrow(() -> new RuntimeException("Event not found with id " + id));
    }
}
