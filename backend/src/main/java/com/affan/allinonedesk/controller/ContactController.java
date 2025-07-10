package com.affan.allinonedesk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.affan.allinonedesk.model.Contact;
import com.affan.allinonedesk.repository.ContactRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactRepository repo;

    @GetMapping
    public List<Contact> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Contact create(@RequestBody Contact contact) {
        return repo.save(contact);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Contact update(@PathVariable Long id, @RequestBody Contact updatedContact) {
        return repo.findById(id)
                .map(contact -> {
                    contact.setName(updatedContact.getName());
                    contact.setEmail(updatedContact.getEmail());
                    contact.setPhone(updatedContact.getPhone());
                    return repo.save(contact);
                })
                .orElseThrow(() -> new RuntimeException("Contact not found with id " + id));
    }

}
