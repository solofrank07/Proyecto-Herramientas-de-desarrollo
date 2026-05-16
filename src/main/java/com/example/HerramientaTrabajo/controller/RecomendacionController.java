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

        String nombre = request.getOrDefault("nombre", "");
        int presupuesto = Integer.parseInt(request.getOrDefault("presupuesto", "0"));
        String momento = request.getOrDefault("momento", "");

        return recetaService.recomendar(nombre, presupuesto, momento);
    }
}