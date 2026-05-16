package com.example.HerramientaTrabajo.service;

import com.example.HerramientaTrabajo.model.Usuario;
import com.example.HerramientaTrabajo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public Usuario login(String correo, String contrasena) {
    System.out.println("Correo recibido: [" + correo + "]");
    System.out.println("Pass recibido: [" + contrasena + "]");

    Usuario usuario = repo.findByCorreo(correo).orElse(null);

    if (usuario == null) {
        System.out.println("❌ Usuario NO encontrado");
        return null;
    }

    System.out.println("✔ Usuario encontrado: " + usuario.getCorreo());
    System.out.println("BD pass: [" + usuario.getContrasena() + "]");

    if (usuario.getContrasena().equals(contrasena)) {
        System.out.println("✔ LOGIN CORRECTO");
        return usuario;
    } else {
        System.out.println("❌ PASSWORD INCORRECTO");
        return null;
    }
}
}