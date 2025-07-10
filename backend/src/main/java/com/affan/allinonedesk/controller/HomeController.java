package main.java.com.affan.allinonedesk.controller;

import com.affan.allinonedesk.model.Contact;
import com.affan.allinonedesk.repository.ContactRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private ContactRepository contactRepository;

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @PostMapping("/login")
    public String loginSubmit(@RequestParam String username, @RequestParam String password, HttpSession session, Model model) {
        if ("root".equals(username) && "root".equals(password)) {
            session.setAttribute("user", username);
            return "redirect:/contacts";
        } else {
            model.addAttribute("error", "Invalid credentials");
            return "login";
        }
    }

    @GetMapping("/contacts")
    public String contacts(Model model, HttpSession session) {
        String user = (String) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        }
        List<Contact> contacts = contactRepository.findAll();
        model.addAttribute("contacts", contacts);
        return "contacts";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
