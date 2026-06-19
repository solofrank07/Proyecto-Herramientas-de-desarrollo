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

        if (correo == null || correo.trim().isEmpty()
                || contrasena == null || contrasena.trim().isEmpty()) {

            System.out.println("❌ Campos vacíos");
            return null;
        }

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

    public Usuario registrar(Usuario usuario) {

        usuario.setCorreo(
                usuario.getCorreo()
                        .trim()
                        .toLowerCase()
        );

        if (usuario.getNombre() == null || usuario.getNombre().trim().isEmpty()
                || usuario.getCorreo() == null || usuario.getCorreo().trim().isEmpty()
                || usuario.getContrasena() == null || usuario.getContrasena().trim().isEmpty()) {

            return null;
        }

        if (!usuario.getCorreo().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return null;
        }

        if (usuario.getContrasena().length() < 5) {
            return null;
        }

        Usuario existe = repo.findByCorreo(usuario.getCorreo())
                .orElse(null);

        if (existe != null) {
            return null;
        }

        return repo.save(usuario);
    }
}