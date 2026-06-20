package com.example.HerramientaTrabajo.service;

import com.example.HerramientaTrabajo.model.Usuario;
import com.example.HerramientaTrabajo.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    public static final String CAMPOS_VACIOS = "CAMPOS_VACIOS";
    public static final String NOMBRE_LARGO = "NOMBRE_LARGO";
    public static final String NOMBRE_CORTO = "NOMBRE_CORTO";
    public static final String CORREO_INVALIDO = "CORREO_INVALIDO";
    public static final String PASSWORD_CORTA = "PASSWORD_CORTA";
    public static final String CORREO_EXISTE = "CORREO_EXISTE";
    public static final String CORREO_LARGO = "CORREO_LARGO";
    public static final String PASSWORD_LARGA = "PASSWORD_LARGA";
    public static final String CORREO_CORTO = "CORREO_CORTO";

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

        correo = correo.trim().toLowerCase();

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
        }

        System.out.println("❌ PASSWORD INCORRECTO");
        return null;
    }

    public String validarRegistro(Usuario usuario) {

        if (usuario.getCorreo().trim().length() < 8) {
            return CORREO_CORTO;
        }

        if (usuario.getNombre() == null || usuario.getNombre().trim().isEmpty()
                || usuario.getCorreo() == null || usuario.getCorreo().trim().isEmpty()
                || usuario.getContrasena() == null || usuario.getContrasena().trim().isEmpty()) {

            return CAMPOS_VACIOS;
        }

        if (usuario.getNombre().trim().length() < 3) {
            return NOMBRE_CORTO;
        }

        if (usuario.getNombre().trim().length() > 50) {
            return NOMBRE_LARGO;
        }

        if (usuario.getCorreo().trim().length() > 100) {
            return CORREO_LARGO;
        }

        if (!usuario.getCorreo().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return CORREO_INVALIDO;
        }

        if (usuario.getContrasena().length() < 5) {
            return PASSWORD_CORTA;
        }

        if (repo.findByCorreo(usuario.getCorreo().trim().toLowerCase()).isPresent()) {
            return CORREO_EXISTE;
        }

        if (usuario.getContrasena().length() > 50) {
            return PASSWORD_LARGA;
        }

        return null;
    }

    public Usuario registrar(Usuario usuario) {

        usuario.setNombre(
                usuario.getNombre()
                        .trim()
                        .replaceAll("\\s+", " ")
        );

        usuario.setCorreo(
                usuario.getCorreo()
                        .trim()
                        .toLowerCase()
        );

        String error = validarRegistro(usuario);

        if (error != null) {
            return null;
        }

        return repo.save(usuario);
    }
}