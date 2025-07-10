package com.affan.allinonedesk.controller;

import com.affan.allinonedesk.model.Note;
import com.affan.allinonedesk.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteRepository repo;

    @GetMapping
    public List<Note> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return repo.save(note);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note updatedNote) {
        return repo.findById(id)
                .map(note -> {
                    note.setTitle(updatedNote.getTitle());
                    note.setContent(updatedNote.getContent());
                    note.setCreatedAt(updatedNote.getCreatedAt());
                    return repo.save(note);
                })
                .orElseThrow(() -> new RuntimeException("Note not found with id " + id));
    }
}
