package com.example.HerramientaTrabajo.controller;

import com.example.HerramientaTrabajo.model.Receta;
import com.example.HerramientaTrabajo.service.RecetaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RecomendacionController {

    private final RecetaService recetaService;

    public RecomendacionController(RecetaService recetaService) {
        this.recetaService = recetaService;
    }

    @PostMapping("/recomendar")
    public List<Receta> recomendar(@RequestBody Map<String, String> request) {

        String nombre = request.getOrDefault("nombre", "").trim();

        int presupuesto = 0;
        try {
            presupuesto = Integer.parseInt(request.getOrDefault("presupuesto", "0"));
        } catch (NumberFormatException e) {
            presupuesto = 0;
        }

        String momento = request.getOrDefault("momento", "").toLowerCase();

        return recetaService.recomendar(nombre, presupuesto, momento);
    }

    @GetMapping("/saludo")
    public String saludo() {
        return "API funcionando correctamente";
    }

    @GetMapping("/recetas")
    public List<Receta> listarRecetas() {
        return recetaService.listarTodas();
    }

    @PostMapping("/recetas")
    public Receta crearReceta(@RequestBody Receta receta) {
        return recetaService.guardar(receta);
    }

    @PutMapping("/recetas/{id}")
    public Receta actualizarReceta(
            @PathVariable Long id,
            @RequestBody Receta receta) {

        return recetaService.actualizar(id, receta);
    }

    @DeleteMapping("/recetas/{id}")
    public void eliminarReceta(@PathVariable Long id) {
        recetaService.eliminar(id);
    }

}