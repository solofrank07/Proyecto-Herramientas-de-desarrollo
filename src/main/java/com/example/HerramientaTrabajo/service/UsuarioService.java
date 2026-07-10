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

        if (correo.length() > 100) {
            System.out.println("❌ Correo demasiado largo");
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

        normalizarUsuario(usuario);

        String error = validarRegistro(usuario);

        if (error != null) {
            return null;
        }

        return repo.save(usuario);
    }

    public Usuario obtenerPerfil(Long id) {

        return repo.findById(id).orElse(null);

    }

    public Usuario actualizarPerfil(Long id, String nombre, String correo) {

        Usuario usuario = repo.findById(id).orElse(null);

        if (usuario == null) {
            System.out.println("ERROR: Usuario no encontrado");
            return null;
        }

        usuario.setNombre(nombre);
        usuario.setCorreo(correo);

        normalizarUsuario(usuario);

        System.out.println("Nombre normalizado: " + usuario.getNombre());
        System.out.println("Correo normalizado: " + usuario.getCorreo());

        if (usuario.getNombre().length() < 3
                || usuario.getNombre().length() > 50) {

            System.out.println("ERROR: Nombre inválido");
            return null;
        }

        if (usuario.getCorreo().length() < 8
                || usuario.getCorreo().length() > 100) {

            System.out.println("ERROR: Longitud de correo inválida");
            return null;
        }

        if (!usuario.getCorreo().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {

            System.out.println("ERROR: Formato de correo inválido");
            return null;
        }

        if (correoPerteneceAOtroUsuario(usuario)) {

            System.out.println("ERROR: Correo pertenece a otro usuario");
            return null;
        }

        System.out.println("Guardando usuario...");
        return repo.save(usuario);
    }

    public Usuario actualizarPassword(
            Long id,
            String passwordActual,
            String passwordNueva) {

        Usuario usuario = repo.findById(id).orElse(null);

        if (usuario == null) {
            return null;
        }

        if (!usuario.getContrasena().equals(passwordActual)) {
            return null;
        }

        if (passwordNueva == null
                || passwordNueva.trim().isEmpty()) {
            return null;
        }

        if (passwordNueva.length() < 5
                || passwordNueva.length() > 50) {
            return null;
        }

        usuario.setContrasena(passwordNueva);

        return repo.save(usuario);
    }

    private void normalizarUsuario(Usuario usuario) {

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
    }

    private boolean correoPerteneceAOtroUsuario(Usuario usuario) {

        Usuario existente = repo.findByCorreo(usuario.getCorreo())
                .orElse(null);

        if (existente == null) {
            return false;
        }

        return !existente.getId().equals(usuario.getId());
    }

}